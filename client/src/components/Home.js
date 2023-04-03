import styled from "styled-components";
import { NavLink } from "react-router-dom";
const Home = () => {
    return (
        <Wrapper>
            <Banner>
                <Title>DanFeng Study Aboard{"\n"}& Immigration Agency</Title>
                <Subtitle>
                    Integrity&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    Professional&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    Outstanding
                </Subtitle>

            </Banner>
            <Intro>
                <WhyChooseDF>Why Choose DF?</WhyChooseDF>
                <OneOnOne>
                    <span>One-On-One Service:</span><br></br>
                    Provide boarding arrangements, landing assistance, professional guardianship, transfer services, psychological guidance, visa renewal, immigration and other study abroad during the whole process of security and the whole process of cooperation, so that the children away from home, life care, psychological guidance, behavior supervision, relieve parents worry
                </OneOnOne>
                <ProfessionalGuidance>
                    <span>Professional Guidance:</span><br></br>
                    Since entering the market, under the guidance and help of our senior consultants, there have been more than 20 students, He has entered the University of Toronto, UBC, University of Waterloo, Western University, Alberta University and other world-famous universities
                </ProfessionalGuidance>
                <ExtensiveExperience>
                    <span>Extensive Experience:</span><br></br>
                    We provide a series of guidance on career planning, high school course selection, language examination planning, short-board course improvement, college admission, college major selection, employment immigration, etc., to help international students with great differences in life, culture and education system, how to overcome the differences and quickly adapt to overseas study career, make full use of high-quality educational resources, and realize their dreams on a broader platform. Enhance the value of studying abroad
                </ExtensiveExperience>

            </Intro>
        </Wrapper>
    );
};
const OneOnOne = styled.div`
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  border-radius:10px;
  padding:40px 100px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
  font-family: 'Dosis', sans-serif;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
  & span{
    font-weight:bold;
    font-size:25px;
    line-height:50px;
  }
`;


const ProfessionalGuidance = styled.div`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  padding:40px 100px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
  border-radius:10px;
  font-family: 'Dosis', sans-serif;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
  & span{
    font-weight:bold;
    font-size:25px;
    line-height:50px;
  }
`;

const ExtensiveExperience = styled.div`
  grid-column: 1 / 2;
  grid-row: 2 / 3;
  padding:40px 100px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
  border-radius:10px;
  font-family: 'Dosis', sans-serif;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
  & span{
    font-weight:bold;
    font-size:25px;
    line-height:50px;
  }
`;

const WhyChooseDF = styled.div`
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  padding:100px 20px 20px 20px;
  font-size:50px;
  font-family: 'Changa One', sans-serif;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
  border-radius:10px;
  text-align:center;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;



const Subtitle = styled.div`
    color:white;
    z-index:9;
    font-size:25px;
    position:absolute;
    top:450px;
    right:60px;
    font-family: 'Dosis', sans-serif;
`;
const Title = styled.div`
    color:white;
    z-index:8;
    font-size:70px;
    position:absolute;
    top:200px;
    right:60px;
    text-align: center;
    white-space: pre-line;
    font-family: 'Changa One', sans-serif;
    line-height:100px;

`;

const Intro = styled.div`
    background-color:#D5D5D5;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-gap:5px;
   
`;
const Wrapper = styled.div`
    width: 100%;
`;
const Banner = styled.div`
    background: url('/photos/photo_banner.jpg');
    background-size: cover;
    width:100vw;
    height:600px;
    position:relative;
    
    ::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        z-index:2;
    }
`;
export default Home;