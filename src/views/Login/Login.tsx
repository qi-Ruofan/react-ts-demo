import React from 'react'
import styles from './Login.module.scss'
import { Button, message, Form, Input, Row, Col } from 'antd'
// import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../store'
// import type { RootState } from '../../store'
import { loginAction, updateToken } from '../../store/modules/users'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'

interface User {
  email: string
  pass: string
}
const testUsers: User[] = [
  {
    email: 'huangrong@imooc.com',
    pass: 'huangrong'
  },
  {
    email: 'hongqigong@imooc.com',
    pass: 'hongqigong'
  }
]
export default function Login() {
  const navigate = useNavigate()
  // const token = useSelector((state:RootState) => state.users.token)
  const dispatch = useAppDispatch()

  // 获取表单实例
  const [form] = Form.useForm()

  const onFinish = (values: User) => {
    console.log('Success:', values);
    dispatch(loginAction(values)).then(action => {
      const {errcode, token} = (action.payload as {[index: string]:unknown}).data as {[index: string]:unknown}
      if(errcode === 0 && typeof token === 'string') {
        dispatch(updateToken(token))
        message.success('登录成功')
        navigate('/')
      }
      else {
        message.error('登录失败')
      }
    })
  };

  const onFinishFailed = ({values}: {values: User}) => {
    console.log('Failed:', values);
  };

  const autoLogin = (values: User) => {
    return () => {
      form.setFieldsValue(values) // 设置数据回显
      onFinish(values)
    }
  }

  return (
    <div className={styles.login}>
      <div className={styles.header}>
          <span className={styles['header-logo']}>
            {/* 全局和局部样式结合 需要用第三方模块classnames */}
            <i className={classNames('iconfont icon-react', styles['icon-react'])}></i>
            <i className={classNames('iconfont icon-icon-test', styles['icon-icon-test'])}></i>
            <i className={classNames('iconfont icon-typescript', styles['icon-typescript'])}></i>
          </span>
          <span className={styles['header-title']}>在线考勤系统</span>
        </div>
        <div className={styles.desc}>零基础从入门到进阶，系统掌握前端三大热门技术(vue、React、Typescript)</div>
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className={styles.main}
          form={form}
        >
          <Form.Item
            label="邮箱"
            name="email"
            rules={[
              { required: true, message: '请输入邮箱！' },
              { type: 'email', message: '请输入正确邮箱地址' }
            ]}
          >
            <Input placeholder='请输入邮箱' />
          </Form.Item>

          <Form.Item
            label="密码"
            name="pass"
            rules={[{ required: true, message: '请输入密码！' }]}
          >
            <Input.Password visibilityToggle={false} placeholder='请输入密码'/>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
        <div className={styles.users}>
          <Row gutter={20}>
            {
              testUsers.map(item => <Col key={item.email} span={12}>
                <h3>
                  测试账号：<Button onClick={autoLogin(item)}>一键登录</Button>
                </h3>
                <p>邮箱：{ item.email }</p>
                <p>密码：{ item.pass }</p>
              </Col>)
            }
          </Row>
        </div>
    </div>
  )
}
