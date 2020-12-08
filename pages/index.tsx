import { useState } from "react";
import jwt from "jsonwebtoken";

export default function Home() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("You are not logged in");

  async function submitForm() {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((d) => d.json());

    const token = res?.token;

    if (token) {
      const json = jwt.decode(token) as { [key: string]: string };
      setMessage(
        `Welcome ${json.username}. You are ${
          json.admin ? "an admin" : "not an admin"
        }.`
      );
    } else {
      setMessage("Something went wrong");
    }
  }
  return (
    <div>
      <h1>{message}</h1>
      <form action="/api/login" method="POST">
        <input
          type="text"
          name="username"
          onChange={(e) => setUsername(e?.target.value)}
          value={username}
        />
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e?.target.value)}
          value={password}
        />
        <input type="button" value="login" onClick={submitForm} />
      </form>
    </div>
  );
}
