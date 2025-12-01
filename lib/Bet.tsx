import { useEffect, useState } from "react";
import type { Bet } from "@/types/data";

export default function BetComponent(props: {
  uuid: string;
  bet: Bet;
  handleChange: any;
}) {
  const [better, setBetter] = useState(props.bet.better);
  const [amount, setAmount] = useState(props.bet.amount);
  const [date, setDate] = useState(props.bet.date);

  useEffect(() => {
    setBetter(props.bet.better);
  }, [props.bet.better]);

  return (
    <div>
      <input
        type="text"
        value={better}
        onChange={(e) => {
          setBetter(e.target.value);
          props.handleChange(props.uuid, {
            better: e.target.value,
            amount,
            date,
          });
        }}
      />
      <input
        type="text"
        value={amount}
        onChange={(e) => {
          setAmount(e.target.value);
          props.handleChange(props.uuid, {
            better,
            amount: e.target.value,
            date,
          });
        }}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => {
          setDate(e.target.value);
          props.handleChange(props.uuid, {
            better,
            amount,
            date: e.target.value,
          });
        }}
      />
      {/* <button
        onClick={() =>
          setIsUpdating((prev) => {
            props.handleChange(props.uuid, { better, amount, date });
            return !prev;
          })
        }
      >
        {isUpdating ? "Finish updating" : "Update bet"}
      </button> */}
    </div>
  );
}
