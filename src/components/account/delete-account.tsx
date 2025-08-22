import { getUser } from "@/server/user";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DeletePopup } from "./delete-popup";

export async function DeleteAccount() {
  const user = await getUser();
  if (!user) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Delete User</CardTitle>
        <CardDescription>
          This user will be permanently deleted, including its orders history.
          This action is irreversible and can not be undone
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Separator />
      </CardContent>
      <CardFooter className="flex justify-end">
        <DeletePopup id={user.id} email={user.email} />
      </CardFooter>
    </Card>
  );
}
