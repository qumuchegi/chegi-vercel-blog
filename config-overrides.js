const {
  override,
  addWebpackAlias,
  addLessLoader,
  fixBabelImports,
  addWebpackPlugin,
  overrideDevServer
} = require('customize-cra')
const path = require('path')
const webpack = require('webpack')

const addProxy = (config) => {
  return {
    ...config,
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://chegi-vercel-blog-qumuchegi.vercel.app/api',
        changeOrigin: true,
        pathRewrite: { '^/api': '/' }
      }
    }
  }
}

const addDevTool = () => (config) => {
  return {
    ...config,
    devtool: config.mode === 'development' ? 'source-map' : false
  }
}

const addTsLoader = () => config => {
  return {
    ...config,
    module: {
      rules: [
        ...config.module.rules,
        {
          test: /\.tsx?$/,
          use: [
            // {
            //   loader: 'babel-loader',
            //   options: {
            //     presets: ['@babel/preset-env'],
            //   },
            // },
            {
              loader: 'ts-loader',
              options: {
                compilerOptions: {
                  noEmit: false,
                },
              },
            }
          ],
          exclude: /node_modules/
        }
      ]
    }
  }
}

module.exports = {
  webpack: override(
    addWebpackPlugin(
      new webpack.DefinePlugin({
        __DEV__: process.env.NODE_ENV === 'development'
      })
    ),
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true
    }),
    addWebpackAlias({
      '@': path.resolve(__dirname, './src')
    }),
    addLessLoader({
      lessOptions: {
        javascriptEnabled: true,
        strictMath: true,
        noIeCompat: true,
        cssModules: {
          localIdentName: '[path][name]__[local]--[hash:base64:5]'
        }
      }
    }),
    addDevTool(),
    addTsLoader()
  ),
  devServer: overrideDevServer(addProxy)
}
