import { t } from '@/utils/i18n';
import { DatePicker, Form, Input, Radio, Select } from 'antd';
import { useEffect, useMemo, useState } from 'react';

import { hostel_list } from '@/api/hostel';
import { major_list } from '@/api/major';
import { student_create, student_edit } from '@/api/student';
import FModalForm from '@/components/modal-form';
import { antdUtils } from '@/utils/antd';
import { clearFormValues } from '@/utils/utils';
import { useRequest, useUpdateEffect } from 'ahooks';
import dayjs from 'dayjs';

interface PropsType {
  open: boolean;
  editData?: API.StudentVO | null;
  title: string;
  onOpenChange: (open: boolean) => void;
  onSaveSuccess: () => void;
}

function NewAndEditStudentForm({
  editData,
  open,
  title,
  onOpenChange,
  onSaveSuccess,
}: PropsType) {

  const [formValues, setFormValues] = useState<any>({});

  const [form] = Form.useForm();
  const { runAsync: updateUser, loading: updateLoading } = useRequest(student_edit, {
    manual: true,
    onSuccess: () => {
      antdUtils.message?.success(t("NfOSPWDa" /* 更新成功！ */));
      onSaveSuccess();
    },
  });
  const { runAsync: addUser, loading: createLoading } = useRequest(student_create, {
    manual: true,
    onSuccess: () => {
      antdUtils.message?.success(t("JANFdKFM" /* 创建成功！ */));
      onSaveSuccess();
    },
  });

  const { data: majorList, run: getMajorList } = useRequest(major_list, { manual: true });
  const { data: hostelList, run: getHostelList } = useRequest(hostel_list, { manual: true });

  useUpdateEffect(() => {
    if (open) {
      getMajorList({});
      getHostelList({});
    }
  }, [open])

  useEffect(() => {
    if (!editData) {
      clearFormValues(form);
      setFormValues({});
    } else {
      form.setFieldsValue({
        ...editData,
        enrolDate: dayjs(editData?.enrolDate),
      });
      setFormValues({
        ...editData,
        enrolDate: dayjs(editData?.enrolDate),
      });
    }
  }, [editData]);

  const classCount = useMemo(() => {
    return majorList?.find(item => item.id === formValues.majorId)?.classCount;
  }, [formValues]);

  const bedCount = useMemo(() => {
    return hostelList?.find(item => item.id === formValues.hostelId)?.bedCount;
  }, [formValues]);

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
      onValuesChange={(_, allValues) => {
        setFormValues(allValues);
      }}
    >
      <Form.Item
        label="姓名"
        name="fullName"
        rules={[{
          required: true,
          message: t("iricpuxB" /* 不能为空 */),
        }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="学号"
        name="code"
        rules={[{
          required: true,
          message: t("iricpuxB" /* 不能为空 */),
        }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="性别"
        name="sex"
        rules={[{
          required: true,
          message: t("iricpuxB" /* 不能为空 */),
        }]}
      >
        <Radio.Group
          options={[{
            label: '男',
            value: 1,
          },
          {
            label: '女',
            value: 0,
          }]}
        />
      </Form.Item>
      <Form.Item
        label="专业"
        name="majorId"
        rules={[{
          required: true,
          message: t("iricpuxB" /* 不能为空 */),
        }]}
      >
        <Select
          options={majorList?.map(item => ({
            label: item.name,
            value: item.id,
          }))}
          onChange={() => {
            form.setFieldValue('classNum', null);
          }}
        />
      </Form.Item>
      <Form.Item
        label="班级"
        name="classNum"
        rules={[{
          required: true,
          message: t("iricpuxB" /* 不能为空 */),
        }]}
      >
        <Select
          disabled={!classCount}
          options={Array.from({ length: classCount || 0 }, (_, i) => i + 1).map(item => ({
            label: `${item}班`,
            value: `${item}`,
          }))}
        />
      </Form.Item>
      <Form.Item
        label="手机号"
        name="phoneNumber"
        rules={[
          {
            required: true,
            message: t("iricpuxB" /* 不能为空 */),
          },
          {
            pattern: /^(13[0-9]|14[5-9]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[89])\d{8}$/,
            message: t("AnDwfuuT" /* 手机号格式不正确 */),
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="邮箱"
        name="email"
        rules={[
          {
            required: true,
            message: t("iricpuxB" /* 不能为空 */),
          },
          {
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: t("EfwYKLsR" /* 邮箱格式不正确 */),
          },
        ]}
      >
        <Input />
      </Form.Item>
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
        label="床位"
        name="bedNum"
        rules={[{
          required: true,
          message: t("iricpuxB" /* 不能为空 */),
        },
        ]}
      >
        <Select
          disabled={!bedCount}
          options={Array.from({ length: bedCount || 0 }, (_, i) => i + 1).map(item => ({
            label: `${item}号床`,
            value: `${item}`,
          }))}
          allowClear
        />
      </Form.Item>
      <Form.Item
        label="入学时间"
        name="enrolDate"
        rules={[{
          required: true,
          message: t("iricpuxB" /* 不能为空 */),
        },
        ]}
      >
        <DatePicker />
      </Form.Item>
    </FModalForm>
  )
}

export default NewAndEditStudentForm;