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

function DialogDeleteTournament({ handleDeleteTournament }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-rejection-red hover:bg-red-400" variant="outline">
          Delete Tournament
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Tournament</DialogTitle>
          <DialogDescription>
          This action cannot be undone. This will permanently delete your Tournament and remove the data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            className="bg-rejection-red hover:bg-red-400"
            type="submit"
            onClick={handleDeleteTournament}
          >
            DELETE
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { DialogDeleteTournament };
