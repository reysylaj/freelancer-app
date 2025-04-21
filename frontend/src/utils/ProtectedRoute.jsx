import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ element, role }) => {
    const { authUser } = useAuth();

    if (!authUser) return <Navigate to="/login" />;
    if (role && authUser.role !== role) return <Navigate to="/" />;

    return element;
};

export default ProtectedRoute;