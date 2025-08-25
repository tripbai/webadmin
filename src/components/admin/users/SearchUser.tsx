import CantonSearchInput from "@/components/forms/inputs/search/CantonSearchInput";
import { searchUser } from "@/services/identity-authority/webadmin/searchUser";
import * as IdentityAuthority from "@/types/identity-authority/module/types";

export default function SearchUser() {
  return (
    <section>
      <CantonSearchInput
        label="Organization Admin"
        placeholder="Search user..."
        onSubmit={async (value) => {
          let result: IdentityAuthority.Users.Snippet | null = null;
          try {
            result = await searchUser(value);
          } catch (error) {
            console.error(error);
            return [];
          }
          if (result === null) return [];
          return [result];
        }}
        renderResult={(result) => (
          <>
            <span className="text-black">
              {result.first_name} {result.last_name}
            </span>{" "}
            <span className="text-gray-500 font-light">@{result.username}</span>
          </>
        )}
        onSelectResult={(data) => {}}
      />
    </section>
  );
}
