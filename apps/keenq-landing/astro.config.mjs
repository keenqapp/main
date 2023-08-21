import { defineConfig } from 'astro/config';
import svelte from "@astrojs/svelte";

import partytown from "@astrojs/partytown";

const party = {
  config: {
    forward: ['dataLayer.push'],
  },
}

// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), partytown(party)],
  server: {
    port: 9990
  },
  experimental: {
    assets: true
  }
});
