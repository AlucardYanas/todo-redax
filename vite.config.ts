import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { compression } from 'vite-plugin-compression2';

const isTest = process.env.NODE_ENV === 'test';

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: isTest
        ? {}
        : {
            plugins: [
              ['@emotion/babel-plugin', { sourceMap: false }],
              ['transform-react-remove-prop-types', { removeImport: true }],
            ],
            presets: [
              ['@babel/preset-env', { modules: false }],
              ['@babel/preset-react', { runtime: 'automatic', importSource: '@emotion/react' }],
            ],
          },
    }),
    !isTest &&
      compression({
        algorithm: 'brotliCompress',
        exclude: [/\.(br)$/, /\.(gz)$/],
        deleteOriginalAssets: false,
      }),
  ].filter(Boolean),
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
      },
    },
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    cssCodeSplit: true,
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-chakra': ['@chakra-ui/react', '@emotion/react', '@emotion/styled'],
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-redux': ['@reduxjs/toolkit', 'react-redux'],
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log'],
        passes: 3,
        toplevel: true,
        pure_getters: true,
        unsafe: true,
        unsafe_math: true,
        unsafe_methods: true,
      },
      mangle: {
        toplevel: true,
        properties: {
          regex: /^_/,
        },
      },
      format: {
        comments: false,
      },
    },
    sourcemap: false,
    assetsInlineLimit: 4096,
    emptyOutDir: true,
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    include: [
      '@chakra-ui/react',
      '@emotion/react',
      '@emotion/styled',
      'react-router-dom',
      '@reduxjs/toolkit',
    ],
  },
});
