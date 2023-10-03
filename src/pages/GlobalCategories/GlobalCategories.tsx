import { FC, useEffect, useMemo } from "react";
import styles from "./globalCategories.module.scss";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { fetchCategories } from "../../features/categoriesSlice";
import Header from "../../components/Header/Header";
import { fetchProducts } from "../../features/productSlice";
import Categories from "../../components/Categories/Categories";
import ProductCard from "../../components/ProductCard/ProductCard";
import { fetchFavorites } from "../../features/favoriteSlice";
import FilterSVG from "../../assets/icons/FilterSVG";
import PricePopUp from "../../components/PricePopUp/PricePopUp";
import Footer from "../../components/Footer/Footer";

const GlobalCategories: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.userSlice.user);
  const products = useAppSelector((state) => state.productSlice.sortedProduct);
  const categories = useAppSelector(
    (state) => state.categoriesSlice.categories
  );

  // Фильтрация продуктов с помощью useMemo
  const filteredProducts = useMemo(() => {
    return products.filter((product) => product.globalCategory?._id === id);
  }, [products, id]);


  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
    dispatch(fetchFavorites({ id: user.favorite }));
  }, [dispatch, user]);

  return (
    <>
      <Header />
      <main>
        <aside>
          <div className={styles.filter}>
            <span>Filter</span>
            <FilterSVG />
          </div>
          <ul className={styles.categories}>
            {categories.map((category) => (
              <Categories
                key={category._id}
                name={category.name}
                _id={category._id}
              />
            ))}
          </ul>
          <PricePopUp />
        </aside>
        <section className={styles.products}>
          {filteredProducts.length !== 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                {...product}
              />
            ))
          ) : (
            <div>Нет в наличии</div>
          )}
        </section>
      </main>
      <Footer/>
    </>
  );
};

export default GlobalCategories;
