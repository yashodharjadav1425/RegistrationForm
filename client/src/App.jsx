import {BrowserRouter, Routes, Route} from "react-router-dom";
// import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Navbar } from "./component/Navbar";


const App = ()=>{
  return<>
    <BrowserRouter>
    <Navbar />
      <Routes>
        {/* <Route path="/" element={<Home />}/> */}
        <Route path="/Register" element={<Register />}/>
        <Route path="/Login" element={<Login />}/>
      </Routes>
    </BrowserRouter>
  </>
}

export default App;