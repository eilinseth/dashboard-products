import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {UserContext} from "../../context";
    

function ProtectedRoute({ children }: { children: React.ReactNode }) {

    const [user,setUser] = useState(null);
    const navigate = useNavigate();
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:5000/me', { withCredentials: true });
                setUser(response.data.user);
            } catch (error) {
                console.error(error);
                navigate("/login");
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
    <UserContext.Provider value={user}>
        {children}
    </UserContext.Provider>  
    ) 
}

export default ProtectedRoute;

