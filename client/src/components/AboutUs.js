import styled from "styled-components";
const AboutUs = () => {
    return (
        <Wrapper>
            <Content>
                <Banner />
                <Top>
                    <FontTop>
                        Our team members have many years
                        of overseas study guidance and
                        guardian experience,
                        familiar with the
                        North American international education system{"\n"}
                        and local school characteristics,
                        especially in Canada's junior high school
                        education conditions and
                        higher education institutions curriculum
                        and professional Settings,
                        application procedures,
                        and admission requirements

                    </FontTop>
                    <ImgTop />
                </Top>

                <Bottom>
                    <ImgBottom />
                    <FontBottom>
                        DF Canada branch, located in Toronto,
                        is a professional institution for
                        overseas study and immigration in Canada,
                        providing overseas study consulting,
                        independent assessment, school application
                        and other services
                    </FontBottom>

                </Bottom>
            </Content>
        </Wrapper>
    );
};
const Banner = styled.div`
    background:url('/photos/photo_aboutUs.jpg');
    background-size: cover;
    width:100%;
    height:250px;
    position:relative;
    ::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index:2;
    }
`;
const Top = styled.div`
    background-color:#777777;
    width:100vw;
    height:500px;
    display:flex;
    flex-direction:row;
    justify-content:space-between;
`;
const Bottom = styled.div`
    margin-top:30px;
    width:100vw;
    height:500px;
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    background-color:#555555;
`;

const FontBottom = styled.div`
    color:#D5D5D5;
    font-family: 'Dosis', sans-serif;    
    padding:100px 100px;
    font-size:25px;
    line-height:30px;
    white-space: pre-line;
    text-align: justify;
    text-justify: inter-word;
    font-variant: small-caps;
    max-width:30%;
    &:after {
    content: "";
    display: inline-block;
    width: 100%;
  }
`;

const FontTop = styled.div`
    color:#D5D5D5;
    font-family: 'Dosis', sans-serif;    
    padding:80px 80px 0 110px;
    font-size:25px;
    line-height:30px;
    white-space: pre-line;
    text-align: justify;
    text-justify: inter-word;
    font-variant: small-caps;
    max-width:30%;
    &:after {
    content: "";
    display: inline-block;
    width: 100%;
  }
`;

const ImgBottom = styled.div`
    background: url('/photos/photo_aboutUs_left.jpeg');
    background-size: cover;
    width:50%;
    height:100%;
`;


const ImgTop = styled.div`
    background: url('/photos/photo_aboutUs_right.jpg');
    background-size: cover;
    width:50%;
    height:100%;
`;
const Content = styled.div`

    
`;
const Wrapper = styled.div`
    background-color:#00101C;
    width:100vw;
   
    position:relative;
    z-index:-5;
    min-height: 100vh;
  
    
   
`;
export default AboutUs;