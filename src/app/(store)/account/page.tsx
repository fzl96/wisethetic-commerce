import { DeleteAccount } from "@/components/account/delete-account";
import { UserInformationCard } from "@/components/account/user-information-card";

export default async function AccountPage() {
  return (
    <div className="space-y-4">
      <UserInformationCard />
      <DeleteAccount />
    </div>
  );
}
