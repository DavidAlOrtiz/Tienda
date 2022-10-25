import { useEffect, useState } from "react";
import { datos } from "../helpers/articulosAxios";

export const useAxiosArticulos = () => {
  const [listaArticulos, setListaArticulos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getItems = async () => {
    setListaArticulos(await datos());
  };

  useEffect(() => {
    getItems();
    setIsLoading(false);
  }, []);

  return {
    listaArticulos,
    isLoading
  };
};

//Guardar Venta en tabla Venta y Venta Articulo
export const handleComprarU = async (artComprasC) => {
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
    artComprasC.forEach(async (p) =>{
      ventaArticulo.cantidad = p.cantidad;
      ventaArticulo.precioRegular = p.precioCompra;
      ventaArticulo.precioVta =  p.cantidad * p.precioCompra;
      const response = await axios.post(
        "http://localhost:8080/ventaarticulo",
        ventaArticulo
      );
    });
    localStorage.setItem("carrito", JSON.stringify([]));
    artComprasC = [];
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
  return  {
    artCompras,
    handleComprarU
  }
};