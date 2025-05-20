import { Navigate } from 'react-router-dom';
import { useAuth } from '../Account/AuthUser';

const PrivateRoute = ({ element, requiredRole }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (requiredRole && user.role !== requiredRole) {
        return <Navigate to="/profile" replace />;
    }

    return element;
};

export default PrivateRoute;