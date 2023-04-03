import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";
import React from 'react';
import styled from "styled-components";
import Reservations from "./Reservations";
import moment from "moment/moment";
import { NavLink } from "react-router-dom";
const Profile = () => {
    const { user, isAuthenticated } = useAuth0();
    return (
        isAuthenticated && (
            <Wrapper>
                <Banner></Banner>
                <InnerWrapper>
                    <Title>Your Profile:</Title>
                    <Content>
                        <Img>{user?.picture && <img src={user.picture} alt={user?.name} />}</Img>
                        <Info>
                            <h2>{user?.name}</h2>
                            {/* <ul>
                            {Object.keys(user).map((objKey, i) => <li key={i}>{objKey}:{user[objKey]}</li>)}
                        </ul> */}
                            <ul>
                                <li><span>email:</span> {user?.email}</li>
                                <li><span>updated:</span> {moment(user?.updated_at).format('YYYY-MM-DD HH:mm')}</li>
                            </ul>
                            <NavigationLink to="/reservations">
                                <Button>View your reservations</Button>
                            </NavigationLink>
                        </Info>
                    </Content>
                    <LogoutButton />
                </InnerWrapper>
            </Wrapper>
        )

    );
};
const Button = styled.button`
    border:2px solid #A6A6A6;
    color:black;
    font-size: 20px;
    font-family: 'Mukta', sans-serif;
    border-radius:10px;
    padding: 5px 30px;
    margin-top:10px;
    cursor: pointer;
`;
const NavigationLink = styled(NavLink)`
    color: black;
    text-decoration: none;
    font-size: 18px;
`;
const Banner = styled.div`
    background-color: #2A2A2D;
    height:100px;
`;

const Info = styled.div`
  font-size: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & li{
    list-style:none;
  }
`;

const Img = styled.div`
    & img{
        border-radius:50%;
        width:150px;
    }
`;
const Content = styled.div`
    margin-top:20px;
    border-radius:10px;
    padding:40px 100px;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
    width:30%;
`;
const Title = styled.p`
    font-size:60px;
    font-weight:bold;
    
`;
const InnerWrapper = styled.div`
  margin-top: 100px;
  text-align: center;
  height: 100vh;
  font-family: 'Mukta', sans-serif;
  display: flex;
  flex-direction:column;
  align-items: center;
 
`;

const Wrapper = styled.div`
    
`;

export default Profile;
