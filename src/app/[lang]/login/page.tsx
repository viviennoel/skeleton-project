"use client";

import React, { useState } from "react";
import { Input, Button, Container, Notification } from "@mantine/core";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async () => {
        setError("");

        try {
            const response = await fetch("/api/authenticate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                throw new Error("Invalid credentials");
            }

            const token = await response.json();

            if (token) {
                Cookies.set('authToken', token)
                window.location.replace('/admin');
            } else {
                throw new Error("Authentication failed");
            }
        } catch (error) {
            //@ts-ignore
            setError(error.message || "An unexpected error occurred");
        }
    };

    return (
        <Container size="sm" style={{ marginTop: "2rem" }}>
            <h1>Login</h1>

            {error && (
                <Notification color="red" title="Error" onClose={() => setError("")}>
                    {error}
                </Notification>
            )}

            <Input
                name="Username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                mb="md"
            />

            <Input
                name="Password"
                placeholder="Enter your password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                mb="md"
            />

            <Button onClick={handleLogin} color="grey">
                Login
            </Button>
        </Container>
    );
};

export default LoginPage;
