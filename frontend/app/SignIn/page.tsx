"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { set } from "mongoose";

export default function page() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:5000/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      localStorage.setItem("token", data.token);
      router.push("/");
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="border-2 border-black rounded-sm max-w-md">
        <form onSubmit={handleSubmit}>
          <div className="border-b-2 border-black">
            <h1 className="text-center font-bold  p-3">Sign In</h1>
          </div>
          <div className="flex flex-col gap-4 p-5">
            <div>
              <h1 className="text-sm">Email ID</h1>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <h1 className="text-sm">Password</h1>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="bg-black text-white"
              disabled={loading}
            >
              {loading ? <Spinner /> : "Sign In"}
            </Button>

            <p className="text-center text-sm">
              if you dont have an account{" "}
              <span>
                <a href="/SignUp" className="text-blue-500">
                  click here
                </a>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
