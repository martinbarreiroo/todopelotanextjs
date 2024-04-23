import React, { useEffect, useState } from "react";
import Link from "next/link";
import withAuth from "@/components/withAuth/withAuth";
import { useRouter, router } from "next/router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SonnerDemo } from "@/components/ui/SonnerDemo";

function MatchPage() {
  const [match, setmatch] = useState([]);
  const [result, setResult] = useState(null);
  const [yellowCards, setYellowCards] = useState(null);
  const [redCards, setRedCards] = useState(null);
  const [goals, setGoals] = useState(null);
  const [assists, setAssists] = useState(null);
  const router = useRouter();
  const matchId = router.query.matchId;
  const tournamentId = router.query.tournamentId;

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
        setmatch(data);
      } else {
        console.error("Failed to fetch match");
      }
    };

    if (matchId) {
      fetchMatch();
    }
  }, [matchId]);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen">
      <div
        className="absolute top-0 left-0 w-full h-[12.5%]"
        style={{ backgroundColor: "#729560" }}
      ></div>
      <img
        src="/assets/logo.png"
        alt="Logo"
        className="w-24 h-24 flex justify-center mt-4 mb-10 absolute top-[10.5%] left-[50%] transform -translate-x-1/2 -translate-y-1/2"
      />
      <Link
        href={`/Hub/MisTorneos/${tournamentId}/Matches`}
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
      <div className="flex flex-col items-center justify-center w-96 h-96 bg-custom-green rounded-md shadow-md space-y-10">
        <Input
          className="w-80"
          type="text"
          value={result}
          onChange={(e) => setResult(e.target.value)}
          placeholder="Result"
        />
        <Input
          className="w-80"
          type="number"
          value={yellowCards}
          onChange={(e) => setYellowCards(e.target.value)}
          placeholder="Yellow Cards"
        />
        <Input
          className="w-80"
          type="number"
          value={redCards}
          onChange={(e) => setRedCards(e.target.value)}
          placeholder="Red Cards"
        />
        <Input
          className="w-80"
          type="number"
          value={goals}
          onChange={(e) => setGoals(e.target.value)}
          placeholder="Goals"
        />
        <Input
          className="w-80"
          type="number"
          value={assists}
          onChange={(e) => setAssists(e.target.value)}
          placeholder="Assists"
        />
      </div>

      <SonnerDemo
       result={result} 
       yellowCards={yellowCards} 
       redCards={redCards} 
       goals={goals} 
       assists={assists}
      >
        <Button
          className="w-80"
        >
          Update Match
        </Button>
      </SonnerDemo>
    </div>
  );
}

export default withAuth(MatchPage);
