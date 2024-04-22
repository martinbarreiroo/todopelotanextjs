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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function DialogDemo({ userName, setUserName, handleInviteUser }) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button className = 'bg-dark-green hover:bg-custom-green' variant="outline">Invite</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add a User</DialogTitle>
            <DialogDescription>
              Here you can Invite a User to your Tournament
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                id="username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button className= 'bg-dark-green hover:bg-custom-green' type="submit" onClick={handleInviteUser}>Invite</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  export { DialogDemo }