import React from 'react'
import './Custom.css'
import { CPagination, CPaginationItem } from '@coreui/react'

const Paggination = ({}) => {
  return (
    <div className='mt-2 d-flex justify-content-end'>
      <CPagination aria-label="Page navigation example">
        <CPaginationItem aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </CPaginationItem>
        <CPaginationItem>1</CPaginationItem>
        <CPaginationItem>2</CPaginationItem>
        <CPaginationItem>3</CPaginationItem>
        <CPaginationItem>4</CPaginationItem>
        <CPaginationItem>5</CPaginationItem>
        <CPaginationItem aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </CPaginationItem>
      </CPagination>
    </div>
  )
}

export default Paggination
