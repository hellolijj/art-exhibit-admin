// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** list 作品列表 GET /api/production */
export async function getProduction(options?: { [key: string]: any }) {
  return request<{
    success: boolean;
    data: { list?: API.Production[]; current?: number; pageSize?: number; total?: number };
    code: string;
    message: string;
    showType: string;
  }>('/api/production', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 修改作品信息 PUT /api/production */
export async function putProduction(
  body: {
    /** 展览名称 */
    exhibit: string;
    /** 作品名称 */
    name?: string;
    /** 作品类型 */
    type?: string;
    /** 作品主图 */
    main_image?: string;
    /** 作品介绍 */
    profile?: string;
    /** 作品展览 */
    content?: string;
    /** 作品作者 */
    authors?: API.Author[];
    /** 指导老师 */
    tutor?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.Resp>('/api/production', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增加作品 POST /api/production */
export async function postProduction(
  body: {
    /** 作品名称 */
    name?: string;
    /** 作品类型 */
    type?: string;
    /** 作品主图 */
    main_image?: string;
    /** 作品介绍 */
    profile?: string;
    /** 作品展览 */
    content?: string;
    /** 作品作者 */
    authors?: API.Author[];
    /** 指导老师 */
    tutor?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.Resp>('/api/production', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** get 作品信息 GET /api/production/${param0} */
export async function getProductionId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getProductionIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<{
    success: boolean;
    data: {
      id?: number;
      gmt_create?: string;
      gmt_modified?: string;
      name?: string;
      type?: string;
      main_image?: string;
      profile?: string;
      content?: string;
      authors?: API.Author[];
      tutor?: string;
    };
    code: string;
    message: string;
    showType: string;
  }>(`/api/production/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除作品 DELETE /api/production/${param0} */
export async function deleteProductionId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteProductionIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Resp>(`/api/production/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}
