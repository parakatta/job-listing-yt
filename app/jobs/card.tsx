"use client";

import deleteJob from "@/actions/delete-job";
import SubmitButton from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

type Card = {
  id: string;
  title: string;
  companyName: string;
  location: string;
  salary: string;
  type: string;
  desc: string;
};

export default function Card({
  title,
  id,
  companyName,
  location,
  salary,
  type,
  desc,
}: Card) {
  const router = useRouter();

  return (
    <div className="w-full min-h-[240px] flex flex-col p-4 border-t-2 gap-3">
      <div>
        <div className="pt-6 ml-auto flex justify-between gap-4">
          <h1 className="text-2xl font-semibold">{title}</h1>
          <div className="flex flex-wrap gap-2">
            <form
              action={async (formData) => {
                await deleteJob(formData);
                toast.success("Job deleted successfully!");
              }}
            >
              <input type="hidden" name="jobId" value={id} id="jobId" />
              <SubmitButton label="Delete" variant="outline" />
            </form>
            <Button onClick={() => router.push(`/jobs/${id}`)}>Apply</Button>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-neutral-500 text-[15px]">
          <span>{companyName}</span>
          <span>{location}</span>
        </div>
      </div>

      <p className="text-md">{desc}</p>

      <div className="my-5 flex flex-wrap items-center gap-5">
        <span className="text-[15px] rounded-[500px] border-black border-2 px-4 py-2">
          $ {salary}
        </span>
        <span className="text-[15px] rounded-[500px]  border-black border-2 px-4 py-2 ">
          {type}
        </span>
      </div>
    </div>
  );
}
