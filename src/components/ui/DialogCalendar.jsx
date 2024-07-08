import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function DialogCalendar({ matches }) { // Correctly destructure `matches` from props
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-dark-green hover:bg-custom-green">
          <CalendarIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tournament Calendar</DialogTitle>

        <DialogDescription>
          <Calendar
            mode="single"
            matches={matches} // Now `matches` is correctly passed as a prop
          />
        </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export { DialogCalendar };
