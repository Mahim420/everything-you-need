import axios from "axios";
import { useEffect, useState } from "react";

const useToken = (email) => {
  const [token, setToken] = useState("");
  useEffect(() => {
    if (email) {
      axios
        .get(
          `  https://everything-you-need-server-mahim13s-projects.vercel.app/jwt?email=${email}`
        )
        .then((res) => {
          if (res.data.accessToken) {
            localStorage.setItem("accessToken", res.data.accessToken);
            setToken(res.data.accessToken);
          }
          console.log(res);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [email]);
  return [token];
};

export default useToken;
