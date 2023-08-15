import { useEffect, useRef, useState } from "react";
import "./App.css";
import transcript from "./dummyData";

function App() {
  const playerRef:any = useRef<HTMLAudioElement>(null);
  const wordsRef:any = useRef<HTMLSpanElement>(null);
  // const [prev, setPrev] = useState<any>(null);
  useEffect(() => {
    const onTimeUpdate = () => {
      const activeWordIndex = transcript.blocks.findIndex((word) => {
        return word.start > playerRef.current.currentTime;
      });
      console.log(activeWordIndex);
      // let i = 0;
      // while(i<=activeWordIndex-2){
      //   const prevNodes = wordsRef.current.childNodes[i];
      //   prevNodes.classList.remove('active-word');
      //   i++;
      // }
      if(activeWordIndex >= 2){
        let prev = wordsRef.current.childNodes[activeWordIndex-2];
        prev.classList.remove('active-word');
      }
      const wordElement:any = wordsRef && wordsRef.current && wordsRef.current.childNodes[activeWordIndex-1];
      if(wordElement){
        wordElement.classList.add('active-word');
      }
    };
    playerRef.current.addEventListener("timeupdate", onTimeUpdate);
    return () => playerRef.current.removeEventListener(
      "timeupdate",
        onTimeUpdate
    );
  }, []);
  
  const handleSelected = (param: number) => {
    console.log(window.getSelection()?.toString());
  }

  return (
    <>
      <h1>{transcript.title}</h1>
      {/* <div onDoubleClick={() => handleSelected(1)} onMouseUp={() => handleSelected(2)} onClick={() => handleSelected(4)}>
        {transcript.blocks.map((item: any, index: number) => { 
          return(
          <div>
            <p>block- {`${index}`}</p>
            <p 
            key={index}>{item.text}
            </p>
          </div>)
        })}
      </div> */}

      <ol ref={wordsRef}>
        {transcript.blocks.map((word, i) => <li key={i}>{word.text}</li>)}
      </ol>
      
      <audio controls controlsList="nodownload" style={{ width: '100vw'}} ref={playerRef}>
        <source src={transcript.audioUrl} type="audio/ogg"  />
        {/* <source src={} type="audio/mpeg" /> */}
      </audio>
    </>
  );
}

export default App;
