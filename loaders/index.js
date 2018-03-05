module.exports = function(source, map) {
  console.log(typeof source)
  console.log(source)
  console.log(typeof map)
  console.log(map)
  if (this.callback) {
    this.callback(null, source, map)
  }
  return source
}
