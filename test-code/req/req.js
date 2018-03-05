import React, { PureComponent } from 'react'
import P from 'prop-types'


const MyFunc2 = (props) => (<div/>)

MyFunc2.propTypes = {
  myprop: P.number,
  mypropTwo: P.oneOfType(['one', 'two']).isRequired,
}

MyFunc2.defaultProps = {
  myprop: 18,
}



const MyClass2 = class extends PureComponent {
  static propTypes = {
    // return {
      matchName: P.string.isRequired,
      id: P.number,
      matches: P.arrayOfType([P.number, P.string]).isRequired,
      matches: P.arrayOf([P.number, P.string]).isRequired,
      oneOfkey: P.oneOf(['oneOfString', 'oneOfOtherString']),
      manyMatches: P.shape({
        id: P.number,
        matchName: P.string,
      })
    // }
  }
  static defaultProps = {
    mi: P.bool,
  }

  render() {
    if (this.props.maybe) {
      return null
    }
    return <div matches={true} {...this.props} {...this.state}/>
  }
}


export default MyClass2
