import type { NextApiRequest, NextApiResponse } from "next";
import { formSchema } from "./schema";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "POST") {
      res.status(405).end();
      return;
    }

    console.log(req.body);

    const input = formSchema.safeParse(req.body);

    if (!input.success) {
      res.status(400).end();
      return;
    }

    const newData = await fetch("http://192.168.100.120:3001/claims", {
      method: "POST",
      body: JSON.stringify(input.data),
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGl0eUlkIjoxfQ.kd8mh1yBNMRcF4kQC7DOHI8_yYBb_0DcHq5uqpk2V3s",
      },
    });

    res.status(201).json("Created Success!");
  } catch (e: any) {
    res.status(500).json({ msg: e.message });
  }
};
