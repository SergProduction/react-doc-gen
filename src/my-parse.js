const path = require('path')
const recursive = require("recursive-readdir")

function ignoreFile(file, stat) {
  const ext = path.extname(file)
  return stat.isDirectory() !== true && ext !== '.js' && ext !== '.jsx'
}

module.exports = (baseDir) => new Promise((resolve, reject) => {
  recursive(baseDir, [ignoreFile], (err, files) => {
    if (err) {
      reject(err)
    }
    resolve(files)
  })
})