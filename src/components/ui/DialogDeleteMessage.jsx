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

function DialogDeleteMessage({ handleDeleteMessage }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className='text-red-500 bg-white'>X</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Message</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete this message.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button className='bg-rejection-red hover:bg-red-400' type="submit" onClick={handleDeleteMessage}>DELETE</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { DialogDeleteMessage };