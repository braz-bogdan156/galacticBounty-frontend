import { useEffect, useState } from 'react';
import axios from '../../api/api';
import { useAuth } from '../../hooks/useAuth';
import HuntersTable from '../../components/Admin/HuntersTable';

export default function AdminPanel() {
  const { user } = useAuth();
  const [hunters, setHunters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHunters = async () => {
      try {
        const res = await axios.get('/api/admin/hunters', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setHunters(res.data);
      } catch (err) {
        console.error('Error loading hunters:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHunters();
  }, [user.token]);

  if (loading) return <p>Loading admin data...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>👩‍🚀 Admin Panel</h1>
      <HuntersTable hunters={hunters} />
    </div>
  );
}