import React from 'react';
import withAuth from "@/components/withAuth/withAuth";

function MisEstadisticas() {

    return (
        <div className="relative flex flex-col items-center justify-center h-screen space-y-4">
            <img src='/assets/logo.png' alt="Logo" className="w-24 h-24 absolute top-1/8 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            <button className="absolute top-4 right-4 font-bold py-3 px-3 rounded"
              onClick={() => {
                window.location.href = '/Hub';
              }}
              style={{backgroundColor: '#729560'}}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#abcd99'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#729560'}
            > 
              <img src='/assets/hub.png' alt="Return to Hub" className="w-8 h-8 object-cover" />
            </button>
        </div>
    );
}

export default withAuth(MisEstadisticas);