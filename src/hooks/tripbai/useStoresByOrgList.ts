import config from "@/config";
import { httpPost } from "@/services/httpClient";
import * as IdentityAuthority from "@/types/identity-authority/module/types";
import { KryptoDoc } from "@/types/kryptodoc/types";
import { useEffect, useRef, useState } from "react";
import usePaginatedList from "../paginated-list/usePaginatedList";
import * as TripBai from "@/types/app/module/types";
import * as Core from "@/types/core/module/types";

type StoresByOrgResponseSnippet = {
  entity_id: Core.Entity.Id;
  stores: {
    kind: "#list";
    guid: string;
    count: number;
    snippets: Array<{
      snippet: TripBai.Stores.Snippet;
    }>;
  };
};

export default function useStoresByOrgList({
  orgId,
}: {
  orgId: Core.Entity.Id;
}) {
  const {
    list,
    isLoading,
    isError,
    hasNextPage,
    hasPreviousPage,
    triggerNextPageFetch,
    triggerPreviousPageFetch,
    startSearchResultContext,
    closeSearchResultContext,
  } = usePaginatedList<TripBai.Stores.Snippet>({
    expectedResultsPerPage: 5,
    dataFetcher: async (params) => {
      if (params.context === "regular") {
        const { page, previousResult } = params;
        let sinceDocumentId: string | null = null;
        if (page > 1) {
          sinceDocumentId = previousResult[previousResult.length - 1].entity_id;
        }
        const response = await httpPost<
          KryptoDoc.Endpoints.Query<"snippet", StoresByOrgResponseSnippet>
        >({
          host: config.kryptodoc.host,
          path: "/query",
          params: {},
          data: {
            query: {
              kind: "#snippet",
              namespace: config.kryptodoc.namespace,
              collection: "organizations",
              entity_id: orgId,
              fields: {
                entity_id: null,
                stores: {
                  kind: "#list",
                  collection: "stores",
                  fields: {
                    name: null,
                    about: null,
                    organization_id: null,
                    location_id: null,
                    language: null,
                    profile_photo_src: null,
                    cover_photo_src: null,
                    status: null,
                    created_at: null,
                    archived_at: null,
                  },
                },
              },
            },
          },
          authToken: null,
        });
        const storeSnippets = response.snippet.stores.snippets.map(
          (store) => store.snippet
        );
        return storeSnippets;
      }
      throw new Error("Search is not supported");
    },
  });

  return {
    stores: list,
    isLoading,
    getNextPage: triggerNextPageFetch,
    hasNextPage: hasNextPage,
    getPreviousPage: triggerPreviousPageFetch,
    hasPreviousPage: hasPreviousPage,
    searchOrganization: startSearchResultContext,
    closeSearch: closeSearchResultContext,
  };
}
