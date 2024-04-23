import { toast } from "sonner";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function SonnerDemo(props) {
  const today = new Date();
  const dateString = today.toLocaleDateString();
  const { result, yellowCards, redCards, goals, assists } = props;
  const [match, setmatch] = useState([]);

  const updateMatch = async (result, yellowCards, redCards, goals, assists) => {
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
          result: result,
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
          result,
          yellowCards,
          redCards,
          goals,
          assists
        );

        if (updateSuccessful) {
          toast("Updated succesfully", {
            description: dateString,
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
