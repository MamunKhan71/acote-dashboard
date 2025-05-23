import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/api/authSlice";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute: React.FC = () => {
    const { user } = useSelector(selectUser);
    console.log(user)

    return user ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;
