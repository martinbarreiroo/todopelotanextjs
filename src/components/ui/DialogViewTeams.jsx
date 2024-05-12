import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function DialogViewTeams({ team1Composition, team2Composition }) {
  const [showTeams, setShowTeams] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-dark-green hover:bg-custom-green text-black" onClick={() => setShowTeams(true)}>
          View Match Teams
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-black-600 font-bold">Match Teams</DialogTitle>
        </DialogHeader>
        {showTeams && (
          <div className="flex justify-center items-center mt-4">
            <div className="flex justify-between space-x-10 w-80">
              <div className="flex flex-col items-center w-1/2 font-bold bg-gradient-to-r from-dark-green to-custom-green text-white p-4 rounded-lg shadow-lg">
                <h2 className="text-lg mb-2">Team 1</h2>
                <table className="w-full">
                  <tbody>
                    {team1Composition.map((player, index) => (
                      <tr key={index}>
                        <td className="py-1 border-b border-gray-200">{player}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex flex-col items-center w-1/2 font-bold bg-gradient-to-r from-dark-green to-custom-green text-white p-4 rounded-lg shadow-lg">
                <h2 className="text-lg mb-2">Team 2</h2>
                <table className="w-full">
                  <tbody>
                    {team2Composition.map((player, index) => (
                      <tr key={index}>
                        <td className="py-1 border-b border-gray-200">{player}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>                    
        )}
      </DialogContent>
    </Dialog>
  );
}