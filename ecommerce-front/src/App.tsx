import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Nav from "./components/Nav";
import ProductList from "./pages/ProductList/ProductList";
import Login from "./pages/Auth/Login/Login";
import RegisterUser from "./pages/Auth/Register/Register";
import AddEditProduct from "./pages/Admin/AddEditProduct/AddProduct";
import ProductListAdmin from "./pages/Admin/ProductList/ProductList";
import{ PrivateRoutes} from "./utils/PrivateRoutes";
import AddProduct from "./pages/Admin/AddEditProduct/AddProduct";
import EditProduct from "./pages/Admin/AddEditProduct/EditProduct";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <div className="container-fluid">
          <div className="row">
            <main>
              <Routes>
                <Route element={<PrivateRoutes />}>
                  <Route
                    path={"/admin/products/add"}
                    element={<AddProduct />}
                  />
                   <Route
                    path={"/admin/products/edit"}
                    element={<EditProduct />}
                  />
                  <Route
                    path={"/admin/products"}
                    element={<ProductListAdmin />}
                  />
                </Route>

                <Route path={"/"} element={<ProductList />} />
                <Route path={"/:location"} element={<ProductList />} />
                <Route path={"/login"} element={<Login />} />
                <Route path={"/register"} element={<RegisterUser />} />
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
