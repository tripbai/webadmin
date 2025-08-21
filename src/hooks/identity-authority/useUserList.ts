import config from "@/config";
import { httpPost } from "@/services/httpClient";
import * as IdentityAuthority from "@/types/identity-authority/module/types";
import { KryptoDoc } from "@/types/kryptodoc/types";
import { useEffect, useRef, useState } from "react";
import usePaginatedList from "../paginated-list/usePaginatedList";
import { replayUserActions } from "@/services/identity-authority/userActionReels";

export default function useUserList() {
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
  } = usePaginatedList<UserSnippet>({
    expectedResultsPerPage: 5,
    dataFetcher: async (params) => {
      if (params.context === "regular") {
        const { page, previousResult } = params;
        let sinceDocumentId: string | null = null;
        if (page > 1) {
          sinceDocumentId = previousResult[previousResult.length - 1].id;
        }
        const response = await httpPost<
          KryptoDoc.Endpoints.Query<"list", UserSnippet>
        >({
          host: config.kryptodoc.host,
          path: "/query",
          params: {},
          data: {
            query: {
              kind: "#list",
              namespace: config.kryptodoc.namespace,
              collection: "users",
              // @ts-expect-error
              since_document_id: sinceDocumentId,
              fields: {
                id: null,
                first_name: null,
                last_name: null,
                username: null,
                email_address: null,
                is_email_verified: null,
                user_type: null,
                status: null,
                profile_photo: null,
                cover_photo: null,
              },
            },
          },
          authToken: null,
        });
        const userSnippets = response.snippets.map(
          (snippet) => snippet.snippet
        );
        const replayedSnippets = await replayUserActions(
          userSnippets,
          page === 1
        );
        if (replayedSnippets.length > 5) {
          return replayedSnippets.slice(0, 5);
        }
        return replayedSnippets;
      }
      const { query, page, previousResult } = params;
      let sinceDocumentId: string | null = null;
      if (page > 1) {
        sinceDocumentId = previousResult[previousResult.length - 1].id;
      }
      const response = await httpPost<
        KryptoDoc.Endpoints.Query<"snippet", UserSnippet>
      >({
        host: config.kryptodoc.host,
        path: "/query",
        params: {},
        data: {
          query: {
            kind: "#snippet",
            namespace: config.kryptodoc.namespace,
            collection: "users",
            entity_id: query,
            fields: {
              id: null,
              first_name: null,
              last_name: null,
              username: null,
              email_address: null,
              is_email_verified: null,
              user_type: null,
              status: null,
              profile_photo: null,
              cover_photo: null,
            },
          },
        },
        authToken: null,
      });
      if (response.snippet.id === null) {
        return [];
      }
      return [response.snippet];
    },
  });

  return {
    users: list,
    isLoading,
    getNextPage: triggerNextPageFetch,
    hasNextPage: hasNextPage,
    getPreviousPage: triggerPreviousPageFetch,
    hasPreviousPage: hasPreviousPage,
    searchUser: startSearchResultContext,
    closeSearch: closeSearchResultContext,
  };
}

export type UserSnippet = IdentityAuthority.Users.Snippet;
