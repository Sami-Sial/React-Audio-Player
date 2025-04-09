"use client";
import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import SearchBar from "./SearchBar";
import SongItem from "./SongItem";
import songs from "./songs.js";
import { SongState } from "../context/songContext.jsx";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function SongList() {
  const navigate = useNavigate();
  const {
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
  } = SongState();

  let allSongs;

  if (location.href.includes("favourites")) {
    allSongs = JSON.parse(localStorage.getItem("favouriteSongs"));
  } else if (location.href.includes("recently-played")) {
    allSongs = JSON.parse(localStorage.getItem("recentlyPlayedSongs"));
  } else if (location.href.includes("top-tracks")) {
    allSongs = JSON.parse(localStorage.getItem("topTracksSongs"));
  } else {
    allSongs = songs.songs;
  }

  useEffect(() => {
    setSongsToBeDisplayed(allSongs);
  }, [location.href]);

  // set initial song and audio
  let initialSong;
  useEffect(() => {
    initialSong = songsToBeDisplayed[0];

    if (audio) {
      audio.pause();
      setAudio(null);
      setSongCurrTime(0);
      setIsSongPlaying(false);
    }

    // navigate(`?song=${initialSong?.title}`);

    const songItems = document.querySelectorAll(".song-item");
    songItems.forEach((s) => {
      s.classList.remove("active-song-item");
    });

    document.querySelector(".song-item").classList.add("active-song-item");

    setSong({
      ...initialSong,
    });

    const newAudio = new Audio(initialSong.path);

    setAudio(newAudio);
  }, [songsToBeDisplayed]);

  // change song and audio on click
  const changeSong = (e, song) => {
    console.log(songsToBeDisplayed);
    if (audio) {
      audio.pause();
      setAudio(null);
      setSongCurrTime(null);
      setIsSongPlaying(false);
    }

    setSong({
      ...song,
    });
    console.log(song);

    const songItems = document.querySelectorAll(".song-item");
    songItems.forEach((item) => {
      item.classList.remove("active-song-item");
    });

    console.log(e.currentTarget);

    e.currentTarget.classList.add("active-song-item");

    const newAudio = new Audio(song.path);
    newAudio.play();
    setIsSongPlaying(true);

    setAudio(newAudio);
  };

  // update audio current time
  audio?.addEventListener("timeupdate", () => {
    setSongCurrTime(audio.currentTime);

    setProgress(songCurrTime);
    console.log(progress);
  });

  // store latest 5 recently played songs in local storage
  let playedSongs = [];
  let songTitle = new URLSearchParams(window.location.search).get("song");

  useEffect(() => {
    console.log("load");

    if (songTitle && isSongPlaying) {
      playedSongs =
        JSON.parse(localStorage.getItem("recentlyPlayedSongs")) || [];
      const songToBeAdded = songsToBeDisplayed.find(
        (song) => song.title === songTitle
      );

      if (playedSongs.length >= 4) {
        playedSongs.splice(4);
        playedSongs.unshift(songToBeAdded);
        localStorage.setItem(
          "recentlyPlayedSongs",
          JSON.stringify(playedSongs)
        );
      } else {
        playedSongs.unshift(songToBeAdded);
        localStorage.setItem(
          "recentlyPlayedSongs",
          JSON.stringify(playedSongs)
        );
      }
    }
  }, [songTitle]);

  return (
    <div className="mt-2">
      <div>
        <h4 className="text-white">For You</h4>
        <SearchBar />
      </div>
      <div className="mt-2">
        {songsToBeDisplayed?.map((song) => (
          <NavLink
            to={`?song=${song.title}`}
            style={{ textDecoration: "none", fontSize: "13px" }}
            className="d-flex align-items-center my-1 text-white song-item  px-1 py-1"
            onClick={(e) => changeSong(e, song)}
          >
            <SongItem
              image={song.image}
              title={song.title}
              artist={song.artist}
              duration={song.duration}
              path={song.path}
            />
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default SongList;
