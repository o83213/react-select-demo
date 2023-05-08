// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

interface Option {
  value: string;
  label: string;
}

const options: Array<Option> = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<Option> | Option>
) {
  if (req.method === "GET") {
    res.status(200).json(options);
  }
  if (req.method === "POST") {
    const { value, label } = req.body;
    const newOption: Option = { value, label };
    options.push(newOption);
    res.status(200).json(newOption);
  }
}
