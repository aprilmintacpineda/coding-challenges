import './styles.scss';

import React from 'react';

export default props => (
  <div id="popup-container">
    <div id="popup-overlay">
      {props.children}
    </div>
  </div>
);
