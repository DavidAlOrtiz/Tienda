import React, { useState } from 'react'

//pasar
export const Buscador = () => {
  
  const [inputValue, setinputValue] = useState("Coca de piña");
  
  const onChangeF = ({target}) => {
    setinputValue(target.value);
  }

  const onSubmitF = (e) =>{
    e.preventDefault();
    // setListaItems(categorias =>[ inputValue  , ...categorias ])
  }

  return (
    <div className="row justify-content-center">
        <div className="col-md-8 mt-2">
            <form action="" className="form-group" onSubmit={(event) => onSubmitF(event)}>
                <input type="text" className="form-control"
                placeholder="Buscar.."
                value={inputValue}
                onChange={ onChangeF }
                ></input>
            </form>
        </div> 
    </div>
  )
}
