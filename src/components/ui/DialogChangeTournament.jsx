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

function DialogChangeTournament({
  tournamentName,
  setTournamentName,
  tournamentDescription,
  setTournamentDescription,
  tournamentMaxParticipants,
  setTournamentMaxParticipants,
  tournamentType,
  setTournamentType,
  handleUpdateTournament,
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
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={tournamentName}
              onChange={(e) => setTournamentName(e.target.value)}
              className="col-span-3"
            />
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              value={tournamentDescription}
              onChange={(e) => setTournamentDescription(e.target.value)}
              className="col-span-3"
            />
             <Label htmlFor="Type" className="text-right">
              Type
            </Label>
            <Input
              id="Type" 
              value={tournamentType}
              onChange={(e) => setTournamentType(e.target.value)}
              className="col-span-3"
            />
            <Label htmlFor="Max Participants" className="text-right">
              Max Participants
            </Label>
            <Input
              id="Max Participants"
              value={tournamentMaxParticipants}
              onChange={(e) => setTournamentMaxParticipants(e.target.value)}
              className="col-span-3"
            />

          </div>
        </div>
        <DialogFooter>
          <Button
            className="bg-dark-green hover:bg-custom-green"
            type="submit"
            onClick={handleUpdateTournament}
          >
            Change
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { DialogChangeTournament };
