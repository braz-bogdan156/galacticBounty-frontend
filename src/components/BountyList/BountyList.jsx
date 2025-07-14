import BountyCard from '../../components/BountyCard/BountyCard';
import styles from './BountyList.module.css';

export default function BountyList({ bounties, onAccept }) {
  if (!bounties.length) return <p>No bounties found.</p>;

  return (
    <div className={styles.bountyList}>
      {bounties.map((b) => (
       <BountyCard key={b._id} bounty={b} onAccept={onAccept} />
       ))}
    </div>
  );
}