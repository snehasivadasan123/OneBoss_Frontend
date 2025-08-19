

import React from 'react'
interface AssetsValueProps {
  value: string
}
const AssetValue = ({ value }: AssetsValueProps) => {
  return (
    <div className="flex items-center gap-4">
      <span className="text-sm font-medium text-primary-1000">Assets value</span>
      <span className="px-4 py-2 text-lg  text-info-901 font-bold ">
        {value}
      </span>
    </div>
  )
}

export default AssetValue