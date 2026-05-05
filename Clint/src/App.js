import { BrowserRouter,Routes, Route } from "react-router-dom";
import './App.css';
import Login from './pages/Login';
import ManageProduct from './pages/ManageProduct';
import Register from "./pages/Register";
import ManagemyProduct from './components/ManageProduct';
import NotFound from "./pages/NotFound";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"  element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<ManagemyProduct />} />
        <Route path="/manageproducts" element={<ManageProduct />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;