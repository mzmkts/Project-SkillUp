import {Routes, Route, Navigate} from 'react-router-dom';
import Login from './Account/Login';
import Register from './Account/Register';
import Profile from './Account/Profile';
import UserPage from './pages/UserPage';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Logout from './Account/Logout'
import CourseDetails from './Courses/CourseDetail'

import AboutUs from './pages/AboutUs';
import CourseCatalog from './Courses/CourseCatalog';

const RoutesContent = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/Profile"/>}/>
            <Route path="/Login" element={<Login/>}/>
            <Route path="/Register" element={<Register/>}/>
            <Route path="/Profile" element={<Profile/>}/>
            <Route path="/User/:username" element={<UserPage/>}/>
            <Route path="/Logout" element={<Logout/>}/>
            <Route path="/Settings" element={<Settings/>}/>
            <Route path="/Courses/:id" element={<CourseDetails/>}/>
            <Route path="/AboutUs" element={<AboutUs/>}/>
            <Route path="/Courses" element={<CourseCatalog/>}/>
            <Route path="/Dashboard" element={<Dashboard/>}/>
        </Routes>
    );
};

export default RoutesContent;
