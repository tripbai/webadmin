export namespace KryptoDoc {
  export namespace Endpoints {
    export type Query<
      TKind extends "snippet" | "list",
      TResponse = TKind extends "snippet"
        ? SnippetResponseFields
        : ListResponseFields
    > = {
      request: {
        path: "/query";
        method: "POST";
        data: {
          query: TKind extends "snippet"
            ? TopLevelSnippetQueryKind
            : TopLevelListQueryKind;
        };
      };
      response: TKind extends "snippet"
        ? SnippetOf<Extract<TResponse, SnippetResponseFields>>
        : ListOf<Extract<TResponse, ListResponseFields>>;
    };
  }
  export type ListOf<TResponseFields extends ListResponseFields> = {
    kind: "#list";
    guid: string;
    has_entity_id: {
      entity_id: string;
      exists: boolean;
    } | null;
    count: number;
    snippets: Array<SnippetOf<TResponseFields>>;
  };
  export type SnippetOf<TResponseFields extends SnippetResponseFields> = {
    kind: "#snippet";
    guid: string;
    collection: string;
    entity_id: string;
    snippet: TResponseFields;
  };
}
type SnippetResponseFields = {
  [key: string]: any | SnippetResponseFields | ListResponseFields;
};
type ListResponseFields = SnippetResponseFields;

type TopLevelSnippetQueryKind = {
  kind: "#snippet";
  namespace: string;
  collection: string;
  entity_id: string;
  fields: { [key: string]: null | SnippetQueryKind | ListQueryKind };
};

type SnippetQueryKind = {
  kind: "#snippet";
  collection: string;
  entity_id: string;
  fields: { [key: string]: null | SnippetQueryKind | ListQueryKind };
};

type TopLevelListQueryKind = {
  kind: "#list";
  namespace: string;
  collection: string;
  fields: { [key: string]: null | SnippetQueryKind | ListQueryKind };
};

type ListQueryKind = {
  kind: "#list";
  collection: string;
  has_entity_id?: string;
  fields: { [key: string]: null | ListQueryKind | SnippetQueryKind };
};
