import {Avatar} from 'antd';
import {IconBuguang} from '@/assets/icons/buguang';
import {useUserStore} from '@/stores/user';
import {useShallow} from 'zustand/react/shallow';
import DashboardDetail from './dashboard-detail';
import './index.css';

function Dashboard() {
  const {nickName, avatarPath} = useUserStore(
    useShallow((state) => ({
      nickName: state.currentUser?.nickName,
      avatarPath: state.currentUser?.avatarPath,
    }))
  );

  // 根据时间返回早上好、中午好、下午好、晚上好
  function getGreeting(hour: number): string {
    console.log(hour, 'hour');
    if (hour >= 0 && hour < 6) {
      return '凌晨好';
    } else if (hour >= 6 && hour < 12) {
      return '早上好';
    } else if (hour >= 12 && hour < 18) {
      return '下午好';
    } else {
      return '晚上好';
    }
  }

  return (
    <div className='p-[16px]'>
      <div className='p-[16px] dark:bg-[rgb(33,41,70)] bg-[#fafafa] rounded-md'>
        <div className='flex items-center gap-4'>
          {avatarPath ? (
            <Avatar
              size='large'
              style={{verticalAlign: 'middle'}}
              src={avatarPath}
            />
          ) : (
            <Avatar
              size='large'
              style={{backgroundColor: 'gold', verticalAlign: 'middle'}}
              icon={<IconBuguang />}
            />
          )}
          <div>
            <div className='text-[#252629] dark:text-white font-semibold text-[16px]'>
              {getGreeting(new Date().getHours())}, {nickName}
            </div>
            <div className='text-[#969aa2] dark:text-gray-400 text-[12px] mt-1'>
              新的一天就要大胆尝试，努力收获，在人生的道路上不断前进!
            </div>
          </div>
        </div>
      </div>
      <DashboardDetail v-auth='dashboard-detail' />
    </div>
  );
}

export default Dashboard;