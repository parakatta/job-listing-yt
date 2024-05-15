"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import InputWithLabel from "../../input-job";
import SubmitButton from "@/components/submit-button";
import { toast } from "react-hot-toast";
import { redirect } from "next/navigation";
import sendData from "@/actions/send-data";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { getJobById } from "@/actions/get-job-by-id";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  fileUpload: "",
};

export default function page() {
  const router = useRouter();
  const [state, setState] = useState({ ...initialState });
  const [id, setId] = useState("");
  const [jobListing, setJobListing] = useState<any>(null);

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setState({ ...state, [event.target.name]: event.target.value });
  }

  useEffect(() => {
    const fetchJobListing = async () => {
      try {
        const pathParts = window.location.pathname.split("/");
        const jobId = pathParts[pathParts.indexOf("jobs") + 1];
        setId(jobId);

        const jobListing = await getJobById(jobId);
        setJobListing(jobListing);
        console.log(jobListing?.title, jobListing?.companyName);
      } catch (error: any) {
        console.error(error.message);
      }
    };

    fetchJobListing();
  }, [router]);
  return (
    <div className="w-[90%] md:w-[40%] mx-auto">
      <div className="p-5 my-8">
        <h1 className="text-2xl font-semibold">{jobListing?.title}</h1>
        <p className="text-xl text-slate-700">{jobListing?.companyName}</p>
      </div>
      <form
        action={async (formData) => {
          console.log(formData);
          formData.append("jobId", `${jobListing.id}`);
          formData.append("jobTitle", `${jobListing.title}`);
          formData.append("companyName", `${jobListing.companyName}`);
          console.log(formData);

          await sendData(formData);
          toast.success("Application Submitted");
          redirect("/jobs");
        }}
        className="container flex flex-col gap-8 p-5 my-[50px]"
      >
        <div className="mb-4">
          <label htmlFor="firstName" className="block font-semibold mb-1">
            First Name <span className="text-red-500">*</span>
          </label>
          <Input
            required
            type="text"
            id="firstName"
            placeholder="firstName"
            onChange={onChange}
            name="firstName"
            pattern="[a-zA-Z]+"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="lastName" className="block font-semibold mb-1">
            Last Name <span className="text-red-500">*</span>
          </label>
          <Input
            required
            type="text"
            id="lastName"
            placeholder="lastName"
            name="lastName"
            onChange={onChange}
            pattern="[a-zA-Z]+"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block font-semibold mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <Input
            required
            type="email"
            id="email"
            placeholder="email"
            onChange={onChange}
            name="email"
            pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block font-semibold mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <Input
            required
            type="tel"
            id="phoneNumber"
            placeholder="phoneNumber"
            onChange={onChange}
            name="phoneNumber"
            maxLength={10}
            pattern="^\d{10}$"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="fileUpload" className="block font-semibold mb-1">
            Attach Resume <span className="text-red-500">*</span>
          </label>
          <Input
            required
            type="file"
            id="fileUpload"
            placeholder="fileUpload"
            onChange={onChange}
            name="fileUpload"
          />
        </div>

        <input type="hidden" name="type" onChange={onChange} />
        <div>
          <SubmitButton label="Submit Application" variant="default" />
        </div>
      </form>
    </div>
  );
}
