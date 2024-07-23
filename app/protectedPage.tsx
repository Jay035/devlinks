import { auth } from "@/config/Config";
import { useReroute } from "@/utils/useReroute";
import { useEffect, useState } from "react";

const ProtectedPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (auth.currentUser) {
      setTimeout(() => {
        setIsAuthenticated(true); 
      }, 500);
    }
  }, []);

  useReroute("/login", !isAuthenticated);

  return (
    <div>
      <p>Protected Page Content</p>
    </div>
  );
};

export default ProtectedPage;
