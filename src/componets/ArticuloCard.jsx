import { useEffect, useReducer, useState } from "react";
import { useAxiosArticulos } from "../hooks/useAxiosArticulos";
import { reducerArticulo } from "./reducerArticulo";

const initialState =[]
const init = () => {
  return JSON.parse(localStorage.getItem("carrito")) || []
}
export const ArticuloCard = ({ articulo }) => {
  //
  const { codInterno, descripcion, precioCompra } = articulo;
  const [cantidad, setCantidad] = useState(1);
  

  const [state, dispatch] = useReducer(reducerArticulo, initialState, init)

  const handleArticulo = (e, articulo) => {
    const articuloVenta ={
      ...articulo,
      cantidad
    }
    articulo.cantidad = cantidad;
    const action ={
      type: "add",
      payload:  articuloVenta
    }
    dispatch(action);
  }

  const handleChange = ({ target }) => {
    setCantidad(Number(target.value));
    console.log(cantidad);
  };


  useEffect(() => {
      localStorage.setItem("carrito", JSON.stringify(state) );
  }, [state]);

  return (
    <>
      <div className="col-md-4 mb-4">
        <div className="card">
          <img
            src="https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2018/01/10/15156055021146.jpg"
            className="card-img-top img-fluid"
            alt="ho"
          />
          <div className="card-body">
            <h5 className="card-title">{codInterno}</h5>
            <p className="card-text">
              <strong> {descripcion}</strong>
            </p>
            <p>
              <strong>Precio:</strong> ${precioCompra}
            </p>
            <div className="row mb-3">
              <div className="col-md-4">
                <input
                  type="number"
                  className="form-control w-100"
                  id="tentacles"
                  onChange={handleChange}
                  value={cantidad}
                  min={1}
                  max={10}
                />
              </div>
              <div className="col-md-8">
                <button
                  href="#"
                  className="btn btn-outline-primary w-100"
                  onClick={(e) => handleArticulo(e, articulo)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-bag-check-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zm-.646 5.354a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <a href="#" className="btn btn-outline-danger w-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-heart-fill"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
