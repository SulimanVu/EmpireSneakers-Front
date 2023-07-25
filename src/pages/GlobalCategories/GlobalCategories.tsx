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
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const categories = useAppSelector((state) =>
    state.categoriesSlice.categories.filter(
      (item) => item.globalCategories._id === id
    )
  );
  const currentCategory = useAppSelector(
    (state) => state.categoriesSlice.currentCategory
  );

  const products = useAppSelector((state) =>
    state.productSlice.products.filter((product) =>
      product.categories.find(
        (category) => category._id === currentCategory?._id
      )
    )
  );

  console.log(currentCategory);
  console.log(products);

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
              <Categories
                key={category._id}
                name={category.name}
                _id={category._id}
              />
            ))}
          </ul>
        </aside>
        <section>
          {products.map((product) => {
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
