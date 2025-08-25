import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import LostItems from "./Components/LostItems";
import FoundItems from "./Components/FoundItems";
import Home from "./Components/Home";
import ItemPage from "./Components/ItemPage";
import Leftitem from "./Components/Leftitem";
import MyListings from "./Components/MyListings";
import Layout from "./Layout"

window.OneSignal = window.OneSignal || [];
const OneSignal = window.OneSignal;

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/log-in" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/lostitems" element={<LostItems />} />
          <Route path="/founditems" element={<FoundItems />} />
          <Route path="/leftitem" element={<Leftitem />} />
          <Route path="/mylistings" element={<MyListings />} />
          <Route path="/:item" element={<ItemPage />} />
          <Route path="/*" element={<Home />} />
        </Routes>
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light" 
        />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
