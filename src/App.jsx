import CursorGlow from "./components/CursorGlow";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MakeCoffee from "./components/MakeCoffee";
import OrderPage from "./components/OrderPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="relative selection:bg-gold selection:text-bg-dark">
        <CursorGlow />
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/make-coffee" element={<MakeCoffee />} />
          <Route path="/order" element={<OrderPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;