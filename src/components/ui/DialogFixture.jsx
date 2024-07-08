import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function DialogFixture({
  numOfMatches,
  setNumOfMatches,
  handleFixture,
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="absolute top-40 left-96 bg-dark-green hover:bg-custom-green text-balck">
          Create Fixture
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a Pre-set Fixture</DialogTitle>
          <DialogDescription>
            This actions creates a Fixture with the number of matches you specify. Then you´ll have to set Location and Description, and your desired Date and Time for each match. Can be done only once.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Date" className="text-right">
              Number of Matches
            </Label>
            <Input
              id="number"
              type="number"
              min = {1}
              value={numOfMatches}
              onChange={(e) => setNumOfMatches(e.target.value)}
              className="col-span-3"
            />
            
          </div>
        </div>
        <DialogFooter>
          <Button
            className="bg-dark-green hover:bg-custom-green"
            type="submit"
            onClick={handleFixture}
          >
            Create Fixture
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { DialogFixture };
