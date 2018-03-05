const fs = require('fs')

const parse = (obj) => {
  if (typeof obj !== 'object') {
    return obj
  }

  if (
    obj.name !== undefined &&
    obj.type !== undefined )
  {
    return { [obj.name] : parse(obj.type) }
  }

  if (obj.arguments !== undefined) { // function arguments types
    if (obj.arguments.length === 1) { // norm
      return parse(obj.arguments[0])
    }
    return obj.arguments.map(arg => parse(arg)) // not norm
  }
  
  if (obj.object !== undefined) { // object array types
    return obj.object.reduce((acc, arg) => {
      return Object.assign(acc, parse(arg))
    }, Object.create(null))
  }
  
  if (obj.array !== undefined) { // array types
    return obj.array.map(arg => parse(arg))
  }
  
  if (obj.type !== undefined) {
    return parse(obj.type)
  }

  return obj.name
}

const template = ({
  fileName,
  componentName,
  propTypes
}) => {
  // const type = parse(Object.assign({}, typeTree))
  return `
${fileName}

### Component **_${componentName}_**

propTypes
\`\`\`
${JSON.stringify(propTypes, null, 2)}
\`\`\`
`
}

const createDoc = (name) => {
  const filename = `${name}.md`
  fs.writeFileSync(filename, '')
  // const file = fs.createWriteStream(`${name}.md`);
  return {
    write: (text) => fs.appendFileSync(filename, text)
  }
}

module.exports = { parse, template, createDoc}