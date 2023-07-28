import "./App.css";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import Productlist from "./components/features/Productslist";
import Cartdrawer from "./components/features/Cartdrawer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/products" element={<Productlist></Productlist>} />
        <Route path="/drawer" element={<Cartdrawer></Cartdrawer>}> </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
