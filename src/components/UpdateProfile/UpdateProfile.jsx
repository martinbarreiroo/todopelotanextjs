import React from "react";
import withAuth from "@/components/withAuth/withAuth";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { DialogChangePassword } from "../ui/DialogChangePassword";
import { Button } from "../ui/button";

function UpdateProfile() {
  const positions = [
    {
      id: "Selct",
      name: "Select a position",
    },
    {
      id: "PO",
      name: "PO",
    },
    {
      id: "DFC",
      name: "DFC",
    },
    {
      id: "DFI",
      name: "DFI",
    },
    {
      id: "DFD",
      name: "DFD",
    },
    {
      id: "MC",
      name: "MC",
    },
    {
      id: "MCO",
      name: "MCO",
    },
    {
      id: "MCD",
      name: "MCD",
    },
    {
      id: "EI",
      name: "EI",
    },
    {
      id: "ED",
      name: "ED",
    },
    {
      id: "DC",
      name: "DC",
    },
  ];

  let actualUsername = "";
  let actualDescription = "";
  let actualPosition = "";
  if (typeof window !== "undefined") {
    actualUsername = localStorage.getItem("username");
    actualDescription = localStorage.getItem("description");
    actualPosition = localStorage.getItem("position");
  }
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(actualUsername);
  const [position, setPosition] = useState(actualPosition);
  const [description, setDescription] = useState(actualDescription);
  const router = useRouter();

  const handleUpdatePassword = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const response = await fetch(
      "http://localhost:8080/profile/update-password",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          password,
        }),
      }
    );
    if (!response.ok) {
      // Handle error
      console.error("Failed to update profile");
    } else {
      // Handle success

      console.log("Profile updated successfully");
      const data = await response.json();
      const updatedToken = data.token;
      localStorage.setItem("token", updatedToken);
      router.push("/Hub/Profile");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !position || !description) {
      alert("All fields must be filled out");
      return;
    }

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    console.log(userId);
    const response = await fetch("http://localhost:8080/profile/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId,
        username,
        position,
        description,
      }),
    });

    if (!response.ok) {
      // Handle error
      console.error("Failed to update profile");
    } else {
      // Handle success

      console.log("Profile updated successfully");
      const data = await response.json();
      const updatedToken = data.token;
      localStorage.setItem("token", updatedToken);
      localStorage.removeItem("username");
      localStorage.setItem("username", username);
      router.push("/Hub/Profile");
    }
  };
  return (
    <div className="relative flex flex-col items-center justify-center h-screen space-y-4">
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
      <form onSubmit={handleSubmit} className="space-y-10">
        <div
          className="w-80 h-18 flex items-center justify-center mx-auto mt-32 mb-50 p-6 relative rounded"
          style={{ backgroundColor: "#d1d1d1" }}
        >
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full h-full bg-transparent outline-none"
          />
        </div>

        <div
          className="w-80 h-18 flex items-center justify-center mx-auto mt-32 mb-50 p-6 relative rounded"
          style={{ backgroundColor: "#d1d1d1" }}
        >
          <select
            className="w-full h-90% bg-transparent outline-none"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          >
            {positions.map((position) => (
              <option key={position.id} value={position.id}>
                {position.name}
              </option>
            ))}
          </select>
        </div>
        <div
          className="w-80 h-18 flex items-center justify-center mx-auto mt-32 mb-50 p-6 relative rounded"
          style={{ backgroundColor: "#d1d1d1" }}
        >
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-90% bg-transparent outline-none"
          />
        </div>
        <div className="flex flex-col items-center mt-4 gap-5">
          <Button
            className="bg-dark-green hover:bg-custom-green"
            type="submit"
            onClick={handleSubmit}
          >
            Update Profile
          </Button>
          <DialogChangePassword
            password={password}
            setPassword={setPassword}
            handleUpdatePassword={handleUpdatePassword}
            className="mt-2"
          />
        </div>
      </form>
      <Link
        href={"/Hub/Profile"}
        className="absolute top-4 right-4 font-bold py-4 px-4 rounded"
        style={{ backgroundColor: "#729560" }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#abcd99")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#729560")}
      >
        <img
          src="/assets/back-arrow.png"
          alt="Return to Profile"
          className="w-8 h-8"
        />
      </Link>
    </div>
  );
}

export default withAuth(UpdateProfile);
