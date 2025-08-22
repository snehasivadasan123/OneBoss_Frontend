export interface Address {
  addressLine1: string
  addressLine2: string
  city: string
  province: string
  postalCode: string
  country: string
}

export interface Document {
  description: string | null
  oneBossId: number
  issuedProvince: string
  issuedDate: string | null
  issuedCountry: string
  idNumber: string
  expirationDate: string | null
  documentType: string
}

export interface BankAccount {
  oneBossId: string
  currency: string
  description: string
  holder: string
  accountNumber: string
  institutionId: string
  branchId: string
}

export interface Spouse {
  mailingAddress: Address
  residentialAddress: Address
  surname: string
  title: string
  gender: string
  sin: string
  occupation: string
  employer: string
  name: string
}

export interface Link {
  href: string
  rel: string
  type: string
}

export interface ProfileApiResponse {

  oneBossId: number
  uuid: string
  mailingAddress: Address
  residentialAddress: Address
  documents: Document[]
  bankAccounts: BankAccount[]
  spouse: Spouse
  surname: string
  title: string
  gender: string
  dob: string
  sin: string
  occupation: string
  employer: string
  dod: string | null
  dependents: number
  maritalStatus: string
  name: string
  status: string
  clientType: string
  representativeId: number
  fatcaEligibility: string
  crsEligibility: string
  fatcaSsn: string | null
  fatcaW8BENW9: boolean
  fatcaW8BENW9Date: string | null
  email: string
  lastModifiedDate: string
  phone: string
  deliveryStatus: string
  userDefinedField1: string
  userDefinedField2: string
  userDefinedField3: string
  liquidAssets: number
  fixedAssets: number
  liabilities: number
  personalIncome: string
  personalIncomeValue: number
  taxCode: string
  knowledge: string
  cellphone: string
  fatcaNoTinReason: string
  mailingAddressSameAsResidential: boolean
  crsCountry: string | null
  crsTin: string | null
  crsNoTinReason: string
  consentDate: string
  workphone: string

  links: Link[]
}
