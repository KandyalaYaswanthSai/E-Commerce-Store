import React from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../fetcher";
import CategoryProduct from "./categoryProduct";

const Category = () => {
    const [products, setProducts] = React.useState({
        errorMessage: "",
        data: [],
    });
    const { categoryId } = useParams();

    React.useEffect(() => {
        const fetchData = async () => {
            const responseObject = await getProducts(categoryId);
            setProducts(responseObject);
        };
        fetchData();
    }, [categoryId]);

    const renderProducts = () => {
        return products.data.map((p) => (
            <CategoryProduct key={p.id} {...p}>
                {p.title}
            </CategoryProduct>
        ));
    };

    return (
        <div>
            {products.errorMessage && <div>Error: {products.errorMessage}</div>}
            {products.data.length > 0 ? renderProducts() : <div>No products available</div>}
        </div>
    );
};

export default Category;
