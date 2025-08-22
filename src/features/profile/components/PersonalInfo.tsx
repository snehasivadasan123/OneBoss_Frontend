"use client"

import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Landmark, Building2, Mails, Contact } from "lucide-react"
import { fetchUserDetails } from "../services/profileService"
import { ProfileApiResponse } from "@/types/common/Profile"
import { logger } from "@/lib/logger"
import SpouseInfo from "./SpouseInfo"
import { Spinner } from "@/components/shared/spinner"
function DisplayField({ label, value }: { label: string; value?: string | number | null }) {
  return (
    <div className="grid grid-cols-2 py-2 border-b last:border-0">
      <div className="text-sm font-medium text-muted-foreground">{label}</div>
      <div className="text-sm text-foreground">{value !== null && value !== undefined ? value : "-"}</div>
    </div>
  )
}


export function PersonalInfo() {
  const [activeTab, setActiveTab] = useState("personal")
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<ProfileApiResponse | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const clientUuid = localStorage.getItem("clientUuid") || ""
        if (clientUuid) {
          const data = await fetchUserDetails(clientUuid)
          console.log("User data:", data)
          setUser(data)
        }
      } catch (error) {
        logger.error("Error fetching user details:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner size="lg" className="text-primary" />
      </div>
    )
  }

  if (!user) {
    return <div className="text-center text-muted-foreground">No spouse information found</div>
  }

  return (
    <div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6 ">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="personal" >Personal Information</TabsTrigger>
          <TabsTrigger value="spouse"  >Spouse Information</TabsTrigger>
        </TabsList>
        <TabsContent value="personal" className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <Card >
                <CardHeader className=" bg-primary-200">
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <DisplayField label="Id" value={user?.oneBossId} />
                  <DisplayField label="Title" value={user?.dependents} />
                  <DisplayField label="Name" value={user?.name} />
                  <DisplayField label="SurName" value={user?.surname} />
                  <DisplayField label="Gender" value={user?.gender} />
                  <DisplayField label="Marital Status" value={user?.maritalStatus} />
                  <DisplayField label="Dependents" value={String(user?.dependents)} />
                  <DisplayField label="Date of Birth" value={user?.dob} />
                  <DisplayField label="Delivery Status" value={user?.deliveryStatus} />
                  <DisplayField label="Consent Date" value={user?.consentDate || "-"} />
                  <DisplayField label="Status" value={user?.status} />
                  <DisplayField label="Occupation" value={user?.occupation} />
                  <DisplayField label="Employer" value={user?.employer} />
                  <DisplayField label="Tax Code" value={user?.taxCode} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className=" bg-primary-200">
                  <CardTitle className="flex items-center gap-2 ">
                    <Landmark className="h-5 w-5" />
                    Bank Account
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {user?.bankAccounts.map((account) => (
                    <div key={account.oneBossId} className="mb-4">
                      <DisplayField label="Description" value={account.description} />
                      <DisplayField label="Institution ID" value={account.institutionId} />
                      <DisplayField label="Branch ID" value={account.branchId} />
                      <DisplayField label="Account Number" value={account.accountNumber} />
                      <DisplayField label="Holder Name" value={account.holder} />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
            <div className="space-y-4">
              <Card >
                <CardHeader className=" bg-primary-200">
                  <CardTitle className="flex items-center gap-2 ">
                    <Building2 className="h-5 w-5" />
                    Residential Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <DisplayField label="Address Line1" value={user?.residentialAddress?.addressLine1} />
                  <DisplayField label="Address Line2" value={user?.residentialAddress.addressLine2} />
                  <DisplayField label="City" value={user?.residentialAddress.city} />
                  <DisplayField label="Province" value={user?.residentialAddress.province} />
                  <DisplayField label="PostalCode" value={user?.residentialAddress.postalCode} />
                  <DisplayField label="Country" value={user?.residentialAddress.country} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader className=" bg-primary-200">
                  <CardTitle className="flex items-center gap-2">
                    <Mails className="h-5 w-5" />
                    Mailing Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <DisplayField label="Address Line1" value={user?.mailingAddress?.addressLine1} />
                  <DisplayField label="Address Line2" value={user?.mailingAddress?.addressLine2} />
                  <DisplayField label="City" value={user?.mailingAddress?.city} />
                  <DisplayField label="Province" value={user?.mailingAddress?.province} />
                  <DisplayField label="PostalCode" value={user?.mailingAddress?.postalCode} />
                  <DisplayField label="Country" value={user?.mailingAddress?.country} />
                  <DisplayField label="Returned Mail" value="" />
                  <DisplayField label="Returned Mail Data" value="" />



                </CardContent>
              </Card>
              <Card>
                <CardHeader className=" bg-primary-200">
                  <CardTitle className="flex items-center gap-2">
                    <Contact className="h-5 w-5" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <DisplayField label="Email" value={user?.email} />
                  <DisplayField label="Home Phone" value={user?.phone} />
                  <DisplayField label="Work Phone" value={user?.workphone} />
                  <DisplayField label="Cell Phone" value={user?.cellphone} />
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="spouse" ><SpouseInfo />

        </TabsContent>
      </Tabs>
    </div>
  )
}

export default PersonalInfo