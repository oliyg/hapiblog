import { Row, Col } from 'antd'

export default ({children}) => <div>
  <Row>
    <Col span={22} offset={1}>
      {children}
    </Col>
  </Row>
</div>
