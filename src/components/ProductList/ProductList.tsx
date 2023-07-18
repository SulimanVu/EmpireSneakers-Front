import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import ProductCard from "../ProductCard/ProductCard";
import { fetchCategories } from "../../features/categoriesSlice";

export interface GlobalCat {
  name: string;
}

export interface Product {
  name: string;
  _id?: string;
  globalCategory?: GlobalCat;
  photo: string;
}

const ProductList: FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.categoriesSlice.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div>
      {products.map((product) => (
        <ProductCard
          key={product._id}
          name={product.name}
          photo={product.photo}
          globalCategory={product.globalCategories}
        />
      ))}
    </div>
  );
};

export default ProductList;
