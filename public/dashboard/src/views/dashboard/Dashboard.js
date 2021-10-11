import React, { lazy } from 'react'
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CCallout,
  CInput,
  CFormGroup,
  CContainer,
  CCardTitle,
  CCardSubtitle
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import MainChartExample from '../charts/MainChartExample.js'
import { BrowserView, MobileView } from 'react-device-detect'


const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))

var categories = [{name: "Auto"},{name: "Bricolage"}, {name: "Moto"}, {name: "Barche"}, {name: "Attrezzi"}]

var items = [
  { 
    name: "Tesla Model 3",
    state: "Nuovo",
    price: "500 €/giorno"
  },
  { 
    name: "Tesla Model 4",
    state: "Nuovo",
    price: "500 €/giorno"
  },
  { 
    name: "Tesla Model 5",
    state: "Nuovo",
    price: "500 €/giorno"
  },
  { 
    name: "Tesla Model X",
    state: "Nuovo",
    price: "500 €/giorno"
  },
  { 
    name: "Tesla Model S",
    state: "Nuovo",
    price: "500 €/giorno"
  }
]

const Dashboard = () => {
  return (
    <>
    <BrowserView>
      Sono web
    </BrowserView>
    <MobileView>
        <CInput type="search" id="name" placeholder="Cerca" required />
        <CContainer style={{display:"flex", overflow: "scroll", marginTop: "8px", marginBottom:"8px",paddingLeft:0, WebkitOverflowScrolling: "auto"}}>
          {
            categories.map(el => <CButton style={{margin: "2% 3% 2% 0"}} value={el} key={el} color="info">{el.name}</CButton>)
          }
        </CContainer>
        <CContainer style={{padding: "0 "}}>
          {
            items.map(el => 
              <CContainer style={{display: "flex"}}>
              <CCard  style={{width: "80%", marginRight:"3px"}}>
                <CCardBody>
                  <CCardTitle>{el.name}</CCardTitle>
                  <CCardSubtitle>{el.price}</CCardSubtitle>
                </CCardBody>
              </CCard>
              <CButton style={{width: "20%", marginBottom:"1.5rem"}}color="info">
              <CIcon name="cil-arrow-right" size="xl"/>
              </CButton>
              </CContainer>
            )
          }
        </CContainer>
    </MobileView>
    </>
  )
}

export default Dashboard
