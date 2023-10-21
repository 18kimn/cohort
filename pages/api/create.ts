import { Card } from "@/types/data";
import db from "lib/db";
import type { NextApiRequest, NextApiResponse } from "next";
import type { RunResult } from "better-sqlite3";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RunResult>
) {
  if (req.method === "POST") {
    const result = db
      .prepare(
        `INSERT INTO cards(creationTime, content, x, y)
      VALUES($creationTime, $content, $x, $y)
      `
      )
      .run(req.body);

    res.status(200).json(result);
    return;
  }
  res.status(400);
}
