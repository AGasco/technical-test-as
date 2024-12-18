import { ChartWrapper } from '@/components';
import {
  CHART_BAR,
  CHART_BY_COST,
  CHART_BY_DATE,
  CHART_BY_STATUS,
  CHART_BY_TYPE,
  CHART_DOUGHNUT,
  CHART_LINE
} from '@/consts';
import { useFetchData } from '@/hooks';
import { IncidentChartStats } from '@/types';
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from 'chart.js';
import { BounceLoader } from 'react-spinners';
import useDashboardCharts from './useDashboardCharts';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  chartType:
    | typeof CHART_BY_TYPE
    | typeof CHART_BY_DATE
    | typeof CHART_BY_STATUS
    | typeof CHART_BY_COST;
}

const DashboardChart = ({ chartType }: Props) => {
  const {
    data: stats,
    error,
    isLoading
  } = useFetchData<IncidentChartStats>('/incident-stats');

  const {
    incidentsByTypeData,
    incidentsByDateData,
    incidentsByStatusData,
    incidentsByCostData
  } = useDashboardCharts(stats);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-full w-full">
        <BounceLoader color="var(--primary)" />
      </div>
    );
  if (error) return <div>Error loading chart: {error.message}</div>;
  if (!stats) return null;

  let chartProps;

  switch (chartType) {
    case CHART_BY_TYPE:
      chartProps = {
        title: 'Incidents by Type',
        type: CHART_BAR,
        data: incidentsByTypeData
      };
      break;
    case CHART_BY_DATE:
      chartProps = {
        title: 'Incidents Over Time',
        type: CHART_LINE,
        data: incidentsByDateData
      };
      break;
    case CHART_BY_STATUS:
      chartProps = {
        title: 'Incidents by Status',
        type: CHART_DOUGHNUT,
        data: incidentsByStatusData
      };
      break;
    case CHART_BY_COST:
      chartProps = {
        title: 'Total Cost by Incident Type',
        type: CHART_BAR,
        data: incidentsByCostData,
        currencySymbol: '€'
      };
      break;
    default:
      return null;
  }

  return <ChartWrapper {...chartProps} />;
};

export default DashboardChart;
