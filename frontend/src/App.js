import { BrowserRouter, Route, Routes  } from "react-router-dom";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";

import UpdateProduct from "./components/UpdateProduct";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<ProductList/>}></Route>
      <Route path="/add" element={<AddProduct/>}></Route>
      <Route path="edit/:id" element={<UpdateProduct/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
