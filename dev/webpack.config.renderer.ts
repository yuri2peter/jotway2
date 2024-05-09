// https://webpack.docschina.org/concepts/
import { Configuration, DefinePlugin } from 'webpack';
import {
  rendererDistPath,
  rendererSrcIndexPath,
  rendererSrcHtmlPath,
  commonAssetsPath,
  rendererAssetsPath,
  srcPath,
} from '../src/common/paths.project';
import TsconfigPathsPlugins from 'tsconfig-paths-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import {
  DEV_RENDERER_PORT,
  SERVER_PORT,
  IS_DEV,
  DEV_RENDERER_ALLOWED_ALL_HOSTS,
  CHII_PORT,
  USE_WEB_SERVER,
  USE_SOCKET,
  USE_CHII,
  OPEN_BROWSER_AFTER_WEB_DEV_START,
  OPEN_CHII_AFTER_WEB_DEV_START,
} from '../src/common/config';

const config: Configuration = {
  entry: rendererSrcIndexPath,
  output: {
    path: rendererDistPath,
    filename: '[name].[contenthash].js',
    publicPath: IS_DEV ? '/' : './',
  },
  stats: 'errors-only',
  target: ['web', 'electron-renderer'],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
        exclude: /\.module\.css$/,
      },
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
          'postcss-loader',
        ],
        include: /\.module\.css$/,
      },
      {
        test: /\.svg$/,
        use: 'file-loader',
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'image/png',
            },
          },
        ],
      },
      {
        test: /\.jpg$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'image/jpg',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.platform': '"browser"',
      process: '{env:{}}',
    }),
    new CopyPlugin({
      patterns: [
        { from: commonAssetsPath, to: 'assets' },
        { from: rendererAssetsPath, to: 'assets' },
      ],
    }),
    new CompressionPlugin({}),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: rendererSrcHtmlPath,
    }),
    // @ts-ignore
    new LodashModuleReplacementPlugin(),
    IS_DEV ? false : new CleanWebpackPlugin(),
  ],
  devtool: IS_DEV ? 'inline-source-map' : false,
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    modules: [srcPath, 'node_modules'],
    // There is no need to add aliases here, the paths in tsconfig get mirrored
    plugins: [new TsconfigPathsPlugins()],
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  devServer: {
    port: DEV_RENDERER_PORT,
    open: (() => {
      const target: string[] = [];
      if (OPEN_BROWSER_AFTER_WEB_DEV_START) {
        target.push('http://127.0.0.1:' + DEV_RENDERER_PORT);
      }
      if (OPEN_CHII_AFTER_WEB_DEV_START) {
        target.push('http://127.0.0.1:' + CHII_PORT + '/chii');
      }
      return {
        target,
      };
    })(),
    hot: true,
    watchFiles: [
      'src/common/**/*',
      'src/renderer/**/*',
      'dev/webpack.config.renderer.ts',
    ],
    headers: { 'Access-Control-Allow-Origin': '*' },
    allowedHosts: DEV_RENDERER_ALLOWED_ALL_HOSTS ? 'all' : 'auto',
    static: [
      {
        directory: commonAssetsPath,
        publicPath: '/assets',
      },
      {
        directory: rendererAssetsPath,
        publicPath: '/assets',
      },
    ],
    historyApiFallback: true,
    client: { progress: true },
    proxy: proxyConfigParser({
      // API请求代理
      '/api': [
        {
          target: `http://127.0.0.1:${SERVER_PORT}`,
        },
        USE_WEB_SERVER,
      ],
      // socket推送
      '/socket.io': [
        {
          target: `ws://127.0.0.1:${SERVER_PORT}`,
          ws: true,
        },
        USE_SOCKET,
      ],
      // 上传目录
      '/uploads': [
        {
          target: `http://127.0.0.1:${SERVER_PORT}`,
        },
        USE_WEB_SERVER,
      ],
      // chii debug
      '/chii': [
        {
          target: `http://127.0.0.1:${CHII_PORT}`,
          ws: true,
        },
        USE_CHII,
      ],
    }),
  },
};

type ProxyConfig = { target: string; ws?: boolean };
function proxyConfigParser(configs: {
  [key: string]: ProxyConfig | [ProxyConfig, boolean];
}) {
  const parsed: {
    [key: string]: ProxyConfig;
  } = {};
  Object.keys(configs).forEach((key) => {
    const config = configs[key];
    if (Array.isArray(config)) {
      if (config[1]) {
        parsed[key] = config[0];
      }
    } else {
      parsed[key] = config;
    }
  });
  return parsed;
}

export default config;
