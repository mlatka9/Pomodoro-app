import { ReactComponent as IconArrowUp } from 'assets/images/icon-arrow-up.svg';
import { ReactComponent as IconArrowDown } from 'assets/images/icon-arrow-down.svg';
import { Wrapper, InputButton } from './InputNumber.styles';
import PropTypes from 'prop-types';

const InputNumber = ({ value, setNewTimerBase }) => {
  const incrementValue = () => setNewTimerBase(value + 1);
  const decrementValue = () => setNewTimerBase(value > 0 ? value - 1 : 0);
  const handleOnChange = (e) => {
    if (!e.target.value) setNewTimerBase(0);
    else setNewTimerBase(+e.target.value);
  };

  return (
    <Wrapper>
      <input type="number" min="0" value={value} onChange={handleOnChange}></input>
      <div>
        <InputButton onClick={incrementValue}>
          <IconArrowUp />
        </InputButton>
        <InputButton onClick={decrementValue}>
          <IconArrowDown />{' '}
        </InputButton>
      </div>
    </Wrapper>
  );
};

InputNumber.propTypes = {
  value: PropTypes.number.isRequired,
  setNewTimerBase: PropTypes.func.isRequired,
};

export default InputNumber;
