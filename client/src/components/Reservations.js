import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Reservations = () => {
    const { user, isAuthenticated } = useAuth0();
    const { reservation_id } = useParams();
    const [reservation, setReservation] = useState();
    const [teacherName, setTeacherName] = useState('');

    // GET one specific reservation
    useEffect(() => {
        fetch(`/reservations/${reservation_id}`)
            .then(response => {
                return response.json();
            })
            .then(data => {

                setReservation(data.data);

            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    // GET teacher name
    useEffect(() => {
        if (reservation) {
            fetch(`/teachers/${reservation.teacher_id}`)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    setTeacherName(data.data.name);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }, [reservation]);

    return (
        <OuterWrapper>
            <Banner></Banner>
            {
                isAuthenticated ? (
                    reservation && teacherName && (
                        <Wrapper>

                            <Title>This is your confirmation:</Title>
                            <p>Hi!<span>{reservation.username}</span> </p>
                            <p>
                                Your reservation:
                                {reservation.reservation_year}/{reservation.reservation_month}/
                                {reservation.reservation_day}/{reservation.reservation_hour}
                            </p>
                            <p>Your phone number: {reservation.user_phone}</p>
                            <p>With Teacher:  {teacherName}</p>
                            <p>
                                * You can view all your appointments in{" "}
                                <a href={"/profile"}>profile</a>
                            </p>
                        </Wrapper>

                    )
                ) : (
                    <div>You are not authorized to view this page. Please log in.</div>
                )
            }
        </OuterWrapper>
    );
};
const Banner = styled.div`
    background-color: #2A2A2D;
    height:100px;
`;
const Wrapper = styled.div`
    background-color:white;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
    padding:20px;
    margin:100px 100px 0 100px; 
    & span{
        font-size:25px;
        font-weight:bold;
        margin-left:20px;
    }
    
    
`;
const Title = styled.p`
    
    font-size:35px;
`;
const OuterWrapper = styled.div`
    background-color:grey;
    height:100vh;
    font-family: 'Mukta', sans-serif;
`;
export default Reservations;
