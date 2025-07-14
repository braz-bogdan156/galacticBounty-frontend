import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/api';
import styles from './PublicBounties.module.css';
import Button from '../../components/UI/Button/Button';
import BountyFilter from '../../components/BountyFilter/BountyFilter';
import BountyList from '../../components/BountyList/BountyList';

export default function PublicBounties() {
  const [bounties, setBounties] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [planetFilter, setPlanetFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBounties = async () => {
      try {
        const res = await axios.get('/bounties');
        setBounties(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error('Failed to fetch bounties:', err);
      }
    };
    fetchBounties();
  }, []);

  const handleFilterChange = (e) => {
    const planet = e.target.value;
    setPlanetFilter(planet);
    if (planet === '') setFiltered(bounties);
    else setFiltered(bounties.filter((b) => b.planet === planet));
  };

  const handleAccept = async (id) => {
    try {
      await axios.post(`api/bounties/${id}/accept`);
      const updated = bounties.map((b) =>
        b._id === id ? { ...b, status: 'accepted' } : b
      );
      setBounties(updated);
      setFiltered(updated);
    } catch (err) {
      console.error('Accepting failed:', err);
    }
  };

  const uniquePlanets = [...new Set(bounties.map((b) => b.planet))];

  return (
    <div className={styles.container}>
      <p className={styles.registerPrompt}>
          Don't have an account? 
        </p>
         <Button type="button" className="btn" onClick={() => navigate('/register')}>
                  Go to Register
                </Button>
      <p className={styles.loginPrompt}>
          Already have an account?
        </p>
        <Button type="button" className="btn" onClick={() => navigate('/login')}>
          Go to Login
        </Button>
        <p className={styles.loginPrompt}>
          Forward to my hunter page
        </p>
        <Button type="button" className="btn" onClick={() => navigate('/create')}>
          Go to Create Bounty
        </Button>
          <p className={styles.loginPrompt}>
          Forward to my bounties page
        </p>
        <Button type="button" onClick={() => navigate('/my-bounties')}>Go to my bounties</Button>
        <h1 className={styles.title}>Available Bounties</h1>
      <BountyFilter
        planetFilter={planetFilter}
        onFilterChange={handleFilterChange}
        uniquePlanets={uniquePlanets}
      />
      <BountyList bounties={filtered} onAccept={handleAccept} />
    </div>
  );
}