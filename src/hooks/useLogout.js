import { api } from "../api/Api";
import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";

const useLogout = () => {
  const { setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate;

  const logout = async () => {
    setAuth({});
    try {
      const response = await api.get("/api/logout", {
        withCredentials: true,
      });
    } catch (err) {
      console.error(err);
    }
  };
  return logout;
};

export default useLogout;
