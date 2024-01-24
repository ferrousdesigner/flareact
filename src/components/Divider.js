import React from 'react';
import '../styles/divider.css'

const Divider = props => {
  return (
    <div className='divider' style={{margin: props.margin ? '1rem 0' : '', backgroundColor: props.color}}>
      
    </div>
  );
};

export default Divider;