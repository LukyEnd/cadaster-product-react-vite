import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import ProductListPage from "./app/pages/product-list/product-list.page.tsx";
import store from "./app/store/product.store.ts";
import InitialPage from "./app/pages/Initial/initial.page.tsx";

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <Router>
                <div className="container-global">
                    <Routes>
                        <Route path="/" element={<InitialPage/>}/>
                        <Route path="/product-list" element={<ProductListPage/>}/>
                    </Routes>
                </div>
            </Router>
        </Provider>
    );
}

export default App;
