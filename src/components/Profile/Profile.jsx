import React, { useEffect, useState } from "react";
import withAuth from "@/components/withAuth/withAuth";
import Link from "next/link";
import { DialogDeleteUser } from "@/components/ui/DialogDeleteUser";

function Profile() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    description: "",
    position: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      console.log(userId);
      const response = await fetch(
        `http://localhost:8080/profile/get/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const user = await response.json();
        setUser(user);
        localStorage.setItem("position", user.position);
        localStorage.setItem("description", user.description);
      } else {
        console.error("Failed to fetch user");
      }
    };

    fetchUser();
  }, []);

  const handleDeleteUser = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    try {
      const response = await fetch(
        `http://localhost:8080/profile/delete/${userId}`,
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
        window.location.href = "/";
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("userId");
        console.log("User deleted successfully");
      }
    } catch (error) {
      console.error(error);
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
        className="absolute top-4 right-4 font-bold py-3 px-3 mt-4 rounded"
        style={{ backgroundColor: "#729560" }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#abcd99")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#729560")}
      >
        <img src="/assets/hub.png" alt="Return to Hub" className="w-8 h-8" />
      </Link>
      <span className="absolute top-10 right-40 p-2 underline text-black font-extrabold">
        Logged in as {username}
      </span>
      <div className="w-full max-w-md p-4 bg-custom-green rounded mt-9 shadow-md animate-fadeIn font-bold">
        User:
        <h1 className="text-2xl font-bold border-b mt-4 mb-4">
          {user.username}
        </h1>
        Email:
        <p className="text-gray-700 border-b mt-4 mb-4">{user.email}</p>
        Position:
        <p className="text-gray-700 border-b mt-4 mb-4">{user.position}</p>
        Description:
        <p className="text-gray-700 border-b mt-4 mb-4">{user.description}</p>
      </div>
      <Link
        href={"/Hub/Profile/UpdateProfile"}
        className="font-bold py-3 px-3 rounded mt-9 animate-fadeIn"
        style={{ backgroundColor: "#729560" }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#abcd99")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#729560")}
      >
        Update your Profile
      </Link>

      <div>
        <div className="absolute top-40 right-10">
          <DialogDeleteUser handleDeleteUser={handleDeleteUser} />
        </div>
      </div>
    </div>
  );
}

export default withAuth(Profile);
