import { useAuth0 } from "@auth0/auth0-react";
import React from 'react';

const Reservations = () => {
    const { isAuthenticated } = useAuth0();

    if (isAuthenticated) {
        return <div>This is the reservations page</div>;
    } else {
        return <div>You are not authorized to view this page. Please log in.</div>;
    }
};

export default Reservations;
