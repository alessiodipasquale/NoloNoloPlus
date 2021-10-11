import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="#" target="_blank" rel="noopener noreferrer">Di Pasquale Alessio, Colamonaco Stefano, Corradetti Andrea</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
