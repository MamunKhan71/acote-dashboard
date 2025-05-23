import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import App from "../../App";
import { useGetInitialTokenQuery } from "../../redux/api/api";
import { setUser } from "../../redux/api/authSlice";

const AppInitializer: React.FC = () => {
    const { data, isSuccess, isLoading } = useGetInitialTokenQuery();
    // console.log(data?.admin)
    const [isInitialized, setIsInitialized] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isSuccess && data?.admin) {
            dispatch(setUser(data?.admin));
        }
        setIsInitialized(!isLoading);
    }, [isSuccess, isLoading, data, dispatch]);

    if (!isInitialized) {
        return <div className="h-screen w-full flex items-center justify-center">
            <img className="h-20 drop-shadow-sm animate-bounce" src="logo.svg" alt="loading spinner" /></div>;
    }

    return <App />;
};

export default AppInitializer;