import React, { useEffect, useState } from "react";
import Link from "next/link";
import withAuth from "@/components/withAuth/withAuth";
import { useRouter, router } from "next/router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SonnerDemo } from "@/components/ui/SonnerDemo";
import { DialogViewTeams } from "@/components/ui/DialogViewTeams";
import { DialogDeleteMatch } from "@/components/ui/DialogDeleteMatch";
import { DialogChangeMatch } from "@/components/ui/DialogChangeMatch";
import { DialogRescheduleMatch } from "@/components/ui/DialogRescheduleMatch";

function MatchPage() {
  const [match, setmatch] = useState([]);
  const [team1Score, setTeam1Score] = useState("");
  const [team2Score, setTeam2Score] = useState("");
  const [yellowCards, setYellowCards] = useState([]);
  const [redCards, setRedCards] = useState([]);
  const [goals, setGoals] = useState([]);
  const [assists, setAssists] = useState([]);
  const [team1Composition, setTeam1Composition] = useState([]);
  const [team2Composition, setTeam2Composition] = useState([]);
  const [team1Points, setTeam1Points] = useState(0);
  const [team2Points, setTeam2Points] = useState(0);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [tournamentAdminId, setTournamentAdminId] = useState("");
  const [adminId, setAdminId] = useState("");
  const [userId, setUserId] = useState("");
  const router = useRouter();
  const matchId = router.query.matchId;
  const tournamentId = router.query.tournamentId;
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [numberOfGoals, setNumberOfGoals] = useState("");
  const [numberOfAssists, setNumberOfAssists] = useState("");
  const [numberOfYellowCards, setNumberOfYellowCards] = useState("");
  const [numberOfRedCards, setNumberOfRedCards] = useState("");

  const allPlayers = [...team1Composition, ...team2Composition];

  const validateDate = (date) => {
    return date !== "";
  };

  const validateTime = (time) => {
    return time !== "";
  };

  const validateLocation = (location) => {
    return location !== "";
  };

  const validateDescription = (description) => {
    return description !== "";
  };

  const handleAddStats = () => {
    if (selectedPlayer !== "") {
      if (parseInt(numberOfGoals) > 0) {
        setGoals((prevGoals) => {
          const playerIndex = prevGoals.findIndex(
            (goal) => goal.player === selectedPlayer
          );
          if (playerIndex !== -1) {
            const newGoals = [...prevGoals];
            newGoals[playerIndex] = {
              player: selectedPlayer,
              stat: numberOfGoals,
            };
            return newGoals;
          } else {
            return [
              ...prevGoals,
              { player: selectedPlayer, stat: numberOfGoals },
            ];
          }
        });
      } else if (parseInt(numberOfGoals) === 0) {
        setGoals((prevGoals) =>
          prevGoals.filter((goal) => goal.player !== selectedPlayer)
        );
      }

      if (parseInt(numberOfAssists) > 0) {
        setAssists((prevAssists) => {
          const playerIndex = prevAssists.findIndex(
            (assist) => assist.player === selectedPlayer
          );
          if (playerIndex !== -1) {
            const newAssists = [...prevAssists];
            newAssists[playerIndex] = {
              player: selectedPlayer,
              stat: numberOfAssists,
            };
            return newAssists;
          } else {
            return [
              ...prevAssists,
              { player: selectedPlayer, stat: numberOfAssists },
            ];
          }
        });
      } else if (parseInt(numberOfAssists) === 0) {
        setAssists((prevAssists) =>
          prevAssists.filter((assist) => assist.player !== selectedPlayer)
        );
      }

      if (parseInt(numberOfYellowCards) > 0) {
        setYellowCards((prevCards) => {
          const playerIndex = prevCards.findIndex(
            (card) => card.player === selectedPlayer
          );
          if (playerIndex !== -1) {
            const newCards = [...prevCards];
            newCards[playerIndex] = {
              player: selectedPlayer,
              stat: numberOfYellowCards,
            };
            return newCards;
          } else {
            return [
              ...prevCards,
              { player: selectedPlayer, stat: numberOfYellowCards },
            ];
          }
        });
      } else if (parseInt(numberOfYellowCards) === 0) {
        setYellowCards((prevCards) =>
          prevCards.filter((card) => card.player !== selectedPlayer)
        );
      }

      if (parseInt(numberOfRedCards) > 0) {
        setRedCards((prevCards) => {
          const playerIndex = prevCards.findIndex(
            (card) => card.player === selectedPlayer
          );
          if (playerIndex !== -1) {
            const newCards = [...prevCards];
            newCards[playerIndex] = {
              player: selectedPlayer,
              stat: numberOfRedCards,
            };
            return newCards;
          } else {
            return [
              ...prevCards,
              { player: selectedPlayer, stat: numberOfRedCards },
            ];
          }
        });
      } else if (parseInt(numberOfRedCards) === 0) {
        setRedCards((prevCards) =>
          prevCards.filter((card) => card.player !== selectedPlayer)
        );
      }

      setSelectedPlayer("");
      setNumberOfGoals("");
      setNumberOfAssists("");
      setNumberOfYellowCards("");
      setNumberOfRedCards("");
    }
  };

  async function handleRescheduleMatch(matchId, userId){
  try {
    const token = localStorage.getItem("token");
    console.log(token);
    const response = await fetch(`http://localhost:8080/matches/rescheduleRequest/${matchId}/user/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,

      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

  } catch (error) {
    console.error('Failed to reschedule match:', error);
  }
};

  const handleUpdateMatch = async () => {
    const token = localStorage.getItem("token");
    const matchId = localStorage.getItem("matchId");
    let dateTimeString = `${date}T${time}:00.000Z`;
    if (
      !validateDate(date) ||
      !validateTime(time) ||
      !validateLocation(location) ||
      !validateDescription(description)
    ) {
      alert("Please fill in all fields correctly");
      return;
    } else {
      try {
        const response = await fetch(
          `http://localhost:8080/matches/update/${matchId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              date: dateTimeString,
              location: location,
              description: description,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update tournament");
        } else {
          router.reload();
          console.log("Tournament updated successfully");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    const fetchMatch = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8080/matches/get_match/${matchId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data.id);
        console.log(data);
        localStorage.setItem("matchId", data.id);
        if (data && data.tournament) {
          setTournamentAdminId(data.tournament.adminId);
          localStorage.setItem("tournamentAdminId", data.tournament.adminId);
        } else {
          console.error("Data or tournament is not defined");
        }

        setmatch(data);
        setTeam1Score(data.result1);
        setTeam2Score(data.result2);
        setYellowCards(data.yellowCards);
        setRedCards(data.redCards);
        setGoals(data.goals);
        setAssists(data.assists);
        setTeam1Composition(data.team1);
        setTeam2Composition(data.team2);
        let dateTime = new Date(data.date);

        let date = dateTime.toISOString().split("T")[0]; // Extracts the date
        let hours = dateTime.getUTCHours().toString().padStart(2, "0"); // get UTC hours and pad with 0 if necessary
        let minutes = dateTime.getUTCMinutes().toString().padStart(2, "0"); // get UTC minutes and pad with 0 if necessary
        let time = `${hours}:${minutes}`;

        setDate(date);
        setTime(time);
        setLocation(data.location);
        setDescription(data.description);
        setUserId(localStorage.getItem("userId"));
        setAdminId(localStorage.getItem("tournamentAdminId"));
      } else {
        console.error("Failed to fetch match");
      }
    };

    if (matchId) {
      fetchMatch();
    }
  }, [matchId]);

  const handleDeleteMatch = async () => {
    const token = localStorage.getItem("token");
    const matchId = localStorage.getItem("matchId");

    try {
      const response = await fetch(
        `http://localhost:8080/matches/delete/${matchId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete user");
      } else {
        localStorage.removeItem("matchId");
        router.push({
          pathname: "/Hub/MisTorneos/[tournamentId]/Manage/Matches",
          query: { tournamentId: tournamentId },
        });
        console.log("Tournament deleted successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen">
      <div
        className="absolute top-0 left-0 w-full h-[12.5%]"
        style={{ backgroundColor: "#729560" }}
      ></div>
      <Link href={"/Hub"}>
        <img
          src="/assets/logo.png"
          alt="Logo"
          className="w-24 h-24 flex justify-center mt-4 mb-10 absolute top-[10.5%] left-[50%] transform -translate-x-1/2 -translate-y-1/2"
        />
      </Link>
      <Link
        href={`/Hub/MisTorneos/${tournamentId}/Manage/Matches`}
        className="absolute top-4 right-4 font-bold py-3 px-3 rounded mt-4"
        style={{ backgroundColor: "#729560" }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#abcd99")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#729560")}
      >
        <img
          src="/assets/back-arrow.png"
          alt="Return to Tournaments"
          className="w-8 h-8"
        />
      </Link>
      <div className="flex justify-between items-center gap-5">
        <div className="flex flex-col items-center justify-center w-96 h-[500px] bg-custom-green rounded-md shadow-md mt-40 gap-3">
          <div className="text-black font-bold text-2xl"> Match Results </div>
          <div className="flex justify-between w-80">
            <div className="flex flex-col items-center w-1/2 font-bold">
              <label htmlFor="team1Score" className="mb-2 font-bold">
                Team 1 Score
              </label>
              <Input
                id="team1Score"
                className="w-full"
                type="number"
                min="0"
                value={team1Score}
                onChange={(e) => setTeam1Score(e.target.value)}
                placeholder="Score"
              />
            </div>
            <div className="flex flex-col items-center w-1/2 font-bold">
              <label htmlFor="team2Score" className="mb-2 font-bold">
                Team 2 Score
              </label>
              <Input
                id="team2Score"
                className="w-full ml-4"
                type="number"
                min="0"
                value={team2Score}
                onChange={(e) => setTeam2Score(e.target.value)}
                placeholder="Score"
              />
            </div>
          </div>

          <div className="text-black font-bold text-lg">
            {" "}
            Yellow Cards
            <Input
              className="w-80"
              type="text"
              value={yellowCards
                .map((card) => `${card.player}: ${card.stat} `)
                .join(", ")}
              placeholder="Yellow Cards"
            />
          </div>

          <div className="text-black font-bold text-lg">
            {" "}
            Red Cards
            <Input
              className="w-80"
              type="text"
              value={redCards
                .map((card) => `${card.player}: ${card.stat} `)
                .join(", ")}
              placeholder="Red Cards"
            />
          </div>

          <div className="text-black font-bold text-lg">
            {" "}
            Goals
            <Input
              className="w-80"
              type="text"
              value={goals
                .map((goal) => `${goal.player}: ${goal.stat} `)
                .join(", ")}
              placeholder="Goals"
            />
          </div>

          <div className="text-black font-bold text-lg">
            {" "}
            Assists
            <Input
              className="w-80"
              type="text"
              value={assists
                .map((assist) => `${assist.player}: ${assist.stat} `)
                .join(", ")}
              placeholder="Assists"
            />
          </div>
        </div>

        <div className="align-middle justify-center">
        {userId === adminId && (
          <>
          <div className="flex flex-col items-center justify-center w-96 h-[500px] bg-custom-green rounded-md shadow-md mt-40">
            <div className="text-black font-bold text-2xl mb-8">
              {" "}
              Player Stats Setter
            </div>
            <div className="flex flex-col items-center justify-center w-96 mt-3">
              <div className="flex flex-col items-center w-full font-bold">
                <div className="flex flex-col">
                  <select
                    className="mb-6 form-field text-black font-bold text-lg rounded h-10"
                    value={selectedPlayer}
                    onChange={(e) => setSelectedPlayer(e.target.value)}
                  >
                    <option value="">Select player</option>
                    {allPlayers.map((player) => (
                      <option key={player} value={player}>
                        {player}
                      </option>
                    ))}
                  </select>
                  <Input
                    className="text-black font-bold text-lg mb-6 w-80"
                    type="number"
                    min="0"
                    value={numberOfGoals}
                    placeholder="Number of goals"
                    onChange={(e) => setNumberOfGoals(e.target.value)}
                  />
                  <Input
                    className="text-black font-bold text-lg mb-6"
                    type="number"
                    min="0"
                    value={numberOfAssists}
                    placeholder="Number of assists"
                    onChange={(e) => setNumberOfAssists(e.target.value)}
                  />
                  <Input
                    className="text-black font-bold text-lg mb-6"
                    type="number"
                    min="0"
                    value={numberOfYellowCards}
                    placeholder="Number of Yellow Cards"
                    onChange={(e) => setNumberOfYellowCards(e.target.value)}
                  />
                  <Input
                    className="text-black font-bold text-lg mb-6"
                    type="number"
                    min="0"
                    value={numberOfRedCards}
                    placeholder="Number of Red Cards"
                    onChange={(e) => setNumberOfRedCards(e.target.value)}
                  />
                  <button
                    className="w-full py-2 bg-dark-green text-white form-button rounded hover:bg-custom-green3"
                    onClick={handleAddStats}
                  >
                    Add Stats
                  </button>
                </div>
              </div>
            </div>
          </div>
          </>
        )}
        </div>

        <div className="absolute top-40 left-10">
          <DialogViewTeams
            team1Composition={team1Composition}
            team2Composition={team2Composition}
          />
        </div>
      </div>

      <div>
        {userId != adminId && (
          <>
            <div className="absolute top-40 right-10">
              <DialogRescheduleMatch
                handleRescheduleMatch={handleRescheduleMatch}
                matchId={matchId}
                userId={userId}
              />
            </div>
          </>
        )}
      </div>

      <div>
        {userId === adminId && (
          <>
            <SonnerDemo
              team1Score={team1Score}
              team2Score={team2Score}
              yellowCards={yellowCards}
              redCards={redCards}
              goals={goals}
              assists={assists}
              team1Points={team1Points}
              team2Points={team2Points}
            >
              <Button className="w-80"></Button>
            </SonnerDemo>

            <div className="absolute top-[170px] left-56">
              <DialogChangeMatch
                date={date}
                setDate={setDate}
                time={time}
                setTime={setTime}
                location={location}
                setLocation={setLocation}
                description={description}
                setDescription={setDescription}
                handleUpdateMatch={handleUpdateMatch}
              />
            </div>
            <div className="absolute top-40 right-10">
              <DialogDeleteMatch handleDeleteMatch={handleDeleteMatch} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default withAuth(MatchPage);
