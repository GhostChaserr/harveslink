import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  return {
    // ------------------------------------------
    // Core settings
    // ------------------------------------------
    root: __dirname,
    cacheDir: '../../node_modules/.vite/apps/client-app',

    // Dev server
    server: {
      port: 4200,
      host: 'localhost',
    },

    // Preview server
    preview: {
      port: 4300,
      host: 'localhost',
    },

    // ------------------------------------------
    // Plugins
    // ------------------------------------------
    plugins: [
      react(), // React SWC plugin
      nxViteTsPaths(), // Nx TypeScript path aliases
      nxCopyAssetsPlugin(['*.md']), // Example Nx asset copy
      // Plugin for visualizing bundle size and structure
      visualizer({
        filename: 'stats.html', // Output file
        template: 'treemap',    // 'treemap', 'sunburst', 'network', etc.
        gzipSize: true,         // Show gzip sizes
        brotliSize: true,       // Show brotli sizes
      }),
    ],

    // ------------------------------------------
    // Build optimization settings
    // ------------------------------------------
    build: {
      outDir: '../../dist/apps/client-app',
      emptyOutDir: true,

      // Target modern browsers if possible
      target: 'esnext',

      // Whether to generate sourcemaps. Usually off for production
      sourcemap: !isProduction ? true : false,

      // 'esbuild' is Vite's default minifier, fast and effective.
      // You can try 'terser' if you need special compress options.
      minify: 'esbuild',

      // Display compressed size info in the CLI output
      reportCompressedSize: true,

      // If you have CommonJS dependencies that export ES modules, allow their transformation
      commonjsOptions: {
        transformMixedEsModules: true,
      },

      // Manual chunk splitting for better caching and clarity
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom'],
            apollo: ['@apollo/client'],
            mantine: ['@mantine/core', '@mantine/hooks'],
            // Add other large libs as needed
          },
        },
      },
    },

    // Avoid issues with Vitest references in production
    define: {
      'import.meta.vitest': undefined,
    },
  };
});
