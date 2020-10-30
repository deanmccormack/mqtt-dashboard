import PropTypes from 'prop-types';

export default function Header({
  children,
}) {
  return (
    <header className="header">
      <div>LOGO</div>
      <h1>MQTT Dashboard</h1>
      <div>Starter launch</div>
      {children}
    </header>
  );
};
Header.propTypes = {
  children: PropTypes.node,
};
