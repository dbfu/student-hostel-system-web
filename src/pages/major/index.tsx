import { t } from '@/utils/i18n';
import {
  Button,
  Divider,
  Popconfirm,
  Space
} from 'antd';
import { useRef, useState } from 'react';

import { major_page, major_remove } from '@/api/major';
import LinkButton from '@/components/link-button';
import FProTable from '@/components/pro-table';
import { antdUtils } from '@/utils/antd';
import { toPageRequestParams } from '@/utils/utils';
import { PlusOutlined } from '@ant-design/icons';
import { ActionType, ProColumnType } from '@ant-design/pro-components';
import NewAndEditMajorForm from './new-edit-form';

function MajorPage() {
  const actionRef = useRef<ActionType>();

  const [formOpen, setFormOpen] = useState(false);
  const [editData, setEditData] = useState<API.MajorVO | null>(null);
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

  const columns: ProColumnType<API.MajorVO>[] = [
    {
      dataIndex: 'name',
      title: '专业名称',
    },
    {
      dataIndex: 'classCount',
      title: '班级数量',
      hideInSearch: true,
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
              console.log(id, 'id')
              await major_remove({ id });
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

  return (
    <>
      <FProTable<API.MajorVO, Omit<API.MajorVO, 'id'>>
        actionRef={actionRef}
        columns={columns}
        request={async params => {
          return major_page(toPageRequestParams(params));
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
          </Space>
        )}
      />
      <NewAndEditMajorForm
        onOpenChange={open => !open && closeForm()}
        editData={editData}
        onSaveSuccess={saveHandle}
        open={formOpen}
        title={editData ? t('wXpnewYo' /* 编辑 */) : t('VjwnJLPY' /* 新建 */)}
      />
    </>
  );
}

export default MajorPage;
