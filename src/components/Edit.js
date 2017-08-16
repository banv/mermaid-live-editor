import React from 'react'
import { Row, Col, Input } from 'antd'
import { Route } from 'react-router-dom'

import Error from './Error'
import Preview from './Preview'

class Edit extends React.Component {
  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }
  onChange (event) {
    const { history, match: { path } } = this.props
    const base64 = window.btoa(event.target.value)
    history.push(path.replace(':base64', base64))
  }
  render () {
    const { match: { url, params: { base64 } } } = this.props
    const code = window.atob(base64)
    return <Row gutter={16}>
      <Col span={6}>
        <Input.TextArea rows={16} value={code} onChange={this.onChange} />
      </Col>
      <Col span={18}>
        <Route exact path={url} render={(props) => <Preview {...props} code={code} />} />
        <Route path={url + '/error/:base64'} component={Error} />
      </Col>
    </Row>
  }
}

export default Edit
