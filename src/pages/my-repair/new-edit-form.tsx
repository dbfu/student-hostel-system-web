import { t } from '@/utils/i18n';
import { Form, Input, Select } from 'antd';
import { useEffect } from 'react';

import { hostel_list } from '@/api/hostel';
import { repair_create, repair_edit } from '@/api/repair';
import FModalForm from '@/components/modal-form';
import { useUserStore } from '@/stores/user';
import { antdUtils } from '@/utils/antd';
import { clearFormValues } from '@/utils/utils';
import { useRequest, useUpdateEffect } from 'ahooks';
import dayjs from 'dayjs';
import { useShallow } from 'zustand/react/shallow';

interface PropsType {
  open: boolean;
  editData?: API.StudentVO | null;
  title: string;
  onOpenChange: (open: boolean) => void;
  onSaveSuccess: () => void;
}

function NewAndEditRepairForm({
  editData,
  open,
  title,
  onOpenChange,
  onSaveSuccess,
}: PropsType) {

  const { userName, userId } = useUserStore(useShallow(user => ({
    userName: user.currentUser?.nickName,
    userId: user.currentUser?.id,
  })));
  const [form] = Form.useForm();
  const { runAsync: updateUser, loading: updateLoading } = useRequest(repair_edit, {
    manual: true,
    onSuccess: () => {
      antdUtils.message?.success(t("NfOSPWDa" /* 更新成功！ */));
      onSaveSuccess();
    },
  });
  const { runAsync: addUser, loading: createLoading } = useRequest(repair_create, {
    manual: true,
    onSuccess: () => {
      antdUtils.message?.success(t("JANFdKFM" /* 创建成功！ */));
      onSaveSuccess();
    },
  });

  const { data: hostelList, run: getHostelList } = useRequest(hostel_list, { manual: true });

  useUpdateEffect(() => {
    if (open) {
      getHostelList({});
    }
  }, [open])

  useEffect(() => {
    if (!editData) {
      clearFormValues(form);
      form.setFieldsValue({
        repairName: userName,
      });
    } else {
      form.setFieldsValue({
        ...editData,
        enrolDate: dayjs(editData?.enrolDate),
        repairName: userName,
      });
    }
  }, [editData, open]);

  const finishHandle = async (values: any) => {

    values.repairId = userId;

    if (editData) {
      updateUser({
        ...editData,
        ...values,
      })
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
        label="宿舍"
        name="hostelId"
        rules={[{
          required: true,
          message: t("iricpuxB" /* 不能为空 */),
        }]}
      >
        <Select
          options={hostelList?.map(item => ({
            label: `${item.building}#${item.number}`,
            value: item.id,
          }))}
          onChange={() => {
            form.setFieldValue('bedNum', null);
          }}
          allowClear
        />
      </Form.Item>
      <Form.Item
        label="报修人"
        name="repairName"
        rules={[{
          required: true,
          message: t("iricpuxB" /* 不能为空 */),
        }]}
      >
        <Input readOnly />
      </Form.Item>
      <Form.Item
        label="报修内容"
        name="repairRemark"
        rules={[{
          required: true,
          message: t("iricpuxB" /* 不能为空 */),
        }]}
      >
        <Input.TextArea
          rows={4}
        />
      </Form.Item>
    </FModalForm>
  )
}

export default NewAndEditRepairForm;