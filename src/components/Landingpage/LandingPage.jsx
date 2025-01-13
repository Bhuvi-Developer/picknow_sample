import React from 'react';
import Carousel from './Carousel';
import ShinyText from './ShinyText';
import './LandingPage.css';
import dryFruit1 from '../../assets/dry-fruits.jpg';
import honey from '../../assets/honey.jpg'
import Nuts from '../../assets/Nuts.jpg'
import { FaShoppingCart, FaHeart, FaLink, FaStar } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';

const ProductCard = ({ image, title, price, rating }) => {
  return (
    <div className="noo-product-inner">
      <div className="noo-product-thumbnail">
        <a href="#">
          <img src={image} alt={title} />
        </a>
        <div className="noo-rating">
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              color={index < rating ? "#ffc107" : "#e4e5e9"}
              size={14}
            />
          ))}
        </div>
      </div>
      <div className="noo-product-title">
        <h3><a href="#">{title}</a></h3>
        <span className="price">
          <span className="amount">${price}</span>
        </span>
      </div>
      <div className="noo-product-action">
        <div className="noo-action">
          <button className="add-to-cart" title="Add to Cart">
            <FaShoppingCart />
          </button>
          <button className="add-to-wishlist" title="Add to Wishlist">
            <FaHeart />
          </button>
          <button className="view-details" title="View Details">
            <FaLink />
          </button>
        </div>
      </div>
    </div>
  );
};

