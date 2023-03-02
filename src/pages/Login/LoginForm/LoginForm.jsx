import React, { useState, useEffect } from 'react';
// import Encrypt from 'jsencrypt';
import {
  Avatar, Form, Input, Button, Checkbox, message,
} from 'antd';
import { UserOutlined, LockOutlined, DesktopOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import style from './LoginForm.module.scss';

const LoginForm = (props) => {
  const [form] = Form.useForm();

  return (
    <div className={style.wrap}>
      <div className={style.img}>
        <img src="assets\images\login-pic.png" alt="" />
      </div>
      <div className={style.dl}>
        <div className={style.dt}>登录</div>
        <Form className={style.dd} form={form}>
          <Form.Item name="userName" rules={[{ required: true, message: '请输入用户名' }]}>
            <Input prefix={<UserOutlined />} placeholder="使用用户名登录" size="large" />
          </Form.Item>
          <Form.Item hasFeedback name="password" rules={[{ required: true, message: '请输入密码' }]}>
            <Input prefix={<LockOutlined />} type="password" placeholder="请输入密码" size="large" />
          </Form.Item>
          <Form.Item>
            <div className={style.flex}>
              <Form.Item name="remember" noStyle valuePropName="checked">
                <Checkbox>记住登录</Checkbox>
              </Form.Item>
            </div>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              onClick={() => {
                form.validateFields().then((values) => {
                  const encryptor = new Encrypt();
                  encryptor.setPublicKey(props.attr?.data?.LOGIN_KEY?.attrValue);
                  setLoading(true);
                  api.userLogin({
                    ...values,
                    password: encryptor.encrypt(values.password),
                  }).then((resData) => {
                    // props.setIsFirst(resData.isFirst);
                    // 登录成功
                    const expiredtime = new Date(0x7fffffff * 1e3);
                    cookieUtil.set('remember', values.remember, expiredtime);
                    if (values.remember) {
                      cookieUtil.set('userCode', JSON.stringify(values), expiredtime);
                    } else {
                      cookieUtil.unset('userCode');
                    }
                    message.success({ content: '登录成功', duration: 0.5 });
                    props.setLogin(() => props.history.push('/'));
                  }).finally(() => {
                    setLoading(false);
                  });
                });
              }}
            >
            登录
            </Button>
          </Form.Item>
        </Form>
        <div className={style.ft}>
          没有账号？
          <a
            onClick={() => {
              props.history.push('/login/registered');
            }}
          >
          立即注册
          </a>
        </div>
      </div>
    </div>

  );
};
export default LoginForm;

// export default connect(
//   state => ({
//     user: state.user,
//     attr: state.attr,
//   }),
//   userActions,
// )(LoginForm);
