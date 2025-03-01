import { Column } from '@ant-design/plots';

import { useGlobalStore } from '@/stores/global';

import columnDarkTheme from './theme/dark-column-theme.json';
import columnLightTheme from './theme/light-column-theme.json';

const DemoColumn = ({ data }: { data: any[] }) => {
  const { darkMode } = useGlobalStore();

  const config: any = {
    data,
    xField: 'building',
    yField: 'count',
    height: 480,
    legend: {
      position: 'bottom'
    },
  };

  return <Column theme={darkMode ? columnDarkTheme : columnLightTheme} {...config} />;
};

export default DemoColumn;