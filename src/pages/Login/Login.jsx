import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisteredForm from './RegisteredForm';
import style from './Login.module.scss';

const Login = (props) => {
  const { params } = props.match;
  params.type = 'registered';
  const renderForm = () => {
    switch (params.type) {
      case 'checkin': // 登录
        return <LoginForm history={props.history} />;
      case 'registered': // 注册
        return <RegisteredForm history={props.history} />;
      default:
        return '';
    }
  };
  return (
    <div className={style.wrap}>
      <div className={style.container}>
        { renderForm() }
      </div>
    </div>
  );
};

export default Login;
