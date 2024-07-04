import React from "react";
import { useState, useEffect } from "react";
import styles from "./Hub.module.css";
import withAuth from "../withAuth/withAuth";
import Link from "next/link";

export const Hub = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUsername = localStorage.getItem("username");
      if (storedUsername) {
        setUsername(storedUsername);
      }
    }
  }, []);

  // Inside your Hub component
  useEffect(() => {
    const handlePopstate = () => {
      localStorage.removeItem("token");
    };

    window.addEventListener("popstate", handlePopstate);

    // Cleanup function
    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
  };
  return (
    <div className={styles.hub_container}>
      <div
        className="absolute top-0 left-0 w-full h-[12.5%]"
        style={{ backgroundColor: "#729560" }}
      ></div>
      <img
        src="/assets/logo.png"
        alt="Logo"
        className="w-24 h-24 flex justify-center mt-4 mb-10 absolute top-[10.5%] left-[50%] transform -translate-x-1/2 -translate-y-1/2"
      />
      <Link href="/">
        <div className={styles.logout_container}>
          <button className={styles.logout_button} onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </Link>

      <span className="absolute top-4 right-96 p-2 underline text-black font-extrabold">
        Logged in as {username}
      </span>

      <div className={styles.home_menu}>
        <Link href={"/Hub/MisTorneos"} className={styles.home_button}>
          Tournaments
          <img src="/assets/trofeo.png" alt="trofeo" />
        </Link>

        <Link href={"/Hub/MisEstadisticas"} className={styles.home_button}>
          Stats
          <img src="/assets/estadistica.png" alt="estadistica" />
        </Link>

        <Link href={"/Hub/CrearTorneo"} className={styles.home_button}>
          Create
          <img src="/assets/plus.png" alt="trofeo" />
        </Link>

        <Link href={"/Hub/Profile"} className={styles.home_button}>
          Profile
          <img src="/assets/person.png" alt="name" />
        </Link>
      </div>
    </div>
  );
};

export default withAuth(Hub);
