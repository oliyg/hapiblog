import Layout from '../index'
import Nav from '../components/nav'
import BlogList from '../components/blog-list'
import Wrapper from '../components/wrapper'

import '../asserts/styles.less'

export default () => (
  <Layout>
    <Nav></Nav>
    <Wrapper>
      <BlogList></BlogList>
    </Wrapper>
  </Layout>
)
