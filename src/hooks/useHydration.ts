// React
import { useEffect, useState } from "react";

export function useHydration() {
  // ################### REACT HOOKS ###################
  const [hydrated, setHydrated] = useState(false);

  // ################### SIDE EFFECT ###################
  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated;
}
