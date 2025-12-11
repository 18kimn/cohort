import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
export const BETS_LOCATION = "bets.json";
import type { Bet } from "@/types/data";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Bet[]>
) {
  if (req.method === "GET") {
    const bets = fs.readFileSync("bets.json", "utf-8");
    res.status(200).json(JSON.parse(bets));
    return;
  }

  if (req.method === "POST") {
    fs.writeFileSync("bets.json", JSON.stringify(req.body));
    const bets = fs.readFileSync("bets.json", "utf-8");
    res.status(200).json(JSON.parse(bets));
    return;
  }
  res.status(400).end();
}
