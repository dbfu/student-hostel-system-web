import { t } from '@/utils/i18n';
import { Form, Input, InputNumber } from 'antd';
import { useEffect } from 'react';

import { major_create, major_edit } from '@/api/major';
import FModalForm from '@/components/modal-form';
import { antdUtils } from '@/utils/antd';
import { clearFormValues } from '@/utils/utils';
import { useRequest } from 'ahooks';

interface PropsType {
  open: boolean;
  editData?: API.MajorVO | null;
  title: string;
  onOpenChange: (open: boolean) => void;
  onSaveSuccess: () => void;
}

function NewAndEditMajorForm({
  editData,
  open,
  title,
  onOpenChange,
  onSaveSuccess,
}: PropsType) {

  const [form] = Form.useForm();
  const { runAsync: updateUser, loading: updateLoading } = useRequest(major_edit, {
    manual: true,
    onSuccess: () => {
      antdUtils.message?.success(t("NfOSPWDa" /* 更新成功！ */));
      onSaveSuccess();
    },
  });
  const { runAsync: addUser, loading: createLoading } = useRequest(major_create, {
    manual: true,
    onSuccess: () => {
      antdUtils.message?.success(t("JANFdKFM" /* 创建成功！ */));
      onSaveSuccess();
    },
  });

  useEffect(() => {
    if (!editData) {
      clearFormValues(form);
    } else {
      form.setFieldsValue({
        ...editData,
      });
    }
  }, [editData]);

  const finishHandle = async (values: any) => {
    if (editData) {
      updateUser({ ...editData, ...values })
    } else {
      addUser(values)
    }
  }

  return (
    <FModalForm
      labelCol={{ sm: { span: 24 }, md: { span: 5 } }}
      wrapperCol={{ sm: { span: 24 }, md: { span: 16 } }}
      form={form}
      onFinish={finishHandle}
      open={open}
      title={title}
      width={640}
      loading={updateLoading || createLoading}
      onOpenChange={onOpenChange}
      layout='horizontal'
      modalProps={{ forceRender: true }}
    >
      <Form.Item
        label="专业名称"
        name="name"
        rules={[{
          required: true,
          message: t("iricpuxB" /* 不能为空 */),
        }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="班级数量"
        name="classCount"
        rules={[{
          required: true,
          message: t("iricpuxB" /* 不能为空 */),
        }]}
      >
        <InputNumber min={1} />
      </Form.Item>
    </FModalForm>
  )
}

export default NewAndEditMajorForm;