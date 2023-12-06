import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
// import path from 'path';
// import { Plugin as importToCDN } from 'vite-plugin-cdn-import'
// import AutoImport from 'unplugin-auto-import/vite'
// import externalGlobals from 'rollup-plugin-external-globals'

// const externalGlobalsObj = {
//   vue: 'Vue',
//   'vue-demi': 'VueDemi',
//   'vue-router': 'VueRouter',
//   'element-plus': 'ElementPlus'
// }
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  let env = loadEnv(mode, process.cwd());
  console.log(loadEnv(mode, process.cwd()));
  
  return {
    plugins: [
      // legacy({
      //   targets:['defaults']
      // }),
      vue({
        // reactivityTransform:true
      }),
      // importToCDN({
      //   modules:[
      //     {
      //       name:'vue',
      //       var:'Vue',
      //       path:'https://cdn.bootcdn.net/ajax/libs/vue/3.2.47/vue.cjs.js'
      //     },
      //     {
      //       name: 'vue-demi',
      //       var: 'VueDemi',
      //       path: 'https://cdn.bootcdn.net/ajax/libs/vue-demi/0.14.0/index.iife.js'
      //     },
      //     {
      //       name: 'vue-router',
      //       var: 'VueRouter',
      //       path: 'https://cdn.bootcdn.net/ajax/libs/vue-router/4.1.6/vue-router.cjs.js'
      //     },
      //     {
      //       name: 'element-plus',
      //       var: 'ElementPlus',
      //       path: 'https://cdn.bootcdn.net/ajax/libs/element-plus/2.3.3/index.full.js',
      //       css:'https://cdn.bootcdn.net/ajax/libs/element-plus/2.3.3/index.css'
      //     },
      //   ]
      // }),
      // AutoImport({
      //   imports:['vue','vue-router'],
      //   dts:'src/auto-import.d.ts'
      // }),
      // {
      //   ...externalGlobals(externalGlobalsObj),
      //   enforce:'post',
      //   apply:'build'
      // }
    ],
    base: './',
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://syt.atguigu.cn',
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/api/, ''),
        },
      }
    },

    // server: {
    //   proxy: {
    //     [env.VITE_APP_BASE_API]: {
    //       target: env.VITE_SERVE,
    //       changeOrigin: true,
    //       // rewrite: (path) => path.replace(/^\/api/, ''),
    //     },
    //   }
    // },

    // build:{
    //   rollupOptions:{
    //     external: ['vue', 'vue-router','element-plus']
    //   }
    // }
  }
})

