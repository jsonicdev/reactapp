import React from 'react';

export const withStrict = (Component) => {
  return (props) => (
    <React.StrictMode>
      <Component {...props} />
    </React.StrictMode>
  );
};
