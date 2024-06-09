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
import { useEffect, useState } from "react";

function DialogRescheduleMatch({ handleRescheduleMatch, matchId, userId }) {
    const [isButtonDisabled, setButtonDisabled] = useState(false);

  const handleClick = () => {
    handleRescheduleMatch(matchId, userId);
    setButtonDisabled(true);
  };

  useEffect(() => {
    if (isButtonDisabled) {
      const timer = setTimeout(() => {
        setButtonDisabled(false);
      }, 300000); // 5 minutes cooldown

      return () => clearTimeout(timer); // Clean up on component unmount
    }
  }, [isButtonDisabled]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-dark-green hover:bg-custom-green" variant="outline">
          Notify Rescheduling
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reschedule</DialogTitle>
          <DialogDescription>
          If this date and time are not suitable for you, please notify the tournament admin to consider rescheduling this match.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            className="bg-dark-green hover:bg-custom-green"
            type="submit"
            onClick={handleClick}
            disabled={isButtonDisabled}
          >
            {isButtonDisabled ? 'Sent' : 'Notify'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { DialogRescheduleMatch };
