import styled, { keyframes } from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { BiLoader } from "react-icons/bi";

const Teachers = () => {
    const [teachers, setTeachers] = useState();

    useEffect(() => {
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
    }, []);


    return (
        <Wrapper>
            {
                !teachers
                    ? <IconContainer><LoadingIcon><BiLoader /></LoadingIcon></IconContainer>
                    : <>
                        {teachers.map((elem) => {
                            return (
                                <NavigationLink to={`/teachers/${elem.id}`} key={elem.id}>
                                    <InnerWrapper>
                                        <Img src={elem.imgSrc}></Img>
                                        <Content>
                                            <p><span>Name: </span>&nbsp; {elem.name}</p>
                                            <p><span>Age: </span>&nbsp; {elem.age}</p>
                                            <p><span>Language: </span>&nbsp; {elem.language}</p>
                                            <p><span>Motto: </span>&nbsp; {elem.motto}</p>
                                            <p><span>Education background:</span>&nbsp; {elem.education}</p>
                                            <p><span>Location: </span>&nbsp; {elem.location}</p>
                                            <p><span>Price: </span>&nbsp; ${elem.price} CAD/hour</p>
                                        </Content>
                                    </InnerWrapper>
                                </NavigationLink>
                            );
                        })}

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
    padding:20% 45%;
    height:100vh;
`;
const NavigationLink = styled(NavLink)`
    text-decoration:none;
    color:black;
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
    height:100%;
    background-color:#777777;
    padding-top:80px;
`;
export default Teachers;