/* eslint-disable */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './product.module.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Cart from '../../assets/images/cartg.svg';
import CartHover from '../../assets/images/cartHover.svg';

import { useParams, useHistory } from 'react-router';
import ApiService from '../../api';
import { addToCart } from '../../actions/cart';

export default function ProductView() {
  const { id } = useParams();
  const history = useHistory();
  const [product, setProduct] = useState({});
  const [images, setImages] = useState([]);

  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img src={images[i].image} />
        </a>
      );
    },
    arrow: true,
    dots: true,
    slide: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const getProduct = async () => {
    try {
      const formData = new FormData();
      formData.append('product_id', id);
      const res = await ApiService.fetchProduct(formData);

      if (res?.data?.status) {
        setProduct(res?.data?.data?.product);
        setImages(res?.data?.data?.image);
      }
    } catch (err) {
      console.log(err.message);
    }
  };


  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className={`pt-4 pb-32 ${styles.productPage} md:pt-16`}>
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 mb-20 lg:grid-cols-2 gap-16">
          <div className="productSlider">
            <Slider {...settings}>
              {images?.map((image, idx) => (
                <div key={idx}>
                  <img src={image.image} alt={image.image} width="100%" />
                </div>
              ))}
            </Slider>
          </div>
          <div className={`${styles.discription}`}>
            <h2 style={{ textTransform: 'capitalize', color: '#263640' }}>
              {product?.productName}
            </h2>
            <p>
              <strong>Product Description:</strong>{' '}
              {product?.productDiscription}
            </p>
            <p>
              <strong>Ingredients:</strong> {product?.inegredients}
            </p>
            <p>
              <strong>Allergens:</strong> {product?.allergens}
            </p>
            
            <p>
              <strong>Nutrition Facts:</strong>{' '}
              <a href="">{product?.nutritionFacts}</a>
            </p>
            <p className={`${styles.proPrice}`}>${product?.productPrice}</p>
            <strong>Note:</strong>
            <span class="text-primary pl-2">
              Order this product from any Volunteer's event page.
            </span>
            <button
              type="button"
              class="buttonOutline_btn__h8_19 mt-4 "
              onClick={() => history.push('/products')}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                class="buttonOutline_btnIcon__2Vs0X"
              >
                <path
                  d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z"
                  fill="current"
                ></path>
              </svg>
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
