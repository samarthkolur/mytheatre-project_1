"use client";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
export default function page() {
  const [loading1, setLoading1] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const handleSignin = () => {
    setLoading1(true);
    setTimeout(() => {
      setLoading1(false);
      router.push("/signin");
    }, 1000);
  };
  const handleSignup = () => {
    setLoading(true);
    setTimeout(() => {
      router.push("/signin");
    }, 1000);
  };
  return (
    <div className="border-2 border-black rounded-sm m-10">
      <div className="flex justify-between p-5 border-b-2 border-black items-center">
        <h1 className="font-bold">My Theatre</h1>
        <div className="flex gap-5">
          <Button onClick={handleSignin} disabled={loading1}>
            {loading1 ? <Spinner /> : "Sign In"}
          </Button>
          <Button
            variant="outline"
            className="border-black border-1"
            onClick={handleSignup}
            disabled={loading}
          >
            {loading ? <Spinner /> : "Sign Up"}
          </Button>
        </div>
      </div>
      <div className="p-5">
        <h2>Ticket booking platform in a nutshell</h2>
      </div>
    </div>
  );
}
