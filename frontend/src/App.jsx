import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "./redux/authSlice";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { useState } from "react";
//import "./styles/App.css";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  if (loading) {
    return <div className="loading-state">Loading...</div>;
  }

  if (isAuthenticated) {
    return <Dashboard />;
  }

  return (
    <div className="app">
      {isLogin ? (
        <Login onSwitchToRegister={() => setIsLogin(false)} />
      ) : (
        <Register onSwitchToLogin={() => setIsLogin(true)} />
      )}
    </div>
  );
}

export default App;