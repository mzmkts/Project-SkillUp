import {Routes, Route, Navigate} from 'react-router-dom';
import Login from './Account/Login';
import Register from './Account/Register';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import CourseDetails from './Courses/CourseDetail'
import AboutUs from './pages/AboutUs';
import CourseCatalog from './Courses/CourseCatalog';
import PrivateRoute from './components/PrivateRoute'

const RoutesContent = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/Profile"/>}/>
            <Route path="/Login" element={<Login/>}/>
            <Route path="/Register" element={<Register/>}/>
            <Route path="/Profile" element={<Profile/>}/>
            <Route path="/Settings" element={<Settings/>}/>
            <Route path="/Courses/:id" element={<CourseDetails/>}/>
            <Route path="/AboutUs" element={<AboutUs/>}/>
            <Route path="/Courses" element={<CourseCatalog/>}/>
            <Route
                path="/Dashboard"
                element={<PrivateRoute element={<Dashboard />} requiredRole="admin" />}
            />
        </Routes>
    );
};

export default RoutesContent;
