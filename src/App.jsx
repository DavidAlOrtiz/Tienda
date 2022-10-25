import {Route, Routes, Navigate} from 'react-router-dom';
import {Details} from "./layouts/views/Details.Articulos"
import {MainArticulo} from './layouts/views/Main.Articulos'
import { Header } from "./layouts/generic/header";
export const App = () => {
  return (
    <>
        <div className="container-fluid">
            <Header />
            <Routes>
              <Route path="/" element={<MainArticulo/>}></Route>
              <Route path="/carrito" element={<Details/>}></Route>
              <Route path="/*" element={<Navigate to="/" />}></Route>
            </Routes>
        </div>
    </>
  )
}

