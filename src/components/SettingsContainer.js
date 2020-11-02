import PropTypes from 'prop-types';

import ConnectionSettings from './ConnectionSettings';
import RefreshRate from './RefreshRate';

export default function SettingsContainer({
  refreshRate,
  handleRefreshRateUpdate,
  host,
  port,
}) {
  return (
    <section className="settings">
      <RefreshRate value={refreshRate} handleRefreshRateUpdate={handleRefreshRateUpdate}/>
      <ConnectionSettings host={host} port={port} />
    </section>
  );
};
SettingsContainer.propTypes = {
  handleRefreshRateUpdate: PropTypes.func,
  refreshRate: PropTypes.number,
  host: PropTypes.string,
  port: PropTypes.string,
};
