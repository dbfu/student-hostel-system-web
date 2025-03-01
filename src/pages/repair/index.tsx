import { t } from '@/utils/i18n';
import {
  Divider,
  Popconfirm,
  Space
} from 'antd';
import { useRef } from 'react';

import { repair_edit, repair_page } from '@/api/repair';
import LinkButton from '@/components/link-button';
import FProTable from '@/components/pro-table';
import { antdUtils } from '@/utils/antd';
import { toPageRequestParams } from '@/utils/utils';
import { ActionType, ProColumnType } from '@ant-design/pro-components';

function RepairPage() {
  const actionRef = useRef<ActionType>();

  const columns: ProColumnType<API.RepairVO>[] = [
    {
      dataIndex: 'hostelNumber',
      title: '宿舍',
      renderText(_, record) {
        return [record.hostel?.building, record.hostel?.number].join('#');
      },
    },
    {
      dataIndex: "repairName",
      title: '报修人',
      renderText(_, record) {
        return record.repair?.fullName;
      },
    },
    {
      dataIndex: 'repairRemark',
      title: '报修内容',
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
      width: 160,
      align: 'center',
      search: false,
      renderText: (_, record) => record.status === 0 ? (
        <Space
          split={(
            <Divider type='vertical' />
          )}
        >
          <Popconfirm
            title={"已处理？"}
            onConfirm={async () => {
              await repair_edit({ ...record, status: 1 });
              antdUtils.message?.success("处理成功!");
              actionRef.current?.reload();
            }}
            placement="topRight"
          >
            <LinkButton>
              已处理
            </LinkButton>
          </Popconfirm>
        </Space>
      ) : <></>,
    },
  ];

  return (
    <FProTable<API.RepairVO, Omit<API.RepairVO, 'id'>>
      actionRef={actionRef}
      columns={columns}
      request={async params => {
        params.hostel
        return repair_page(
          toPageRequestParams(params)
        );
      }}
    />
  );
}

export default RepairPage;
