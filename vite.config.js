import { mergeConfig } from "vite";
import TypeFile from "./plugins/type-file";
// import reactRefresh from "@vitejs/plugin-react-refresh";
import componentsTemplate from "./plugins/components-template/src";
import cdnExternals from "vite-plugin-cdn-externals";
import mdjsx from "./plugins/markdown-jsx";

const cwd = process.cwd();

let config = {};
try {
  config = require(`${cwd}/vite.config.js`).default;
} catch (e) {}

// https://vitejs.dev/config/
export default mergeConfig(
  {
    base: process.env.VITE_BASE_HOST || "/",
    build: {
      target: "esnext",
      outDir: "dist/stories",
      manifest: true,
    },
    server: {
      cors: true,
    },
    resolve: {
      alias: [
        {
          find: /^~.+/,
          replacement: (val) => {
            return val.replace(/^~/, "");
          },
        },
      ],
    },
    plugins: [
      componentsTemplate(),
      TypeFile(),
      mdjsx(),
      cdnExternals({
        "@alifd/next": {
          windowName: "Next",
          find: /^@alif[e|d]\/next$/,
        },
        react: "React",
        "react-dom": {
          windowName: "ReactDOM",
          find: /^react-dom$/,
        },
        moment: "moment",
        "moment-timezone": "moment",
      }),
    ],
  },
  config
);
