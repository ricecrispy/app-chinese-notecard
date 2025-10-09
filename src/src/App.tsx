import { useEffect, useState } from 'react';
import './App.css';

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
      <h2 className='text-4xl p-2'>{characters}</h2>
      <h2 className='text-4xl p-2'>{pinyin}</h2>
      <h2 className='text-xl p-2'>{meaning}</h2>
    </div>
  }

  useEffect(() => {
    handleButtonClick();
  }, []);

  return (
    <>
      <div className="container-xs md:container-md lg:container-lg xl:container-xl">
        <div>
          <fieldset className="float-right fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4">
            <legend className="fieldset-legend">Character Sets</legend>
            <label className="label">
              <input type="checkbox" defaultChecked className="toggle toggle-primary" onChange={handleToggleClick}/>
              {isTraditional ? 'TRADITIONAL' : 'SIMPLIFIED'}
            </label>
          </fieldset>
        </div>
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">Chinese Notecard</h1>
              <div className="divider"></div>
              <div className='p-4'>
                {data ? createNoteCard() : ''}
              </div>
              <div className="divider"></div>
              <button className='btn btn-primary rounded-full' onClick={handleButtonClick}>
                Get Random Chinese Words
              </button>
            </div>
          </div>
        </div>
        <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content p-10">
          <nav>
            <h6 className="footer-title">Resources</h6>
            <a className='link link-hover' href='https://www.mdbg.net/chinese/dictionary?page=cedict' target='_blank'>Chinese Dictionary Data</a>
            <a className="link link-hover" href='https://yoyochinese.com/chinese-learning-tools/Mandarin-Chinese-pronunciation-lesson/pinyin-chart-table' target='_blank'>Interactive Pinyin Chart</a>
          </nav>
          <aside>
            <p>
              Chinese Notecard
              <br />
              Practice Chinese Pronunciation
              <br />
              Do It Now
            </p>
          </aside>
        </footer>
      </div>
    </>
  )
}

export default App
