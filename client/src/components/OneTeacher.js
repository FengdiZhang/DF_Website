import styled, { keyframes } from "styled-components";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { BiLoader } from "react-icons/bi";
import Calendars from "./Calendars";
import { useAuth0 } from "@auth0/auth0-react";
const OneTeacher = () => {
    const { teacher_id } = useParams();
    const [teachers, setTeachers] = useState();
    const [showCalendar, setShowCalendar] = useState(false);
    const { isAuthenticated } = useAuth0();
    useEffect(() => {
        fetch(`/teachers/${teacher_id}`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                setTeachers(data.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);
    const handleClick = () => {
        setShowCalendar(!showCalendar);
    };
    return (
        <Wrapper>
            {
                !teachers
                    ? <IconContainer><LoadingIcon><BiLoader /></LoadingIcon></IconContainer>
                    : <>
                        <InnerWrapper>
                            <Img src={teachers.imgSrc}></Img>
                            <Content>
                                <p><span>Name: </span>&nbsp; {teachers.name}</p>
                                <p><span>Age: </span>&nbsp; {teachers.age}</p>
                                <p><span>Language: </span>&nbsp; {teachers.language}</p>
                                <p><span>Motto: </span>&nbsp; {teachers.motto}</p>
                                <p><span>Education background:</span>&nbsp; {teachers.education}</p>
                                <p><span>Location: </span>&nbsp; {teachers.location}</p>
                                <p><span>Price: </span>&nbsp; ${teachers.price} CAD/hour</p>
                            </Content>
                            {isAuthenticated ? (
                                <Button onClick={handleClick} disabled={!isAuthenticated}>
                                    Book a lesson
                                </Button>
                            ) : (
                                <DisabledButton>
                                    * Please log in to book a lesson.
                                </DisabledButton>
                            )}
                        </InnerWrapper>
                        {showCalendar && <Calendars teacher_id={teacher_id} />}
                    </>
            }
        </Wrapper>
    );
};
const DisabledButton = styled.p`
    font-family: 'Mukta', sans-serif;
    position:absolute;
    right:150px;
    bottom:20px;
    font-size:20px;
    font-style:italic;
`;
const Button = styled.button`
    position:absolute;
    right:150px;
    bottom:20px;
    border:2px solid #A6A6A6;
    color:black;
    font-size: 20px;
    font-family: 'Mukta', sans-serif;
    border-radius:10px;
    cursor: pointer;
    padding:5px 50px 0;
    line-height:25px;
    &:hover{
        color:#c98e96;
    }
`;
const Loading = keyframes`
     from{
        transform:rotate(0deg);
     }
     to{
        transform:rotate(360deg);
     }
`;
const LoadingIcon = styled(BiLoader)`

    animation:${Loading} 1.5s linear infinite;
    font-size: 80px;
    padding:20px;
   

`;
const IconContainer = styled.div`
    padding:20% 45%;
    height:100vh;
    
`;
const Content = styled.div`
    padding:10px;
    margin-left:50px;
    font-family: 'Mukta', sans-serif;
    & span{
        font-weight:bold;
    }
`;
const Img = styled.img`
    width:200px;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
    border-radius:10px;
    margin:10px;
`;
const InnerWrapper = styled.div`
    
    background-color:white;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
    padding:20px;
    margin:30px 10px 0 10px;
    display:flex;
    flex-direction:row;
    position:relative;
`;
const Wrapper = styled.div`
    background-color:#777777;
    height:100vh;
    padding-top:80px;
    position: relative;
`;
export default OneTeacher;