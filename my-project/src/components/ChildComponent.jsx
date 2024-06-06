import React from 'react'

const ChildComponent = (props) => {
    const { setVal } = props;
    
    setVal("Changed");
  return (
    <div >
        
    </div>
  )
}

export default ChildComponent
