import React from 'react'

import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CRow,
} from '@coreui/react'

import './support.css'

export default function Tasks() {
  return (
    <div>
      <h2>Tasks  ( 2 )</h2>
      <br /><br />
      <div className="text-end"><strong style={{fontWeight:700}}>10:12 AM, 12/02/2021</strong></div>
      <CCard style={{ background: '#EBEBEB' }}>

        <CCardBody>
          <CRow>
            <CCol md="8">
              <strong style={{fontWeight:700,fontSize:'14px'}}>Please sent picture</strong>
              <p style={{fontSize:'14px'}}>Kindly sent your Photo Id, & Bank address picture again.</p>
            </CCol>
            <CCol md="4">
              <CButton className="mt-3 basic_btn">Go to Document</CButton>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
      <div className="my-5">
      <div className="text-end"><strong style={{fontWeight:700}}>10:12 AM, 12/02/2021</strong></div>
      <CCard style={{ background: '#EBEBEB' }}>

        <CCardBody>
          <CRow>
            <CCol md="8">
              <strong style={{fontWeight:700,fontSize:'14px'}}>Please sent picture</strong>
              <p style={{fontSize:'14px'}}>Kindly sent your Photo Id, & Bank address picture again.</p>
            </CCol>
            <CCol md="4">
              <CButton className="mt-3 basic_btn">Go to Document</CButton>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
      </div>
    </div>
  )
}
