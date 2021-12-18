import PropTypes from 'prop-types';

export const SettingsType = {
  timerBase: PropTypes.shape({
    pomodoro: PropTypes.number,
    shortBreak: PropTypes.number,
    longBreak: PropTypes.number,
  }),
  font: PropTypes.string.isRequired,
  colorTheme: PropTypes.string.isRequired,
};
