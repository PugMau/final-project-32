import React from "react";
import { Link } from "react-router-dom";

// import ProductList from "../component/productList.jsx";



export const BackOffice = () => {
    return (
        <>
            <div className="container">
                <div className="row mt-5 d-flex justify-content-between">
                    <form className="d-flex justify-content-center col-8 me-3" role="search">
						<input className="form-control me-2" type="search" placeholder="¿Qué estás buscando?" aria-label="Search"/>
						<button className="btn btn-outline-success" type="submit">Buscar</button>
					</form>
                    <Link className=" col-3 ms-4 d-flex justify-content-end text-decoration-none" to={`/addproduct`}>
                        <button className="btn btn-outline-success" >Agregar producto</button>
                    </Link>
                </div>
                
                <table className="table mt-3">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre genérico</th>
                            <th scope="col">Ingrediente activo</th>
                            <th scope="col">Categoría</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={product.product_id}>
                                <th scope="row">{index + 1}</th>
                                <td>{product.generic_name}</td>
                                <td>{product.active_ingredient}</td>
                                <td>{product.category_id}</td>
                                <td>{product.price}</td>
                                <td>{product.stock_quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </>
)
}