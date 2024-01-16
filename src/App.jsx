import AppRoutes from "./routes/AppRoutes";
import "./App.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logIn } from "./pages/Auth/auth.slice";

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch();

  const checkUserAuthenticated = () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (token && user) {
      dispatch(logIn({token, user}));
    }
    setIsLoading(false)
  }

  useEffect(() => {
    checkUserAuthenticated()
  }, [])
  
  return isLoading ? <></> : <AppRoutes />;
}

export default App;