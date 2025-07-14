import { useState } from 'react';
import axios from '../../api/api'; 
import { useNavigate } from 'react-router-dom';
import Button from '../../components/UI/Button/Button';
import styles from './Register.module.css'; 
import Input from '../../components/UI/Input/Input';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    planet: '',
    avatar: '',
  });

  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/register', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/create'); 
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Register</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input type="text" name="username" placeholder="Username" onChange={handleChange} required />
        <Input type="email" name="email" placeholder="Email" onChange={handleChange} required  />
        <Input type="password" name="password" placeholder="Password" onChange={handleChange} required  />
        <Input type="text" name="planet" placeholder="Planet" onChange={handleChange} />
        <Button type="submit" className="btn">Register</Button>
        <p className={styles.loginPrompt}>
          Already have an account?
        </p>
        <Button type="button" className="btn" onClick={() => navigate('/login')}>
          Go to Login
        </Button>
        <Button type="button" onClick={() => navigate('/')}>Back to Home</Button>
      </form>
    </div>
  );
};

export default Register;