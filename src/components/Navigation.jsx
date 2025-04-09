import React from "react";
import Stack from "react-bootstrap/Stack";
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <div id="navigation">
      <NavLink
        className={({ isActive }) =>
          isActive ? "active-nav-link" : "inactive-nav-link"
        }
        style={{ color: "white", textDecoration: "none" }}
        to={"/"}
      >
        For You
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? "active-nav-link" : "inactive-nav-link"
        }
        style={{ textDecoration: "none" }}
        to={"/top-tracks"}
      >
        Top Tracks
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? "active-nav-link" : "inactive-nav-link"
        }
        style={{ textDecoration: "none" }}
        to={"/favourites"}
      >
        Favourites
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? "active-nav-link" : "inactive-nav-link"
        }
        style={{ textDecoration: "none" }}
        to={"/recently-played"}
      >
        Recently Played
      </NavLink>
    </div>
  );
}

export default Navigation;
