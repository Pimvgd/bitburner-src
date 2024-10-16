import React from "react";
import ReactDOM from "react-dom";

import { TTheme as Theme, ThemeEvents, refreshTheme } from "./Themes/ui/Theme";
import { LoadingScreen } from "./ui/LoadingScreen";
import { initElectron } from "./Electron";

import { newRemoteFileApiConnection } from "./RemoteFileAPI/RemoteFileAPI";

import "./css/font.css";

initElectron();
globalThis.React = React;
globalThis.ReactDOM = ReactDOM;
ReactDOM.render(
  <Theme>
    <LoadingScreen />
  </Theme>,
  document.getElementById("root"),
);

setTimeout(newRemoteFileApiConnection, 2000);

function rerender(): void {
  refreshTheme();
  ReactDOM.render(
    <Theme>
      <LoadingScreen />
    </Theme>,
    document.getElementById("root"),
  );
}

(function () {
  ThemeEvents.subscribe(rerender);
})();

(function () {
  if (process.env.NODE_ENV === "development" || location.href.startsWith("file://")) return;
  window.onbeforeunload = function () {
    return "Your work will be lost.";
  };
})();

(function () {
  window.print = () => {
    throw new Error("You accidentally called window.print instead of ns.print");
  };
})();

(function () {
  window.prompt = () => {
    throw new Error("You accidentally called window.prompt instead of ns.prompt");
  };
})();
