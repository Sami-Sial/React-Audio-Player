"use client";
import React from "react";
import styled from "styled-components";
import Navigation from "./Navigation";
import SongList from "./SongList";
import PlayerControls from "./PlayerControls";
import { Container, Col, Row } from "react-bootstrap";
import { GiHamburgerMenu } from "react-icons/gi";
import SongProvider from "../context/songContext";

function Player() {
  return (
    <SongProvider>
      <Container
        fluid
        style={{ height: "100vh" }}
        className="bg-black px-2 py-3"
      >
        <div id="mobile-screen-navbar">
          <img
            className="mb-2"
            src="https://cdn.builder.io/api/v1/image/assets/40ceeeb9dd6840078a07bfb9b0e1f993/d736870f4881cb77a84302238e6a16af84a38412?placeholderIfAbsent=true"
            alt="Music Player Logo"
            height={30}
            width={100}
          />
        </div>

        <Row>
          <Col id="sidebar" md="2" style={{ width: "200px" }}>
            <img
              className="mb-2"
              src="https://cdn.builder.io/api/v1/image/assets/40ceeeb9dd6840078a07bfb9b0e1f993/d736870f4881cb77a84302238e6a16af84a38412?placeholderIfAbsent=true"
              alt="Music Player Logo"
              height={50}
              width={100}
            />
            <div className="px-2">
              <Navigation />
            </div>
          </Col>

          <Col id="song-list" md="4">
            <SongList />
          </Col>

          <Col
            id="player"
            md="5"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <PlayerControls />
          </Col>
        </Row>
      </Container>
    </SongProvider>
  );
}

export default Player;
