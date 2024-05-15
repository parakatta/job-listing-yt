"use client";
import { useState, useEffect } from "react";
import { getData } from "../../actions/get-data";

const DataPage = () => {
  const [data, setData] = useState<any[]>([]); // Define the type of data according to your data structure

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData(); // Fetch data from the server-side action
        setData(response); // Set the fetched data in the state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const handleDownload = (fileUrl: string, fileName: string) => {
    const downloadLink = document.createElement("a");
    downloadLink.href = fileUrl;
    downloadLink.download = fileName;
    downloadLink.click();
  };

  return (
    <div className="container">
      <div className="flex justify-center my-[30px]">
        <table className="">
          <thead className="p-5 border-1">
            <tr>
              <th>ID</th>
              <th>Job Title</th>
              <th>Company Name</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Resume</th>
              <th>File</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: any, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.jobTitle}</td>
                <td>{item.companyName}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.email}</td>
                <td>{item.phoneNumber}</td>
                <td>{item.resumeName}</td>
                <td>
                  <button
                    onClick={() =>
                      handleDownload(item.fileUpload, item.resumeName)
                    }
                    className="text-blue-600 underline hover:text-blue-200"
                  >
                    Download Resume
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataPage;
