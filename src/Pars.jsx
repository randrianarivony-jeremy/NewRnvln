import React, { useEffect } from 'react';

const Pars = () => {
    useEffect(()=>{
        console.log('hey');
    },[])
    return (
        <div>
            hey
        </div>
    );
};

export default Pars;