import { FC, useEffect } from "react";
import styles from "./globalCategories.module.scss";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { fetchCategories } from "../../features/categoriesSlice";
import Header from "../../components/Header/Header";
import filter from "../../assets/icons/filter.svg";
import { fetchProducts } from "../../features/productSlice";
import Categories from "../../components/Categories/Categories";

const GlobalCategories: FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const categories = useAppSelector((state) =>
    state.categoriesSlice.categories.filter(
      (item) => item.globalCategories._id === id
    )
  );

  const products = useAppSelector((state) => state.productSlice.products);

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
            {categories.map((category) => (
              <Categories name={category.name} key={category._id} id={category._id} />
            ))}
          </ul>
        </aside>
        <section>
          {products?.map((product) => {
            return (
              <div key={product._id}>
                {product.articul}
                {product.name}
              </div>
            );
          })}
        </section>
      </main>
    </div>
  );
};

export default GlobalCategories;
