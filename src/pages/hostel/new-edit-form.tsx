import { t } from '@/utils/i18n';
import { Form, Input, InputNumber } from 'antd';
import { useEffect } from 'react';

import { hostel_create, hostel_edit } from '@/api/hostel';
import FModalForm from '@/components/modal-form';
import { antdUtils } from '@/utils/antd';
import { clearFormValues } from '@/utils/utils';
import { useRequest } from 'ahooks';

interface PropsType {
  open: boolean;
  editData?: API.HostelVO | null;
  title: string;
  onOpenChange: (open: boolean) => void;
  onSaveSuccess: () => void;
}

function NewAndEditHostelForm({
  editData,
  open,
  title,
  onOpenChange,
  onSaveSuccess,
}: PropsType) {

  const [form] = Form.useForm();
  const { runAsync: updateUser, loading: updateLoading } = useRequest(hostel_edit, {
    manual: true,
    onSuccess: () => {
      antdUtils.message?.success(t("NfOSPWDa" /* 更新成功！ */));
      onSaveSuccess();
    },
  });
  const { runAsync: addUser, loading: createLoading } = useRequest(hostel_create, {
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
        label="门牌号"
        name="number"
        rules={[{
          required: true,
          message: t("iricpuxB" /* 不能为空 */),
        }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="栋号"
        name="building"
        rules={[{
          required: true,
          message: t("iricpuxB" /* 不能为空 */),
        }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="楼层"
        name="floor"
        rules={[{
          required: true,
          message: t("iricpuxB" /* 不能为空 */),
        }]}
      >
        <InputNumber min={1} />
      </Form.Item>
      <Form.Item
        label="床位数量"
        name="bedCount"
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

export default NewAndEditHostelForm;