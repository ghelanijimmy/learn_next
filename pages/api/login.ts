// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const KEY = "kjasdfkh2897yi7ysdhf";

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (!req?.body) {
    res.statusCode = 404;
    res.end("Error");
    return;
  }

  const { username, password } = req?.body;

  res.statusCode = 200;

  res.json({
    token: jwt.sign(
      {
        username,
        admin: username === "admin" && password === "admin",
      },
      KEY
    ),
  });
};
