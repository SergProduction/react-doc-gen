const path = require('path')
const fs = require('fs')
const meow = require('meow')
const babel = require('babel-core')

const parseDir = require('./src/my-parse')
const Parse = require('./src/index')

const babelrc = path.resolve(__dirname, '.babelrc')

const parse = new Parse()


const cli = meow(`
  usege
    react-doc-gen src > doc.md
`)

const baseDir = cli.input[0]

const filesP = parseDir(path.resolve(baseDir))
  .then(files => {
    return files
  })
  .catch(err => {
    console.log(err)
  })



filesP.then(files => {

  files.forEach(filePath => {
    const fileCode = fs.readFileSync(filePath).toString()

    const babelPlugin = parse.getBabelPlugin(filePath)

    babel.transform(fileCode, {
      code: false,
      extends: babelrc,
      plugins: [babelPlugin]
    }, (err, result) => {
      if (err) {
        console.log(err)
      }
      // console.log(result)
    })
  })

  console.log(parse.getMarkdown())
})