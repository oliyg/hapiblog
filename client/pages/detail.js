import Layout from '../index'
import Nav from '../components/nav'

import '../asserts/styles.less'

export default ({ url }) => {
  return (
    <Layout>
      <Nav></Nav>
      <h1>content detail page {url.query.id}</h1>
      <h2>ex sub title</h2>
      <p>testing of paragraph.testing of paragraph.testing of paragraph.testing of paragraph.testing of paragraph.testing of paragraph.testing of paragraph.testing of paragraph.testing of paragraph.</p>
    </Layout>
  )
}
