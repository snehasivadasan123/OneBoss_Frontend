export interface InvestmentSection {
  id: string;
  dealerAccountCode: string,
  name: string;
  totalValue: number;
  items: InvestmentItem[];
  balances: BalanceItem[];
}
export interface InvestmentItem {
  subject: string;
  supplierAccount: string;
  units: number;
  price: number;
  marketValue: number;
  bookValue: number;
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
  // links: any[];
}
