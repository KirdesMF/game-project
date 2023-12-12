import { defineConfig } from "astro/config";
import pandacss from "@pandacss/astro";

import qwikdev from "@qwikdev/astro";

// https://astro.build/config
export default defineConfig({
  integrations: [pandacss(), qwikdev()]
});