import { Navigate } from "react-router-dom";
import { useAuth } from "../ContexApi/AuthContex";
export default function PublickRoute({ children }) {
  const { currentUser } = useAuth();
  return !currentUser ? children : <Navigate to="/" />;
}
