import React, { useState } from 'react';
import "./audio.css";

function TextToSpeech() {
  const [text, setText] = useState('');
  
  //This line initializes the Web Speech API's speechSynthesis object.
  const synth = window.speechSynthesis;
  // It provides a way to interact with the speech synthesis service available in modern web browsers.

  const handleInputChange = (event) => {
    // the written value
    setText(event.target.value);
  };

  const handleReset = () => {
    // reset the value which is written by the user
    setText(''); 
  };

  const speak = () => {
    // This function is also triggered by a button click. It creates a new SpeechSynthesisUtterance object,
    // which represents a speech request, with the content of the text state. 
    // Then, it instructs the speechSynthesis object to speak the provided utterance.
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  };

  return (
    <div className="audio">
      <textarea
        value={text}
        onChange={handleInputChange}
        placeholder="Enter text to speak"
      />
      <button onClick={speak}>Audio</button>
      <button onClick={handleReset}>Reset</button>

    </div>
  );
}

export default TextToSpeech;


