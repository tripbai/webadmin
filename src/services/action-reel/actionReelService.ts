import { retrieveFromIDB, storeToIDB } from "../indexdb/idbService";

const LOCAL_STORAGE_KEY = "arse-db";
export type ActionType = "create" | "update" | "delete";

type ActionItem = {
  /** The date the action item was registered */
  createdAt: number;
  /** The data being stored which action has been made */
  data: any;
  /** The id of the record */
  recordId: string;
  /** The collection where the action item should belong to */
  collection: string;
  /** The type of action */
  type: ActionType;
};

type ReplayableDataInterface = {
  recordId: string;
  data: any;
};

const isDeepEqual = (a: unknown, b: unknown): boolean => {
  if (a === b) return true;
  if (
    a === null ||
    b === null ||
    typeof a !== "object" ||
    typeof b !== "object"
  ) {
    return false;
  }
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  for (const key of keysA) {
    const objKey = key as keyof typeof a | keyof typeof b;
    if (!Object.prototype.hasOwnProperty.call(b, objKey)) return false;
    if (!isDeepEqual(a[objKey], b[objKey])) return false;
  }
  return true;
};

const sortByOldestFirst = (items: ActionItem[]): ActionItem[] => {
  return items.slice().sort((a, b) => a.createdAt - b.createdAt);
};

const removeExpiredItems = (items: ActionItem[]): ActionItem[] => {
  const THIRTY_MINUTES_MS = 30 * 60 * 1000;
  const now = Date.now();
  return items.filter((item) => now - item.createdAt <= THIRTY_MINUTES_MS);
};

const processItems = (items: ActionItem[]): ActionItem[] => {
  if (items === null || items.length === 0) return [];
  const sorted = sortByOldestFirst(items);
  return removeExpiredItems(sorted);
};

const getStoredActions = async (): Promise<Array<ActionItem>> => {
  const data = await retrieveFromIDB<ActionItem[]>({
    dbName: LOCAL_STORAGE_KEY,
    key: "stored_data",
  });
  if (data === null) return [];
  return processItems(data);
};

const storeStoredActions = (data: Array<ActionItem>) => {
  storeToIDB({
    dbName: LOCAL_STORAGE_KEY,
    key: "stored_data",
    data: processItems(data),
  });
};

export const recordAction = async (params: {
  collection: string;
  type: ActionType;
  recordId: string;
  data: { [key: string]: any };
}) => {
  let storedActions = await getStoredActions();
  if (storedActions === null) {
    storedActions = [];
  }
  storedActions.push({
    createdAt: Date.now(),
    data: params.data,
    collection: params.collection,
    recordId: params.recordId,
    type: params.type,
  });
  storeStoredActions(storedActions);
};

export const replayAction = async (params: {
  collection: string;
  data: Array<ReplayableDataInterface>;
  skips: Array<ActionType>;
}) => {
  let replayableDatas: Array<ReplayableDataInterface> = JSON.parse(
    JSON.stringify(params.data)
  );
  const storedActions = await getStoredActions();
  /** Creates will take priority in actions */
  if (!params.skips.includes("create")) {
    for (let i = 0; i < storedActions.length; i++) {
      const storedAction = storedActions[i];
      if (storedAction.collection !== params.collection) continue;
      if (storedAction.type !== "create") continue;
      /**
       * To avoid duplicate records in resulting data, we will
       * check if the replyable data already contains this record_id
       */
      const existingRecord = replayableDatas.find((replayableData) => {
        return replayableData.recordId === storedAction.recordId;
      });
      /** Skips creating the record if it already exists */
      if (existingRecord !== undefined) continue;
      /** Finally, the record is created to the existing data */
      replayableDatas.unshift({
        recordId: storedAction.recordId,
        data: storedAction.data,
      });
    }
  }
  for (let i = 0; i < storedActions.length; i++) {
    const storedAction = storedActions[i];
    if (storedAction.collection !== params.collection) continue;
    if (params.skips.includes(storedAction.type)) continue;
    if (storedAction.type === "create") continue;
    if (storedAction.type === "update") {
      const existingRecord = replayableDatas.find((replayableData) => {
        return replayableData.recordId === storedAction.recordId;
      });
      if (existingRecord !== undefined) {
        existingRecord.data = storedAction.data;
      }
      continue;
    }
    if (storedAction.type === "delete") {
      let newData = replayableDatas.filter((replayableData) => {
        return replayableData.recordId !== storedAction.recordId;
      });
      replayableDatas = newData;
      continue;
    }
  }
  return replayableDatas;
};
