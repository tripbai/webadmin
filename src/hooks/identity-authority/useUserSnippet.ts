import config from "@/config";
import { httpPost } from "@/services/httpClient";
import * as IdentityAuthority from "@/types/identity-authority/module/types";
import { KryptoDoc } from "@/types/kryptodoc/types";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

export function useUserSnippet(
  userId: string
): UseQueryResult<KryptoDoc.SnippetOf<UserSnippetResult>> {
  return useQuery<KryptoDoc.SnippetOf<UserSnippetResult>>({
    queryKey: ["user-snippet", userId],
    queryFn: async () => {
      const response = await httpPost<
        KryptoDoc.Endpoints.Query<"snippet", UserSnippetResult>
      >({
        host: config.kryptodoc.host,
        path: "/query",
        params: {},
        data: {
          query: {
            kind: "#snippet",
            namespace: config.kryptodoc.namespace,
            collection: "users",
            entity_id: userId,
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
      return response;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes,
    retry: 1,
  });
}

export type UserSnippetResult = IdentityAuthority.Users.Snippet;
