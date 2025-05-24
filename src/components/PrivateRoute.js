import { Navigate } from 'react-router-dom';
import { useAuth } from '../Account/AuthUser';

const PrivateRoute = ({ element, requiredRole }) => {
    const { user, loading, isAdmin } = useAuth();

    if (loading) return null;

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (requiredRole === 'admin' && !isAdmin()) {
        return <Navigate to="/" replace />;
    }

    return element;
};

export default PrivateRoute;
