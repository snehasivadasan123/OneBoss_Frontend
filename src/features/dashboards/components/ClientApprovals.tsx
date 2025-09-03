import { Button } from "@/components/ui/button"
import { PencilLine } from "lucide-react"
const approvalData = [
  {
    id: 1,
    dateCreated: "03/12/2023",
    time: "16:02",
    description: "",
    status: "sentToClient",
    statusColor: "text-blue-600",
    type: "kycClientPorta",
  },
  {
    id: 2,
    dateCreated: "03/12/2023",
    time: "16:02",
    description: "",
    status: "sentToClient",
    statusColor: "text-blue-600",
    type: "mutualFundTrading",
  },
  {
    id: 3,
    dateCreated: "03/12/2023",
    time: "16:02",
    description: "",
    status: "clientCompleted",
    statusColor: "text-blue-600",
    type: "nfcDocuSign",
  },
]

export function ClientApprovals() {

  return (
    <div className="p-2">
      <div className="flex items-center gap-2 mb-4 mt-1">
        <h2 className="subheading-20-semibold text-primary-1000">
          Client Approvals & eSigning
        </h2>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200">

              <th className="text-left py-2 px-3 subheading-14-semibold text-primary-1000">
                Date Created
              </th>
              <th className="text-left py-2 px-3 subheading-14-semibold text-primary-1000">
                Time
              </th>
              <th className="text-left py-2 px-3 subheading-14-semibold text-primary-1000">
                Description
              </th>
              <th className="text-left py-2 px-3 subheading-14-semibold text-primary-1000">
                Status
              </th>
              <th className="text-left py-2 px-3 subheading-14-semibold text-primary-1000">
                Type
              </th>
              <th className="text-left py-2 px-3 subheading-14-semibold text-primary-1000">
                Documents
              </th>
            </tr>
          </thead>
          <tbody>
            {approvalData.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >

                <td className="py-2 px-3 body-14-medium text-primary-600">
                  {item.dateCreated}
                </td>
                <td className="py-2 px-3 body-14-medium text-primary-600">
                  {item.time}
                </td>
                <td className="py-2 px-3  body-14-medium text-primary-600">
                  {item.description}
                </td>
                <td className="py-2 px-3 text-sm text-info-700">{item.status}</td>
                <td className="py-2 px-3 text-sm text-info-700">{item.type}</td>
                <td className="py-2 px-3">
                  <Button className="bg-transparent hover:bg-transparent text-primary-1000 border border-primary-220 px-2 py-1">
                    <PencilLine className="h-2 w-2" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-3 md:hidden">
        {approvalData.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-lg p-3 shadow-sm bg-white"
          >
            <div className="flex justify-between items-center">
              <Button className="bg-transparent hover:bg-transparent text-primary-1000 border border-primary-220 px-3 py-1">
                <PencilLine className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-2 text-sm text-primary-600">
              <p><strong>Date Created:</strong> {item.dateCreated}</p>
              <p><strong>Time:</strong> {item.time}</p>
              {item.description && <p><strong>Description:</strong> {item.description}</p>}
              <p><strong>Status:</strong> <span className={item.statusColor}>{item.status}</span></p>
              <p><strong>Type:</strong> {item.type}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
