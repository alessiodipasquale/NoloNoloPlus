import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CBreadcrumbRouter,
  CLink
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

// routes config
import routes from '../routes'
import logo from '../assets/Logo.png'

import { 
  TheHeaderDropdown
}  from './index'

const TheHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector(state => state.sidebarShow)

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }

  return (
    <CHeader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CHeaderBrand style={{position: 'absolute', left: 0, right: 0}}className="mx-auto mr-3 d-lg-none" to="/">
        <CIcon src={logo} name="logo" height="50" alt="Logo"/>
      </CHeaderBrand>


      <CHeaderNav className="d-md-down-none">

      <CHeaderNavItem className="px-3" style={{position: 'absolute', right: 0}}>
          <CHeaderNavLink to="/dashboard">Logout</CHeaderNavLink>
      </CHeaderNavItem>
      </CHeaderNav>

     
    </CHeader>
  )
}

export default TheHeader
