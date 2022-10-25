import { useEffect, useState } from "react";
import axios from "axios";
import {handleComprarU} from "../../hooks/useAxiosArticulos";
const datos = () => {
  return JSON.parse(localStorage.getItem("carrito")) || [];
};

export const Details = () => {
  const [artCompras, setartCompras] = useState([]);
  //const {artComprasC, handleComprarU} = handleComprarU(artCompras)
  const getTotal = () => {
    let totalPagar = 0;
    artCompras.forEach((p) => {
      totalPagar += p.cantidad * p.precioCompra;
    });
    return totalPagar;
  };
  useEffect(() => {
    setartCompras(datos());
  }, []);

  const handleComprar = async () => {
    alert("Quieres comprar estas madres");
    try {
      //Registrar la compra en la taba Venta
      const ventaObj = {
        idVenta: Date.now().toString(),
        vendedor: "cualquiera",
        folio: Date.now().toString(),
        totalVendido: Number(getTotal()),
        pagoEfectivo: "0",
        pagoCheque: "0",
        pagoVales: "0",
        pagoTc: "0",
        supervisor: "Tú",
      };
      console.log(ventaObj);
      const response = await axios.post(
        "http://localhost:8080/venta",
        ventaObj
      );
      console.log(response);

      //Registrar los Artculos en la DB
      const ventaArticulo = {
        idVenta: response.data.idVenta,
        noArticulo:"2",
        userCodeBascula:1,
        // cantidad,
        articuloOfertado:false,
        // precioRegular,
        cambioPrecio:0,
        iva:16,
        // precioVta,
        porcentDesc:0,
        cantDevuelta:0,
        userName:"Cualquiera",
        idPromo:0,
        noPromoAplicado:0,
      }
      //
      artCompras.forEach(async (p) =>{
        ventaArticulo.cantidad = p.cantidad;
        ventaArticulo.precioRegular = p.precioCompra;
        ventaArticulo.precioVta =  p.cantidad * p.precioCompra;
        const response = await axios.post(
          "http://localhost:8080/ventaarticulo",
          ventaArticulo
        );
      });
      localStorage.setItem("carrito", JSON.stringify([]));
      setartCompras([]);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Compra procesada correctamente',
        showConfirmButton: false,
        timer: 1500
      })
    } catch (error) {
      console.log(error);
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Error! cominicate con el admin',
        showConfirmButton: false,
        timer: 1500
      })
    }
  };
  
  return (
    <>
      <div className="row justify-content-center">
        <div className="col-5">
          <h1 className="display-2">Tus Articulos</h1>
        </div>
        <div className="col-8 mt-5">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Producto</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Precio</th>
                <th scope="col">Total</th>
                <th scope="col">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {artCompras.map((p) => (
                <tr key={p.codInterno}>
                  <th scope="row">{p.codInterno}</th>
                  <td>{p.descripcion}</td>
                  <td>{p.cantidad}</td>
                  <td>$ {p.precioCompra}</td>
                  <td>$ {p.cantidad * p.precioCompra}</td>
                  <td>
                    <button class="btn btn-danger">Eliminar</button>
                  </td>
                </tr>
              ))}
              <td>
                <strong>Total a pagar:</strong> $ {getTotal()}
              </td>
            </tbody>
          </table>
        </div>
        <div className="col-5">
          <button
            className="btn btn-outline-primary  w-100"
            onClick={handleComprar}
          >
            Comprar
          </button>
        </div>
      </div>
    </>
  );
};

