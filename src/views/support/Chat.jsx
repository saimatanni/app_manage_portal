import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormSelect,
  CRow,
} from '@coreui/react'
import photo1 from './img/Photo.png'
import photo2 from './img/Photo1.png'
import photo3 from './img/Photo2.png'
import plusImg from './img/push-pin.svg'
import addFriend from './img/add-friend.svg'
import cloudImg from './img/cloud-computing1.svg'
import happyImg from './img/happy.svg'
import plusPin1 from './img/push-pin1.svg'
import sentImg from './img/sent.svg'

import './support.css'

export default function Chat() {
  return (
    <div>
      <CRow>
        <CCol md="6">
          <p>Marchent</p>
          <CFormSelect id="autoSizingSelect">
            <option>Choose...</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </CFormSelect>
          <br />
          <CRow>
            <CCol md="2">
              <img src={photo1} className="img-circle elevation-2" width="80" alt="User Image" />
            </CCol>
            <CCol md="4">
              <div>
                <h2>Shafin Ahmed </h2>
                <p>Mirpur, Dhaka, Bangladesh</p>
              </div>
            </CCol>
            <CCol md="4">
              <div>
                <strong>3 hours</strong>
              </div>
            </CCol>
          </CRow>
          <br />
          <CRow>
            <CCol md="2">
              <img src={photo1} className="img-circle elevation-2" width="80" alt="User Image" />
            </CCol>
            <CCol md="4">
              <div>
                <h2>Shafin Ahmed </h2>
                <p>Mirpur, Dhaka, Bangladesh</p>
              </div>
            </CCol>
            <CCol md="4">
              <div>
                <strong>3 hours</strong>
              </div>
            </CCol>
          </CRow>
        </CCol>
        <CCol md="6">
          <CCard className='p-4' style={{ background: '#FAFAFA', border: 'none' }}>
            <CCardHeader style={{ background: '#FAFAFA' }}>
              <CRow>
                <CCol md="2" className="text-center mb-2">
                  <img src={photo2} className="img-circle elevation-2" width="80" alt="User Image" /> <span>&nbsp; Zakariya</span>
                </CCol>
                <CCol md="2" className="text-center mb-2">
                  <img src={photo3} className="img-circle elevation-2" width="80" alt="User Image" /> <span>&nbsp; Zakariya</span>
                </CCol>
                <CCol md="8">
                  <div className="text-end">
                    <img src={plusImg} width="25" alt="" />&nbsp;
                    <img src={addFriend} width="25" alt="" />
                  </div>

                </CCol>
              </CRow>
            </CCardHeader>
            <br /><br /><br />
            <CCardBody style={{ overflowY: 'scroll' }}>
              <CRow>
                <CCol md="2">
                  <div className="box">
                    <h2>S</h2>
                  </div>
                </CCol>
                <CCol md="8">
                  <div>
                    <h4>Shafin, 3 hours ago</h4>
                    <CCard className='my-4'>
                      <CCardBody style={{ background: '#EFF3F6' }}>
                        <strong>This is example message for moment</strong>
                      </CCardBody>
                    </CCard>
                  </div>
                </CCol>

              </CRow>
              <CRow>
                <CCol md="2">
                  <div className="box">
                    <h2>S</h2>
                  </div>
                </CCol>
                <CCol md="8">
                  <div>
                    <h4>Shafin, 3 hours ago</h4>
                    <CCard className='my-4'>
                      <CCardBody style={{ background: '#EFF3F6' }}>
                        <strong>This is example message for moment</strong>
                      </CCardBody>
                    </CCard>
                  </div>
                </CCol>

              </CRow>
            </CCardBody>
            <br /><br /><br />
            <CCol md="12">
              <div>
                <div className="input-group mb-3">
                  <input type="text" className="form-control border-end-0" aria-label="Recipient's username" aria-describedby="basic-addon2" placeholder="Type a message" />
                  <div className="input-group-append d-flex">
                    <span className="input-group-text  border-end-0 rounded-0" id="basic-addon2"><img src={cloudImg} width="21" alt="" /></span>
                    <span className="input-group-text  border-end-0 rounded-0" id="basic-addon2"><img src={happyImg} width="21" alt="" /></span>
                    <span className="input-group-text  border-end-0 rounded-0" id="basic-addon2"><img src={plusPin1} width="21" alt="" /></span>
                    <span className="input-group-text border-start-0" id="basic-addon2"><img src={sentImg} width="21" alt="" /></span>
                  </div>
                </div>
              </div>
              <br />
            </CCol>
          </CCard>
        </CCol>

      </CRow>
    </div>
  )
}
