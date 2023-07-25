import { FC, useEffect, useMemo } from "react";
import styles from "./globalCategories.module.scss";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { fetchCategories } from "../../features/categoriesSlice";
import Header from "../../components/Header/Header";
import filter from "../../assets/icons/filter.svg";
import { fetchProducts } from "../../features/productSlice";
import Categories from "../../components/Categories/Categories";
import ProductCard from "../../components/ProductCard/ProductCard";

const GlobalCategories: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const categories = useAppSelector(
    (state) => state.categoriesSlice.categories
  );

  const products = useAppSelector((state) => state.productSlice.sortedProduct);

  // Фильтрация категорий с помощью useMemo
  const filteredCategories = useMemo(() => {
    return categories.filter(
      (category) => category.globalCategories._id === id
    );
  }, [categories, id]);

  // Фильтрация продуктов с помощью useMemo
  const filteredProducts = useMemo(() => {
    return products.filter((product) => product.globalCategory?._id === id);
  }, [products, id]);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <Header />
      <main>
        <aside>
          <div className={styles.filter}>
            <span>Filter</span>
            <img src={filter} alt="filter" />
          </div>
          <ul className={styles.categories}>
            {filteredCategories.map((category) => (
              <Categories
                key={category._id}
                name={category.name}
                _id={category._id}
              />
            ))}
          </ul>
        </aside>
        <section className={styles.products}>
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} {...product} />
          ))}
        </section>
      </main>
    </div>
  );
};

export default GlobalCategories;
