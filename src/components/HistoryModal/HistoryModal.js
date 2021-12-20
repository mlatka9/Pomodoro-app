import { Wrapper, ModalBackground, SettignsHeader, ContentWrapper } from './HistoryModal.styles';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import IconClose from 'assets/images/icon-close.svg';
import useStudyHistory from 'hooks/useStudyHistory';
import { useTheme } from 'styled-components';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
  },
  // responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};

const HistoryModal = ({ handleCloseHistory }) => {
  const { studyHistory } = useStudyHistory();
  const theme = useTheme();

  const prepareChartData = () => {
    const data = [];
    let todayDate = new Date();

    for (let i = 0; i < 7; i++) {
      const ISOformatDate = todayDate.toISOString().split('T')[0];
      const recordFromDay = studyHistory.find((record) => record.date === ISOformatDate);
      if (recordFromDay) {
        data.push(recordFromDay);
      } else {
        data.push({ date: ISOformatDate, time: 0 });
      }
      todayDate.setDate(todayDate.getDate() - 1);
    }
    return data.reverse();
  };

  const charData = prepareChartData();
  const labels = charData.map((record) => record.date.split('-').slice(1).reverse().join('-'));
  const data = {
    labels,
    datasets: [
      {
        label: 'minutes',
        data: charData.map((record) => Math.floor(record.time / 60)),
        backgroundColor: theme.colors.lightRed,
      },
    ],
  };

  const getTotalStudiedTimeInWeek = () => {
    const total = charData.reduce((sum, record) => record.time + sum, 0);
    if (total < 60) return `${total} seconds`;
    if (total < 3600) return `${Math.floor(total / 60)} minutes`;
    return `${Math.floor(total / 3660)} hours`;
  };

  return (
    <>
      <Wrapper>
        <SettignsHeader>
          <span>History</span>
          <button onClick={handleCloseHistory}>
            <img src={IconClose} alt="close history"></img>
          </button>
        </SettignsHeader>
        <ContentWrapper>
          <h2>
            You studied for <span>{getTotalStudiedTimeInWeek()}</span> this week
          </h2>
          <Bar options={options} data={data} />
        </ContentWrapper>
      </Wrapper>
      <ModalBackground onClick={handleCloseHistory}></ModalBackground>
    </>
  );
};

export default HistoryModal;