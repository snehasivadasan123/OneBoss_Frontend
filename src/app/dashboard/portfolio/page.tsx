import React from 'react'
import AssetValue from '@/features/portfolio/components/AssetValue'
import InvestmentSectionList from '@/features/portfolio/components/InvestmentSelectionList'
import TradingActivityFilters from '@/features/portfolio/components/TradingActivityFilters'
import TrustTransaction from '@/features/portfolio/components/TrustTransaction'
const PortFolioPage = () => {
  return (
    <div>
      <AssetValue value={"$0.00"} />
      <div className="space-y-4">
        <InvestmentSectionList />
      </div>
      <div className="p-3">
        <TradingActivityFilters />
        <TrustTransaction />
      </div>
    </div>
  )
}

export default PortFolioPage