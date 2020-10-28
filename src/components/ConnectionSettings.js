import PropTypes from 'prop-types';

export default function ConnectionSettings({
  host,
  port,
}) {
  return (
    <div className="connection-settings">
       <div>{`Host: ${host}`}</div>
       <div>{`Websocket Port: ${port}`}</div>
    </div>
  );
}
ConnectionSettings.propTypes = {
  host: PropTypes.string,
  port: PropTypes.string,
}
