export interface Address {
  addressLine1: string,
  addressLine2: string
  city: string
  province: string
  postalCode: string
  country: string
}

export interface Advisor {
  oneBossId: number
  officeAddress: Address
  officeMailingAddress: Address
  residentialAddress: Address
  residentialMailingAddress: Address
  surname: string
  name: string
  startDate: string
  endDate: string
  businessName: string
  nrdNumber: string
  officePhone: string
  officeCell: string
  officeFax: string
}