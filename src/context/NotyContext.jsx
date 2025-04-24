import React  from 'react'
import { Notyf } from 'notyf';

export default React.createContext(
  new Notyf({
    duration: 5000,
    position: {
      x: 'right',
      y: 'top'
    },
    types: [
      {
        type: 'success',
        background: '#4CAF50',
      },
      {
        type: 'error',
        background: '#ED3D3D',
      },
      {
        type: 'warning',
        background: '#FFC107',
      }
    ]
  })
);