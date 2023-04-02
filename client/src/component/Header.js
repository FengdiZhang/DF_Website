import styled from 'styled-components';
import { IoIosPerson } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import { FiLogIn } from "react-icons/fi";
const Header = () => {
    return (
        <Wrapper>
            <Img src='/photos/photo_logo.png' />
            <Title>DanFeng Immigration Agency</Title>
            <NavigationLink to="/login" >
                <Log_in>Login</Log_in>
            </NavigationLink>
            <Icon>
                <NavigationLink to="/profile" style={IconStyle}>
                    <IoIosPerson />
                </NavigationLink>
            </Icon>
            <Menu>
                <li>
                    <NavigationLink1 to="/about_us">About us</NavigationLink1>
                </li>
                <li>
                    <NavigationLink1 to="/immigration">Our Immigration services</NavigationLink1>
                </li>
                <li>
                    <NavigationLink1 to="/teachers">Our Teachers</NavigationLink1>
                </li>
                <li>
                    <NavigationLink1 to="/">Our team</NavigationLink1>
                </li>
                <li>
                    <NavigationLink1 to="/">Home</NavigationLink1>
                </li>
            </Menu>
        </Wrapper>
    );
};
const NavigationLink1 = styled(NavLink)`
    text-decoration:none;
    color:white;
    &:hover{
        color: #c98e96;
    }
`;
const Menu = styled.ul`
    display:flex;
    flex-direction:row-reverse;
    list-style: none;
    z-index:3;
    position:absolute;
    top:120px;
    right:60px;
    & li{
        font-family: 'Dosis', sans-serif;
        margin:25px;
        color:white;
        z-index:5;
    }
    
    
`;
const IconStyle = {
    color: 'white',
    fontSize: '30px',
    marginLeft: '15px',
    padding: '10px'
};
const Log_in = styled.div`
    position:fixed;
    right:80px;
    top:60px;
    font-family: 'Josefin Sans', sans-serif;
`;
const NavigationLink = styled(NavLink)`
    text-decoration:none;
    font-size:15px;
    color:white;
   
`;
const Icon = styled.div`  
    position:fixed;
    right:20px;
    top:45px;
`;
const Img = styled.img`
    width:75px;
    margin-right:10px;
`;
const Title = styled.p`
    color:white;
    font-family: 'Josefin Sans', sans-serif;
    font-size:30px;
    margin-top:30px;
`;
const Wrapper = styled.div`
    background-color: #2A2A2D;
    padding:15px;
    display:flex;
    flex-direction:row;
    position:relative;
    width: 100%;
`;
export default Header;