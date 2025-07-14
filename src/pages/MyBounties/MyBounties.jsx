import { useEffect, useState, useContext } from "react";
import { BountyContext } from "../../context/BountyContext";
import axios from "../../api/api";
import Button from "../../components/UI/Button/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import styles from "./MyBounties.module.css";

export default function MyBounties() {
  const [accepted, setAccepted] = useState([]);
  const [posted, setPosted] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { refetchTrigger } = useContext(BountyContext);
  const { user } = useAuth();

  const fetchMyBounties = async () => {
    try {
      const res = await axios.get("/api/bounties/mine/all");
      const { accepted = [], posted = [] } = res.data;
      setAccepted(accepted);
      setPosted(posted);
    } catch (err) {
      console.error("Помилка завантаження нагород:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBounties();
  }, []);

  useEffect(() => {
    if (!loading) fetchMyBounties();
  }, [refetchTrigger, loading]);

  if (loading) return <div>Завантаження...</div>;

  return (
    <div className={styles.myBountiesContainer}>
      <h2 className={styles.myBountiesTitle}>My posted bounties</h2>
      <ul className={styles.bountyList}>
        {posted
         .filter((bounty) => {
         const posterId = typeof bounty.postedBy === 'object' ? bounty.postedBy._id : bounty.postedBy;
         return posterId === user._id;
  })
        .map((bounty) => (
          <li key={bounty._id} className={styles.bountyItem}>
            <strong>{bounty.title}</strong> – {bounty.description}
          </li>
        ))}
      </ul>

      <h2 className={styles.myBountiesTitle}>My accepted bounties</h2>
      <ul className={styles.bountyList}>
        {accepted.map((bounty) => (
          <li key={bounty._id} className={styles.bountyItem}>
            <strong>{bounty.title}</strong> – {bounty.description}
          </li>
        ))}
      </ul>
      <div className={styles.buttonsContainer}>
      <Button onClick={() => navigate("/create")} style={{ marginTop: "20px" }}>
        Return to creating missions
      </Button>
      <Button type="button" onClick={() => navigate("/")}>
        Back to Home
      </Button>
      </div>
    </div>
  );
}
