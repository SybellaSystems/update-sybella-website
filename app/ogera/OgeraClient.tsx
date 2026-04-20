// app/ogera/OgeraClient.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function OgeraClient() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Ogera loaded");
  }, []);

  return <div>Ogera UI</div>;
}