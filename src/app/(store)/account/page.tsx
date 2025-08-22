import { Metadata } from "next";
import { DeleteAccount } from "@/components/account/delete-account";
import { UserInformationCard } from "@/components/account/user-information-card";

export const metadata: Metadata = {
  title: "Account | Wisethetic",
};

export default async function AccountPage() {
  return (
    <div className="space-y-4">
      <UserInformationCard />
      <DeleteAccount />
    </div>
  );
}
