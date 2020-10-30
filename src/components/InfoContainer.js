import BrokerInfo from './BrokerInfo';
import GettingStartInfo from './GettingStartInfo';

export default function InfoContainer(props) {
  return (
    <aside className="info-container">
      <BrokerInfo />
      <GettingStartInfo />
    </aside>
  );
};
