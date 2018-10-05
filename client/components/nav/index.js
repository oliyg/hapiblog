import { Menu, Icon } from 'antd'
import { Component, Fragment } from 'react'
import Router, { withRouter } from 'next/router'
import Link from 'next/link'

class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 'home',
    }
    this.handleClickMenuItem = this.handleClickMenuItem.bind(this)
  }

  componentWillMount(){
    const route = this.props.router.route
    this.setState({
      current: route === '/' ? 'home' : route.slice(1)
    })
  }

  handleClickMenuItem(e) {
    this.setState({
      current: e.key,
    })
    switch (e.key) {
    case 'home':
      Router.push('/')
      break
    case 'tag':
      Router.push('/tag')
      break
    case 'write':
      Router.push('/write')
      break
    default:
      Router.push('/')
      break
    }
  }

  render() {
    return (
      <Menu
        onClick={this.handleClickMenuItem}
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        <Menu.Item key="home">
          <Icon type="home" />
          <Link prefetch href="/">
            <Fragment>主页</Fragment>
          </Link>
        </Menu.Item>
        <Menu.Item key="tag">
          <Icon type="tag" />标签
        </Menu.Item>
        <Menu.Item key="write">
          <Icon type="form" />创建
        </Menu.Item>
        <Menu.Item key="github">
          <a href="https://github.com/oliyg" target="_blank">GitHub</a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(Nav)
