import React from "react";
import Stack from "react-bootstrap/Stack";
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <Stack direction="vertical" gap={1}>
      <NavLink
        className={({ isActive }) =>
          isActive ? "active-nav-link" : "inactive-nav-link"
        }
        style={{ color: "white", textDecoration: "none", fontSize: "16px" }}
        to={"/"}
      >
        For You
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? "active-nav-link" : "inactive-nav-link"
        }
        style={{ textDecoration: "none", fontSize: "16px" }}
        to={"/top-tracks"}
      >
        Top Tracks
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? "active-nav-link" : "inactive-nav-link"
        }
        style={{ textDecoration: "none", fontSize: "16px" }}
        to={"/favourites"}
      >
        Favourites
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? "active-nav-link" : "inactive-nav-link"
        }
        style={{ textDecoration: "none", fontSize: "16px" }}
        to={"/recently-played"}
      >
        Recently Played
      </NavLink>
    </Stack>
  );
}

export default Navigation;
