"use client"
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"

const ApprovalTable = () => {
  const approvals = [
    {
      description: "KYC - Client Portal Approval",
      dateCreated: "03/21/2021",
      time: "16:03",
      dateCompleted: "-",
      status: "Completed",
      path: "/dashboard/approval/kycapproval",
    },
    {
      description: "Mutual Fund Trading - Client Portal Approval",
      dateCreated: "03/21/2021",
      time: "16:03",
      dateCompleted: "-",
      status: "Sent to Client",
      path: "/dashboard/approval/tradeapproval",
    },
    {
      description: "NFC - DocuSign Envelope",
      dateCreated: "03/21/2021",
      time: "16:03",
      dateCompleted: "-",
      status: "Sent to Client",
      path: "/dashboard/approval/nfc",
    },
  ];

  const router = useRouter();
  const handleTypeClick = (path: string) => {
    router.push(path);
  };

  return (
    <div className="p-4">
      {/* Filters */}
      <div className="flex gap-6 mb-4 body-14-medium">
        <label className="flex items-center gap-2">
          <Checkbox /> Include Completed
        </label>
        <label className="flex items-center gap-2">
          <Checkbox /> Include Canceled
        </label>
      </div>

      {/* Table */}
      <table className="w-full border-collapse border border-gray-300 text-left">
        <thead className="bg-primary-100 text-primary-1000">
          <tr className="subheading-14-semibold">
            <th className="border p-2">Type</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Date Created</th>
            <th className="border p-2">Time</th>
            <th className="border p-2">Date Completed</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {approvals.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50 body-14-medium">
              <td className="border p-2"></td>
              <td className="border p-2 text-info-700">
                <Button
                  variant="ghost"
                  onClick={() => handleTypeClick(item.path)}
                  className="text-info-700 hover:text-info-800 hover:bg-info-50 p-1 h-auto font-normal text-sm"
                >
                  {item.description}
                </Button>
              </td>
              <td className="border p-2">{item.dateCreated}</td>
              <td className="border p-2">{item.time}</td>
              <td className="border p-2">{item.dateCompleted}</td>
              <td className="border p-2 text-info-700">{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApprovalTable;
