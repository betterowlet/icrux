import { defineConfig, envField } from 'astro/config';
import netlify from '@astrojs/netlify';
import svelte from '@astrojs/svelte';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
    integrations: [
        svelte(),
        react(),
        tailwind({
            applyBaseStyles: false
        })
    ],
    env: {
        schema: {
            CRUX_API_KEY: envField.string({ context: 'server', access: 'secret' }),
            CRUX_API_ORIGIN: envField.string({ context: 'server', access: 'secret' })
        }
    },
    output: 'server',
    adapter: netlify()
});
