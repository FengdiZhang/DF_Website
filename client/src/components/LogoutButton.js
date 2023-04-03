import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import React from 'react';

const LogoutButton = () => {
    const { logout, isAuthenticated } = useAuth0();

    return (
        isAuthenticated && (
            <Button onClick={() => logout()}>
                Sign Out
            </Button>)

    );
};
const Button = styled.button`
    background-color:#5F5F5F;
    border:2px solid #A6A6A6;
    color:#D5D5D5;
    font-size: 20px;
    font-family: 'Mukta', sans-serif;
    border-radius:10px;
    padding: 5px 30px;
    margin-top:30px;
    cursor: pointer;
`;
export default LogoutButton;
