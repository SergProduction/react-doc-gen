const findReactComponent = require('./ast-parse/react-component')
const parsePropTypes = require('./ast-parse/prop-types')

const markHead = ({
  filename,
  name,
}) => `
**${name}**
_${filename}_

`

const mark = ({
  filename,
  name,
  propTypes,
  hoc,
  hocReturn
}) => `

component path: #${filename}

component name: *_${name}_*

hoc: ${hoc ? hocReturn.join(', ') : false}

propTypes:
\`\`\`
${JSON.stringify(propTypes, null, 2)}
\`\`\`
`

class Parse {
  constructor() {
    this.components = []
  }

  getBabelPlugin(filename) {
    const self = this
    return ({ types: t }) => ({
      name: 'react-doc-gen',
      pre(state) {
      },
      visitor: {
        Identifier(path, opts) {
          const ReactComponent = findReactComponent(path)
  
          if (ReactComponent === undefined) return
  
          self.components.push({
            filename: filename,
            name: ReactComponent.componentName,
            propTypes: parsePropTypes(ReactComponent.propTypesNode),
            hoc: ReactComponent.hoc,
            hocReturn: ReactComponent.hocReturn,
          })
        },
      },
      post(state) {
      }
    })
  }

  getMarkdown() {
    const head = this.components.reduce((text, comp) => {
      text += markHead(comp)
      return text
    }, '')

    const contents = this.components.reduce((text, comp) => {
      text += mark(comp)
      return text
    }, '')

    return head + '\n\n  ## description  \n\n' + contents
  }
}

module.exports = Parse