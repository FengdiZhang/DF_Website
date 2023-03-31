import styled from "styled-components";
const Footer = () => {
    return (
        <Wrapper>
            <Contact>
                <span>Contact Us:</span>
                <Phone>+ 86 17695983601</Phone>
                <Email>info@dfimmigration.com</Email>
            </Contact>
            <Address>
                <span>Address:</span>
                <Canada>Canada Location: 1 uptown dr Markham, Canada, L3R 5C1</Canada>
                <China>China Location:Baidi Street No.248, NanKai District, Tianjin, China</China>
            </Address>
            <Follow>
                <span>Follow:</span>
                <Img src='/photos/photo_follow.jpg' />
            </Follow>
            <Bottom>© 2023 by DF Immigration Inc.</Bottom>
        </Wrapper>
    );
};
const Bottom = styled.div`
    font-size:small;
    color:grey;
    font-weight:lighter;
    position:absolute;
    bottom:2px;
`;
const Img = styled.img`
    width:40%;
    margin:20px 0;
`;
const China = styled.div`
    margin:20px 0;
`;
const Canada = styled.div`
    margin:20px 0;
`;
const Email = styled.div`
    margin:20px 0;
`;
const Phone = styled.div`
    margin:20px 0;
`;
const Follow = styled.div`
    display:flex;
    flex-direction:column;
    margin-top:20px;
    & span{
    font-weight:bold;
    font-size:30px;
    }
`;
const Address = styled.div`
    margin-top:20px;
    & span{
    font-weight:bold;
    font-size:30px;
    }
`;
const Contact = styled.div`
    padding:10px;
    font-size:15px;
    margin-top:20px;
    & span{
    font-weight:bold;
    font-size:30px;
    }
`;
const Wrapper = styled.div`
    background-color:#000501;
    padding:20px;
    width: 100%;
    color:#D5D5D5;
    font-family: 'Josefin Sans', sans-serif;
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    position:relative;
`;
export default Footer;