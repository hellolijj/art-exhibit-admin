// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** list导师列表 查看导师信息列表 GET /api/memtor */
export async function getMemtor(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getMemtorParams,
  options?: { [key: string]: any },
) {
  return request<{
    success: boolean;
    data: { list?: API.Memtor[]; current?: number; pageSize?: number; total?: number };
    code: string;
    message: string;
    showType: string;
  }>('/api/memtor', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 修改导师信息 修改导师信息 PUT /api/memtor */
export async function putMemtor(
  body: {
    /** 姓名 */
    name?: string;
    /** 工号 */
    wid?: string;
    /** 联系电话 */
    tel?: string;
    /** 邮箱 */
    email?: string;
    /** 指导专业 */
    major?: string;
    /** 个人照片 */
    avatar?: string;
    /** 个人简介 */
    profile?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.Resp>('/api/memtor', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增一条导师信息 新增导师细腻 POST /api/memtor */
export async function postMemtor(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postMemtorParams & {
    // header
    'Content-Type': string;
  },
  body: {
    /** 姓名 */
    name?: string;
    /** 工号 */
    wid?: string;
    /** 联系电话 */
    tel?: string;
    /** 邮箱 */
    email?: string;
    /** 指导专业 */
    major?: string;
    /** 个人照片 */
    avatar?: string;
    /** 个人简介 */
    profile?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    success?: boolean;
    data?: Record<string, any>;
    errorCode?: string;
    errorMessage?: string;
    showType?: number;
  }>('/api/memtor', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** get导师信息 get查询导师信息 GET /api/memtor/${param0} */
export async function getMemtorId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getMemtorIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<{
    success: boolean;
    data: API.Memtor;
    code: string;
    message: string;
    showType: string;
  }>(`/api/memtor/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除导师 删除导师信息 DELETE /api/memtor/${param0} */
export async function deleteMemtorId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteMemtorIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Resp>(`/api/memtor/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}
