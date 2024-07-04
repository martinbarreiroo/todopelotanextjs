import React from "react";
import { useState, useEffect } from "react";
import withAuth from "@/components/withAuth/withAuth";
import { useRouter } from "next/router";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const types = [
  {
    id: "Selct",
    name: "Select a type",
  },
  {
    id: "F5",
    name: "F5",
  },
  {
    id: "F8",
    name: "F8",
  },
  {
    id: "F11",
    name: "F11",
  },
];

async function create(name, players, type, description, router) {
  try {
    const token = localStorage.getItem("token");
    const adminId = localStorage.getItem("userId");
    const response = await fetch(`http://localhost:8080/tournaments/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, players, type, description, adminId }),
    });

    if (response.ok) {
      router.push("/Hub");
    }
  } catch (error) {
    console.error(error);
  }
}

function CrearTorneo() {
  const [name, setName] = useState("");
  const [players, setPlayers] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const validateName = (name) => {
    return name !== "";
  };

  const validatePlayers = (players) => {
    return players !== "" && !isNaN(players);
  };

  const validateType = (type) => {
    return type !== "";
  };

  const validateDescription = (description) => {
    return description !== "";
  };

  const handleCreateTournament = () => {
    if (
      !validateName(name) ||
      !validatePlayers(players) ||
      !validateType(type) ||
      !validateDescription(description)
    ) {
      toast.error("Please fill all the fields");
      return;
    } else {
      create(name, players, type, description, router);
      toast.success("Tournament created successfully");
    }
  };

  const [username, setUsername] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUsername = localStorage.getItem("username");
      if (storedUsername) {
        setUsername(storedUsername);
      }
    }
  }, []);

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
        href={"/Hub"}
        className="absolute top-4 right-4 font-bold py-3 px-3 rounded mt-4"
        style={{ backgroundColor: "#729560" }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#abcd99")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#729560")}
      >
        <img src="/assets/hub.png" alt="Return to Hub" className="w-8 h-8" />
      </Link>
      <span className="absolute top-10 right-40 p-2 underline text-black font-extrabold">
        Logged in as {username}
      </span>

      <div className="w-full flex flex-col items-center justify-between mt-24">
        <h1 className="text-2xl font-bold">Create a Tournament</h1>
        <div className="w-80 h-18 flex items-center justify-center mx-auto mt-5 mb-5 p-6 relative rounded transition-colors duration-500 ease-in-out bg-input-gray hover:bg-custom-gray transform hover:scale-105">
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            className="w-full h-full bg-transparent outline-none"
          />
        </div>
        <div className="w-80 h-18 flex items-center justify-center mx-auto mt-5 mb-5 p-6 relative rounded transition-colors duration-500 ease-in-out bg-input-gray hover:bg-custom-gray hover:scale-105">
          <input
            type="number"
            min={0}
            placeholder="Number of Players"
            onChange={(e) => setPlayers(e.target.value)}
            className="w-full h-full bg-transparent outline-none"
          />
        </div>
        <div className="w-80 h-18 flex items-center justify-center mx-auto mt-5 mb-5 p-6 relative rounded transition-colors duration-500 ease-in-out bg-input-gray hover:bg-custom-gray hover:scale-105">
          <select
            className="w-full h-90% bg-transparent outline-none"
            onChange={(e) => setType(e.target.value)}
          >
            {types.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-80 h-18 flex items-center justify-center mx-auto mt-5 mb-5 p-6 relative rounded transition-colors duration-500 ease-in-out bg-input-gray hover:bg-custom-gray hover:scale-105">
          <input
            type="text"
            placeholder="Brief description"
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-90% bg-transparent outline-none"
          />
        </div>
        <button
          className="text-white font-bold py-2 px-4 rounded"
          onClick={() => handleCreateTournament()}
          style={{ backgroundColor: "#729560" }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#abcd99")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#729560")
          }
        >
          Create
        </button>
      </div>
    </div>
  );
}

export default withAuth(CrearTorneo);
