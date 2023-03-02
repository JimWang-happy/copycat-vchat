import Login from '../pages/Login'
import LoginForm from '../pages/Login/LoginForm'
import RegisteredFrom from '../pages/Login/RegisteredForm'


const routes = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/login/checkin',
    component: LoginForm,
  },
  {
    path: '/login/registered',
    component: RegisteredFrom,
  }
];

export default routes;
