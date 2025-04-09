import Player from "./components/Player";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import "./styles/style.css";

const router = createBrowserRouter([
  { path: "/", element: <Player /> },
  { path: "/favourites", element: <Player /> },
  { path: "/recently-played", element: <Player /> },
  { path: "/top-tracks", element: <Player /> },
]);

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
