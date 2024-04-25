import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function DialogDeleteMatch({ handleDeleteMatch }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-rejection-red hover:bg-red-400" variant="outline">
          Delete Match
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Match</DialogTitle>
          <DialogDescription>
          This action cannot be undone. This will permanently delete your Match and remove the data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            className="bg-rejection-red hover:bg-red-400"
            type="submit"
            onClick={handleDeleteMatch}
          >
            DELETE
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { DialogDeleteMatch };
