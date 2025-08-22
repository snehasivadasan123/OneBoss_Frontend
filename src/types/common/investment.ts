

export interface InvestmentSection {
  id: string;
  dealerAccountCode: string,
  name: string;
  totalValue: number;
  items: InvestmentItem[];
  balances: BalanceItem[];
}
export interface InvestmentItem {
  // productName: string;
  subject: string;
  supplierAccount: string;
  units: number;
  price: number;
  marketValue: number;
  bookValue: number | null;
}
export interface BalanceItem {
  type: string;
  value: number | null;
}
export interface PlanApiResponse {

  dealerAccountCode: string;
  oneBossId: string;
  description: string;
  planMarketValue?: number;

}
export interface InvestmentDetailApiResponse {

  supplierAccount: string;
  oneBossId: string;
  currency: string;
  status: string;
  currentPrice: number;
  planDealerAccountCode: string;
  productType: string;
  totalSharesUnissued: number;
  totalSharesIssued: number;
  productCode: string;
  productName: string
  // links: any[];
}
