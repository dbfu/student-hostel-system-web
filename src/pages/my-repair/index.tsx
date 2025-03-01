import { t } from '@/utils/i18n';
import {
  Button,
  Divider,
  Popconfirm,
  Space
} from 'antd';
import { useRef, useState } from 'react';

import { repair_pageCurrent, repair_remove } from '@/api/repair';
import LinkButton from '@/components/link-button';
import FProTable from '@/components/pro-table';
import { antdUtils } from '@/utils/antd';
import { toPageRequestParams } from '@/utils/utils';
import { PlusOutlined } from '@ant-design/icons';
import { ActionType, ProColumnType } from '@ant-design/pro-components';
import NewAndEditRepairForm from './new-edit-form';

function RepairPage() {
  const actionRef = useRef<ActionType>();

  const [formOpen, setFormOpen] = useState(false);
  const [editData, setEditData] = useState<API.RepairVO | null>(null);
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

  const columns: ProColumnType<API.RepairVO>[] = [
    {
      dataIndex: 'hostel',
      title: '宿舍',
      renderText(_, record) {
        return [record.hostel?.building, record.hostel?.number].join('#');
      },
      search: false,
    },
    {
      dataIndex: ['repair', 'fullName'],
      title: '报修人',
      search: false,
    },
    {
      dataIndex: 'repairRemark',
      title: '报修内容',
      search: false,
    },
    {
      dataIndex: 'status',
      title: '状态',
      valueType: 'select',
      valueEnum: {
        0: {
          text: "未处理",
          status: 'Default',
        },
        1: {
          text: "已处理",
          status: 'Success',
        },
      },
    },
    {
      title: t("QkOmYwne" /* 操作 */),
      dataIndex: 'id',
      hideInForm: true,
      width: 200,
      align: 'center',
      search: false,
      renderText: (id: string, record) => record.status === 0 ? (
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
              await repair_remove({ id });
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
      ) : <></>,
    },
  ];

  return (
    <>
      <FProTable<API.RepairVO, Omit<API.RepairVO, 'id'>>
        actionRef={actionRef}
        columns={columns}
        request={async params => {
          return repair_pageCurrent(
            toPageRequestParams(params)
          );
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
      <NewAndEditRepairForm
        onOpenChange={open => !open && closeForm()}
        editData={editData}
        onSaveSuccess={saveHandle}
        open={formOpen}
        title={editData ? t('wXpnewYo' /* 编辑 */) : t('VjwnJLPY' /* 新建 */)}
      />
    </>
  );
}

export default RepairPage;
