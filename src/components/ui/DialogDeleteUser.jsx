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
        <button className='text-red-500'>X</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>X</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete this message.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <button className='bg-rejection-red hover:bg-red-400' type="button" onClick={handleDeleteMessage}>DELETE</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { DialogDeleteMessage };