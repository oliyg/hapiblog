import { Component } from 'react'
import { Form, Input, Icon, Button } from 'antd'
import Layout from '../index'
import Wrapper from '../components/wrapper'

import '../asserts/styles.less'

const FormItem = Form.Item
const { TextArea } = Input

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}

class Detail extends Component {
  componentDidMount() {
    this.props.form.validateFields() // 初始化禁止提交按钮生效
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form

    const titleError = isFieldTouched('title') && getFieldError('title')
    const shortError = isFieldTouched('short') && getFieldError('short')

    return (
      <Layout>
        <Wrapper>
          <Form onSubmit={this.handleSubmit}>
            {/* 标题输入框 */}
            <FormItem
              validateStatus={titleError ? 'error' : ''}
              help={titleError || ''}
            >
              {getFieldDecorator('title', {
                rules: [{ required: true, message: 'Please input your article title!' }],
              })(
                <Input placeholder="文章标题" />
              )}
            </FormItem>

            {/* 简介 */}
            <FormItem
              validateStatus={shortError ? 'error' : ''}
              help={shortError || ''}
            >
              {getFieldDecorator('short', {
                rules: [{ required: true, message: 'Please input your brief content!' }],
              })(
                <TextArea placeholder="Autosize height with minimum and maximum number of lines" autosize={{ minRows: 2, maxRows: 6 }} />
              )}
            </FormItem>

            {/* 提交按钮 */}
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                disabled={hasErrors(getFieldsError())}
              >
            发布
              </Button>
            </FormItem>
          </Form>
        </Wrapper>
      </Layout>
    )
  }
}

const WrappedDetail = Form.create()(Detail)

export default WrappedDetail
