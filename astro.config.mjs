/* tasuren.xyz - Astro's Config */

import { defineConfig } from 'astro/config';
import prefetch from "@astrojs/prefetch";
import sitemap from "@astrojs/sitemap";

import { setDefaultOptions } from 'date-fns';
import jaLocale from "date-fns/locale/ja";


const DEFAULT_LAYOUT = '/src/layouts/Main.astro';
function setDefaultLayout() {
  return function (_, file) {
    const {
      frontmatter
    } = file.data.astro;
    if (!frontmatter.layout) frontmatter.layout = DEFAULT_LAYOUT;
  };
};


// https://astro.build/config
export default defineConfig({
  site: "https://tasuren.xyz",
  base: "/",
  markdown: {
    remarkPlugins: [setDefaultLayout]
  },
  experimental: {
    assets: true
  },
  integrations: [prefetch(), sitemap()]
});


// デフォルトのdate-fnsの言語設定を日本語にする。 
setDefaultOptions({
  locale: jaLocale
});