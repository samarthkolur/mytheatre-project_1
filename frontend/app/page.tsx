"use client";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/ui/navbar";
import { Hero } from "@/components/ui/hero";
import { Auth } from "mongodb";

export default function page() {
  const isAuthenticated = localStorage.getItem("isAuth") === "true";
  return (
    <div>
      <Navbar />
      <Hero />
    </div>
  );
}
