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
  const [isCopyButtonClicked, setIsCopyButtonClicked] = useState(false);
  const [isCollapsedOpen, setIsCollapseOpen] = useState(false);

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
    setIsCopyButtonClicked(false);
    setIsCollapseOpen(false);
  }

  function handleToggleClick() {
    setIsTraditional(!isTraditional);
    console.log(isTraditional);
  }

  function handleCopyButtonClick(textToCopy: string) {
    navigator.clipboard.writeText(textToCopy);
    setIsCopyButtonClicked(true);
  }

  function createNoteCard() {
    if (data === null || data === undefined) {
      return <div></div>;
    }
    const characters = isTraditional ? data.traditional : data?.simplified;
    const pinyin = data.pinyin;
    const meaning = data.meaning;

    return <div className="collapse collapse-arrow bg-base-100 border-base-300 border">
      <input type='checkbox' checked={isCollapsedOpen} onChange={() => setIsCollapseOpen(!isCollapsedOpen)} />
      <div className="collapse-title text-left text-4xl font-semibold after:start-5 after:end-auto pe-4 ps-12">{characters}</div>
      <div className="collapse-content text-left text-sm">
        <h2 className='text-4xl p-2'>{pinyin}</h2>
        <h2 className='text-xl p-2'>{meaning}</h2>
        <button className='btn btn-secondary rounded-full' onClick={() => handleCopyButtonClick(characters)}>
          {isCopyButtonClicked ? "Copied! ✅" : `Copy ${characters} to clipboard`}
        </button>
      </div>
    </div>
  }

  useEffect(() => {
    handleButtonClick();
  }, []);

  return (
    <>
      <div>
        <fieldset className="float-right fieldset bg-base-100 border-base-300 rounded-box w-64 border">
          <legend className="fieldset-legend">Character Sets</legend>
          <label className="label">
            <input type="checkbox" defaultChecked className="toggle toggle-primary" onChange={handleToggleClick} />
            {isTraditional ? 'Traditional' : 'Simplified'}
          </label>
        </fieldset>
      </div>

      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Chinese Notecard</h1>
            <div className="divider"></div>
            {data ? createNoteCard() : ''}
            <div className="divider"></div>
            <button className='btn btn-primary rounded-full' onClick={handleButtonClick}>
              Get Random Chinese Words
            </button>
          </div>
        </div>
      </div>

      <div className="toast">
        <div className="alert alert-info">
          <a className='link link-hover' href='https://github.com/ricecrispy'>My GitHub</a>
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
            Do It Now 👵
          </p>
        </aside>
      </footer>
    </>
  )
}

export default App
