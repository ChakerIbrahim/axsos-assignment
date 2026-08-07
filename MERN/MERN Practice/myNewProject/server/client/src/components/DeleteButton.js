import React from "react";
import io from 'socket.io-client';

export default props => {
  const { sucessCallback } = props;

  return (
    <button onClick={sucessCallback}>
      Delete
    </button>
  )
}