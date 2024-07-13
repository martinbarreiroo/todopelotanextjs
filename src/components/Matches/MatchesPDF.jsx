import React from "react";

function formatDate(dateString) {
  let date = new Date(dateString);
  let hours = date.getUTCHours().toString().padStart(2, "0"); // get UTC hours and pad with 0 if necessary
  let minutes = date.getUTCMinutes().toString().padStart(2, "0"); // get UTC minutes and pad with 0 if necessary
  let time = `${hours}:${minutes}`;
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
  const year = date.getFullYear();

  return `${day}/${month}/${year}  ${time}`;
}

const MatchesPDF = ({ matches }) => {
  return (
    <div className=" w-[550px] bg-[#729560] rounded-lg mt-5">
      {matches.length === 0 ? (
        <div className="p-10">
          <h2 className="text-3xl font-serif font-extrabold antialiased text-center animate-fadeIn">
            No matches found for this tournament
          </h2>
        </div>
      ) : (
        matches.map((match, index) => (
          <div
            key={match.id || index}
            className="p-7 border-b border-gray-200 transform transition duration-500 ease-in-out hover:scale-105 hover:bg-custom-green cursor-pointer animate-fadeIn flex justify-between"
          >
            <div>
              <h2 className="text-xl font-bold">{match.location}</h2>
              <p>{formatDate(match.date)}</p>
              <p>{match.description}</p>
              <div className="flex justify-end">
                <p>{match.type}</p>
              </div>
            </div>
            {match.result1 !== null && match.result2 !== null && (
              <div className="self-center">
                <p>
                  Result: {match.result1} - {match.result2}
                </p>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default MatchesPDF;
