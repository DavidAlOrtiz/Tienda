//Consulta Appi
//
import axios from 'axios'
export const datos = async () => {
    const respuestaArticulos = await axios(
      "http://localhost:8080/articulo"
    );
    return respuestaArticulos.data._embedded.articuloes;
    // return [
    //   {
    //     codInterno: "1",
    //     descripcion: "Coca de chescos",
    //     precioCompra: 790,
    //   },{
    //     codInterno: "2",
    //     descripcion: "a de chescos",
    //     precioCompra: 790,
    //   }
    //   ,{
    //     codInterno: "3",
    //     descripcion: "a de chescos",
    //     precioCompra: 790,
    //   }
    // ];
};
