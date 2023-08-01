import { FC, useEffect, useMemo, useState } from "react";
import styles from "./globalCategories.module.scss";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { fetchCategories } from "../../features/categoriesSlice";
import Header from "../../components/Header/Header";
import filter from "../../assets/icons/filter.svg";
import { fetchProducts } from "../../features/productSlice";
import Categories from "../../components/Categories/Categories";
import ProductCard from "../../components/ProductCard/ProductCard";
import rightArrow from "../../assets/icons/rightArrow.svg";

const GlobalCategories: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const [priceDrop, setPriceDrop] = useState(false);
  const [priceMinValue, setPriceMinValue] = useState<number>(10);
  const [priceMaxValue, setPriceMaxValue] = useState<number>(10000);
  const [colorDrop, setColorDrop] = useState(false);

  const handlePriceMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (+priceMinValue < 100) {
      setPriceMinValue(100);
    } else if (+priceMinValue > 1000) {
      setPriceMinValue(1000);
    } else {
      setPriceMinValue(+e.target.value);
    }
  };
  const handlePriceMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setPriceMaxValue(+e.target.value);
    +priceMaxValue > 100000
      ? setPriceMaxValue(10000)
      : setPriceMaxValue(+e.target.value);
  };

  const categories = useAppSelector(
    (state) => state.categoriesSlice.categories
  );

  const products = useAppSelector((state) => state.productSlice.sortedProduct);

  // Фильтрация категорий с помощью useMemo
  // const filteredCategories = useMemo(() => {
  //   return categories.filter(
  //     (category) => category.globalCategories._id === id
  //   );
  // }, [categories, id]);

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
            {categories.map((category) => (
              <Categories
                key={category._id}
                name={category.name}
                _id={category._id}
              />
            ))}
          </ul>

          <div className={styles.priceSection}>
            <div
              onClick={() => setPriceDrop(!priceDrop)}
              className={styles.price}
            >
              <span>Price</span>
              <img
                className={priceDrop ? styles.rotated : styles.norotated}
                src={rightArrow}
                alt="filter"
              />
            </div>
            <div
              className={
                priceDrop ? styles.slidecontainer : styles.noslidecontainer
              }
            >
              <div className={styles.inputs}>
                <div>
                  <span>От</span>
                  <input
                    onChange={handlePriceMinChange}
                    type="number"
                    min={10}
                    max={10000}
                    value={priceMinValue}
                  />
                </div>
                <div>
                  <span>До</span>
                  <input
                    onChange={handlePriceMaxChange}
                    type="number"
                    min={1000}
                    max={10000}
                    value={priceMaxValue}
                  />
                </div>
              </div>
            </div>
          </div>
        </aside>
        <section className={styles.products}>
          {filteredProducts.length !== 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product._id} {...product} />
            ))
          ) : (
            <div>Нет в наличии</div>
          )}
        </section>
      </main>
    </div>
  );
};

export default GlobalCategories;