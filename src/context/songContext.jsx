import { createContext, useContext, useEffect, useState } from "react";
import songs from "../components/songs.js";

const SongContext = createContext(null);

const SongProvider = (props) => {
  const [song, setSong] = useState(null);
  const [songCurrTime, setSongCurrTime] = useState(null);
  const [isSongPlaying, setIsSongPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const [progress, setProgress] = useState(0);
  const [songsToBeDisplayed, setSongsToBeDisplayed] = useState(songs.songs);

  return (
    <SongContext.Provider
      value={{
        song,
        setSong,
        songCurrTime,
        setSongCurrTime,
        isSongPlaying,
        setIsSongPlaying,
        audio,
        setAudio,
        progress,
        setProgress,
        songsToBeDisplayed,
        setSongsToBeDisplayed,
      }}
    >
      {props?.children}
    </SongContext.Provider>
  );
};

export const SongState = () => {
  return useContext(SongContext);
};

export default SongProvider;
