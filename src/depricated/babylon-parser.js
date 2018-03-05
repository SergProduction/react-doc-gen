const babylon = require('babylon')



// code -> ast
module.exports = (code) => {
  return babylon.parse(code, {
    sourceType: 'module',
    plugins: [
      'jsx', 'flow', 'classProperties'
    ]
  })
}