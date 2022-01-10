/* eslint-disable */
import styles from './product.module.css';
import Product from '../../assets/images/productImg.png';
import Product2 from '../../assets/images/productImg2.png';
import Cart from '../../assets/images/cartg.svg';
import CartHover from '../../assets/images/cartHover.svg';
import ApiService from '../../api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ShopProducts() {
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(true);

  const getProducts = async () => {
    try {
      const res = await ApiService.fetchProducts();
      console.log(res?.data?.data);
      if (res?.data?.status === 200) {
        setProducts(res?.data?.data);
      }
      setLoader(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (loader) {
    return (
      <div className="flex justify-center items-center pt-20 pb-20">
        <div className="animate-spin rounded-full h-12 w-8 border-b-2 border-green-900"></div>
      </div>
    );
  }

  return (
    <div className={`pt-16 pb-32 ${styles.shopPage}`}>
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="text-center px-0 mb-10 lg:px-52 md:mb-20">
          <h1 className="text-ch1 text-headingBlack font-semibold mb-5">
            <span className="text-primary">Shop</span> Products
          </h1>
          <p className="font-light text-base tracking-wider">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam mus
            eget eleifend cras nunc, tincidunt lorem ac. Natoque vitae
            pellentesque elit enim.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-10">
          {products?.map(
            (product, idx) =>
              product.status === 1 && (
                <Link to={`/view/product/${product.product_id}`}>
                  <div key={idx}>
                    <div className={`${styles.productWrap}`} key={idx}>
                      <span>
                        <img
                          src={product?.images[0]?.images}
                          alt={product?.productName}
                          className={`${styles.ImgWrap}`}
                        />
                        <div className={`${styles.productName}`}>
                          <p className="my-3 font-semibold">
                            {product?.product}
                          </p>
                          <div className="block">
                            <p className="text-primary text-lg font-semibold -mt-10 mb-1 text-right ">
                              ${product?.productPrice}
                            </p>
                            <p className="mb-4 font-normal prod-descrip">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Potenti nam turpis.
                            </p>
                            <button
                              className={`mx-auto ${styles.btnGreensm} font-normal`}
                            >
                            
                              More details
                            </button>
                          </div>
                        </div>
                      </span>
                    </div>
                  </div>
                </Link>
              ),
          )}
        </div>
      </div>
    </div>
  );
}
