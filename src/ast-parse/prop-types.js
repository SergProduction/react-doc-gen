
const f = (p) => {
  if (typeof p !== 'object') {
    return p
  }
  if (p.type === 'ObjectExpression') {
    return p.value.reduce((acc, item) => {
      return Object.assign(acc, {[item.name]: f(item.value)})
    }, Object.create(null))
  }
  if (p.type === 'ArrayExpression') {
    return p.value.map(t => f(t))
  }
  if (p.type === 'CallExpression') {
    if (p.value.length > 1) { // не нормально, но возможно
      return {arguments: p.value}
    }
    return { [p.name]: f(p.value[0])}
  }
  if (typeof p.name !== 'object') {
    return {[p.name]: f(p.value)}
  }
  console.log('sh', p)
}

const propTypesTreeInPlain = f

const propTypesParse = (node, typeNode = {}) => {
  // console.log('propTypesParse', node)
  switch (node.type) {
    case 'ObjectProperty': {
      return {
        name: node.key.name,
        value: propTypesParse(node.value),
      }
    }
    case 'MemberExpression': {
      const name = node.property.name
      const isRequired = name === 'isRequired'
      
      if (isRequired) {
        try {
          const name = node.object.property.name
          return {
            name: 'isRequired',
            value: name,
          }
        }
        catch (error) {
          const name = propTypesParse(node.object)
          return {
            name: 'isRequired',
            value: name,
          }
        }
      }
      return name
    }
    case 'ArrayExpression': {
      return {
        type: 'ArrayExpression',
        value: node.elements.map(childNode => propTypesParse(childNode)),
      }
    }
    case 'ObjectExpression': {
      return {
        type: 'ObjectExpression',
        value: node.properties.map(childNode => propTypesParse(childNode)),
      }
    }
    case 'CallExpression': {
      return {
        type: 'CallExpression',
        name: propTypesParse(node.callee),
        value: node.arguments.map(arg => propTypesParse(arg)),
      }
    }
    case 'Identifier': {
      return {
        value: node.name,
      }
    }
    default: {
      return node.value
    }
  }
}

const getPropTypes = (propTypesNode) => {
  if (propTypesNode) {
    const propTypesTree = propTypesParse(propTypesNode)

    return propTypesTreeInPlain(propTypesTree)
  }
}

// propTypesNode -> propTypesObject
module.exports = getPropTypes

