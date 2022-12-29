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
    ProFormList
  } from '@ant-design/pro-components';
  
  
  export type FormValueType = {
    target?: string;
    template?: string;
    type?: string;
    time?: string;
    frequency?: string;
  } & Partial<API.Production>;
  
  export type FormProps = {
    onCancel: (flag?: boolean, formVals?: FormValueType) => void;
    onSubmit: (values: FormValueType) => Promise<void>;
    title: string;
    modelVisible: boolean;
    values: Partial<API.Production>;
  };
  
  const CommonForm: React.FC<FormProps> = (props) => {
    return (
      <ModalForm
          title={props.title}
          initialValues={props.values}
          width={1000}
          modalProps={{
              destroyOnClose: true,
              onCancel: () => props.onCancel(),
          }}
          layout="horizontal"
          visible={props.modelVisible}
          submitTimeout={2000}
          onFinish={props.onSubmit}
          >
            <ProForm.Group>
            <ProFormText width="md" name="id" label="id" placeholder="请输入展览名称" hidden/>
          <ProFormText width="md" name="exhibit" label="展览名称" placeholder="请选择展览" />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText width="md" name="name" label="作品名称" placeholder="请输入作品名称" />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText width="md" name="type" label="作品类型" placeholder="请输入展览名称" />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormUploadButton label="作品主图" name="main_image" action="upload.do" />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormTextArea
            name="profile"
            label="作品介绍"
            placeholder="请输入作品介绍"
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormTextArea
            name="content"
            label="作品排版"
            placeholder="请输入作品排版"
          />
        </ProForm.Group>
        <ProFormList 
          name="authors"
          label="作者信息"
          creatorButtonProps={{
            
            creatorButtonText: '新增作者',
          }}
          >
      <ProForm.Group>
        <ProFormText width="md" name="name" label="姓名" placeholder="" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText width="md" name="school" label="学校" placeholder="请选择姓名" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText width="md" name="college" label="学院" placeholder="请选择姓名" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText width="md" name="major" label="专业" placeholder="请选择姓名" />
        <ProFormText width="md" name="grade" label="年级" placeholder="请选择姓名" />
        <ProFormText width="md" name="class" label="班级" placeholder="请选择姓名" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText width="md" name="memtor" label="指导老师" placeholder="请选择姓名" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText width="md" name="email" label="邮箱" placeholder="请选择姓名" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText width="md" name="avator" label="个人照片" placeholder="请选择姓名" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText width="md" name="profile" label="个人简介" placeholder="请输入个人简介" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText width="md" name="work" label="负责内容" placeholder="合作作品输入负责内容" />
      </ProForm.Group>
      </ProFormList>
        
        </ModalForm>  
    );
  };
  
  export default CommonForm;
  