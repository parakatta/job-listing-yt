import React from "react";
import ClientJob from "./client-job";
import { prisma } from "@/lib/prisma";

export default async function page() {
  const jobs = await prisma.jobListing.findMany({});

  return (
    <div className="w-[90%] mx-auto">
      <div className="my-5 flex flex-col items-start container gap-4">
        <h3 className=" inline-flex text-[15px] rounded-[500px] border-black border-2 px-4 py-2 ">
          We're hiring!
        </h3>
        <h1 className="font-bold text-5xl py-4">Be part of our mission</h1>
        <p className="font-light text-lg sm:text-2xl dark-primary">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos
          reiciendis nihil consectetur veritatis itaque ipsum fugit praesentium
          earum sit, commodi minima non excepturi iure voluptates temporibus
          accusamus soluta ea sint?
        </p>
      </div>

      <div>
        <ClientJob jobs={jobs} />
      </div>
    </div>
  );
}
