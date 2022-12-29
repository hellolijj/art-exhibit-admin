/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,title 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @doc https://umijs.org/docs/guides/routes
 */
export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './User/Login',
      },
      {
        name: 'register',
        path: '/user/register',
        component: './User/Register',
      },
    ],
  },
  // {
  //   path: '/welcome',
  //   name: 'welcome',
  //   icon: 'smile',
  //   component: './Welcome',
  // },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin',
        redirect: '/admin/sub-page',
      },
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        component: './Admin',
      },
      {
        name: '用户列表',
        icon: 'user',
        path: '/admin/userlist',
        component: './User/List',
      },
      
    ],
  },
  {
    name: '展览管理',
    icon: 'shop',
    path: '/exhibit',
    component: './Exhibit/List',
  },
  {
    name: '作品上传',
    icon: 'shop',
    path: '/production',
    component: './Production/List',
  },
  {
    name: '导师信息',
    icon: 'shopping',
    path: '/memtor',
    component: './Mentor/List',
  },
  {
    name: '用户管理',
    icon: 'shopping',
    path: '/shoppingcar',
    component: './User/List',
  },
  {
    name: '权限管理',
    icon: 'shopping',
    path: '/role',
    component: './Role/List',
  },
  {
    path: '/',
    redirect: '/production',
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },
];
