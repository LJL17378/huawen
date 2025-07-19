import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import AutoImport from "astro-auto-import";
import { defineConfig, squooshImageService } from "astro/config";
import remarkCollapse from "remark-collapse";
import remarkToc from "remark-toc";
import config from "./src/config/config.json";
import icon from "astro-icon";
import partytown from "@astrojs/partytown";
import vercel from "@astrojs/vercel/serverless";

export default defineConfig({
  output: 'server',
  adapter: vercel({
    // runtime: 'edge',  // 使用边缘运行时
    // 或者使用：
    runtime: 'nodejs20.x',

    // 可选：添加额外配置
    functions: {
      // 确保渲染函数有足够资源
      memory: 1024,
      maxDuration: 15
    },
    webAnalytics: {
      enabled: true
    }
  }),
vite: {
    server: {
      host: '0.0.0.0', // 允许外部访问
      port: 4321,
      allowedHosts: [
        'oumioumi.cn',
        'localhost',
        '127.0.0.1'
      ]
    }
  },
  site: config.site.base_url,
  base: "/",
  trailingSlash: config.site.trailing_slash ? "always" : "never",
  image: {
    service: squooshImageService()
  },
  devToolbar: {
    enabled: false
  },
  integrations: [
    react(),
    sitemap(),
    tailwind({
      config: {
        applyBaseStyles: false
      }
    }),
    AutoImport({
      imports: []
    }),
    mdx(),
    icon({
      include: {
        tabler: ['*']
      }
    }),
    partytown({
      config: {
        debug: true,
        forward: ['dataLayer.push']
      }
    })
  ],
  markdown: {
    remarkPlugins: [remarkToc, [remarkCollapse, {
      test: "Table of contents"
    }]],
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true
    },
    extendDefaultPlugins: true
  }
});
