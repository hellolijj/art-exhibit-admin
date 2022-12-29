// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** list 展览列表 list 展览列表 GET /api/exhibit */
export async function getExhibit(options?: { [key: string]: any }) {
  return request<{
    success: boolean;
    data: { list?: API.Exhibit[]; current?: number; pageSize?: number; total?: number };
    code: string;
    message: string;
    showType: string;
  }>('/api/exhibit', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 修改展览信息 PUT /api/exhibit */
export async function putExhibit(body: API.Exhibit, options?: { [key: string]: any }) {
  return request<API.Resp>('/api/exhibit', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增展览 POST /api/exhibit */
export async function postExhibit(
  body: {
    /** 展览名称 */
    name?: string;
    /** 展览形式 */
    form?: string;
    /** 线上展览时间 */
    on_stage?: string;
    /** 线下展览时间 */
    off_stage?: string;
    /** 展览地点 */
    pos?: string;
    /** 上传作品时间 */
    upload_stage?: string;
    /** 参展作品类型 */
    type?: string;
    /** 参展专业 */
    major?: string;
    /** 目录分页 */
    cate?: string;
    /** 主视觉图片 */
    main_image?: string;
    /** 介绍 */
    profile?: string;
    /** 参展状态 */
    state?: number;
    /** 上传状态 */
    upload_state?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.Resp>('/api/exhibit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** get 展览 GET /api/exhibit/${param0} */
export async function getExhibitId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getExhibitIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<{
    success: boolean;
    data: API.Exhibit;
    code: string;
    message: string;
    showType: string;
  }>(`/api/exhibit/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除展览 DELETE /api/exhibit/${param0} */
export async function deleteExhibitId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteExhibitIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Resp>(`/api/exhibit/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}
