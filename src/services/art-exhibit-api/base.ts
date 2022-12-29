// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 当前用户 GET /api/currentUser */
export async function getCurrentUser(options?: { [key: string]: any }) {
  return request<{
    success: boolean;
    data: {
      name?: string;
      avatar?: string;
      userid?: string;
      email?: string;
      signature?: string;
      title?: string;
      group?: string;
      phone?: string;
      access?: string;
    };
  }>('/api/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 登录判断 ant-design 原生接口 login/accout 用于判断是否登录成功，登录成功 返回角色{admin/user} POST /api/login/account */
export async function postLoginAccount(
  body: {
    password: string;
    username: string;
    /** 登录类型 */
    type: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ status: string; currentAuthority: string; type: string }>('/api/login/account', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 退出登录 POST /api/login/outLogin */
export async function postLoginOutLogin(options?: { [key: string]: any }) {
  return request<{ success: boolean; data: Record<string, any> }>('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 注册接口 POST /api/register */
export async function postRegister(options?: { [key: string]: any }) {
  return request<{ status: string; currentAuthority: string; success: boolean }>('/api/register', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 用户列表 GET /api/users */
export async function getUsers(options?: { [key: string]: any }) {
  return request<{ key?: string; name?: string; age?: number; address?: string }[]>('/api/users', {
    method: 'GET',
    ...(options || {}),
  });
}
