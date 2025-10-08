import { useState } from 'react'
import './App.css'

interface ChineseData {
  traditional: string;
  simplified: string;
  pinyin: string;
  meaning: string;
}

const SERVICE_BASEPATH = "http://127.0.0.1:8000";

function App() {
  const [data, setData] = useState<ChineseData>();
  const [isTraditional, setIsTraditional] = useState(true);

  function handleButtonClick() {
    const request = new XMLHttpRequest();
    request.open('GET', `${SERVICE_BASEPATH}/random`);
    request.onload = function () {
      if (request.status === 200) {
        const chineseObject: ChineseData = JSON.parse(request.responseText); 
        setData(chineseObject);
      }
    };
    request.send();
  }

  function handleToggleClick() {
    setIsTraditional(!isTraditional);
    console.log(isTraditional);
  }

  function createNoteCard() {
    if (data === null || data === undefined) {
      return <div></div>;
    }
    const characters = isTraditional ? data.traditional : data?.simplified;
    const pinyin = data.pinyin;
    const meaning = data.meaning;
    return <div>
      <h2>{characters}</h2>
      <h2>{pinyin}</h2>
      <h2>{meaning}</h2>
    </div>
  }

  return (
    <>
      <h1>Chinese Notecard</h1>
      <div>
          {data ? createNoteCard() : ''}
        </div>
      <div className="card">
        <button onClick={handleButtonClick}>
          Get Random Chinese Words
        </button>
        <button onClick={handleToggleClick}>
          {isTraditional ? 'TRADITIONAL' : 'SIMPLIFIED'}
        </button>  
      </div>
    </>
  )
}

export default App
