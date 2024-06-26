import { toast } from "sonner";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function SonnerDemo(props) {
  const today = new Date();
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const dateString = today.toLocaleDateString(undefined, options);
  const timeString = today.toLocaleTimeString();
  const { team1Score, team2Score, yellowCards, redCards, goals, assists, team1Points, team2Points } = props;
  const [match, setmatch] = useState([]);

  const updateMatch = async (team1Score, team2Score, yellowCards, redCards, goals, assists, team1Points, team2Points) => {
    try {
      const token = localStorage.getItem("token");
      const matchId = localStorage.getItem("matchId");
      console.log(matchId);
      // Calculate points based on scores
      let team1Points = 0;
      let team2Points = 0;
      if (team1Score > team2Score) {
        team1Points = 3; // team 1 wins
      } else if (team1Score < team2Score) {
        team2Points = 3; // team 2 wins
      } else {
        team1Points = 1; // tie
        team2Points = 1; // tie
      }
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
          team1Points: team1Points,
          team2Points: team2Points,
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
          assists,
          team1Points,
          team2Points
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
