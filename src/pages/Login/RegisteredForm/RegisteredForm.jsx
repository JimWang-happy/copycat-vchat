import React, { useState } from 'react';
import {
  Avatar, Form, Input, Button, Checkbox, message, Modal,
} from 'antd';
// import Encrypt from 'jsencrypt';
import {
  UserOutlined, LockOutlined, CheckCircleFilled, MobileOutlined, MailOutlined,
} from '@ant-design/icons';
import { connect } from 'react-redux';
import style from './RegisteredForm.module.scss';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const RegisteredForm = (props) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  return (
    <div className={style.dl}>
      <div className={style.dt}>请填写注册信息</div>
      <Form layout="horizontal" {...layout} className={style.dd} form={form}>
        <Form.Item name="nickName" label="昵称" rules={[{ required: true, message: '请输入昵称' }]}>
          <Input placeholder="请输入您的呢称" size="large" />
        </Form.Item>
        <Form.Item name="userName" label="用户名" rules={[{ required: true, message: '请输入用户名' }]}>
          <Input placeholder="请输入您的用户名" size="large" />
        </Form.Item>
        {/* <Form.Item name="phoneNumber" label="手机号码" rules={[{ required: true, pattern: /^1\d{10}$/, message: '非法的手机号' }]}>
          <Input placeholder="请输入您的手机号" size="large" />
        </Form.Item> */}
        {/* <Form.Item name="email" label="邮箱地址" rules={[{ required: true, type: 'email', message: '非法的邮箱地址' }]}>
          <Input placeholder="请输入您的邮箱地址" size="large" />
        </Form.Item> */}
        <Form.Item
          hasFeedback
          name="password"
          label="登录密码"
          rules={[
            { required: true, message: '请输入密码' },
            {
              pattern: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![a-z0-9]+$)[a-zA-Z0-9]{8,16}$/,
              message: '密码不符合要求，必须由8-16位的数字、大小写字母组成',
            },
          ]}
          extra="8-16位数字、大小写字母的组合"
        >
          <Input type="password" placeholder="请设置登录密码" size="large" />
        </Form.Item>
        <Form.Item
          hasFeedback
          name="confirmPass"
          label="确认密码"
          rules={[
            {
              required: true,
              message: '请输入确认密码',
            },
            ({ getFieldValue }) => ({
              validator: async (rule, value) => {
                if (getFieldValue('password') && value !== getFieldValue('password')) {
                  throw new Error('确认密码和密码不一致!');
                }
              },
            }),
          ]}
        >
          <Input type="password" placeholder="确认密码" size="large" />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
          <Button
            type="primary"
            loading={loading}
            size="large"
            block
            onClick={() => {
              form.validateFields().then((values) => {
                const encryptor = new Encrypt();
                encryptor.setPublicKey(props.attr?.data?.LOGIN_KEY?.attrValue);
                setLoading(true);
                api
                  .userRegister({
                    ...values,
                    password: encryptor.encrypt(values.password),
                    userType: 'registered',
                  })
                  .then(() => {
                    Modal.success({
                      icon: null,
                      className: style.status,
                      content: (
                        <>
                          <CheckCircleFilled className={style.icon} />
                          <div className={style.tit}>注册成功</div>
                          <div className={style.cont}>已成功注册，可使用用户名登录</div>
                        </>
                      ),
                      okText: '立即登录',
                      onOk: () => {
                        props.history.push('/login/checkin');
                      },
                    });
                  })
                  .finally(() => {
                    setLoading(false);
                  });
              });
            }}
          >
            注册
          </Button>
          <div className={style.ft}>
            已有账号？
            <a
              onClick={() => {
                props.history.push('/login/checkin');
              }}
            >
            立即登录
            </a>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisteredForm;

// export default connect(
//   state => ({
//     user: state.user,
//     attr: state.attr,
//   }),
//   userActions,
// )(RegisteredForm);
