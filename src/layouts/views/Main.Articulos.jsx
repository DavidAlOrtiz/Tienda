import { Lista } from "./Lista.Articulos";

export const MainArticulo = () => {
  return (
    <>
      
      {/* Buscador y lista */}
      {/* onChangeBuscador = { event => onchange(e) } */}
      <div className="container">
        <Lista />
      </div>
    </>
  );
};
