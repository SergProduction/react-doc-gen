// const t = require('babel-types')

// path -> propTypesNode
function parse (path) {
  /*
  if (path.isImportDeclaration()) {
    console.log(path.node)
  }
  */
  if (path.isIdentifier()) {
    if (path.node.name === 'propTypes' || path.node.name === 'defaultProps') {

      if (path.parentPath.node.type === 'ClassProperty') {
        const ReactClassNode = path.parentPath.parentPath.parentPath.node
        const ReactClassProperty = path.parentPath.node

        let ReactClassName = ''
        let ReactHoc = false
        let ReactHocReturns = []

        if (ReactClassNode.type === 'ClassDeclaration') {
          ReactClassName = ReactClassNode.id.name
        }
        if (ReactClassNode.type === 'ClassExpression') {
          ReactClassName = 'Anonym'
        }

        const ReactClassMethodsNodes = ReactClassNode.body.body.filter(node => node.type === 'ClassMethod')

        const Render = ReactClassMethodsNodes.find(node => node.key.name === 'render')

        if (Render !== undefined) {
          const RenderReturn = Render.body.body.find(node => node.type === 'ReturnStatement')
          
          if (RenderReturn !== undefined && RenderReturn.argument.type === 'JSXElement') {
            const JSXRoot = RenderReturn.argument
            if (JSXRoot.children.length === 0) {
              ReactHoc = true
              const JSXAttributes = JSXRoot.openingElement.attributes.filter(node => node.type === 'JSXAttribute')
              const JSXSpreadAttributes = JSXRoot.openingElement.attributes.filter(node => node.type !== 'JSXAttribute')

              const props = JSXAttributes.map(node => node.name.name)
              let spread = []
              try {
                spread = JSXSpreadAttributes.map(node => {
                  if (node.argument.type === 'Identifier') {
                    return node.argument.name
                  }
                  return node.argument.property.name
                })
              }
              catch(error) {
                console.log(error)
                console.log('JSXSpreadAttributes', JSXSpreadAttributes)
              }
              ReactHocReturns = [].concat(props, spread)
            }
          }
        }

        if (ReactClassProperty.key.name === 'propTypes') {
          const ReactClassPropTypesNode = ReactClassProperty.value

          // ----
          return {
            componentName: ReactClassName,
            propTypesNode: ReactClassPropTypesNode,
            hoc: ReactHoc,
            hocReturn: ReactHocReturns,
          }
          // ----
        }

        if (ReactClassProperty.key.name === 'defaultProps') {
          const ReactClassDefaultPropsNode = ReactClassProperty.value.properties
        }

      }
      if (path.parentPath.node.type === 'MemberExpression') {
        const ReactFuncNode = path.parentPath.parentPath.node
        const ReactFuncName = ReactFuncNode.left.object.name

        if (ReactFuncNode.left.property.name === 'propTypes') {
          const ReactFuncPropTypes = ReactFuncNode.right

          // -----
          return {
            componentName: ReactFuncName,
            propTypesNode: ReactFuncPropTypes,
          }
          // -----
        }

        if (ReactFuncNode.left.property.name === 'defaultProps') {
          const ReactFuncDefaultProps = ReactFuncNode.right.properties
        }
      }
    }
  }
}

// path -> propTypesNode
module.exports = parse