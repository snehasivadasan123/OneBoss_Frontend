import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export default function TrustTransaction() {
  return (
    <Card>
      <CardHeader>Trust Transaction</CardHeader>
      <CardContent>
        <Label className="text-primary-500 ">No Trading Activity Found</Label>
      </CardContent>
    </Card>
  )
}