import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter style={{fontSize:"14px"}}>
      <div>
        <a href="https://paymentsave.co.uk" target="_blank" rel="noopener noreferrer">
        Paymentsave
        </a>
        <span className="ms-1">&copy; 2023. All rights reserved.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1" color='#2c384af2'>Design & Engineered By</span>
        <a href="https://devsstream.com" target="_blank" rel="noopener noreferrer">
          DevsStream Limited
           {/* &amp; Dashboard Template */}
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
