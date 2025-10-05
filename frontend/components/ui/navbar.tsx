"use client";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const [loading1, setLoading1] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/SignIn"; // redirect to sign-in page
  };

  const handleSignin = () => {
    setLoading1(true);
    setTimeout(() => {
      setLoading1(false);
      router.push("/SignIn");
    }, 1000);
  };
  const handleSignup = () => {
    setLoading(true);
    setTimeout(() => {
      router.push("/SignUp");
    }, 1000);
  };
  return isAuthenticated ? (
    <div className="flex justify-between p-5 border-2 rounded-sm m-10 border-black items-center">
      <h1 className="font-bold">My Theatre</h1>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage src=""></AvatarImage>
            <AvatarFallback>S</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ) : (
    <div className="flex justify-between p-5 border-2 rounded-sm m-10 border-black items-center">
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
  );
}
