import { t } from '@/utils/i18n';
import {
  Button,
  Divider,
  Popconfirm,
  Space,
  Upload
} from 'antd';
import { useRef, useState } from 'react';

import { student_page, student_remove } from '@/api/student';
import LinkButton from '@/components/link-button';
import FProTable from '@/components/pro-table';
import axios from '@/request';
import { antdUtils } from '@/utils/antd';
import { toPageRequestParams } from '@/utils/utils';
import { DownloadOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { ActionType, ProColumnType } from '@ant-design/pro-components';
import FileSaver from 'file-saver';
import ImportErrorMessageModal from './import-error-message';
import NewAndEditStudentForm from './new-edit-form';

function StudentPage() {
  const actionRef = useRef<ActionType>();

  const [formOpen, setFormOpen] = useState(false);
  const [editData, setEditData] = useState<API.StudentVO | null>(null);
  const [importErrorMessageOpen, setImportErrorMessageOpen] = useState(false);
  const [importErrorMessageData, setImportErrorMessageData] = useState<any>([]);

  const openForm = () => {
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditData(null);
  };

  const saveHandle = () => {
    actionRef.current?.reload();
    setFormOpen(false);
    setEditData(null);
  };

  const columns: ProColumnType<API.StudentVO>[] = [
    {
      dataIndex: 'fullName',
      title: t("iHiMUzEr" /* 姓名 */),
    },
    {
      dataIndex: 'code',
      title: t("JTDacbUB" /* 学号 */),
    },
    {
      dataIndex: 'sex',
      title: t("ykrQSYRh" /* 性别 */),
      renderText(text) {
        return text === 1 ? t("AkkyZTUy" /* 男 */) : t("yduIcxbx" /* 女 */);
      },
      search: false,
    },
    {
      dataIndex: ['major', 'name'],
      title: t("mCsnYkSS" /* 专业 */),
      search: false,
    },
    {
      dataIndex: 'classNum',
      title: t("ucwGleiK" /* 班级 */),
      renderText(text) {
        return text + t("HEpbQBFB" /* 班 */);
      },
      search: false,
    },
    {
      dataIndex: 'phoneNumber',
      title: t("SPsRnpyN" /* 手机号 */),
      search: false,
    },
    {
      dataIndex: 'email',
      title: t("XWVvMWig" /* 邮箱 */),
      search: false,
    },
    {
      dataIndex: 'hostel',
      title: t("MCeuTXqz" /* 宿舍 */),
      search: false,
      renderText(_, record) {
        return [record.hostel?.building, record.hostel?.number].join('#')
      },
    },
    {
      dataIndex: 'bedNum',
      title: t("yBrYgKOg" /* 床位 */),
      search: false,
      renderText(text) {
        return text + t("PxaFmeun" /* 号 */);
      },
    },
    {
      dataIndex: 'enrolDate',
      title: t("ZzDpEjzU" /* 入学日期 */),
      valueType: 'date',
      search: false,
    },
    {
      title: t("QkOmYwne" /* 操作 */),
      dataIndex: 'id',
      hideInForm: true,
      width: 200,
      align: 'center',
      search: false,
      renderText: (id: string, record) => (
        <Space
          split={(
            <Divider type='vertical' />
          )}
        >
          <LinkButton
            onClick={() => {
              setEditData(record);
              setFormOpen(true);
            }}
          >
            {t("wXpnewYo" /* 编辑 */)}
          </LinkButton>
          <Popconfirm
            title={t("RCCSKHGu" /* 确认删除？ */)}
            onConfirm={async () => {
              await student_remove({ id });
              antdUtils.message?.success(t("CVAhpQHp" /* 删除成功! */));
              actionRef.current?.reload();
            }}
            placement="topRight"
          >
            <LinkButton>
              {t("HJYhipnp" /* 删除 */)}
            </LinkButton>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  async function customRequest(options: any) {
    const formData = new FormData();
    formData.append("file", options.file);
    const data = await axios('/student/import', {
      data: formData,
      method: 'POST',
    });
    if (!data.success) {
      setImportErrorMessageData(data.message);
      setImportErrorMessageOpen(true);
    } else {
      antdUtils.message?.success(t("CdCRuEui" /* 导入成功! */));
      actionRef.current?.reload();
    }
  }

  async function downloadTemplate() {
    const data = await axios('/student/export/template', {
      method: 'POST',
      responseType: 'blob',
    });

    const blob = new Blob([data])
    FileSaver.saveAs(blob, '学生信息模板.xlsx');
  }

  return (
    <>
      <FProTable<API.StudentVO, Omit<API.StudentVO, 'id'>>
        actionRef={actionRef}
        columns={columns}
        request={async params => {
          return student_page(toPageRequestParams(params));
        }}
        headerTitle={(
          <Space>
            <Button
              onClick={openForm}
              type='primary'
              icon={<PlusOutlined />}
            >
              {t('morEPEyc' /* 新增 */)}
            </Button>
            <Button
              onClick={() => {
                downloadTemplate();
              }}
              icon={<DownloadOutlined />}
            >
              {t("FYDPOfDI" /* 下载导入模板 */)}
            </Button>
            <Upload customRequest={customRequest} fileList={[]} accept='.xlsx,.xls'>
              <Button icon={<UploadOutlined />}>{t("ZjPaWYIx" /* 导入 */)}</Button>
            </Upload>
          </Space>
        )}
      />
      <NewAndEditStudentForm
        onOpenChange={open => !open && closeForm()}
        editData={editData}
        onSaveSuccess={saveHandle}
        open={formOpen}
        title={editData ? t('wXpnewYo' /* 编辑 */) : t('VjwnJLPY' /* 新建 */)}
      />
      <ImportErrorMessageModal
        open={importErrorMessageOpen}
        setOpen={setImportErrorMessageOpen}
        data={importErrorMessageData}
      />
    </>
  );
}

export default StudentPage;
