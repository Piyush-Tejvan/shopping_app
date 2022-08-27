import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Cart from "./components/Cart";
import ErrorApp from "./components/Error";
import GetData from "./Firebase/GetData";
import PostData from "./Firebase/PostData";
import Upload from "./Firebase/Upload";
import Navbar from "./components/Navbar";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/cart' element={ <Cart /> } />
          <Route path='/error' element={ <ErrorApp /> } />
          <Route path='/get' element={ <GetData /> } />
          <Route path='/post' element={ <PostData /> } />
          <Route path='/upload' element={ <Upload /> } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;