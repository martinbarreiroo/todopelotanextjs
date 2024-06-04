import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function DialogChangeMatch({
    date,
    setDate,
    time,
    setTime,
    location,
    setLocation,
    description,
    setDescription,
    handleUpdateMatch,

}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="absolute font-bold py-3 px-3 w-10 h-6 rounded bg-dark-green hover:bg-custom-green animate-fadeIn">
          <img className="w-20 h-5" src="/assets/more.png" alt="more" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change your Tournament Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Date" className="text-right">
              Date
            </Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="col-span-3"
            />
            <Label htmlFor="Time" className="text-right">
              Time
            </Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="col-span-3"
            />
            <Label htmlFor="Location" className="text-right">
              Location
            </Label>
            <Input
              id="location" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="col-span-3"
            />
            <Label htmlFor="Description" className="text-right">
              Description
            </Label>
            <Input
              id="description" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
            />
            
          </div>
        </div>
        <DialogFooter>
          <Button
            className="bg-dark-green hover:bg-custom-green"
            type="submit"
            onClick={handleUpdateMatch}
          >
            Change
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { DialogChangeMatch };
