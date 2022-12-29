import { Form, Select, Space, Image } from 'antd';
import type { FC } from 'react';
import type { ActionType } from '@ant-design/pro-components';
import {
  ProColumns,
  EditableProTable
} from '@ant-design/pro-components';


import { useIntl } from '@umijs/max';
import {  message } from 'antd';
import React, { useRef, useState } from 'react';
import { putProduction } from '@/services/art-exhibit-api/production';
import { getRole } from '@/services/art-exhibit-api/role';

const RoleList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */

  const actionRef = useRef<ActionType>();

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */

  const roleOper = {
    1: { text: '授权管理'},
    0: { text: '禁止操作'},
  }

  const columns: ProColumns<API.Production>[] = [
    {
      title: "序号",
      dataIndex: 'name',
      hideInTable: true,
      readonly: true,
    },
    {
      title: '用户角色',
      dataIndex: 'name',
    },
    {
      title: '展览管理',
      dataIndex: 'exhibit',
      valueType: 'select',
      valueEnum: roleOper,
    },

    {
      title: '作品上传',
      dataIndex: 'production',
      valueType: 'select',
      valueEnum: roleOper,     
    },
    {
      title: '导师信息',
      dataIndex: 'memtor',
      valueType: 'select',
      valueEnum: roleOper,
    },
    {
      title: '用户管理',
      dataIndex: 'user',
      valueType: 'select',
      valueEnum: roleOper,
    },
    {
      title: '权限管理',
      dataIndex: 'role',
      valueType: 'select',
      valueEnum: roleOper,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <a
            key="editable"
            onClick={() => {
                action?.startEditable?.(record.name);
            }}
            >
        编辑
    </a>
      ],
    },

  ];

  // 作品列表
  const listRole = async (values: API.Role ) => {
    try {
        const res = await getRole({ ...values });
        if (!res.success) {
            message.error(res.message)
            return
        }

        if (res.data) {
            return {
                data: res.data.list,
                success: true,
                total: res.data.total
            }
        }
        
    } catch (error) {
        
    }
  }; 

  


  const handleUpdate = async (values: API.Production) => {
    const hide = message.loading('正在提交');
    try {

        if (values.main_image) {
            if (values.main_image[0].response.data.url) {
                params.main_image = values.main_image[0].response.data.url
            }
        }
        const res = await putProduction(values);
        hide();
        if (res.success) {
            message.success("修改成功");
            return true
        }
        if (res.message != '') {
            message.error(res.message);
            return 
        }

        return true;
    } catch (error) {
        hide();
        message.error('Configuration failed, please try again!');
        return false;
    }
};

  return (
      <EditableProTable<API.Production, API.PageParams>
        headerTitle=""
        actionRef={actionRef}
        cardBordered
        rowKey="name"
        request={listRole}
        columns={columns}
        search={false}
        editable={{
            type: 'multiple',
            editableKeys,
            onSave: async (rowKey, data, row) => {
                console.log(rowKey, data, row);
                await handleUpdate(data);
            },
            onChange: setEditableRowKeys,
            actionRender: (row, config, dom) => [dom.save, dom.cancel],
        }}
        recordCreatorProps={false}

      />
  );
};

export default RoleList;