import { useState } from 'react';
import axios from '../../api/api';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import styles from './Login.module.css';

import { useAuth } from '../../hooks/useAuth'; 

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); 
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('/api/auth/login', formData);

      const { token, ...userData } = res.data;
      login(userData, token);

      navigate('/create');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Login</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <Button type="submit" className="btn">Login</Button>
        <p className={styles.registerPrompt}>
          Don't have an account?
        </p>
        <Button type="button" className="btn" onClick={() => navigate('/register')}>
          Go to Register
        </Button>
         <Button type="button" onClick={() => navigate('/')}>Back to Home</Button>
      </form>
    </div>
  );
};

export default Login;