import { useState, useEffect } from "react";
import { ArticuloCard } from "../../componets";
import { useAxiosArticulos } from "../../hooks/useAxiosArticulos";
import { Buscador } from "../../componets/Buscador";
export const Lista = () => {

  const [inputValue, setinputValue] = useState("");
  const { isLoading, listaArticulos } = useAxiosArticulos(inputValue);
  const [filtro, setFiltro] = useState([]);
  let otro = [] ;
  //setFiltro(listaArticulos)
  const onChangeF = ({ target }) => {
    setinputValue(target.value);
    otro = listaArticulos.filter((articulo) => {
      const textoApi = articulo.descripcion.toLowerCase();
      if (textoApi.includes(inputValue.toLowerCase())) {
        return articulo;
      }
    });
  };
  

  return (
    <>
      {isLoading && <h2>Cargando ....</h2>}
      <div className="row justify-content-center">
        <div className="col-md-8 mt-2">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar.."
            value={inputValue}
            onChange={onChangeF}
          ></input>
        </div>
      </div>

      <div className="row mt-4">
        {listaArticulos.map((articulo, index) => (
          <ArticuloCard key={articulo.codInterno} articulo={articulo} />
        ))}
      </div>
    </>
  );
};
