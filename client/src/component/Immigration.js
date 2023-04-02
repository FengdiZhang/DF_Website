import styled from "styled-components";
const Immigration = () => {
    return (
        <Wrapper>
            <Banner></Banner>
        </Wrapper>
    );
};
const Wrapper = styled.div``;
const Banner = styled.div`
    background:url('/photos/photo_world.jpg');
    background-size: cover;
    width:100%;
    height:800px;
    position:relative;
    
`;
export default Immigration;