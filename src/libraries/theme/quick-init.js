// 純粋なJavaScriptによる、背景色の変更をするプログラムです。
// `./index.ts`の`initialize`関数のみでは画面の読み込み時に点滅する場合に、このスクリプトをheadタグに配置して点滅を防ぎましょう。
var theme = localStorage.getItem("theme") || "auto";
if (theme == "auto") theme = window.matchMedia
  ("(prefers-color-scheme: dark)").matches ? "dark" : "light";
if (theme != "dark") document.documentElement
  .setAttribute("data-theme", theme)