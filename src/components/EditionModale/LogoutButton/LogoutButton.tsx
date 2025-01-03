import React from 'react';
import { Button } from '@mantine/core';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Cookies from 'js-cookie';

const LogoutButton = () => {
    const token = Cookies.get('authToken')

    const handleLogout = () => {
        Cookies.remove('authToken')
        window.location.reload();
    };

    if (token) {
        return (
            <Button color="red" onClick={handleLogout}>
                Logout
            </Button>
        );
    }

    return (
        <Button color="black" component={Link} href='/login'>
            login
        </Button>
    );
};

export default LogoutButton;
