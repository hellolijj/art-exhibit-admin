declare namespace API {
  type AntResp = {
    timestamp: number;
    status: number;
    error: string;
    message: string;
    path: string;
  };

  type Author = {
    /** 自增id */
    id: number;
    /** 创建时间 */
    gmt_create?: string;
    /** 修改时间 */
    gmt_modified?: string;
    /** 姓名 */
    name?: string;
    /** 学校 */
    school?: string;
    /** 学院 */
    college?: string;
    /** 专业 */
    major?: string;
    /** 年级 */
    grade?: string;
    /** 班级 */
    class?: string;
    /** 指导老师 */
    memtor?: string;
    /** 邮箱 */
    email?: string;
    /** 个人照片 */
    avator?: string;
    /** 个人简介 */
    profile?: string;
    /** 负责内容 */
    work?: string;
  };

  type deleteExhibitIdParams = {
    id: string;
  };

  type deleteMemtorIdParams = {
    id: number;
  };

  type deleteProductionIdParams = {
    id: string;
  };

  type deleteUserIdParams = {
    id: number;
  };

  type Exhibit = {
    /** 自增id */
    id: number;
    /** 创建时间 */
    gmt_create: number;
    /** 修改时间 */
    gmt_modified: number;
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
  };

  type getAuthorIdParams = {
    id: string;
  };

  type getExhibitIdParams = {
    id: string;
  };

  type getMemtorIdParams = {
    /** 序号 */
    id: string;
  };

  type getMemtorParams = {
    /** 序号 */
    id?: number;
    /** 姓名 */
    name?: string;
    /** 工号 */
    wid?: string;
    /** 联系电话 */
    tel?: string;
  };

  type getProductionIdParams = {
    id: string;
  };

  type getRoleNameParams = {
    name: string;
  };

  type getUserParams = {
    current?: number;
    pageSize?: number;
  };

  type getUserUidParams = {
    uid: string;
  };

  type list = {
    list: any[];
    current: number;
    pageSize: number;
    total: number;
  };

  type Memtor = {
    /** 自增id */
    id: number;
    /** 创建时间 */
    gmt_create: string;
    /** 修改时间 */
    gmt_modified: string;
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
  };

  type postMemtorParams = {
    'Content-Type': string;
  };

  type Production = {
    /** 自增id */
    id: number;
    /** 创建时间 */
    gmt_create?: string;
    /** 修改时间 */
    gmt_modified?: string;
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
    authors?: Author[];
    /** 指导老师 */
    tutor?: string;
  };

  type putRoleNameParams = {
    name: string;
  };

  type Resp = {
    /** true 返回成功 false 返回失败 */
    success: boolean;
    data: Record<string, any>;
    code: string;
    message: string;
    showType: string;
  };

  type Role = {
    /** 角色名称 */
    name: string;
    /** 展览管理 */
    exhibit: number;
    /** 作品上传 */
    production: number;
    /** 导师信息 */
    memtor: number;
    /** 用户管理 */
    user: number;
    /** 权限管理 */
    role: number;
  };

  type User = {
    /** 自增id */
    id: number;
    /** 创建时间 */
    gmt_create: string;
    /** 修改时间 */
    gmt_modified: string;
    /** 用户名 */
    username: string;
    /** 角色 */
    role: number;
    /** 密码 */
    password: string;
    /** 姓名 */
    name?: string;
    /** 联系电话 */
    tel?: string;
    /** 邮箱 */
    email?: string;
    /** 是否删除 */
    is_del: number;
  };
}
