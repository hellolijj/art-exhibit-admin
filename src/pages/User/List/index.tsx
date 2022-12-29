import { getUser, postUser, deleteUserId, putUser } from '@/services/art-exhibit-api/user';

import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  EditableProTable,
  ModalForm,
  ProForm,
  ProFormText,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { message, Popconfirm, Button } from 'antd';
import React, { useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';



const UserList: React.FC = () => {

  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.GoodListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.GoodListItem[]>([]);
  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<API.User>[] = [
    {
      title: "序号",
      dataIndex: 'id',
      hideInSearch: true,
      readonly: true,
    },
    {
      title: "用户名",
      dataIndex: 'username',
      render: (dom, entity) => {
        return (
          <a>
            {dom}
          </a>
        );
      },
    },
    {
      title: "用户角色",
      dataIndex: 'role',
      valueType: 'select',
      valueEnum: {
          "超级管理员": { text: '超级管理员'},
          "管理员（老师）": {text: '管理员（老师）'},
          "普通用户（学生）": {text: '普通用户（学生）'},
      },
    },
    {
      title: "密码",
      dataIndex: 'password',
      valueType: 'password',
    },
    {
      title: "姓名",
      dataIndex: 'name',
    },
    {
      title: "联系电话",
      dataIndex: 'tel',
    },
    {
      title: "邮箱",
      dataIndex: 'email',
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
        <Popconfirm title="确定删除这条记录吗？" okText="确定" cancelText="取消"
          onConfirm={() => { handleRemove(record) }}>
          <a key="delete">
            删除
          </a>
        </Popconfirm>
      ],
    },
  ];

  const handleSubmit = async (values: API.User) => {
    try {
      // 登录
      const res = await postUser({ ...values });
      if (res.success) {
        actionRef.current?.reloadAndRest?.();
        return
      }
      if (res.message != '') {
        message.error(res.message);
        return
      }

    } catch (error) {

    }
  };


  const listUser = async (values: API.User) => {
    try {
      const res = await getUser({ ...values });
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


/**
 * @en-US Update node
 * @zh-CN 修改用户信息
 *
 * @param fields
 */
const handleUpdate = async (fields: API.User) => {
  const hide = message.loading('修改中');
  try {
    await putUser(fields);
    hide();
    message.success('修改成功');
    actionRef.current?.reloadAndRest?.();
    return true;
  } catch (error) {
    hide();
    message.error('修改失败');
    actionRef.current?.reloadAndRest?.();
    return false;
  }
};

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (row: API.UserListItem) => {
  const hide = message.loading('正在删除');
  if (!row) return true;
  try {
    await deleteUserId({id: row.id});
    hide();
    message.success('删除成功');
    actionRef.current?.reloadAndRest?.();
    return true;
  } catch (error) {
    hide();
    message.error('删除失败');
    return false;
  }
};

  return (
    <div>
      <EditableProTable<API.User, API.PageParams>
        headerTitle="用户列表"
        actionRef={actionRef}
        cardBordered
        rowKey="id"
        request={listUser}
        columns={columns}
        toolBarRender={() => [
          <Button key="button" icon={<PlusOutlined />} type="primary"
            onClick={() => {
              handleModalVisible(true);

            }}>
            添加用户
          </Button>
        ]}
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

      <ModalForm<{
        name: string;
        company: string;
      }>
        title="请输入新用户信息"
        visible={createModalVisible}
        // form={form}
        autoFocusFirstInput
        modalProps={{
          destroyOnClose: true,
          onCancel: () => console.log('run'),
        }}
        layout="horizontal"
        onVisibleChange={handleModalVisible}
        submitTimeout={2000}
        onFinish={async (values) => {
          console.log(values)
          await handleSubmit(values as API.User);
          message.success('提交成功');
          return true;
        }}

      >
        <ProForm.Group>
          <ProFormText width="md" name="username" label="用户名" placeholder="请选择展览" />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText width="md" name="role" label="用户角色" placeholder="请选择展览" />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText width="md" name="password" label="密码" placeholder="请输入作品名称" />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText width="md" name="name" label="姓名" placeholder="请输入展览名称" />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText width="md" name="tel" label="联系电话" placeholder="请输入展览名称" />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText width="md" name="email" label="邮箱" placeholder="请输入展览名称" />
        </ProForm.Group>
      </ModalForm>
    </div>
  );
};

export default UserList;