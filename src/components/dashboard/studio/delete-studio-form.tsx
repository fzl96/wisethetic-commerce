import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DeleteStudioPopup } from "./delete-studio-popup";

export function DeleteStudioForm({
  studioId,
  username,
}: {
  studioId: string;
  username: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Delete Studio</CardTitle>
        <CardDescription>
          This studio will be permanently deleted, including its orders history.
          This action is irreversible and can not be undone
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Separator />
      </CardContent>
      <CardFooter className="flex justify-end">
        <DeleteStudioPopup studioId={studioId} username={username} />
      </CardFooter>
    </Card>
  );
}
