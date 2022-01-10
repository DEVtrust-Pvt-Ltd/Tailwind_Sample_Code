/* eslint-disable */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './product.module.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cart from '../../assets/images/cartg.svg';
import CartHover from '../../assets/images/cartHover.svg';

import { useParams, useHistory } from 'react-router';
import ApiService from '../../api';
import { addToCart } from '../../actions/cart';

export default function Product(props) {
  const { id, eventid } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [counter, setCounter] = useState(1);
  const [productQuantity, setProductQuantity] = useState(0);
  const [product, setProduct] = useState({});
  const [images, setImages] = useState([]);
  const [cart, setCart] = useState(false);
  const [error, setError] = useState(false);
  const [productVolunteer, setProductVolunteer] = useState();
  const [sponserId, setSponserId] = useState();

  const cartState = useSelector((state) => state.cart);
  const volunteerState = useSelector((state) => state.user);
  const volunteerSponserId = useSelector((state) => state.sponser_id);
  const userState = useSelector((state) => state);

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

  function incrementCounter() {
    if (cartState?.data?.totalProductQuantity > 99) {
      toast.error('maximum 99 items are allowed', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 10000,
        theme: 'colored',
      });
      return false;
    }

    if (counter >= productQuantity) {
      return false;
    }
    setCounter(counter + 1);
    setCart(false);
  }

  function decrementCounter() {
    if (counter <= 1) {
      return false;
    }
    setCounter(counter - 1);
    setCart(false);
  }

  const getProduct = async () => {
    try {
      const formData = new FormData();
      formData.append('product_id', id);
      const res = await ApiService.fetchProduct(formData);

      if (res?.data?.status) {
        setProduct(res?.data?.data?.product);
        setImages(res?.data?.data?.image);
        setProductQuantity(res?.data?.data?.product?.quantityPerUnit);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  //check event id in cart state,
  //if different show error

  const addProduct = () => {
    setCart(true);
    let data = {
      event_id: eventid,
      id: product.product_id,
      name: product.productName,
      price: product.productPrice,
      p_weight: product.product_weight,
      quantity: counter,
      images: images[0].image,
      event_name: productVolunteer?.event_name,
      volunteer_name: productVolunteer?.volunteer_name,
      volunteer_profile_image: productVolunteer?.volunteer_profile_image,
      volunteer_id: volunteerState?.volunteer_data?.data?.id,
      sku: product.SKU,
      sponser_id : cartState.sponser_id,
    };

    console.log(data);

    dispatch(addToCart(data));
    setError(false);
  };

  const handleAddToCart = () => {
    if (cartState?.data?.totalProductQuantity >= 99) {
      toast.error('maximum 99 items are allowed', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 10000,
        theme: 'colored',
      });
      return false;
    }

    if (cartState?.data && cartState?.data?.event_id !== eventid) {
      return setError(true);
    }

    addProduct();
    return setError(false);
  };

  const ErrorMessage = () => {
    return (
      <>
        <p>Existing items in cart will get deleted</p>

        <button className="m-2" onClick={() => addProduct()}>
          Yes
        </button>
        <button className="m-2" onClick={() => setError(false)}>
          No
        </button>
      </>
    );
  };

  const handleCartPage = () => {
    history.push('/cart');
  };
  const handleContinuePage = () => {
    history.goBack();
  };
  useEffect(() => {
    getProduct();
  }, []);

  const getUserData = async () => {
    try {
      const formData = new FormData();
      formData.append('event_id', eventid);
      const res = await ApiService.volunteerEventData(formData);

      if (res?.data?.status) {
        setProductVolunteer({
          event_name: res.data.data.user.event_name,
          volunteer_name: res.data.data.user.volunteer_name,
          volunteer_profile_image: res.data.data.user.user_profile_image,
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  async function fetchApi() {
    getEventData(eventid);
    return true;
  }

  const getEventData = async (eventId) => {
    const formData = new FormData();
    formData.append('event_id', eventId);
    const res = await ApiService.volunteerEventData(formData);
    console.log(res);
    if (res?.data?.status) {
      setSponserId(res?.data?.data?.user?.volunteer_sponser_id);
    }
  };

  useEffect(async () => {
    getUserData();
    await fetchApi();
  }, []);

  //get quantity
  useEffect(() => {
    if (cartState?.data?.event_id === eventid) {
      const quantity = cartState.data?.products.find(
        (product) => product.id == id,
      )?.quantity;

      if (quantity) {
        setCart(true);
        setCounter(quantity);
      }
    }
  }, [cartState]);

  return (
    <div className={`pt-4 pb-32 ${styles.productPage} md:pt-16`}>
      <ToastContainer />
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
            <p className={`${styles.qtyTxt}`}>Quantity</p>
            <div className={` ${styles.inputGroup}`}>
              <button
                className="cursor-pointer pr-4"
                onClick={() => decrementCounter()}
              >
                -
              </button>
              {counter}
              <button
                className="cursor-pointer pl-4"
                onClick={() => incrementCounter()}
              >
                +
              </button>
            </div>
            {cart ? (
              <div className="flex" style={{ flex: 1 }}>
                <div className="text-center mt-14 addcrt">
                  <button
                    className={`${styles.btnGreen}`}
                    onClick={() => handleCartPage()}
                  >
                    {' '}
                    <img src={Cart} alt="" className={`${styles.cart}`} />{' '}
                    <img
                      src={CartHover}
                      alt=""
                      className={`${styles.cartHover}`}
                    />{' '}
                    Go to Cart{' '}
                  </button>
                </div>

                <div className="text-center mt-14 continueshopp">
                  <button
                    className={`${styles.btnGreen} `}
                    onClick={() => handleContinuePage()}
                  >
                   
                    Continue Shopping{' '}
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center mt-14">
                <button
                  className={`${styles.btnGreen} `}
                  onClick={() => handleAddToCart()}
                >
                  {' '}
                  <img src={Cart} alt="" className={`${styles.cart}`} />{' '}
                  <img
                    src={CartHover}
                    alt=""
                    className={`${styles.cartHover}`}
                  />{' '}
                  Add to Cart{' '}
                </button>
              </div>
            )}

            {error && <ErrorMessage />}
          </div>
        </div>
      </div>
    </div>
  );
}
