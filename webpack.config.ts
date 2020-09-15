import path from "path";
import htmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";

function setMode() {
  // process.env 属性会返回包含用户环境的对象。
  const { RUN_ENV } = process.env;

  console.log(RUN_ENV);

  switch (RUN_ENV) {
    case "dev":
      return "development";
    case "prod":
      return "production";
    default:
      return "development";
  }
}

export default function () {
  return {
    mode: setMode(),
    entry: "./src/index",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "saxios.js",
      library: "MyLibrary",
      libraryTarget: "umd",
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env", "@babel/preset-typescript"],
              },
            },
          ],
        },
      ],
    },
    resolve: {
      // 我们导入ts 等模块一般不写后缀名，webpack 会尝试使用这个数组提供的后缀名去导入
      extensions: [".js", ".tsx", ".ts", ".json"],
      alias: {
        // 替换 react-dom 成 @hot-loader/react-dom 以支持 react hooks 的 hot reload
        "react-dom": "@hot-loader/react-dom",
        "@": path.resolve(__dirname, "./src"),
      },
    },
    devtool: "source-map",
    plugins: [
      new htmlWebpackPlugin({
        template: path.resolve(__dirname, "./public/index.html"),
      }),
      new webpack.NoEmitOnErrorsPlugin(),
    ],
    devServer: {
      open: true,
      contentBase: "./",
      compress: true,
      port: 9000,
      hot: true,
    },
  };
}
