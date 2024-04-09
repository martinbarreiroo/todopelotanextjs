import React from 'react';

function CrearTorneo() {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen space-y-4">
      <img src='/assets/logo.png' alt="Logo" className="w-24 h-24 absolute top-1/8 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      <div className="w-full flex flex-col items-center justify-between space-y-10 mt-24">
        <div className="w-64 h-16 flex items-center justify-center mx-auto mt-32 mb-50 p-6 relative rounded" style={{backgroundColor: '#797979'}}>Box 1</div>
        <div className="w-64 h-16 flex items-center justify-center mx-auto mt-32 mb-50 p-6 relative rounded" style={{backgroundColor: '#797979'}}>Box 2</div>
        <div className="w-64 h-16 flex items-center justify-center mx-auto mt-32 mb-50 p-6 relative rounded" style={{backgroundColor: '#797979'}}>Box 3</div>
        <div className="w-64 h-16 flex items-center justify-center mx-auto mt-32 mb-50 p-6 relative rounded" style={{backgroundColor: '#797979'}}>Box 4</div>
      </div>
    </div>
  );
}

export default CrearTorneo;