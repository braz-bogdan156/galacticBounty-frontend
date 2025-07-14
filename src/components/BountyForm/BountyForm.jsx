import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import styles from './BountyForm.module.css';

export default function BountyForm({
  formData,
  characters,
  handleChange,
  handleCharacterChange,
  handleSubmit,
  handleLogout,
  navigate,
}) {
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Input name="title" placeholder="Title" onChange={handleChange} value={formData.title} required />
      <Input name="description" placeholder="Description" onChange={handleChange} value={formData.description} required />
      <Input name="targetName" placeholder="Target Name" onChange={handleChange} value={formData.targetName} required />
      <Input name="planet" placeholder="Planet" onChange={handleChange} value={formData.planet} required />
      <Input name="reward" placeholder="Reward (credits)" type="number" onChange={handleChange} value={formData.reward} required />

      <label className={styles.label}>Select Target from Star Wars Characters:</label>
      <div className={styles.selectWrapper}>
        <select onChange={handleCharacterChange} required>
          <option value="">-- Choose Character --</option>
          {characters.map((char) => (
            <option key={char.id} value={char.id}>
              {char.name}
            </option>
          ))}
        </select>
      </div>

      {formData.image && (
        <div style={{ marginTop: '10px', textAlign: 'center' }}>
          <p>🖼️ Preview:</p>
          <img src={formData.image} alt="Target" width={300} />
        </div>
      )}

      <Button type="submit">Create</Button>
      <Button type="button" onClick={() => navigate('/')}>Back to Home</Button>
      <Button type="button" onClick={() => navigate('/my-bounties')}>Go to my bounties</Button>
      <Button type="button" onClick={handleLogout}>Logout</Button>
    </form>
  );
}