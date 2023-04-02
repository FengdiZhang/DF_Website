import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import GlobalStyles from "./GlobalStyles";
import Footer from "./Footer";
import Home from "./Home";
import Teachers from "./Teachers";
import Immigration from "./Immigration";
import AboutUs from "./AboutUs";
import Login from "./Login";
import Profile from "./Profile";
import OneTeacher from "./OneTeacher";
const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/teachers/:teacher_id" element={<OneTeacher />} />
        <Route path="/immigration" element={<Immigration />} />
        <Route path="/about_us" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
