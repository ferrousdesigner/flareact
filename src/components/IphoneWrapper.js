import React from 'react';
import '../styles/iphone_wrapper.css'
const IphoneWrapper = ({children, theme}) => {
  return (
    <div className={theme.isIphone ? 'paddings-for-iphone' : 'paddings-for-other-phone'}>
      {children}
    </div>
  );
};

export default IphoneWrapper