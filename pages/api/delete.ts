import type { Card } from "@/types/data";
import db from "lib/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Card[]>
) {
  if (!req.body?.id) {
    res.status(400);
    return;
  }
  if (req.method === "POST") {
    const result = db
      .prepare(
        `DELETE FROM cards
        WHERE id = $id
      `
      )
      .run({ id: req.body.id });
    res.status(200).json([]);
    return;
  }
  res.status(400);
}
