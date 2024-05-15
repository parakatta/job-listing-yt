import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav>
      <div className="flex justify-between items-center p-6 container border-b-[1px] mb-4">
        <Link href="/" className="text-[25px] font-bold">
          Sappy
        </Link>

        <ul className="flex gap-4 text-[1rem] text-md">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/create-job">Create a job</Link>
          </li>
          <li>
            <Link href="/data">Data</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
