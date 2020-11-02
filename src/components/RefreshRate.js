import PropTypes from 'prop-types';

export default function RefreshRate({
  handleRefreshRateUpdate,
  value,
}) {
  const onChange = (event) => {
    event.preventDefault();
    handleRefreshRateUpdate(Number(event.target.value));
  }

  return (
    <div className="refresh-rate">
      <label htmlFor="refreshRate">{'Refresh Rate'}</label>
      <select id="refreshRate" name="refreshRate" defaultValue={value} onChange={onChange}>
        <option value={2000}>{'2 seconds'}</option>
        <option value={5000}>{'5 seconds'}</option>
      </select>
    </div>
  );
};
RefreshRate.propTypes = {
  handleRefreshRateUpdate: PropTypes.func,
  value: PropTypes.number,
};
