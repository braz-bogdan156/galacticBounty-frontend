import { useState } from 'react';

export const useBountyForm = (initialState) => {
  const [formData, setFormData] = useState(initialState);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setFormData(initialState);
    setSuccess('');
    setError('');
  };

  return {
    formData,
    setFormData,
    handleChange,
    resetForm,
    success,
    setSuccess,
    error,
    setError,
  };
};