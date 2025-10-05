"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { set } from "mongoose";
import { Alert } from "@/components/ui/alert";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

function showUserFoundToast(router: any) {
  toast.error(
    <div>
      <div>Account already exists.</div>
    </div>,
    {
      duration: 5000,
      position: "top-center",
      className: "bg-red-600",
      style: { backgroundColor: "#dc2626", color: "#fff" },
    }
  );
}

export default function page() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { setIsAuthenticated } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      localStorage.setItem("token", data.token);
      setIsAuthenticated(true);

      router.push("/");
    } catch (err: any) {
      if (err.message === "User already exists") {
        setError("UF");
        console.log("user found error caught");
        showUserFoundToast(router);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen">
        <div className="border-2 border-black rounded-sm max-w-md m-3">
          <form onSubmit={handleSubmit}>
            <div className="border-b-2 border-black">
              <h1 className="text-center font-bold  p-3">Sign Up</h1>
            </div>
            <div className="flex flex-col gap-4 p-5">
              <div>
                <h1 className="text-sm">Name</h1>
                <Input
                  type="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
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
                {loading ? <Spinner /> : "Sign Up"}
              </Button>

              <p className="text-center text-sm">
                if you have an account{" "}
                <span>
                  <a href="/SignIn" className="text-blue-500">
                    click here
                  </a>
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
