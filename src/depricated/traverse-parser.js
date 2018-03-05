const traverse = require('babel-traverse')


module.exports = (ast) => {
  traverse.default(ast, {
    enter(path) {
  
    },
    exit() {
      // console.log('exit')
    }
  })
}