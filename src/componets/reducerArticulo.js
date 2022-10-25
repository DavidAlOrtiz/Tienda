export const reducerArticulo = (inialState = [], action) => {
  switch (action.type) {
    case "add":
      const { payload } = action;
      const { codInterno, descripcion, precioCompra } = payload;
      let carro = [];
      try {
        if (localStorage.getItem("carrito")) {
          carro = JSON.parse(localStorage.getItem("carrito"));
        }
        let total = 0;

        let checkItem = carro.find(
          (p) => p.codInterno == payload.codInterno
        );

        if (!checkItem) {
          return [...carro, payload];
        }

        const obj = {
          codInterno,
          total,
        };

        const sumall = carro.forEach((item) => {
          if (item.codInterno == payload.codInterno) {
            item.cantidad += payload.cantidad;
          }
        });
        localStorage.setItem("carrito", JSON.stringify([...carro]));
      } catch (error) {
        console.log(error);
      }
    // let total = 0;

    // let checkItem = inialState.find( (p) => p.codInterno == payload.codInterno);

    // if(!checkItem){
    //   return [...inialState, payload];
    // }

    // const obj = {
    //   codInterno,
    //   total
    // };

    // const sumall = inialState.forEach(item =>{
    //   if(item.codInterno == payload.codInterno){
    //       item.cantidad += payload.cantidad;
    //   }
    // })
    // return [ ...inialState ];
    default:
      return inialState;
  }
};
