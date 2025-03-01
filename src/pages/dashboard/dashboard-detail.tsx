import { InfoCircleOutlined } from '@ant-design/icons';
import { Col, Row, Spin, Tooltip } from 'antd';

import DemoColumn from './column';

import { dashboard_getDashboardData } from '@/api/dashboard';
import { useRequest } from 'ahooks';
import './index.css';

function DashboardDetail() {
  const { data, loading } = useRequest(dashboard_getDashboardData);

  if (loading) {
    return (
      <Spin size='large' />
    )
  }

  return (
    <Row className='mt-[16px]' gutter={[16, 16]}>
      <Col lg={24} xl={6} className='w-[100%]'>
        <div className=' dark:bg-[rgb(33,41,70)] w-[100%] bg-[rgb(94,53,177)] overflow-hidden h-[150px] relative rounded-md bg-card p-[32px] box-border'>
          <div className='absolute top-[24px] right-[24px] z-10'>
            <Tooltip title="学生总数">
              <InfoCircleOutlined className='text-[rgb(179,157,219)] text-[20px]' />
            </Tooltip>
          </div>
          <div className="text-[rgba(229,224,216,0.7)] text-[16px]">
            学生总数
          </div>
          <div className="text-white text-2xl mt-[20px] text-[30px]">
            {data?.studentCount}
          </div>
        </div>
      </Col>
      <Col lg={24} xl={6} className='w-[100%]'>
        <div className=' dark:bg-[rgb(33,41,70)] bg-[rgb(30,136,229)] theme1 overflow-hidden h-[150px] relative rounded-md bg-card p-[32px] box-border'>
          <div className='absolute top-[24px] right-[24px] z-10'>
            <Tooltip title="班级总数">
              <InfoCircleOutlined className='text-[rgb(179,157,219)] text-[20px]' />
            </Tooltip>
          </div>
          <div className="text-[rgba(229,224,216,0.7)] text-[16px]">
            班级总数
          </div>
          <div className="text-white text-2xl mt-[20px] text-[30px]">
            {data?.classCount}
          </div>
        </div>
      </Col>
      <Col lg={24} xl={6} className='w-[100%]'>
        <div className=' dark:bg-[rgb(33,41,70)] w-[100%] bg-[rgb(80,53,166)] overflow-hidden h-[150px] relative rounded-md bg-card p-[32px] box-border'>
          <div className='absolute top-[24px] right-[24px] z-10'>
            <Tooltip title="待维修数">
              <InfoCircleOutlined className='text-[rgb(179,157,219)] text-[20px]' />
            </Tooltip>
          </div>
          <div className="text-[rgba(229,224,216,0.7)] text-[16px]">
            待维修数
          </div>
          <div className="text-white text-2xl mt-[20px] text-[30px]">
            {data?.toRepairCount}
          </div>
        </div>
      </Col>
      <Col lg={24} xl={6} className='w-[100%]'>
        <div className=' dark:bg-[rgb(33,41,70)] bg-[rgb(30,136,229)] theme1 overflow-hidden h-[150px] relative rounded-md bg-card p-[32px] box-border'>
          <div className='absolute top-[24px] right-[24px] z-10'>
            <Tooltip title="床位数量">
              <InfoCircleOutlined className='text-[rgb(179,157,219)] text-[20px]' />
            </Tooltip>
          </div>
          <div className="text-[rgba(229,224,216,0.7)] text-[16px]">
            床位数量
          </div>
          <div className="text-white text-2xl mt-[20px] text-[30px]">
            {data?.bedCount}
          </div>
        </div>
      </Col>
      <Col className='w-[100%]' lg={24} xl={24} >
        <div className='dark:bg-[rgb(33,41,70)] bg-white h-[600px] rounded-md p-[24px] relative'>
          <div className='flex justify-between items-center'>
            <div>
              <div className='text-[rgb(132,146,196)]'>学生数量统计</div>
            </div>
          </div>
          <div className='mt-[50px] absolute bottom-[12px] w-[90%] box-border'>
            <DemoColumn data={data?.studentCountByBuilding || []} />
          </div>
        </div>
      </Col>
    </Row>
  )
}

export default DashboardDetail;