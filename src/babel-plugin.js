

function babelPlugin({ types: t }) {
  return {
    name: 'react-doc-gen',
    pre(state) {
      // console.log('PRE')
      // this.fileDoc = 
      // this.oneOf = false
      this.filename = state.opts.filename
    },
    visitor: {
      Identifier(path, opts) {
        // if (this.oneOf === false) {
        //   console.log(this.filename)
        //   console.log('-------')
        // }
        this.oneOf = true

        parse(path, this.filename, fileDoc)
      },
    },
    post(state) {
      // console.log('POST', this.filename)
      // this.fileDoc.end(this.filename)
    }
  }
}

module.exports = babelPlugin

