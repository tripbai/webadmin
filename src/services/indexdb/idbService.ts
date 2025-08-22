const dbCache = new Map<string, Promise<IDBDatabase>>();
const mainstore = "master";

export const connectToIDB = ({
  dbName,
}: {
  dbName: string;
}): Promise<IDBDatabase> => {
  if (dbCache.has(dbName)) {
    return dbCache.get(dbName)!;
  }

  const dbPromise = new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onerror = (event) => {
      console.error({
        message: "failed to open IndexedDB database instance",
        error: request.error,
        event,
      });
      dbCache.delete(dbName);
      reject(request.error ?? new Error("Failed to open IndexedDB"));
    };

    request.onsuccess = (event) => {
      if (!event.target || !("result" in event.target)) {
        dbCache.delete(dbName);
        return reject(new Error("Missing result in onsuccess event.target"));
      }

      const db = event.target.result as IDBDatabase;

      db.addEventListener("close", () => {
        console.warn(
          `IDB database "${dbName}" was closed, removing from cache`
        );
        dbCache.delete(dbName);
      });

      db.addEventListener("versionchange", () => {
        console.warn(
          `IDB database "${dbName}" needs upgrade, closing & clearing cache`
        );
        db.close();
        dbCache.delete(dbName);
      });

      dbCache.set(dbName, Promise.resolve(db)); // finalized cache
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      if (!event.target || !("result" in event.target)) {
        dbCache.delete(dbName);
        return reject(
          new Error("Missing result in onupgradeneeded event.target")
        );
      }

      const db = event.target.result as IDBDatabase;
      if (!db.objectStoreNames.contains(mainstore)) {
        db.createObjectStore(mainstore, { keyPath: "key" });
      }
    };
  });

  dbCache.set(dbName, dbPromise); // cache promise immediately (for parallel callers)
  return dbPromise;
};

export const storeToIDB = async ({
  dbName,
  key,
  data,
}: {
  dbName: string;
  key: string;
  data: any;
}) => {
  const databaseInstance = await connectToIDB({ dbName });
  return new Promise((resolve, reject) => {
    const transaction = databaseInstance.transaction(mainstore, "readwrite");
    const objectStore = transaction.objectStore(mainstore);
    const storeRequest = objectStore.put({
      key: key,
      value: data,
    });
    storeRequest.onsuccess = () => resolve(true);
    storeRequest.onerror = (event) => {
      console.error({
        message: "failed to store data to indexed db",
        key: key,
        data: data,
        event: event,
      });
      resolve(false);
    };
  });
};

export async function retrieveFromIDB<T>({
  dbName,
  key,
}: {
  dbName: string;
  key: string;
}): Promise<T | null> {
  const databaseInstance = await connectToIDB({ dbName });

  return new Promise<T | null>((resolve, reject) => {
    const transaction = databaseInstance.transaction(mainstore, "readonly");
    const objectStore = transaction.objectStore(mainstore);
    const getRequest = objectStore.get(key);

    getRequest.onsuccess = () => {
      // result is either undefined (not found) or { key, value }
      const result = getRequest.result as { key: string; value: T } | undefined;
      resolve(result ? result.value : null);
    };

    getRequest.onerror = (event) => {
      console.error({
        message: "failed to retrieve data from indexed db",
        key,
        event,
      });
      reject(new Error("Failed to retrieve data from IndexedDB"));
    };
  });
}

export const removeFromIDB = async ({
  dbName,
  key,
}: {
  dbName: string;
  key: string;
}) => {
  const databaseInstance = await connectToIDB({ dbName });
  return new Promise((resolve, reject) => {
    const transaction = databaseInstance.transaction(mainstore, "readwrite");
    const objectStore = transaction.objectStore(mainstore);
    const deleteRequest = objectStore.delete(key);
    deleteRequest.onsuccess = () => resolve(true);
    deleteRequest.onerror = (event) => {
      console.error({
        message: "failed to delete data from indexed db",
        key: key,
        event: event,
      });
      resolve(false);
    };
  });
};
