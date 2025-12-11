import { useEffect, useState } from "react";
import BetComponent from "../../lib/Bet";
import type { Bet } from "@/types/data";

export default function BetPage() {
  const [bets, setBets] = useState({} as { [key: string]: Bet });
  const [updateStatus, setUpdateStatus] = useState("" as string);

  useEffect(() => {
    fetch("/api/gsrabets")
      .then((res) => res.json())
      .then((res) => setBets(res));
  }, []);

  const updateBackend = () => {
    const filtered = Object.fromEntries(
      Object.entries(bets).filter(([_, obj]) => obj.better)
    );
    fetch("/api/gsrabets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(filtered),
    })
      .then((res) => res.json())
      .then((newBets) => {
        setUpdateStatus("updated successfully");
        console.log(newBets);
        setBets(newBets);
      })
      .catch((err) => setUpdateStatus(err));
  };

  const handleChange = (key, newValue: Bet) => {
    setBets((prev) => ({ ...prev, [key]: newValue }));
  };

  return (
    <div>
      PLACE A BET (BY THE END OF tHursDAY) FOR HOW MANY CARDS THE GSRA CAMPAIGN
      WILL HAVE BY THE END OF FRIDAY DEC 12!!
      {Object.entries(bets).map(([key, value]) => (
        <BetComponent uuid={key} bet={value} handleChange={handleChange} />
      ))}
      <div>
        <button
          onClick={() =>
            setBets((prev) => ({ ...prev, [self.crypto.randomUUID()]: {} }))
          }
        >
          create new bet
        </button>
        <button onClick={updateBackend}>save bets</button>
        <div>{updateStatus}</div>
        <div>(to delete a bet just remove the name and hit save)</div>
      </div>
    </div>
  );
}
