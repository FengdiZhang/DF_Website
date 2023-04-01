import styled, { keyframes } from "styled-components";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { BiLoader } from "react-icons/bi";
const OneTeacher = () => {
    const { teacher_id } = useParams();
    const [teachers, setTeachers] = useState();
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
                        </InnerWrapper>
                    </>
            }
        </Wrapper>
    );
};
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
    padding:200px 0 0 500px;
    
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
    border-radius:10px;
    padding:20px;
    margin:30px 10px 0 10px;
    display:flex;
    flex-direction:row;
    transition: all 0.2s ease-in-out;
    &:hover {
        transform: scale(0.95);
    }
`;
const Wrapper = styled.div`
    background-color:#777777;
   
    padding-top:80px;
    position: relative;
`;
export default OneTeacher;