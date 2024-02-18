import axios from "axios";
import { useEffect, useState } from "react";

const useAdmin = (email) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(true);
  useEffect(() => {
    if (email) {
      axios
        .get(
          ` https://everything-you-need-server-mahim13s-projects.vercel.app/users/admin/${email}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
        .then((res) => {
          setIsAdmin(res.data.isAdmin);
          setIsAdminLoading(false);
        });
    }
  }, [email]);
  return [isAdmin, isAdminLoading];
};

export default useAdmin;
