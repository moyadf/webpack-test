const path = require('path');
const fs = require('fs')

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function generateHtmlPlugins (templateDir) {
  console.log('templateDir', templateDir);
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir))
  console.log('templateFiles-->', templateFiles);
  return templateFiles.map(item => {
    const parts = item.split('.')
    const name = parts[0]
    const extension = parts[1]

    console.log(`name: ${name}, extension: ${extension}`);

    return new HtmlWebpackPlugin({
      filename: `/pre/${name}.html`,
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
      inject: false,
    })
  })
}

const htmlPlugins = generateHtmlPlugins('./src/templates/views');

module.exports = {
  entry: {
    home: ['./src/index.js', './src/styles/main.scss'],
    pages: ['./src/styles/pages/pages.scss']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true,
  },
  mode: 'development', // habilitando el modo desarrollador desde webpack - en teoria deberian haber dos archivos de configuracion: dev y prod
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.pug$/,
        use: {
          loader: 'pug-loader'
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      },
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: './public/index.pug',
    }),
    new MiniCssExtractPlugin({
      filename: 'src/css/[name].css'
    }),
  ].concat(htmlPlugins),
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    compress: true,
    port: 3006,
    open: true,
  },
}