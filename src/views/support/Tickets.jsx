import React from 'react'
import {
 
  CCol,
 
  CRow,
} from '@coreui/react'

import './support.css'
export default function Tickets() {
  return (
    <div>
  <div>
    <h2>Tickets</h2>
  </div>
  <CRow>
    <CCol md="8">
      <form>
        <div>
          <label htmlFor="CaseTitel" className="form-label my-3">Case Title</label>
          <input type="text" className="form-control" id="CaseTitel"  style={{background: '#ebebeb'}}/>
        </div>
        <div>
          <label htmlFor="CaseDescription" className="form-label my-3">Case Description</label>
          <textarea className="form-control" id="CaseDescription" rows="10" placeholder="Write here..."></textarea>
        </div>
        <br/>
        <div className="text-end">
          <input type="submit" value="ADMIT" className="btn basic_btn" style={{padding:'6px 35px'}}/>
        </div>
      </form>
    </CCol>
  </CRow>
</div>
  )
}
