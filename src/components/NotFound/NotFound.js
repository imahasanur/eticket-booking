import React from 'react';

const NotFound = () => {
    const errorStyle = {
        color:'white',
        padding:'5px 5px',
        background:'red'
    }
  return (
    <div>
        <h1 style={errorStyle}>404 error!!</h1>
        <h2 style={errorStyle}>Route did not matched!!!</h2>    
    </div>
  );
};

export default NotFound;