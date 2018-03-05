// const file = template.createDoc('DOC')

// const a = path.join(__dirname, 'test-code.js')

const b = babel.transform('const a = 5', {
  code: false,
  plugins: [babelPlugin]
}, (err, result) => {
  if (err) {
    console.log(err)
  }
  // file.write(JSON.stringify(result, null, 2))
  // file.close()
  console.log(result.ast.program)
})

console.log(b.ast.program)