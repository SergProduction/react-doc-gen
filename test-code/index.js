import React, { PureComponent } from 'react'
import P from 'prop-types'

import MyReq from './req'


const MyFunc = (props) => (<div />)

MyFunc.propTypes = {
  myprop: P.number,
  mypropTwo: P.oneOfType(['one', 'two']).isRequired,
}

MyFunc.defaultProps = {
  myprop: 18,
}



const MyClass = class extends PureComponent {
  static propTypes = {
    matchName: P.string.isRequired,
    id: P.number,
    matches: P.arrayOfType([P.number, P.string]).isRequired,
    matches: P.arrayOf([P.number, P.string]).isRequired,
    oneOfkey: P.oneOf(['oneOfString', 'oneOfOtherString']),
    manyMatches: P.shape({
      id: P.number,
      matchName: P.string,
    })
  }
  static defaultProps = {
    mi: P.bool,
  }

  render() {
    return <div>{this.props.matchName}</div>
  }
}


export default MyClass
