import { Menu, Icon } from 'antd'
import { Component } from 'react'

class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 'home',
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    // console.log('click ', e)
    this.setState({
      current: e.key,
    })
  }

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        <Menu.Item key="home">
          <Icon type="home" />主页
        </Menu.Item>
        <Menu.Item key="tag">
          <Icon type="tag" />标签
        </Menu.Item>
        <Menu.Item key="github">
          <a href="https://github.com/oliyg" target="_blank">GitHub</a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default Nav
