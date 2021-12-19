import InputNumber from 'components/InputNumber/InputNumber';
import IconClose from 'assets/images/icon-close.svg';
import { useReducer } from 'react';
import {
  Wrapper,
  ColorButton,
  FontButton,
  ApplyButton,
  OptionTitle,
  OptionsWrapper,
  SettignsHeader,
  ModalBackground,
} from './SettingsModal.styles';
import { setItemInLocalStorage } from 'helpers';
import useGlobalSettings from 'hooks/useGlobalSettings';

const reducer = (settings, action) => {
  switch (action.type) {
    case 'changeFont':
      return { ...settings, font: action.payload };
    case 'changeColorTheme':
      return { ...settings, colorTheme: action.payload };
    case 'changeTimerBase':
      return { ...settings, timerBase: { ...settings.timerBase, [action.payload.name]: action.payload.time } };
    default:
      return settings;
  }
};

const SettingsModal = () => {
  const { globalSettings, setGlobalSettings, setIsSettingsOpen } = useGlobalSettings();
  const [settings, dispach] = useReducer(reducer, globalSettings);

  const setNewFont = (newFont) => {
    dispach({ type: 'changeFont', payload: newFont });
  };

  const setNewColorTheme = (newColorTheme) => {
    dispach({ type: 'changeColorTheme', payload: newColorTheme });
  };

  const setNewTimerBase = (timerName) => {
    return (newTimerBase) => {
      dispach({ type: 'changeTimerBase', payload: { name: timerName, time: newTimerBase } });
    };
  };

  const handleApplySettings = () => {
    setGlobalSettings(settings);
    setIsSettingsOpen(false);
    setItemInLocalStorage('settings', settings);
  };

  const closeSettingsModal = () => {
    setIsSettingsOpen(false);
  };

  return (
    <>
      <Wrapper>
        <SettignsHeader>
          <span>Settings</span>
          <button onClick={closeSettingsModal}>
            <img src={IconClose} alt="close settigns"></img>
          </button>
        </SettignsHeader>
        <OptionsWrapper>
          <div>
            <OptionTitle>Time (minutes)</OptionTitle>
            <div>
              <div>
                <span>pomodoro</span>
                <InputNumber setNewTimerBase={setNewTimerBase('pomodoro')} value={settings.timerBase.pomodoro} />
              </div>
              <div>
                <span>short break</span>
                <InputNumber setNewTimerBase={setNewTimerBase('shortBreak')} value={settings.timerBase.shortBreak} />
              </div>
              <div>
                <span>long break</span>
                <InputNumber setNewTimerBase={setNewTimerBase('longBreak')} value={settings.timerBase.longBreak} />
              </div>
            </div>
          </div>
          <div>
            <OptionTitle>font</OptionTitle>
            <div>
              <FontButton
                font="Kumbh Sans"
                isSelected={settings.font === 'Kumbh Sans'}
                onClick={() => setNewFont('Kumbh Sans')}
              >
                Aa
              </FontButton>
              <FontButton
                font="Roboto Slab"
                isSelected={settings.font === 'Roboto Slab'}
                onClick={() => setNewFont('Roboto Slab')}
              >
                Aa
              </FontButton>
              <FontButton
                font="Space Mono"
                isSelected={settings.font === 'Space Mono'}
                onClick={() => setNewFont('Space Mono')}
              >
                Aa
              </FontButton>
            </div>
          </div>
          <div>
            <OptionTitle>color</OptionTitle>
            <div>
              <ColorButton
                isSelected={settings.colorTheme === 'red'}
                color="#F87070"
                onClick={() => setNewColorTheme('red')}
              />
              <ColorButton
                isSelected={settings.colorTheme === 'aquamarine'}
                color="#70F3F8"
                onClick={() => setNewColorTheme('aquamarine')}
              />
              <ColorButton
                isSelected={settings.colorTheme === 'purple'}
                color="#D881F8"
                onClick={() => setNewColorTheme('purple')}
              />
            </div>
          </div>
        </OptionsWrapper>
        <ApplyButton onClick={handleApplySettings}>Apply</ApplyButton>
      </Wrapper>
      <ModalBackground onClick={closeSettingsModal}></ModalBackground>
    </>
  );
};

export default SettingsModal;
