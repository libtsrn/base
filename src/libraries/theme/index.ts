// tasuren's Website - テーマ


// 実験ができるようにウィンドウを拡張。
interface MyWindow extends Window { resetTheme(): void; };
/** @ts-ignore */
declare var window: MyWindow;


// 色々準備。
export type Theme = "dark" | "light";
export type Setting = Theme | "auto";
export const EMOJIS: {[theme: string]: string} = {
  auto: "🌓", dark: "🌙", light: "☀️"
};


// 設定変更用のAPI。
/** テーマの設定を取得します。まだ設定がなければ`"auto"`が返されます。 */
export function get(): Setting {
  return localStorage.getItem("theme") as Setting || "auto"
};
/** テーマを設定します。 */
export function set(setting: Setting): Setting {
  localStorage.setItem("theme", setting); return setting;
};
/**
 * テーマの設定が存在する場合、その設定を削除します。
 * デバッグ用として、`window.resetTheme`からこの関数を扱えるようにしています。
 */
export function reset() {
  if (localStorage.getItem("theme"))
    localStorage.removeItem("theme");
};
window.resetTheme = reset;

/** 渡されたテーマの次のテーマを検出します。 */
export function roll(setting: Setting): Setting {
  if (setting == "auto") setting = "dark";
  else if (setting == "dark") setting = "light";
  else setting = "auto";
  return setting;
}


// highlight.jsのスタイルデータの取り扱いのためのAPI。
export let styleLinks = null;
/** コードブロックの配色のテーマ切り替えをします。 */
export function updateHighlightStyle(theme: Theme) {
  if (styleLinks == null) {
    let element = document.getElementById("highlight-style-links");
    if (element) styleLinks = JSON.parse(element.innerText);
    else styleLinks = {};
  };
  if (theme in styleLinks) {
    var link = document.getElementById("highlight-style") as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.rel = "stylesheet";
      link.id = "highlight-style";
      document.head.append(link);
    };
    if (link.getAttribute("data-theme") != theme) {
      link.href = styleLinks[theme];
      link.setAttribute("data-theme", theme);
    };
  };
};

export var emoji = EMOJIS.dark;
/** 絵文字を更新します。 */
export function updateEmoji(setting: Setting) {
  emoji = EMOJIS[setting];
  dispatchEvent(new CustomEvent("updateemoji", { detail: EMOJIS[setting] }));
};
/** テーマを適用します。 */
export function effect(
  setting?: Setting, theme?: Theme,
  enableUpdateHighlightStyle: boolean = true
) {
  if (theme) document.documentElement
    .setAttribute("data-theme", theme);
  if (setting) updateEmoji(setting);
  if (enableUpdateHighlightStyle) updateHighlightStyle(theme);
};
/** 設定を元にテーマを検出します。 */
export function detectTheme(setting: Setting): Theme {
  if (setting == "auto")
    return window.matchMedia
      ("(prefers-color-scheme: dark)")
        .matches ? "dark" : "light";
  else return setting;
};


/** テーマ状態を初期状態とします。 */
export function initialize(updateTheme: boolean = true) {
  // 前の設定を引き継ぐ。
  let setting = get();
  // 初期化する。
  let theme = detectTheme(setting);
  if (updateTheme) {
    if (theme == "light") effect(setting, "light", false);
    else if (setting == "auto") updateEmoji(setting);
  } else if (setting != "dark") updateEmoji(setting);
  updateHighlightStyle(theme);
};