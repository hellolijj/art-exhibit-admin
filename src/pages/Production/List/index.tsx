import { Form, Select, Space, Image } from 'antd';
import type { FC } from 'react';
import { listOrders, payOrder } from '@/services/cookie-shop-admin/order';
import { addRule, removeRule, rule, updateRule } from '@/services/cookie-shop-admin/api';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  ProTable,
  ModalForm,
  ProForm,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormList,
  ProFormText,
  ProFormUploadButton,
  ProFormTextArea,
  ProFormCheckbox
} from '@ant-design/pro-components';

import CommonForm from './components/CommonForm';



import { useIntl } from '@umijs/max';
import { Button, message, Popconfirm, } from 'antd';
import React, { useRef, useState } from 'react';
import { getProduction, postProduction, deleteProductionId } from '@/services/art-exhibit-api/production';
import { putProduction } from '@/services/art-exhibit-api/production';

const ProductionList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [modalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModelVisible] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.GoodListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.GoodListItem[]>([]);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<API.Production>[] = [
    {
      title: "序号",
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '展览名称',
      dataIndex: 'exhibit',
      hideInSearch: true,
    },
    {
      title: '作品名称',
      dataIndex: 'name',
      hideInSearch: true,
    },

    {
      title: '作者',
      dataIndex: 'author',
      hideInSearch: true,
      render: (text, record, _, action) => {
        return record.authors?.map((item) => <span>{item.name}</span>)
      }
    },
    {
      title: '作品类别',
      dataIndex: 'type',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '年级/专业/班级',
      dataIndex: 'count',
      sorter: true,
      hideInForm: true,
      hideInSearch: true,
      render: (text, record, _, action) => {
        return record.authors?.map((item) => <span>{item.grade}/{item.major}/{item.class}</span>)
      }
    },
    {
      title: '指导老师',
      dataIndex: 'tutor',
      sorter: true,
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <a
          // key="editable"
          onClick={() => {
            // action?.startEditable?.(record.id);
          }}
        >
          查看
        </a>,
        <a
          key="editable"
          onClick={() => {
            handleUpdateModelVisible(true);
            setCurrentRow(record);
        }}
        >
          编辑
        </a>,
        <Popconfirm title="确定删除这条记录吗？" okText="确定" cancelText="取消" 
          onConfirm={ () => { handleRemove(record) }}>
            <a key="delete">
            删除
          </a>
        </Popconfirm>
      ],
    },

  ];

  // 作品列表
  const listProduction = async (values: API.Production ) => {
    try {
        const res = await getProduction({ ...values });
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

  // 提交作品
  const handleSubmit = async (values: API.Production) => {
      try {
          let params = values;
          // if (values.avatar) {
          //     if(values.avatar[0].response.data.url) {
          //         params.avatar = values.avatar[0].response.data.url
          //     }
          // }

          const res = await postProduction(params);
          if (res.success) {
              message.success("添加成功！");
              actionRef.current?.reloadAndRest?.();
              return true
          }
          if (res.message != '') {
              message.error(res.message);
              return
          }   

      } catch (error) {
          console.log(error);
          message.error("添加失败，请重试！");
      }
  };

  const handleRemove = async (row: API.deleteProductionIdParams) => {
    const hide = message.loading('正在删除');
    if (!row) return true;
    try {
      await deleteProductionId({"id": row.id});
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
    <div>
      <ProTable<API.Production, API.PageParams>
        headerTitle="作品列表"
        actionRef={actionRef}
        cardBordered
        rowKey="id"
        request={listProduction}
        columns={columns}
        search={{
          labelWidth: 'auto',
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        toolBarRender={() => [
          <Button key="button" icon={<PlusOutlined />} type="primary"
            onClick={() => {
              handleModalVisible(true);
            }}>
             
            添加作品
          </Button>
        ]}
      />

      {/*  新建*/}
      <CommonForm
          onSubmit={async (value) => {
              const success = await handleSubmit(value);
              if (success) {
                  handleModalVisible(false);
                  setCurrentRow(undefined);
                  if (actionRef.current) {
                      actionRef.current.reload();
                  }
              }
          }}

          onCancel={() => {
              handleModalVisible(false)
          }}
          modelVisible={modalVisible}
          title="请输入作品信息"
          values={{}}
      />

      
      {/* 编辑 */}
      <CommonForm
          onSubmit={async (value) => {
              const success = await handleUpdate(value);
              if (success) {
                  handleUpdateModelVisible(false);
                  setCurrentRow(undefined);
                  if (actionRef.current) {
                      actionRef.current.reload();
                  }
              }
          }}

          onCancel={() => {
            handleUpdateModelVisible(false);
          }}
          modelVisible={updateModalVisible}
          values={currentRow || {}}
          title="修改作品信息"
      />

    </div>
  );
};

export default ProductionList;