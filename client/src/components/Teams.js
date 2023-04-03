import styled, { keyframes } from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { BiLoader } from "react-icons/bi";

const Teams = () => {
    const [teams, setTeams] = useState();

    useEffect(() => {
        fetch('/teams')
            .then(response => {
                return response.json();
            })
            .then(data => {
                setTeams(data.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);


    return (
        <Wrapper>
            {
                !teams
                    ? <IconContainer><LoadingIcon><BiLoader /></LoadingIcon></IconContainer>
                    : <>
                        {teams.map((elem) => {
                            return (
                                <InnerWrapper key={elem.name.toString()}>
                                    <Img src={elem.imgSrc}></Img>
                                    <Content>
                                        <p><span>Name: </span>&nbsp; {elem.name}</p>
                                        <p><span>Age: </span>&nbsp; {elem.age}</p>
                                        <p><span>Location: </span>&nbsp; {elem.location}</p>
                                        <p><span>Education background:</span>&nbsp; {elem.education}</p>
                                        <p><span>School: </span>&nbsp; {elem.school}</p>
                                        <p><span>Position: </span>&nbsp; {elem.position}</p>
                                    </Content>
                                </InnerWrapper>

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

const Content = styled.div`
    padding:10px;
    margin-left:5px;
    font-family: 'Mukta', sans-serif;
    & span{
        font-weight:bold;
    }
    font-size:15px;
    line-height:35px;
`;

const Img = styled.img`
    width:200px;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
    border-radius:10px;
    margin:10px;
`;

const InnerWrapper = styled.div`
    background-color:white;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
    padding:20px;
    display:flex;
    flex-direction:row;
    flex-wrap:none;
    width: 45%;
 
`;

const Wrapper = styled.div`
    height:100%;
    background-color:#777777;
    padding-top:80px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

export default Teams;


