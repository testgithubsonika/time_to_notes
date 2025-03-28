import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    root: './', // Ensure this points to the correct root directory
    build: {
        outDir: 'dist', // Ensure this matches your output directory
    },
});
