import React, { act, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { SongState } from "../context/songContext";

function SongItem({ image, title, artist, duration, path }) {
  return (
    <>
      <div className="d-flex flex-grow-1">
        <img
          style={{ marginRight: "10px" }}
          width={40}
          height={40}
          src={image}
          alt={`${title} album cover`}
        />
        <div>
          <p style={{ fontSize: "16px" }} className="m-0 text-white">
            {title}
          </p>
          <p
            style={{ opacity: "0.7", fontSize: "13px" }}
            className="m-0 text-white"
          >
            {artist}
          </p>
        </div>
      </div>
      <p>{duration}</p>
    </>
  );
}

export default SongItem;
