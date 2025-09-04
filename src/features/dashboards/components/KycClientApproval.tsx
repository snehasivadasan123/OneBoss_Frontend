"use client"

import { Button } from "@/components/ui/button"
import { FileText, Users } from "lucide-react"
import { financialData, residentialAddress, mailingAddress, personalInfo, trustedPersons, spouseResidentialAddress, spouseMailingAddress } from "./KycApprovalDummy";
import { Checkbox } from "@radix-ui/react-checkbox";


type DataRow = {
  category: string;
  oldValue: string;
  newValue: string;
};


const DataTable = ({ title, data }: { title: string; data: DataRow[] }) => (
  <div>
    <h3 className="font-medium subheading-16-semibold">{title}</h3>
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-4 subheading-14-semibold">
        <div>Category</div>
        <div>Old value</div>
        <div>New value</div>
      </div>
      {data.map((item, idx) => (
        <div
          key={idx}
          className={`grid grid-cols-3 gap-4 text-sm py-2 ${idx !== data.length - 1 ? "border-b border-gray-100" : ""
            }`}
        >
          <div className="text-gray-600">{item.category}</div>
          <div
            className={`${item.oldValue === "-" ? "text-gray-400" : "text-info-700"
              }`}
          >
            {item.oldValue}
          </div>
          <div
            className={`${item.newValue === "-" ? "text-gray-400" : "text-info-700"
              }`}
          >
            {item.newValue}
          </div>
        </div>
      ))}
    </div>
  </div>
)



export default function KycClientApproval() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Financial Information */}
        <div>
          <div className="bg-gray-100 px-6 py-4">
            <div className="text-lg font-medium flex items-center gap-3">
              <FileText className="w-5 h-5 text-gray-600" />
              Financial Information
            </div>
          </div>
          <div className="bg-white border border-gray-200 border-t-0 px-6 py-4">
            <DataTable title="Financial Information" data={financialData} />
          </div>
        </div>

        {/* Client Information */}
        <div>
          <div className="bg-gray-100 px-6 py-4">
            <div className="text-lg font-medium flex items-center gap-3">
              <Users className="w-5 h-5 text-gray-600" />
              Client Information
            </div>
          </div>
          <div className="bg-white border border-gray-200 border-t-0 px-6 py-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <DataTable title="Residential Address Update" data={residentialAddress} />
              <DataTable title="Mailing Address Update" data={mailingAddress} />
            </div>
            <div className="mt-8">
              <DataTable title="Personal Information" data={personalInfo} />
            </div>
          </div>
        </div>

        {/* Spouse Information */}
        <div>
          <div className="bg-gray-100 px-6 py-4">
            <div className="text-lg font-medium flex items-center gap-3">
              <Users className="w-5 h-5 text-gray-600" />
              Spouse Information
            </div>
          </div>
          <div className="bg-white border border-gray-200 border-t-0 px-6 py-4 ">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <DataTable title="Residential Address Update" data={spouseResidentialAddress} />
              <DataTable title="Mailing Address Update" data={spouseMailingAddress} />
            </div>

            {/* Client Trusted Person */}
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-gray-900 text-sm">Client Trusted Person</h3>
                <div className="text-sm text-gray-600">Total value: $77,477.52</div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-2 w-10">
                        <Checkbox
                          aria-label="Select all"
                          className="border border-primary-600 w-3 h-3"
                        />
                      </th>
                      <th className="text-left py-3 text-gray-600 font-medium">Name</th>
                      <th className="text-left py-2 text-gray-600 font-medium">Surname</th>
                      <th className="text-left py-2 text-gray-600 font-medium">Phone</th>
                      <th className="text-left py-2 text-gray-600 font-medium">Email</th>
                      <th className="text-left py-2 text-gray-600 font-medium">Address Line 1</th>
                      <th className="text-left py-2 text-gray-600 font-medium">Objective</th>
                      <th className="text-left py-2 text-gray-600 font-medium">Category</th>
                      <th className="text-left py-2 text-gray-600 font-medium">Postal Code</th>
                    </tr>
                  </thead>

                  <tbody>
                    {trustedPersons.map((person, idx) => (
                      <tr key={idx} className="border-b border-gray-100">
                        <td className="py-3">
                          <Checkbox
                            aria-label={`Select ${person.name}`}
                            className="border border-primary-600 w-3 h-3"
                          />
                        </td>
                        <td className="py-3">{person.name}</td>
                        <td className="py-3">{person.surname}</td>
                        <td className="py-3">{person.phone}</td>
                        <td className="py-3">{person.email}</td>
                        <td className="py-3">{person.address}</td>
                        <td className="py-3">{person.objective}</td>
                        <td className="py-3">{person.category}</td>
                        <td className="py-3">
                          <Button variant="outline" size="sm">
                            View Fund Facts
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>
              <div className="mt-4">
                <Button variant="default" size="sm" className="bg-black text-white hover:bg-gray-800">
                  View Client Request Form
                </Button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
