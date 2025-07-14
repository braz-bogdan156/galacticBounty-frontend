import styles from './BountyCard.module.css';
import { useState, useContext} from 'react';
import { BountyContext } from '../../context/BountyContext';
import axios from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../UI/Button/Button';

export default function BountyCard({ bounty }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [localStatus, setLocalStatus] = useState(bounty.status);
  const { triggerRefetch } = useContext(BountyContext);

  const handleLocalAccept = async () => {
  try {
    await axios.patch(`/api/bounties/${bounty._id}/accept`, {}, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    setLocalStatus('accepted');
    triggerRefetch(); // Trigger a refetch to update the bounty list
  } catch (e) {
    console.error('Error:', e);
  }
};

const handleLocalUnaccept = async () => {
  try {
    await axios.patch(`/api/bounties/${bounty._id}/unaccept`, {}, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    setLocalStatus('open');
    triggerRefetch(); // Trigger a refetch to update the bounty list
  } catch (e) {
    console.error('Error:', e);
  }
};

  return (
  
    <div className={styles.bountyCard}>
      <h2>{bounty.title}</h2>
      <p>{bounty.description}</p>
      <img
        src={bounty.image }
        alt={bounty.targetName}
        className={styles.image}
      />
      <p><strong>🎯 Target:</strong> {bounty.targetName}</p>
      <p><strong>🪐 Planet:</strong> {bounty.planet}</p>
      <p><strong>💰 Reward:</strong> {bounty.reward} credits</p>
      <p><strong>Status:</strong> {localStatus}</p>

      {user ? (
        localStatus === 'open' ? (
          <Button style={{ backgroundColor: 'green', color: 'white', marginTop: '20px' }}  onClick={handleLocalAccept} className={styles.acceptBtn}>
            Accept Bounty
          </Button>
        ) : (
          <Button style={{marginTop: '20px'}} onClick={handleLocalUnaccept} >Already Accepted</Button>
        )
      ) : (
        <Button style={{marginTop: '20px'}} onClick={() => navigate('/login')} className={styles.loginBtn}>
          Login to accept
        </Button>
      )}
    </div>
   
  );
}