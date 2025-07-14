
import styles from './BountyFilter.module.css';

export default function BountyFilter({ planetFilter, onFilterChange, uniquePlanets }) {
  return (
    <div className={styles.filter}>
      <label className={styles.label}>Filter by Planet:</label>
      <div className={styles.selectWrapper}>
      <select value={planetFilter} onChange={onFilterChange}>
        <option value="">All</option>
        {uniquePlanets.map((planet) => (
          <option key={planet} value={planet}>
            {planet}
          </option>
        ))}
      </select>
      </div>
    </div>
  );
}