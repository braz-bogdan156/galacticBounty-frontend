import styles from './HuntersTable.module.css';

export default function HuntersTable({ hunters }) {
  return (
    <div className={styles.tableWrapper}>
      <h2 className={styles.tableTitle}>Hunters and their Accepted Bounties</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Planet</th>
            <th>Accepted Bounties</th>
          </tr>
        </thead>
        <tbody>
          {hunters.map(hunter => (
            <tr key={hunter._id}>
              <td>{hunter.username}</td>
              <td>{hunter.email}</td>
              <td>{hunter.planet}</td>
              <td>
                {hunter.acceptedBounties.length > 0 ? (
                  <ul>
                    {hunter.acceptedBounties.map(bounty => (
                      <li key={bounty._id}>
                        <strong>{bounty.title}</strong> ({bounty.planet}) — 💰 {bounty.reward} credits
                      </li>
                    ))}
                  </ul>
                ) : (
                  <em>No accepted bounties</em>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}