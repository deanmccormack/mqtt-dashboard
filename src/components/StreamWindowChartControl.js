import PropTypes from 'prop-types';

import { WINDOW_SIZE, SLIDE } from '../types/stream-window-types';

export default function StreamWindowChartControl({
  handleStreamWindowUpate,
  slide,
  window,
}) {
  
  const onChange = (event) => {
    event.preventDefault();
    handleStreamWindowUpate({
      name: event.target.name,
      value: Number(event.target.value),
    });
  };

  return (
    <div className="window-chart-control">
      <div>
        <label htmlFor="window-size">{'window'}</label>
        <select id={WINDOW_SIZE} name={WINDOW_SIZE} defaultValue={window} onChange={onChange}>
          <option value={180}>{'Three Minutes'}</option>
          <option value={60}>{'One Minute'}</option>
          <option value={30}>{'30 Seconds'}</option>
        </select>
      </div>
      <div>
        <label htmlFor="slide">{'slide'}</label>
          <select id={SLIDE} name={SLIDE} defaultValue={slide} onChange={onChange}>
            <option value={0}>{'Now'}</option>
            <option value={30}>{'30 Seconds Ago'}</option>
            <option value={60}>{'One Minute Ago'}</option>
            <option value={180}>{'Three Minutes Ago'}</option>
          </select>
        </div>
    </div>
  );
};
StreamWindowChartControl.propTypes = {
  handleStreamWindowUpate: PropTypes.func,
  slide: PropTypes.number,
  window: PropTypes.number,
};
