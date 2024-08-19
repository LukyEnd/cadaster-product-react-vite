import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import ProductListPage from "./app/pages/product-list/product-list.page.tsx";
import store from "./app/store/product.store.ts";
// import ProductRegisterPage from "./app/pages/product-register/product-register.page.tsx";
// import ProductEditComponent from "./app/components/product-edit/product-edit.component.tsx";
import InitialPage from "./app/pages/Initial/initial.page.tsx";
import ProductFormComponent from "./app/components/product-form/product-form.component.tsx";

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <Router>
                <div className="container-global">
                    <Routes>
                        <Route path="/" element={<InitialPage/>}/>
                        {/*<Route path="/product-creation" element={<ProductRegisterPage/>}/>*/}
                        <Route path="/product-list" element={<ProductListPage/>}/>
                        {/*<Route path="/product-list/:id" element={<ProductEditComponent/>}/>*/}
                        <Route path="/edit-product/:id" element={<ProductFormComponent isEditMode={true}/>}/>
                        <Route path="/product-creation" element={<ProductFormComponent isEditMode={false}/>}/>

                    </Routes>
                </div>
            </Router>
        </Provider>
    );
}

export default App;
