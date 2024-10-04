import React from 'react'
import goolelogImg from './img/goole_logo.svg'
import gooleImg from './img/google.svg'
import microsoftImg from './img/microsoft.svg'
import officeImg from './img/office.svg'
import visonImg from './img/visio.svg'
import appleImg from './img/apple.svg'
import cloudImg from './img/cloud-computing.svg'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CRow,
} from '@coreui/react'

export default function Calender() {
  return (
    <div>
      <CCard style={{ border: '1px solid #212121' }}>
        <CCardBody>
          <CRow >
            <CCol md={12} style={{ borderBottom: '1px solid #212121' }}>
              <h2>Select Calender</h2>
              <p>Connect you calender to know when you are available and update your calender as event as schedual</p>
            </CCol>
          </CRow>
          <CRow>
            <br />
            <CCol md={12} style={{ borderBottom: '1px solid #212121' }}>
              <br />
              <h2><img src={goolelogImg} width="40" alt="" /> Google</h2>
              <br />
            </CCol>
          </CRow>
          <div style={{ borderBottom: '1px solid #212121' }}>
            <CRow>
              <CCol md={4} >
                <br />
                <h2><img src={gooleImg} width="40" alt="" /> Google Calender</h2>
                <br />
              </CCol>
              <CCol md={4} className="text-center" style={{ marginTop: '30px' }}>
                <p>Gmail, G suit</p>
              </CCol>
              <CCol md={4} className="text-center" style={{ marginTop: '30px' }}>
                <CButton className="mb-2 basic_btn">Connect</CButton>
              </CCol>
            </CRow>
          </div>
          <div style={{ borderBottom: '1px solid #212121' }}>
            <CRow>
              <br />
              <CCol >
                <br />
                <h2><img src={microsoftImg} width="40" alt="" /> Microsoft</h2>
                <br />
              </CCol>
            </CRow>
          </div>
          <div style={{ borderBottom: '1px solid #212121' }}>
          <CRow>
            <CCol md={4}>
              <br />
              <h2><img src={officeImg} width="40" alt="" /> Office 365 Calender</h2>
              <br />
            </CCol>
            <CCol md={4} className="text-center" style={{ marginTop: '30px' }} >
              <p>Office 365. Outllok.com, live.com or hotmail calender</p>
            </CCol>
            <CCol md={4} className="text-center" style={{ marginTop: '30px' }} >
              <CButton className="mb-2 basic_btn">Connect</CButton>
            </CCol>
          </CRow>
          </div>

          <div style={{ borderBottom: '1px solid #212121' }}>
          <CRow>
            <CCol md={4}>
              <br />
              <h2><img src={visonImg} width="40" alt="" /> Exchange Calender</h2>
              <br />
            </CCol>
            <CCol md={4} className="text-center" style={{ marginTop: '30px' }}>
              <p>Exchange Server 2013, 2016 or 2019</p>
            </CCol>
            <CCol md={4} className="text-center" style={{ marginTop: '30px' }}>
              <CButton className="mb-2 basic_btn">Connect</CButton>
            </CCol>
          </CRow>
          </div>
          <div style={{ borderBottom: '1px solid #212121' }}>
          <CRow>
            <CCol md={4}>
              <br />
              <h2><img src={visonImg} width="40" alt="" /> Outlook Plug-In</h2>
              <br />
            </CCol>
            <CCol md={4} className="text-center" style={{ marginTop: '30px' }}>
              <p>Outlook 2007, 2010, 2013 or 2016 with Window
                XP, Vista, 7, 8, 8.1 or 10</p>
            </CCol>
            <CCol md={4} className="text-center" style={{ marginTop: '30px' }}>
              <CButton className="mb-2 basic_btn">Connect</CButton>
            </CCol>
          </CRow>
          </div>
          <CRow>
            <br />
            <CCol style={{ borderBottom: '1px solid #212121' }}>
              <br />
              <h2><img src={appleImg} width="40" alt="" /> Apple</h2>
              <br />
            </CCol>
          </CRow>
          <CRow>
            <CCol md={4}>
              <br />
              <h2><img src={cloudImg} width="40" alt="" /> iCloud Calender</h2>
              <br />
            </CCol>
            <CCol md={4} className="text-center" style={{ marginTop: '30px' }}>
              <p>Default calender for all apple product</p>
            </CCol>
            <CCol md={4} className="text-center" style={{ marginTop: '30px' }}>
              <CButton className="mb-2 basic_btn">Connect</CButton>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard >
    </div >
  )
}
