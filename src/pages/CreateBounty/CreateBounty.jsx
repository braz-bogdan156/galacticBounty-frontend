import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useBountyForm } from '../../hooks/useBountyForm';
import { useStarWarsCharacters } from '../../hooks/useStarWarsCharacters';
import { BountyContext } from '../../context/BountyContext';
import BountyForm from '../../components/BountyForm/BountyForm';
import styles from './CreateBounty.module.css';
import axios from '../../api/api';

const initialState = {
  title: '',
  description: '',
  targetName: '',
  planet: '',
  reward: '',
  image: '',
};

export default function CreateBounty() {
 const {
  formData,
  handleChange,
  setFormData,
  resetForm,
  success,
  setSuccess,
  error,
  setError
} = useBountyForm(initialState);
  const characters = useStarWarsCharacters();
  const { logout } = useAuth();
  const { triggerRefetch } = useContext(BountyContext);
  const navigate = useNavigate();

  const handleCharacterChange = (e) => {
    const selectedId = Number(e.target.value);
    const selectedChar = characters.find((char) => char.id === selectedId);
    if (selectedChar) {
      setFormData((prev) => ({
        ...prev,
        targetName: selectedChar.name,
        image: selectedChar.image,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   try {
  await axios.post('/api/bounties', formData, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  triggerRefetch();
  resetForm();
  setSuccess('✅ Bounty successfully created!');
  setTimeout(() => setSuccess(''), 3000);
} catch (err) {
  setError(err.response?.data?.message || '❌ Failed to create bounty');
  setTimeout(() => setError(''), 3000);
}
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Create New Bounty</h2>
      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}
      <BountyForm
        formData={formData}
        characters={characters}
        handleChange={handleChange}
        handleCharacterChange={handleCharacterChange}
        handleSubmit={handleSubmit}
        handleLogout={handleLogout}
        navigate={navigate}
      />
    </div>
  );
}