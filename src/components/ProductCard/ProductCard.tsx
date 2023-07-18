import { FC } from "react";
import { Product } from "../ProductList/ProductList";

const ProductCard: FC<Product> = ({ name, photo, globalCategory }) => {
  return (
    <div>
      <div>Тип обуви: {name}</div>
      <img src={photo} alt={`Фотографии ${photo}`} />
    </div>
  );
};

export default ProductCard;
