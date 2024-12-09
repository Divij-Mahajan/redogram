import { Devvit, useState } from "@devvit/public-api";
import Home from "./pages/Home.js";
import Play from "./pages/Play.js";

export const Router: Devvit.CustomPostComponent =(_context) => {
    const [counter, setCounter] = useState(0);
    const [screen, setScreen] = useState("home");


    return (
      <vstack height="100%" width="100%" gap="medium" alignment="center middle">
        {
        (screen=="home")?<Home/>:
        (screen=="play")?<Play/>:
        <text>error</text>
        }
        <button appearance="primary" onPress={() => setScreen("play")}>
          Change
        </button>
      </vstack>
    );
  }