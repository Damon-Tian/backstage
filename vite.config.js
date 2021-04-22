import { defineConfig } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        viteMockServe({
            supportTs: false, // 关闭ts
            mockPath: 'mock',
            localEnabled: true,
        }),
    ],
    resolve: {
        alias: { '@': path.resolve(__dirname, './src') },
    },
    css: {
        preprocessorOptions: {
            less: {
                additionalData: '@import "./src/assets/style/index.less";',
            },
        },
    },
})
