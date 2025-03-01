import { t } from '@/utils/i18n';
import {
  Button,
  Divider,
  Popconfirm,
  Space
} from 'antd';
import { useRef, useState } from 'react';

import { hostel_page, hostel_remove } from '@/api/hostel';
import LinkButton from '@/components/link-button';
import FProTable from '@/components/pro-table';
import { antdUtils } from '@/utils/antd';
import { toPageRequestParams } from '@/utils/utils';
import { PlusOutlined } from '@ant-design/icons';
import { ActionType, ProColumnType } from '@ant-design/pro-components';
import NewAndEditHostelForm from './new-edit-form';

function HostelPage() {
  const actionRef = useRef<ActionType>();

  const [formOpen, setFormOpen] = useState(false);
  const [editData, setEditData] = useState<API.HostelVO | null>(null);
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

  const columns: ProColumnType<API.HostelVO>[] = [
    {
      dataIndex: 'number',
      title: '门牌号',
    },
    {
      dataIndex: 'building',
      title: '栋号',
    },
    {
      dataIndex: 'floor',
      title: '楼层',
    },
    {
      dataIndex: 'bedCount',
      title: '床位数量',
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
              await hostel_remove({ id });
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
      <FProTable<API.HostelVO, Omit<API.HostelVO, 'id'>>
        actionRef={actionRef}
        columns={columns}
        request={async params => {
          return hostel_page(toPageRequestParams(params));
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
      <NewAndEditHostelForm
        onOpenChange={open => !open && closeForm()}
        editData={editData}
        onSaveSuccess={saveHandle}
        open={formOpen}
        title={editData ? t('wXpnewYo' /* 编辑 */) : t('VjwnJLPY' /* 新建 */)}
      />
    </>
  );
}

export default HostelPage;
