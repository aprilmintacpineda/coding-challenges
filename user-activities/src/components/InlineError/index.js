import './styles.scss';
import React from 'react';

export default props => {
  const errorConstructor = props.error.constructor;

  if (errorConstructor === Array) {
    return props.error.map(error =>
      <p className="inline-error-message">{error}</p>
    );
  }

  if (errorConstructor === String) {
    return <p className="inline-error-message">{props.error}</p>;
  }

  return null;
}
