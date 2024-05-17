import React from "react";
import withAuth from "@/components/withAuth/withAuth";
import Link from "next/link";

function MisEstadisticas() {
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
      <Link
        href={"/Hub"}
        className="absolute top-4 right-4 font-bold py-3 px-3 rounded"
        style={{ backgroundColor: "#729560" }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#abcd99")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#729560")}
      >
        <img src="/assets/hub.png" alt="Return to Hub" className="w-8 h-8" />
      </Link>
    </div>
  );
}

export default withAuth(MisEstadisticas);
