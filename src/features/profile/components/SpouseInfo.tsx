"use client"

import { useEffect, useState } from "react"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Landmark, Building2 } from "lucide-react"
import { fetchUserDetails } from "../services/profileService"
import { ProfileApiResponse } from "@/types/common/Profile"
import { logger } from "@/lib/logger"
import { Spinner } from "@/components/shared/spinner"
function DisplayField({ label, value }: { label: string; value?: string | number | null }) {
  return (
    <div className="grid grid-cols-2 py-2 border-b last:border-0">
      <div className="text-sm font-medium text-muted-foreground">{label}</div>
      <div className="text-sm text-foreground">{value !== null && value !== undefined ? value : "-"}</div>
    </div>
  )
}


export function SpouseInfo() {
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

        <TabsContent value="personal" className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <Card >
                <CardHeader className=" bg-primary-200">
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Spouse Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <DisplayField label="Title" value={user?.spouse.title} />
                  <DisplayField label="Name" value={user?.spouse.name} />
                  <DisplayField label="SurName" value={user?.spouse.surname} />
                  <DisplayField label="Gender" value={user?.spouse.gender} />
                  <DisplayField label="Date of Birth" value="" />
                  <DisplayField label="Occupation" value={user?.spouse.occupation} />
                  <DisplayField label="Employer" value={user?.spouse.employer} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className=" bg-primary-200">
                  <CardTitle className="flex items-center gap-2 ">
                    <Landmark className="h-5 w-5" />
                    Spouse Mailing Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {user?.bankAccounts.map((account) => (
                    <div key={account.oneBossId} className="mb-4">
                      <DisplayField label="Address Line1" value={user?.spouse?.mailingAddress?.addressLine1} />
                      <DisplayField label="Address Line2" value={user?.spouse?.mailingAddress?.addressLine2} />
                      <DisplayField label="City" value={user?.spouse?.mailingAddress?.city} />
                      <DisplayField label="Province" value={user?.spouse?.mailingAddress?.province} />
                      <DisplayField label="PostalCode" value={user?.spouse?.mailingAddress?.postalCode} />
                      <DisplayField label="Country" value={user?.spouse?.mailingAddress?.country} />

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
                    Spouse Residential Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <DisplayField label="Address Line1" value={user?.spouse?.residentialAddress.addressLine1} />
                  <DisplayField label="Address Line2" value={user?.spouse?.residentialAddress.addressLine2} />
                  <DisplayField label="City" value={user?.spouse?.residentialAddress.city} />
                  <DisplayField label="Province" value={user?.spouse?.residentialAddress.province} />
                  <DisplayField label="PostalCode" value={user?.spouse?.residentialAddress.postalCode} />
                  <DisplayField label="Country" value={user?.spouse?.residentialAddress.country} />
                </CardContent>
              </Card>


            </div>
          </div>
        </TabsContent>
        <TabsContent value="spouse" >Change your password here.

        </TabsContent>
      </Tabs>
    </div>
  )
}

export default SpouseInfo