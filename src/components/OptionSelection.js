import React  from 'react';
import "./translation.css";

export default function OptionSelection({ selectOption, arrayItems, option }) {
  return (
    <>
    <div className='container' > 
               {arrayItems.map((item) => {
                return (
                  <div className = "qn" onClick={() => selectOption(item.option)} >        
                  {/* <h3>{item.value}</h3> */}
                  <p>{item.description}</p>
                  </div>
                );
               })} 
            </div>
    </>
  );
}