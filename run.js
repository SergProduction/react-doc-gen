const webpack = require('webpack')
const config = require('./webpack.config')

const compiler = webpack(config, (err, status) => {
  if (err) {
    console.log(err)
    return
  }
  console.log(status)
})

// console.log(compiler)
/*
compiler.apply('test', (compiler, callback) => {
  console.log(params)
  callback()
})
*/
/*
compiler.run((err, status) => {
  if (err) {
    console.log(err)
    return
  }
  // console.log(status)
})
*/