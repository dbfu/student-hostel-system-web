import { Modal, Table } from 'antd';

interface PropsType {
  data: { message: string, row: string }[];
  setOpen: (open: boolean) => void;
  open: boolean;
}

function ImportErrorMessageModal({
  data,
  open,
  setOpen,
}: PropsType) {
  return (
    <Modal
      title="导入失败"
      open={open}
      onOk={() => {
        setOpen(false);
      }}
      onCancel={() => {
        setOpen(false);
      }}
      width={800}
      footer={null}
      
    >
      <Table
        rowKey="id"
        dataSource={data}
        columns={[{ title: '行号', dataIndex: 'row' }, { title: '错误信息', dataIndex: 'message' }]}
        pagination={false}
        bordered
      />
    </Modal>
  )
}

export default ImportErrorMessageModal;