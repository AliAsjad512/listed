import { Routes, Route, BrowserRouter } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import FormSwitch from "./components/FormSwitch";
import Sidebar from "./components/Sidebar";
import Checkout from "./components/Checkout";
import { ReduxTest } from "./components/ReduxTest";
import Cart from "./components/Cart";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <BrowserRouter>
        <main className="ml-16 mt-16 p-6">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<FormSwitch />} />
            <Route path="/home" element={<LandingPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path='/redux' element={<ReduxTest/>}/>
            <Route path='/cart' element={<Cart/>}/>
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
