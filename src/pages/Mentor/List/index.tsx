import { Image } from 'antd';
import type { FC } from 'react';

import { deleteMemtorId, getMemtor, postMemtor, putMemtor } from '@/services/art-exhibit-api/memtor';

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
    // ProTable,
    EditableProTable,
    ModalForm,
    ProForm,
    ProFormText,
    ProFormUploadButton,
    ProFormTextArea,
    
} from '@ant-design/pro-components';


import { useIntl } from '@umijs/max';
import { Button, message,Popconfirm, } from 'antd';
import React, { useRef, useState } from 'react';


const MetorList: React.FC = () => {
    /**
     * @en-US Pop-up window of new window
     * @zh-CN 新建窗口的弹窗
     *  */
    const [createModalVisible, handleModalVisible] = useState<boolean>(false);
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
    const intl = useIntl();

    const columns: ProColumns<API.Memtor>[] = [
        {
            title: "序号",
            dataIndex: 'id',
            hideInSearch: true,
            readonly: true,
        },
        {
            title: '姓名',
            dataIndex: 'name',
            render: (dom, entity) => {
                return (
                    <a
                    >
                        {dom}
                    </a>
                );
            },
            valueType: 'text',

        },
        {
            title: '照片',
            dataIndex: 'avatar',
            render(dom, entity, index, action, schema) {
                return <Image
                    height={100}
                    src={dom}
                />
            },
            hideInSearch: true,
            readonly: true,

        },
        {
            title: '工号',
            dataIndex: 'wid',
            valueType: 'text',
        },
        {
            title: '联系电话',
            dataIndex: 'tel',
            hideInForm: true,
            valueType: 'text',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            hideInForm: true,
            hideInSearch: true,
            valueType: 'text',
        },
        {
            title: '指导专业',
            dataIndex: 'major',
            hideInForm: true,
            hideInSearch: true,
            valueType: 'select',
            valueEnum: {
                "视觉传达设计": { text: '视觉传达设计'},
                "环境设计": {text: '环境设计'},
                "数字媒体艺术": {text: '数字媒体艺术'},
                "产品设计": {text: '产品设计'},
                "美术学": {text: '美术学'},
            },
        },
        {
            title: '个人简介',
            dataIndex: 'profile',
            hideInForm: true,
            hideInSearch: true,
            valueType: 'textarea',
        },
        {
            title: '操作',
            valueType: 'option',
            key: 'option',
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
                onConfirm={ () => { handleRemove(record) }}>
                  <a key="delete">
                  删除
                </a>
              </Popconfirm>
            ],
        },

    ];

    const handleSubmit = async (values: API.Memtor) => {
        try {
            let params = values;
            if (values.avatar) {
                if(values.avatar[0].response.data.url) {
                    params.avatar = values.avatar[0].response.data.url
                }
            }

            const res = await postMemtor({}, {...params });
            if (res.success) {
                message.success("添加成功！");
                actionRef.current?.reloadAndRest?.();
                return
            }
            if (res.errorMessage != '') {
                message.error(res.errorMessage);
                return
            }   

        } catch (error) {
            const defaultLoginFailureMessage = intl.formatMessage({
                id: 'pages.login.failure',
                defaultMessage: '添加失败，请重试！',
            });
            console.log(error);
            message.error(defaultLoginFailureMessage);
        }
    };

    
    const handleRemove = async (row: API.deleteMemtorIdParams) => {
      const hide = message.loading('正在删除');
      if (!row) return true;
      try {
        await deleteMemtorId({"id": row.id});
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

    const listMemtor = async (values: API.Memtor ) => {
        try {
            const res = await getMemtor({ ...values });
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

    const handleUpdate = async (values: API.Memtor) => {
        
        console.log(values)
        try {
            let params = values;
            // if (values.avatar) {
            //     if(values.avatar[0].response.data.url) {
            //         params.avatar = values.avatar[0].response.data.url
            //     }
            // }

            console.log(params)

            const res = await putMemtor({...params });
            if (res.success) {
                message.success("修改成功");
                actionRef.current?.reloadAndRest?.();
                return
            }
            if (res.message != '') {
                message.error(res.message);
                return
            }   

        } catch (error) {
            console.log(error);
            message.error("修改失败，请重试！");
            actionRef.current?.reloadAndRest?.();
        }
    };


    

    return (
        <div>
            <EditableProTable<API.Memtor, API.PageParams>
                headerTitle="导师列表"
                actionRef={actionRef}
                cardBordered
                rowKey="id"
                request={listMemtor}
                columns={columns}
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
                        添加导师
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
            }>
                title="请输入导师信息"
                visible={createModalVisible}
                autoFocusFirstInput
                modalProps={{
                    destroyOnClose: true,
                    onCancel: () => console.log('run'),
                }}
                layout="horizontal"
                onVisibleChange={handleModalVisible}
                submitTimeout={2000}
                onFinish={async (values) => {
                    await handleSubmit(values as API.Memtor);
                    message.success('提交成功');
                    return true;
                }}
            >
                <ProForm.Group>
                    <ProFormText width="md" name="name" label="姓名" />
                </ProForm.Group>
                <ProForm.Group>
                    <ProFormText width="md" name="wid" label="工号" />
                </ProForm.Group>
                <ProForm.Group>
                    <ProFormText width="md" name="tel" label="联系电话" />
                </ProForm.Group>
                <ProForm.Group>
                    <ProFormText width="md" name="email" label="邮箱" />
                </ProForm.Group>
                <ProForm.Group>
                    <ProFormText width="md" name="major" label="指导专业" />
                </ProForm.Group>
                <ProForm.Group>
                    <ProFormUploadButton label="个人照片" name="avatar" action={"/api/upload"}/> 
                </ProForm.Group>
                <ProForm.Group>
                    <ProFormTextArea
                        name="profile"
                        label="个人简介"
                        placeholder="请输入个人简介"
                    />
                </ProForm.Group>
            </ModalForm>
        </div>
    );
};

export default MetorList;