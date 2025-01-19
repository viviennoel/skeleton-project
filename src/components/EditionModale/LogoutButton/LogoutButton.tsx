'use client'

import React from 'react';
import { Button } from '@mantine/core';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useDictionary } from '@/src/dictionaries/dictionary-provider';

const LogoutButton = () => {
    const token = Cookies.get('authToken')
    const dictionary = useDictionary();

    const handleLogout = () => {
        Cookies.remove('authToken')
        window.location.reload();
    };

    if (token) {
        return (
            <Button color="red" onClick={handleLogout}>
                {dictionary.header.logout}
            </Button>
        );
    }

    return (
        <Button color="black" component={Link} href='/login'>
            {dictionary.header.login}
        </Button>
    );
};

export default LogoutButton;
