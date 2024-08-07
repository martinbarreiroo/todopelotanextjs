import React, { useEffect, useState } from "react";
import withAuth from "@/components/withAuth/withAuth";
import Link from "next/link";

function MyInvitations() {
  const [invitations, setInvitations] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUsername = localStorage.getItem("username");
      if (storedUsername) {
        setUsername(storedUsername);
      }
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 100); // Delay of 3 seconds

    return () => clearTimeout(timer); // Clean up on component unmount
  }, []);

  useEffect(() => {
    const fetchInvitations = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const response = await fetch(
        `http://localhost:8080/invitations/get-invitations/${userId}`,
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
        setInvitations(data);
      } else {
        console.error("Failed to fetch invitations");
      }
    };

    fetchInvitations();
  }, []);

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
          className="w-24 h-24 flex justify-center mt-4 mb-10 absolute top-[10.5%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-10"
        />
      </Link>

      <span className="absolute top-4 right-96 p-2 underline text-black font-extrabold">
        Logged in as {username}
      </span>

      <Link
        href={"/Hub/MisTorneos"}
        className="absolute top-4 right-4 font-bold py-3 px-3 rounded"
        style={{ backgroundColor: "#729560" }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#abcd99")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#729560")}
      >
        <img
          src="/assets/back-arrow.png"
          alt="Return to My Tournaments"
          className="w-8 h-8"
        />
      </Link>
      <div className="relative flex flex-col items-center justify-center h-screen ">
        <div className="max-h-[400px] w-[550px] overflow-y-scroll overflow-hidden bg-[#729560] rounded-lg mt-5">
          {invitations.length === 0 && showMessage ? (
            <div className="p-10">
              <h2 className="text-3xl font-serif font-extrabold antialiased text-center animate-fadeIn">
                No invitations found
              </h2>
            </div>
          ) : (
            invitations.map((invitation, index) => (
              <div
                key={invitation.id || index}
                className="p-7 border-b border-gray-200 transform transition duration-500 ease-in-out hover:scale-105 hover:bg-custom-green cursor-pointer animate-fadeIn"
              >
                <h2 className="text-xl font-bold items-center justify-center text-center">
                  {invitation.senderName.username} has invited you to '
                  {invitation.tournament.name}'
                </h2>

                <div className="flex justify-around mt-4">
                  <button
                    className="bg-custom-green3 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={async () => {
                      const response = await fetch(
                        `http://localhost:8080/invitations/accept-invitation/${invitation.id}`,
                        {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                          },
                        }
                      );
                      if (response.ok) {
                        window.location.reload(); // Reload the page if the request was successful
                      } else {
                        console.error("Failed to accept invitation");
                      }
                    }}
                  >
                    Accept
                  </button>
                  <button
                    className="bg-rejection-red hover:bg-red-950 text-white font-bold py-2 px-4 rounded"
                    onClick={async () => {
                      const response = await fetch(
                        `http://localhost:8080/invitations/reject-invitation/${invitation.id}`,
                        {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                          },
                        }
                      );
                      if (response.ok) {
                        window.location.reload(); // Reload the page if the request was successful
                      } else {
                        console.error("Failed to accept invitation");
                      }
                    }}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default withAuth(MyInvitations);
