import config from "@/config";
import { httpPost } from "@/services/httpClient";
import * as IdentityAuthority from "@/types/identity-authority/module/types";
import { KryptoDoc } from "@/types/kryptodoc/types";
import { useEffect, useRef, useState } from "react";
import usePaginatedList from "../paginated-list/usePaginatedList";
import * as TripBai from "@/types/app/module/types";

export default function useOrganizationList() {
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
  } = usePaginatedList<TripBai.Organizations.Snippet>({
    expectedResultsPerPage: 5,
    dataFetcher: async (params) => {
      if (params.context === "regular") {
        const { page, previousResult } = params;
        let sinceDocumentId: string | null = null;
        if (page > 1) {
          sinceDocumentId = previousResult[previousResult.length - 1].entity_id;
        }
        const response = await httpPost<
          KryptoDoc.Endpoints.Query<"list", TripBai.Organizations.Snippet>
        >({
          host: config.kryptodoc.host,
          path: "/query",
          params: {},
          data: {
            query: {
              kind: "#list",
              namespace: config.kryptodoc.namespace,
              collection: "organizations",
              // @ts-expect-error
              since_document_id: sinceDocumentId,
              fields: {
                entity_id: null,
                business_name: null,
                profile_photo: null,
                cover_photo: null,
                type: null,
                status: null,
                location_id: null,
                mobile_number: null,
                telephone_number: null,
                created_at: null,
              },
            },
          },
          authToken: null,
        });
        const organizationSnippets = response.snippets.map(
          (snippet) => snippet.snippet
        );
        return organizationSnippets;
      }
      const { query, page, previousResult } = params;
      let sinceDocumentId: string | null = null;
      if (page > 1) {
        sinceDocumentId = previousResult[previousResult.length - 1].entity_id;
      }
      const response = await httpPost<
        KryptoDoc.Endpoints.Query<"snippet", TripBai.Organizations.Snippet>
      >({
        host: config.kryptodoc.host,
        path: "/query",
        params: {},
        data: {
          query: {
            kind: "#snippet",
            namespace: config.kryptodoc.namespace,
            collection: "organizations",
            entity_id: query,
            fields: {
              entity_id: null,
              business_name: null,
              profile_photo: null,
              cover_photo: null,
              type: null,
              status: null,
              location_id: null,
              mobile_number: null,
              telephone_number: null,
              created_at: null,
            },
          },
        },
        authToken: null,
      });
      if (response.snippet.entity_id === null) {
        return [];
      }
      return [response.snippet];
    },
  });

  return {
    organizations: list,
    isLoading,
    getNextPage: triggerNextPageFetch,
    hasNextPage: hasNextPage,
    getPreviousPage: triggerPreviousPageFetch,
    hasPreviousPage: hasPreviousPage,
    searchOrganization: startSearchResultContext,
    closeSearch: closeSearchResultContext,
  };
}
