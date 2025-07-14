import { useState } from "react";
import { BountyContext } from "../context/BountyContext";

export const BountyProvider = ({ children }) => {
  const [refetchTrigger, setRefetchTrigger] = useState(false);

  const triggerRefetch = () => setRefetchTrigger((prev) => !prev);

  return (
    <BountyContext.Provider value={{ refetchTrigger, triggerRefetch }}>
      {children}
    </BountyContext.Provider>
  );
};
