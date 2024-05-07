import { toast } from "sonner";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function SonnerDemo(props) {
  const today = new Date();
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const dateString = today.toLocaleDateString(undefined, options);
  const timeString = today.toLocaleTimeString();
  const { team1Score, team2Score, yellowCards, redCards, goals, assists } = props;
  const [match, setmatch] = useState([]);

  const updateMatch = async (team1Score, team2Score, yellowCards, redCards, goals, assists) => {
    try {
      const token = localStorage.getItem("token");
      const matchId = localStorage.getItem("matchId");
      console.log(matchId);
      const response = await fetch(`http://localhost:8080/matches/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          matchId: matchId,
          result1: team1Score,
          result2: team2Score,
          yellowCards: yellowCards,
          redCards: redCards,
          goals: goals,
          assists: assists,
        }),
      });

      if (response.ok) {
        const updatedMatch = await response.json();
        console.log(updatedMatch);
        setmatch(updatedMatch);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Button
      className="bg-dark-green hover:bg-custom-green mt-10"
      variant="outline"
      onClick={async () => {
        const updateSuccessful = await updateMatch(
          team1Score,
          team2Score,
          yellowCards,
          redCards,
          goals,
          assists
        );

        if (updateSuccessful) {
          toast("Updated succesfully", {
            description: dateString + " " + timeString,
            action: {
              label: "Close",
              onClick: () => toast.dismiss(),
            },
          });
        }
      }}
    >
      Update
    </Button>
  );
}
