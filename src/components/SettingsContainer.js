import PropTypes from 'prop-types';

import ConnectionSettings from './ConnectionSettings';
import RefreshRate from './RefreshRate';

export default function SettingsContainer({
  refreshRate,
  host,
  port,
}) {
  return (
    <section className="settings">
      <RefreshRate value={refreshRate} />
      <ConnectionSettings host={host} port={port} />
    </section>
  );
};
SettingsContainer.propTypes = {
  refreshRate: PropTypes.number,
  host: PropTypes.string,
  port: PropTypes.string,
};
