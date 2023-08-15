import * as React from "react";

import { useEffect, useRef, useState } from "react";
import "./App.css";
import transcript from "./dummyData";

function App() {
  const [current, setCurrent] = useState<any>(null);
  const [prevData, setPrevData] = useState<any>(null);
  const playerRef: any = useRef<HTMLAudioElement>(null);
  const wordsRef: any = useRef<HTMLSpanElement>(null);

  // const [prev, setPrev] = useState<any>(null);
  useEffect(() => {
    const onTimeUpdate = () => {
      const activeWordIndex = transcript.blocks.findIndex((word) => {
        return word.start > playerRef.current.currentTime;
      });
      console.log(activeWordIndex);
      // let i = 0;
      // while (i <= activeWordIndex - 2) {
      //   const prevNodes = wordsRef.current.childNodes[i];
      //   prevNodes.classList.remove("active-word");
      //   i++;
      // }
      if (activeWordIndex >= 2) {
        let prev = wordsRef.current.childNodes[activeWordIndex - 2];
        prev.classList.remove("active-word");
      }
      const wordElement: any =
        wordsRef &&
        wordsRef.current &&
        wordsRef.current.childNodes[activeWordIndex - 1];
      if (wordElement) {
        wordElement.classList.add("active-word");
        console.log(wordElement);
      }
    };
    playerRef.current.addEventListener("timeupdate", onTimeUpdate);
    return () =>
      playerRef.current.removeEventListener("timeupdate", onTimeUpdate);
  }, []);

  const handleSelected = (param: number, data: any) => {
    console.log("data", param, data);
    if (current !== null) {
      const activeWordIndex = transcript.blocks.findIndex((value) => {
        return value == current;
      });
      const prevNodes = wordsRef.current.childNodes[activeWordIndex];
      console.log("prevNode", prevNodes);
      prevNodes.classList.remove("active-word");
    }

    if (data != current || current === null) {
      const activeWordIndex = transcript.blocks.findIndex((value) => {
        return value == data;
      });
      console.log("value", activeWordIndex);
      if (activeWordIndex > -1) setCurrent(data);
      console.log(
        "playerRef.current.currentTime",
        playerRef.current.currentTime
      );
      console.log("playerRef.current", playerRef.current);
      playerRef.current.currentTime = data.start;
      playerRef.current.play();
    }
  };

  return (
    <>
      <h1>{transcript.title}</h1>
      <div
        ref={wordsRef}
        // onDoubleClick={() => handleSelected(1)}
        // onMouseUp={() => handleSelected(2)}
        // onClick={() => handleSelected(4)}
      >
        {transcript.blocks.map((item: any, index: number) => {
          return (
            <p
              key={index}
              // onDoubleClick={() => handleSelected(1, item)}
              // onMouseUp={() => handleSelected(2, item)}
              onClick={() => handleSelected(4, item)}
            >
              {item.text}
            </p>
          );
        })}
      </div>

      {/* <ol ref={wordsRef}>
        {transcript.blocks.map((word, i) => <li key={i}>{word.text}</li>)}
      </ol>
       */}
      <audio
        controls
        controlsList="nodownload"
        style={{ width: "100vw", position: "sticky", bottom: 0 }}
        ref={playerRef}
      >
        <source src={transcript.audioUrl} type="audio/ogg" />
        {/* <source src={} type="audio/mpeg" /> */}
      </audio>
    </>
  );
}

export default App;
