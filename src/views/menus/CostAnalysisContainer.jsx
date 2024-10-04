import React from 'react'
import CostanalysisChart from './CostanalysisChart'

import RetrieveCostAnalysis from '../accounts/Leads/LeadsRetrieve/RetrieveCostAnalysis'

const CostAnalysisContainer = () => {
  return (
    <div>
        <RetrieveCostAnalysis/>
        
        <CostanalysisChart/>
        
    </div>
  )
}

export default CostAnalysisContainer