const LandingPage = () => {
  const products = [
    {
      id: 1,
      image: dryFruit1,
      title: "Premium Dry Fruits Mix",
      price: "24.99",
      rating: 5
    },
    {
      id: 2,
      image: honey,
      title: "Organic Mixed Nuts",
      price: "19.99",
      rating: 4
    },
    {
      id: 3,
      image: Nuts,
      title: "Raw Forest Honey",
      price: "15.99",
      rating: 5
    },
    // {
    //   id: 4,
    //   image: "https://via.placeholder.com/300x300",
    //   title: "Fresh Medjool Dates",
    //   price: "12.99",
    //   rating: 4
    // }
  ];

  return (
    <div className="landing-page">
      <section className="hero-section">
        <Carousel />
      </section>

      <section className="welcome-section">
        <ShinyText
          text="Welcome to PickNow"
          speed={3}
          className="welcome-title"
        />
        <p className="welcome-subtitle">Discover Nature's Finest Selection</p>
      </section>

      {/* New Shop by Category Section */}
      <section className="shop-by-category">
        <div className="heading-bg">
          <h2>SHOP BY CATEGORY</h2>
        </div>
        <div className="category-grid">
          <div className="category-item">
            <img src={dryFruit1} alt="Nuts" />
            <span>Nuts</span>
          </div>
          <div className="category-item">
            <img src={Nuts} alt="Nuts" />
            <span>Nuts</span>
          </div>
          <div className="category-item">
            <img src={honey} alt="Honey" />
            <span>Honey</span>
          </div>
          <div className="category-item">
            <img src={Nuts} alt="Nuts" />
            <span>Nuts</span>
          </div>
          <div className="category-item">
            <img src={dryFruit1} alt="Nuts" />
            <span>Nuts</span>
          </div>
          <div className="category-item">
            <img src={honey} alt="Nuts" />
            <span>Nuts</span>
          </div>
          <div className="category-item">
            <img src={honey} alt="Nuts" />
            <span>Nuts</span>
          </div>
          <div className="category-item">
            <img src={honey} alt="Nuts" />
            <span>Nuts</span>
          </div>
          <div className="category-item">
            <img src={honey} alt="Nuts" />
            <span>Nuts</span>
          </div>
          <div className="category-item">
            <img src={honey} alt="Nuts" />
            <span>Nuts</span>
          </div>
          <div className="category-item">
            <img src={honey} alt="Nuts" />
            <span>Nuts</span>
          </div>
          <div className="category-item">
            <img src={honey} alt="Nuts" />
            <span>Nuts</span>
          </div>
          
          
        </div>
      </section>

      {/* Products-section */}
      <section className="products-section">
        <h2>Combo Offers</h2>
        <div className="products-grid">
          {products.map(product => (
            <ProductCard
              key={product.id}
              image={product.image}
              title={product.title}
              price={product.price}
              rating={product.rating}
            />
          ))}
        </div>
      </section>
    /
    

      {/* Brand-section */}
      <section className="shop-by-world-brands">
        <div className="heading-bg">
          <h2>Discover Our Latest &Greatest</h2>
        </div>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          spaceBetween={20}
          slidesPerView={4}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 15
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 25
            }
          }}
          className="brands-swiper"
        >
          <SwiperSlide>
            <div className="brand-item">
              <Link to="BrandProduct/Dlecta/3000">
                <img src="https://gnbdevcdn.s3.ap-southeast-1.amazonaws.com/+Marketing/ShopByBrandImages/Dlecta.jpg" alt="Dlecta" loading="lazy" />
              </Link>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="brand-item">
              <Link to="BrandProduct/HARIBOL/3203">
                <img src={Nuts}  alt="HARIBOL" loading="lazy" />
              </Link>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="brand-item">
              <Link to="BrandProduct/Tea-Culture/4097">
                <img src="https://gnbdevcdn.s3.ap-southeast-1.amazonaws.com/+Marketing/ShopByBrandImages/Tea-culture.jpg" alt="Tea Culture of the World" loading="lazy" />
              </Link>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="brand-item">
              <Link to="BrandProduct/Dlecta/3000">
                <img src="https://gnbdevcdn.s3.ap-southeast-1.amazonaws.com/+Marketing/ShopByBrandImages/Dlecta.jpg" alt="Dlecta" loading="lazy" />
              </Link>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="brand-item">
              <Link to="BrandProduct/Dlecta/3000">
                <img src="https://gnbdevcdn.s3.ap-southeast-1.amazonaws.com/+Marketing/ShopByBrandImages/Dlecta.jpg" alt="Dlecta" loading="lazy" />
              </Link>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="brand-item">
              <Link to="BrandProduct/Dlecta/3000">
                <img src="https://gnbdevcdn.s3.ap-southeast-1.amazonaws.com/+Marketing/ShopByBrandImages/Dlecta.jpg" alt="Dlecta" loading="lazy" />
              </Link>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="brand-item">
              <Link to="BrandProduct/Dlecta/3000">
                <img src="https://gnbdevcdn.s3.ap-southeast-1.amazonaws.com/+Marketing/ShopByBrandImages/Dlecta.jpg" alt="Dlecta" loading="lazy" />
              </Link>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="brand-item">
              <Link to="BrandProduct/Dlecta/3000">
                <img src="https://gnbdevcdn.s3.ap-southeast-1.amazonaws.com/+Marketing/ShopByBrandImages/Dlecta.jpg" alt="Dlecta" loading="lazy" />
              </Link>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>


      <section className="embrace-section" style={{ backgroundImage: "url('//daivikorganic.com/cdn/shop/t/2/assets/embrace_bg.png?v=177282468435249167531600792217')" }}>
        <div className="container">
          <h2 className="embrace-head">Embrace a healthy and natural lifestyle by going organic.</h2>
          <p className="embrace-content">With fast-paced lifestyle and changing food habits, it's very important to be mindful about what we eat. Looking back how our ancestors lived a happy and healthy life and making wise food choices is the way forward.</p>
          <button className="embrace-shop-btn" style={{ backgroundColor: "#fcb817" }}>
            <Link to="/collections/all">Go Organic</Link>
          </button>
        </div>
      </section>

      {/* <section className="cta-section">
        <div className="cta-content">
          <h2>Start Shopping Today</h2>
          <p>Experience the finest quality natural products</p>
          <button className="cta-button">Shop Now</button>
        </div>
      </section> */}


      <Footer />
    </div>
  );
};

export default LandingPage; 
