import { defineConfig } from 'vite'
import { vite2Ext } from 'apite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vite2Ext({
            dir: 'src/mock',
            port: 3000,
            prefix: '/api',
            resp: {
                code: ['code', 100], // 成功字段，默认返回码
                fail: ['fail', 400], // 失败信息，默认返回码
                msg: ['msg', 'ok'], // 信息字段，默认值
                result: ['result'], // 结果字段
                total: ['total', 0], // 列表总数字段，默认值
            },
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
    // base: process.env.MODE === 'development' ? '' : '/admin/',
    server: {
        port: 1212,
        proxy: {
            '/api': {
                target: 'https://adminapi.wmelon.cn/sha',
                prependPath: false,
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, 'xxx'),
            },
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    'element-plus': ['element-plus'],
                },
            },
        },
    },
})
