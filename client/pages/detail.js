import { Component } from 'react'
import { withRouter } from 'next/router'
import Layout from '../index'
import Wrapper from '../components/wrapper'

import '../asserts/styles.less'

class Detail extends Component {
  render() {
    const { router } = this.props
    return (
      <Layout>
        <Wrapper>
          <h1>content detail page {router.query.id}</h1>
          <h2>ex sub title</h2>
          <p>testing of paragraph.testing of paragraph.testing of paragraph.testing of paragraph.testing of paragraph.testing of paragraph.testing of paragraph.testing of paragraph.testing of paragraph.</p>
        </Wrapper>
      </Layout>
    )
  }
}

export default withRouter(Detail)
