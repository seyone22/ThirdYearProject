'use client'
// Import necessary modules and components
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from "react";
import axios from 'axios';
import { useRouter } from 'next/navigation'

// Define the Logout component
export default function Logout() {
    const router = useRouter();

    useEffect(() => {
        const logout = async () => {
            try {
                await axios.get('/api/auth/logout');
                router.push('/auth/login');
            } catch (error) {
                console.log(error.message);
            }
        };

        logout().then(r => {});
    }, [router]);

    return null;
}
