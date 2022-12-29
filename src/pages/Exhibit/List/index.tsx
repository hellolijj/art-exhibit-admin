import { Form, Select, Space, Image } from 'antd';
import type { FC } from 'react';
import { listOrders, payOrder } from '@/services/cookie-shop-admin/order';
// import { listExhibits } from '@/services/art-exhibit-admin/exhibit';

import { addRule, removeRule, rule, updateRule } from '@/services/cookie-shop-admin/api';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
    ModalForm,
    EditableProTable,
    ProForm,
    ProFormDependency,
    ProFormDateRangePicker,
    ProFormSelect,
    ProFormText,
    ProFormUploadButton,
    ProFormTextArea,
    ProFormCheckbox
} from '@ant-design/pro-components';


import { useIntl } from '@umijs/max';
import { Button, message, Popconfirm } from 'antd';
import React, { useRef, useState } from 'react';
import { deleteExhibitId, getExhibit, postExhibit } from '@/services/art-exhibit-api/exhibit';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import { putExhibit } from '@/services/art-exhibit-swagger/exhibit';



const ExhibitList: React.FC = () => {
    /**
     * @en-US Pop-up window of new window
     * @zh-CN 新建窗口的弹窗
     *  */
    const [createModalVisible, handleModalVisible] = useState<boolean>(false);
    /**
     * @en-US The pop-up window of the distribution update window
     * @zh-CN 分布更新窗口的弹窗
     * */
    const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

    const actionRef = useRef<ActionType>();
    const [currentRow, setCurrentRow] = useState<API.GoodListItem>();

    

    /**
     * @en-US International configuration
     * @zh-CN 国际化配置
     * */
    const intl = useIntl();

    const columns: ProColumns<API.Exhibit>[] = [
        {
            title: "序号",
            dataIndex: 'id',
            hideInSearch: true,
            readonly: true,
        },
        {
            title: '展览名称',
            dataIndex: 'name',
            render: (dom, entity) => {
                return (
                    <a>
                        {dom}
                    </a>
                );
            },
        },
        {
            title: '图片',
            dataIndex: 'main_image',
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
            title: '展览形式',
            dataIndex: 'form',
            valueType: 'select',
            valueEnum: {
                "线上": { text: '线上' },
                "线下": { text: '线下' },
                "线上+线下": { text: '线上+线下' },
            },
            // valueEnum: 
        },
        {
            title: '时间',
            dataIndex: 'on_stage',
            hideInForm: true,
        },
        {
            title: '展览状态',
            dataIndex: 'state',
            hideInForm: true,
            hideInSearch: true,
            valueType: 'select',
            valueEnum: {
                "开启": { text: '开启' },
                "关闭": { text: '关闭' },
            },
        },
        {
            title: '上传状态',
            dataIndex: 'upload_state',
            sorter: true,
            hideInForm: true,
            hideInSearch: true,
            valueType: 'select',
            valueEnum: {
                "开启": { text: '开启' },
                "关闭": { text: '关闭' },
            },
        },
        {
            title: '操作',
            valueType: 'option',
            render: (text, record, _, action) => [
                <a

                    onClick={() => {
                        action?.startEditable?.(record.id);
                    }}
                >
                    开放
                </a>,
                <a
                    onClick={() => {
                        action?.startEditable?.(record.id);
                    }}
                >
                    关闭
                </a>,
                <a
                    key="config"

                    onClick={() => {
                        handleUpdateModalVisible(true);
                        setCurrentRow(record);
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

    const listExhibit = async (values: API.Exhibit) => {
        try {
            const res = await getExhibit({ ...values });
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

    const handleSubmit = async (values: API.Exhibit) => {
        let params = values;
        try {
            if (values.main_image) {
                if (values.main_image[0].response.data.url) {
                    params.main_image = values.main_image[0].response.data.url
                }
            }

            const res = await postExhibit({ ...params });
            if (res.success) {
                message.success("添加成功！");
                actionRef.current?.reloadAndRest?.();
                return
            }
            if (res.message != '') {
                message.error(res.message);
                return
            }

        } catch (error) {
            console.log(error);
            message.error("添加失败");
        }
    };

    const handleRemove = async (row: API.deleteMemtorIdParams) => {
        const hide = message.loading('正在删除');
        if (!row) return true;
        try {
            await deleteExhibitId({ "id": row.id });
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


    /**
     * @en-US Update node
     * @zh-CN 更新节点
     *
     * @param fields
     */
    const handleUpdate = async (values: API.Exhibit) => {
        const hide = message.loading('正在提交');
        try {

            if (values.main_image) {
                if (values.main_image[0].response.data.url) {
                    params.main_image = values.main_image[0].response.data.url
                }
            }
            const res = await putExhibit({ ...values });
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
            <EditableProTable<API.Exhibit, API.PageParams>
                headerTitle="展览列表"
                actionRef={actionRef}
                cardBordered
                rowKey="id"
                request={listExhibit}
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
                        添加展览
                    </Button>
                ]}
                recordCreatorProps={false}
            />

            <ModalForm<{ name: string; }>
                width={1000}
                title="请输入展览信息"
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
                    await handleSubmit(values as API.Exhibit);
                    return true;
                }}
            >
                <ProForm.Group>
                    <ProFormText width="md" name="name" label="展览名称" placeholder="请输入展览名称" />
                </ProForm.Group>
                <ProForm.Group>
                    <ProFormSelect
                        width="md"
                        options={[
                            {
                                value: '线上',
                                label: '线上',
                            },
                            {
                                value: '线下',
                                label: '线下',
                            },
                            {
                                value: '线上+线下',
                                label: '线上+线下',
                            },
                        ]}
                        name="form"
                        label="展览形式"
                    />
                </ProForm.Group>
                <ProFormDependency name={['form']}>
                    {({ form }) => {
                        if (form == "线上") {
                        return <ProForm.Group>
                            <ProFormDateRangePicker name="on_stage" label="线上展览时间"/>
                            </ProForm.Group>
                        }
                        if (form == "线下") {
                        return <ProForm.Group>
                            <ProFormDateRangePicker name="off_stage" label="线下展览时间"/>
                            <ProFormText width="md" name="pos" label="线下展览地点" placeholder="请输入线下展览地点"/>
                            </ProForm.Group>
                        }
                        if (form == "线上+线下") {
                        
                        return <ProForm.Group>
                            <ProFormDateRangePicker name="on_stage" label="线上展览时间"/>
                            <ProFormDateRangePicker name="off_stage" label="线下展览时间"/>
                            <ProFormText width="md" name="pos" label="线下展览地点" placeholder="请输入线下展览地点"/>
                        </ProForm.Group> 
                        }
                    }}
                </ProFormDependency>
                <ProForm.Group>
                    <ProFormDateRangePicker name="upload_stage" label="上传作品时间" />
                </ProForm.Group>
                <ProForm.Group>
                
                {/* 全选逻辑：https://ant.design/components/checkbox-cn#components-checkbox-demo-check-all */}
                {/* todo<ProFormCheckbox label="参展作品类型" checked>全选</ProFormCheckbox> */}
                    <ProFormCheckbox.Group
                        name="type"
                        label="参展作品类型"
                        options={['品牌设计', '产品设计', '环境设计', '数字媒体', '工艺美术', '传统美术', '书籍设计', '景观设计', 'IP设计', '数字摄影', 'UI设计', '文艺设计']}
                    />
                    
                </ProForm.Group>
                <ProForm.Group>
                    <ProFormCheckbox.Group
                        name="major"
                        // layout="horizontal"
                        label="参展专业"
                        options={['视觉传达设计', '产品设计', '环境设计', '数字媒体艺术', '美术学', '艺术设计', '设计学', '设计管理']}
                    />
                </ProForm.Group>
                <ProForm.Group>
                    <ProFormSelect
                        width="xs"
                        name="cate"
                        label="目录分类"
                        options={[
                            {
                                value: '按专业',
                                label: '按专业',
                            },
                            {
                                value: '按作品类型',
                                label: '按作品类型',
                            },
                        ]}
                    />
                </ProForm.Group>

                <ProForm.Group>
                    <ProFormUploadButton label="主视觉照片" name="main_image" action="upload.do" />
                </ProForm.Group>
                <ProForm.Group>
                    <ProFormTextArea
                        name="profile"
                        label="展览介绍"
                        placeholder="请输入展览介绍"
                    />
                </ProForm.Group>

            </ModalForm>

            <UpdateForm
                onSubmit={async (value) => {
                    const success = await handleUpdate(value);
                    if (success) {
                        handleUpdateModalVisible(false);
                        setCurrentRow(undefined);
                        if (actionRef.current) {
                            actionRef.current.reload();
                        }
                    }
                }}

                onCancel={() => {
                    handleUpdateModalVisible(false);
                }}
                updateModalVisible={updateModalVisible}
                values={currentRow || {}}
            />


        </div>
    );
};

export default ExhibitList;