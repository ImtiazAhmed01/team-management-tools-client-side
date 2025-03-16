import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../provider/authProvider';

const PrivateRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    if (!user) {
        // Redirect them to the login page if not authenticated
        return <Navigate to="/login" />;
    }
    return children; // Render the children (Dashboard in your case) if authenticated
};

export default PrivateRoute;