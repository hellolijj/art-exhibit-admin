import {
  ProForm,
  ModalForm,
  ProFormDateRangePicker,
  ProFormRadio,
  ProFormDependency,
  ProFormUploadButton,
  ProFormSelect,
  ProFormCheckbox,
  ProFormText,
  ProFormTextArea,
  StepsForm,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Modal } from 'antd';
import { initial } from 'lodash';
import React, { useRef, useState } from 'react';

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<API.Exhibit>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  onlineVisible: boolean;
  offlineVisible: boolean;
  values: Partial<API.Exhibit>;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {

 


  return (
    <ModalForm
        initialValues={props.values}
        width={1000}
        modalProps={{
            destroyOnClose: true,
            onCancel: () => props.onCancel(),
        }}
        layout="horizontal"
        visible={props.updateModalVisible}
        submitTimeout={2000}
        onFinish={props.onSubmit}
        title="修改展览信息"
        >
      <ProForm.Group>
      <ProFormText width="md" name="id" label="id" placeholder="请输入展览名称" hidden/>
        <ProFormText width="md" name="name" label="展览名称" placeholder="请输入展览名称"/>
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
                <ProFormText width="md" name="pos" label="线下展览地点" placeholder="请输入线下展览地点" />
                </ProForm.Group>
            }
            if (form == "线上+线下") {
              
              return <ProForm.Group>
                <ProFormDateRangePicker name="on_stage" label="线上展览时间"/>
                <ProFormDateRangePicker name="off_stage" label="线下展览时间"/>
                <ProFormText width="md" name="pos" label="线下展览地点" placeholder="请输入线下展览地点" />
              </ProForm.Group> 
            }
          }}
      </ProFormDependency>

        
      <ProForm.Group>
        <ProFormDateRangePicker name="upload_stage" label="上传作品时间" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormCheckbox.Group
          name="type"
          // layout="horizontal"
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


    


  );
};

export default UpdateForm;
