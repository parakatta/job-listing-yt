"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import InputWithLabel from "../jobs/input-job";
import { DropDown } from "@/components/dropdown";
import SubmitButton from "@/components/submit-button";
import createJobs from "@/actions/create-job";
import { toast } from "react-hot-toast";
import { redirect } from "next/navigation";

const initialState = {
  title: "",
  companyName: "",
  location: "",
  salary: "",
  type: "",
  desc: "",
  responsibility: "",
  requirements: "",
};

const jobType = [
  {
    value: "Full-Time",
    label: "Full-Time",
  },
  {
    value: "Part-Time",
    label: "Part-Time",
  },
];

export default function CreateJobClient() {
  const [value, setValue] = useState("");
  const [state, setState] = useState({ ...initialState, type: "" });

  useEffect(() => {
    setState((prev) => ({ ...prev, type: value }));
  }, [value]);

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setState({ ...state, [event.target.name]: event.target.value });
  }

  return (
    <div className="w-[90%] mx-auto mt-5 mb-[50px]">
      <form
        action={async (formData) => {
          await createJobs(formData);
          toast.success("Created Successfully");
          redirect("/jobs");
        }}
        className="container mx-auto grid gap-8 grid-cols-2"
      >
        <InputWithLabel
          type="text"
          id="title"
          placeholder="title"
          label="Job Title"
          value={state.title}
          onChange={onChange}
          name="title"
        />

        <InputWithLabel
          type="text"
          value={state.companyName}
          id="companyName"
          placeholder="companyName"
          label="Company Name"
          name="companyName"
          onChange={onChange}
        />

        <InputWithLabel
          type="text"
          id="location"
          placeholder="location"
          label="Location"
          value={state.location}
          onChange={onChange}
          name="location"
        />
        <InputWithLabel
          type="text"
          value={state.salary}
          id="salary"
          placeholder="salary"
          label="Salary"
          onChange={onChange}
          name="salary"
        />
        <InputWithLabel
          type="textarea"
          value={state.desc}
          id="desc"
          placeholder="description"
          label="Description"
          onChange={onChange}
          name="desc"
        />
        <InputWithLabel
          type="textarea"
          value={state.responsibility}
          id="responsibility"
          placeholder="responsibility"
          label="Responsibility"
          onChange={onChange}
          name="responsibility"
        />
        <InputWithLabel
          type="textarea"
          value={state.requirements}
          id="requirements"
          placeholder="requirements"
          label="Requirements"
          onChange={onChange}
          name="requirements"
        />

        <input type="hidden" value={value} name="type" onChange={onChange} />
        <DropDown value={value} setValue={setValue} jobType={jobType} />
        <div>
          <SubmitButton label="Create" variant="default" />
        </div>
      </form>
    </div>
  );
}
