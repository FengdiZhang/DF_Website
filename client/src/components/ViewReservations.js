import styled from "styled-components";
import React from 'react';
import { useEffect } from "react";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { ImBin } from "react-icons/im";
import GetTeacherName from "./GetTeacherName";
const ViewReservations = () => {
    const { user } = useAuth0();
    const [reservations, setReservations] = useState([]);
    const [teacherName, setTeacherName] = useState('');
    const [teacherId, setTeacherId] = useState(null);
    // GET fetch reservations
    useEffect(() => {
        fetch('/reservations')
            .then(response => {
                return response.json();
            })
            .then(data => {
                setReservations(data.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [reservations]);

    // DELETE reservation
    const handleDeleteReservation = async reservationId => {
        try {
            const response = await fetch(`/delete-reservation/${reservationId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                // Delete successful, update reservations state
                alert('deleted successfully!');
                setReservations(reservations.filter(reservation => reservation.reservation_id !== reservationId));
            } else {
                console.error('Failed to delete reservation');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <OuterWrapper>
            <Banner></Banner>

            <Wrapper>
                <Title>*This is your reservation:</Title>
                {user && reservations.some(reservation => reservation.username === user.name) ? (
                    reservations
                        .filter(reservation => reservation.username === user.name)
                        .map(reservation => (
                            <div key={reservation.reservation_id}>
                                <p>
                                    Hi!
                                    <Highlight>{reservation.username}</Highlight>
                                </p>
                                <p>
                                    Your reservation: {reservation.reservation_year}/{reservation.reservation_month}/
                                    {reservation.reservation_day} {reservation.reservation_hour}
                                </p>
                                <p>Your phone number: {reservation.user_phone}</p>
                                <p>Your reservation id: {reservation.reservation_id}</p>
                                <p>
                                    With teacher: <GetTeacherName teacher_id={reservation.teacher_id} />
                                </p>
                                <IconContainer>
                                    <ImBin onClick={() => handleDeleteReservation(reservation.reservation_id)} />
                                </IconContainer>
                            </div>
                        ))
                ) : (
                    <p>You do not have any reservations.</p>
                )}
            </Wrapper>
        </OuterWrapper>



    );
};
const Highlight = styled.span`
     
        font-size:25px;
        font-weight:bold;
        margin-left:20px;
    
`;
const IconContainer = styled.div`
    position:absolute;
    bottom:20px;
    right:20px;
`;
const Banner = styled.div`
    background-color: #2A2A2D;
    height:100px;
`;
const Wrapper = styled.div`
    background-color:white;
    height:230px;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
    padding:20px;
    margin:100px 100px 0 100px; 
    position:relative;
   
`;
const Title = styled.div`
    font-weight:bold;
    font-size:40px;
    font-style:italic;
`;
const OuterWrapper = styled.div`
    background-color:grey;
    height:100vh;
    font-family: 'Mukta', sans-serif;
`;
export default ViewReservations;
