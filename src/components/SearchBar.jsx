import React from "react";
import styled from "styled-components";
import songs from "./songs";
import { SongState } from "../context/songContext";

function SearchBar() {
  const { setSongsToBeDisplayed, songsToBeDisplayed } = SongState();

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

  // search songs
  const searchSongs = () => {
    const searchInput = document.querySelector("#search-input");
    const searchValue = searchInput.value.toLowerCase();

    const filteredSongs = allSongs.filter((song) =>
      song.title.toLowerCase().includes(searchValue)
    );

    setSongsToBeDisplayed(filteredSongs);
    searchInput.value = "";
  };

  return (
    <div className="bg-dark d-flex justify-content-between rounded p-1">
      <input
        id="search-input"
        type="text"
        placeholder="Search song by title"
        className="bg-dark border-0 text-white px-1 flex-grow-1"
      />
      <img
        className="px-1 border rounded mx-1"
        src="https://cdn.builder.io/api/v1/image/assets/40ceeeb9dd6840078a07bfb9b0e1f993/8670969a63ca2b311e9d57c3aecb641ee8d29675?placeholderIfAbsent=true"
        alt="Search Icon"
        onClick={searchSongs}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
}

export default SearchBar;
