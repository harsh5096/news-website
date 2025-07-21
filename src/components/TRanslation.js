import "./translation.css";
import React from 'react';
export default function TRanslation({ doStuff , setInput, result }) {
    return (<>
      <main  className="text">
  <textarea cols={50} row={30} onChange = {(e)=>setInput(e.target.value)}></textarea>
  <button onClick ={doStuff}>Get ansswer</button>
     </main >
  <div className="result">
    <p>
    {/* If result has content, it is displayed; otherwise, an empty string is rendered. */}
  {result.length > 0 ? result : ("")}
    </p>
  </div>
  </>
    )
  }