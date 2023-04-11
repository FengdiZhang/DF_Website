import styled from "styled-components";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import React from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Calendars = () => {
  const navigate = useNavigate();
  const { teacher_id } = useParams();
  const [reserveData, setReserveData] = useState({
    teacher_id: teacher_id,
    reservation_year: '',
    reservation_month: '',
    reservation_day: '',
    reservation_hour: '',
    phone: '',
  });
  const { user, isAuthenticated } = useAuth0();
  const [value, onChange] = useState(new Date());
  const [teachers, setTeachers] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [reservations, setReservations] = useState([]);
  const dayOfTheWeek = value.toLocaleDateString('en-US', { weekday: 'long' });
  const year = value.getFullYear();
  const month = value.getMonth() + 1;
  const day = value.getDate();
  // Disable dates before today
  const minDate = new Date();
  minDate.setHours(0, 0, 0, 0);
  // GET fetch teachers
  useEffect(() => {
    setTeachers(null);
    fetch('/api/teachers')
      .then(response => {
        return response.json();
      })
      .then(data => {

        setTeachers(data.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [day]);
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
  }, []);
  const handleChange = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    setReserveData({
      ...reserveData,
      [id]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const date = new Date(value);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = selectedTime;


    const reservationData = {
      username: user.name,
      teacher_id: teacher_id,
      reservation_year: year,
      reservation_month: month,
      reservation_day: day,
      reservation_hour: hour,
      phone: reserveData.phone,
    };
    // POST make reservation 
    fetch("/post-reservation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(reservationData)
    })
      .then((res) => res.json())
      .then((data) => {

        if (!selectedTime) {
          alert("Please select a time!");
          return;
        } else if (data.status !== 201) {
          alert("Please select another time!");
          return;
        } else {
          navigate(`/reservations/${data.data.reservation_id}`);
        }

      })
      .catch((err) => console.log(err));
  };
  return (
    <Wrapper>
      <Calendar onChange={onChange} value={value} minDate={minDate} style={{ width: '300px', height: '600px' }} />
      <Content>
        <p>Your personal information:</p>
        <h2><span>Your name:   </span> {user?.name}</h2>
        <h2><span>Your email address:   </span> {user?.email}</h2>
        <StyledForm onSubmit={handleSubmit}>
          <Label>
            Your phone number:
            <Input id="phone" type="tel" pattern="^[1-9]\d{9}$" required onChange={handleChange} />
          </Label>
          <br />
          <Label>Current Teacher's availability:</Label>
          <br />
          {teachers && reservations.length &&
            teachers
              .filter((teacher) => teacher.id === Number(teacher_id))
              .map((teacher) =>
                Object.keys(teacher.availability[dayOfTheWeek]).map((time, index) => {
                  const isReserved = reservations.some(
                    (reservation) =>
                      reservation.teacher_id === teacher.id &&
                      reservation.reservation_year === year &&
                      reservation.reservation_month === month &&
                      reservation.reservation_day === day &&
                      reservation.reservation_hour === time
                  );
                  return (
                    <React.Fragment key={time}>
                      <Button
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        disabled={!teacher.availability[dayOfTheWeek][time] || isReserved}
                      >
                        {time}
                      </Button>
                      {index % 12 === 11 && <br />}
                    </React.Fragment>
                  );
                })
              )}
          <ButtonSubmit type="submit">Submit</ButtonSubmit>
        </StyledForm>

      </Content>
    </Wrapper>
  );
};
const Label = styled.label`
    font-size:20px;
    font-weight:bold;
    margin-right:20px;
`;
const Button = styled.button`
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5); 
  padding:7px;
  margin-top:15px;
  font-size:15px;
  &:focus{
    background-color:pink;
  }
`;
const StyledForm = styled.form`
  position:relative;
`;

const ButtonSubmit = styled.button`
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
  position:absolute;
  top:370px;
  border:2px solid #A6A6A6;
  color:black;
  font-size: 15px;
  padding: 5px 30px;
  cursor: pointer;
`;

const Input = styled.input`
  margin-left:15px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
`;
const Content = styled.div`
  line-height:40px;
  width:50%;
  margin-left:80px;
  & p{
    font-size:35px;
    margin-bottom:30px;
  }
  & span{
    font-size:20px;
    font-weight:bold;
  }
`;
const Wrapper = styled.div`
  margin:30px 10px;
  display:flex;
  flex-direction:row;
  font-family: 'Mukta', sans-serif;
  height:600px;
  
`;
export default Calendars;
