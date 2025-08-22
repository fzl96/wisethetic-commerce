import { getUser } from "@/server/user";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { UpdateForm } from "./update-form";

export async function UserInformationCard() {
  const user = await getUser();

  if (!user) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Information</CardTitle>
        <CardDescription>
          This is the information about your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Label>Name</Label>
        <Input disabled value={user.name} />
        <Label>Email</Label>
        <Input disabled value={user.email} />
        {user && <UpdateForm user={user} />}
      </CardContent>
    </Card>
  );
}
