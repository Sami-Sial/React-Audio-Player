"use client";
import React, { useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { HiSpeakerWave } from "react-icons/hi2";
import { HiMiniSpeakerXMark } from "react-icons/hi2";
import { TbBrandBluesky, TbPlayerTrackNextFilled } from "react-icons/tb";
import { TbPlayerTrackPrevFilled } from "react-icons/tb";
import { MdOutlinePlayCircle } from "react-icons/md";
import { FaRegPauseCircle } from "react-icons/fa";
import { SongState } from "../context/songContext";
import { useNavigate } from "react-router-dom";

function PlayerControls() {
  const {
    song,
    setSong,
    isSongPlaying,
    setIsSongPlaying,
    songCurrTime,
    setSongCurrTime,
    audio,
    setAudio,
    progress,
    setProgress,
    songsToBeDisplayed,
  } = SongState();
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const navigate = useNavigate();

  const playAudio = () => {
    audio.play();
    setIsSongPlaying(true);
  };

  const pauseAudio = () => {
    audio.pause();
    setIsSongPlaying(false);
  };

  const maxProgress = Number(song?.duration?.split(":").join(""));

  // add song to favourites - store in local storage
  const addSongToFavourites = () => {
    let favouriteSongs = [];

    if (!JSON.parse(localStorage.getItem("favouriteSongs"))) {
      favouriteSongs.push({ ...song });
      localStorage.setItem("favouriteSongs", JSON.stringify(favouriteSongs));
    } else {
      favouriteSongs = JSON.parse(localStorage.getItem("favouriteSongs"));
      console.log(favouriteSongs);

      let isAlredyAddedTofavourite = favouriteSongs.filter(
        (f) => f.id === song.id
      );
      console.log(isAlredyAddedTofavourite);

      if (isAlredyAddedTofavourite.length < 1) {
        favouriteSongs.push({ ...song });
        localStorage.setItem("favouriteSongs", JSON.stringify(favouriteSongs));
      } else {
        return;
      }
    }
  };

  // Play previous sonog
  const playPrevSong = () => {
    if (audio) {
      audio.pause();
      setAudio(null);
      setSongCurrTime(null);
    }

    const songItems = document.querySelectorAll(".song-item");
    songItems.forEach((item) => {
      item.classList.remove("active-song-item");
    });

    console.log(songsToBeDisplayed);

    let prevSong;

    if (song.id == songsToBeDisplayed[0].id) {
      prevSong = songsToBeDisplayed[songsToBeDisplayed.length - 1];
      setSong({ ...prevSong });
    } else {
      let prevSongs = songsToBeDisplayed?.filter((s) => s.id === song.id - 1);
      prevSong = prevSongs[0];
      setSong({ ...prevSong });
    }

    console.log(prevSong);

    songItems[prevSong.id - 1].classList.add("active-song-item");

    const newAudio = new Audio(prevSong.path);
    newAudio.play();
    setIsSongPlaying(true);

    setAudio(newAudio);
  };

  // Play next song
  const playNextSong = () => {
    if (audio) {
      audio.pause();
      setAudio(null);
      setSongCurrTime(null);
    }

    const songItems = document.querySelectorAll(".song-item");
    songItems.forEach((item) => {
      item.classList.remove("active-song-item");
    });

    let nextSong;
    if (song.id === songsToBeDisplayed.length) {
      nextSong = songsToBeDisplayed[0];
      setSong({ ...nextSong });
    } else {
      let nextSongs = songsToBeDisplayed?.filter((s) => s.id === song.id + 1);
      nextSong = nextSongs[0];
      setSong({ ...nextSong });
    }

    songItems[nextSong.id - 1].classList.add("active-song-item");

    console.log(nextSong);

    const newAudio = new Audio(nextSong.path);
    newAudio.play();
    setIsSongPlaying(true);

    setAudio(newAudio);
  };

  return (
    <div
      style={{
        height: "calc(100vh - 3rem)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "80%",
      }}
    >
      <div>
        <h3 className="text-white m-0">{song?.title}</h3>
        <h6 className="text-white" style={{ opacity: "0.7" }}>
          {song?.artist}
        </h6>
      </div>

      <div>
        <img
          style={{ width: "100%", height: "50vh" }}
          src={song?.image}
          alt="Album Cover"
        />
      </div>
      <div className="mt-3">
        <input
          type="range"
          min={0}
          max={maxProgress}
          style={{ width: "100%" }}
          value={progress}
          readOnly
          // onChange={(e) => progressChangeHandler(e)}
        />
      </div>
      <div
        style={{ color: "white", fontSize: "22px" }}
        className="d-flex justify-content-between align-items-center"
      >
        <HiDotsHorizontal
          title="Add to Favoutites"
          style={{ cursor: "pointer" }}
          onClick={addSongToFavourites}
        />

        <div
          style={{ color: "white", fontSize: "22px", gap: "1rem" }}
          className="d-flex align-items-center"
        >
          <TbPlayerTrackPrevFilled
            onClick={playPrevSong}
            style={{ cursor: "pointer" }}
          />
          <div style={{ color: "white", fontSize: "30px" }}>
            {isSongPlaying ? (
              <FaRegPauseCircle
                style={{ cursor: "pointer" }}
                onClick={() => pauseAudio()}
              />
            ) : (
              <MdOutlinePlayCircle
                style={{ cursor: "pointer" }}
                onClick={() => playAudio()}
              />
            )}
          </div>
          <TbPlayerTrackNextFilled
            onClick={playNextSong}
            style={{ cursor: "pointer" }}
          />
        </div>

        <div style={{ color: "white", fontSize: "22px" }}>
          {isAudioMuted ? (
            <HiMiniSpeakerXMark
              onClick={() => {
                audio.muted = false;
                setIsAudioMuted(false);
              }}
              style={{ cursor: "pointer" }}
            />
          ) : (
            <HiSpeakerWave
              onClick={() => {
                audio.muted = true;
                setIsAudioMuted(true);
              }}
              style={{ cursor: "pointer" }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default PlayerControls;
