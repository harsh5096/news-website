

import React from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TextToSpeech from './components/TextToSpeech.js';
import { arrayItems } from './AIoptions';
import OptionSelection from './components/OptionSelection';
import TRanslation from './components/TRanslation';
import { useState } from 'react';
import axios from 'axios'; // Import Axios
import "./App.css";

const App = () => {
  const [option, setOption] = useState({});
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const selectOption = (option) => {
    setOption(option);
  };

  const doStuff = async () => {
    let object = {
      prompt: input
    };

    try {
      const response = await axios.post(
        'http://localhost:5000/api/openai',
        object
      );
      setResult(response.data.result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <BrowserRouter>
      <Navbar />

      <div className="main-card">
        <div className="ai">
          {Object.values(option).length === 0 ? (
            <OptionSelection arrayItems={arrayItems} selectOption={selectOption} />
          ) : (
            <TRanslation doStuff={doStuff} setInput={setInput} result={result} />
          )}
        </div>

        <TextToSpeech />
      </div>

      <Routes>
        {/* // set a path with a category */}
        <Route exact path="/" element={<News  key="general" pageSize={5} country="in" category="general"/>}/>
        <Route exact path="/business" element={<News  key="business" pageSize={5} country="in" category="business"/>} />
        <Route exact path="/entertainment" element={<News  key="entertainment" pageSize={5} country="in" category="entertainment"/>} />
        <Route exact path="general/" element={<News  key="general" pageSize={5} country="in" category="general"/>} />
        <Route exact path="/health" element={<News  key="health" pageSize={5} country="in" category="health"/>} />
        <Route exact path="/science" element={<News  key="science" pageSize={5} country="in" category="science"/>} />
        <Route exact path="/sports" element={<News  key="sports" pageSize={5} country="in" category="sports"/>} />
        <Route exact path="/technology" element={<News  key="technology" pageSize={5} country="in" category="technology"/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
