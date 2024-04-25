import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


function DialogDeleteUser({ handleDeleteUser }) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button className = 'bg-rejection-red hover:bg-red-400' variant="outline">Delete User</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button className= 'bg-rejection-red hover:bg-red-400' type="submit" onClick={handleDeleteUser}>DELETE</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  export { DialogDeleteUser }