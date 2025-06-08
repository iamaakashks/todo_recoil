import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react'; // If you're using React

export default defineConfig({
  plugins: [
    react(), // Add this if you're using React
    tailwindcss(),
  ],
});