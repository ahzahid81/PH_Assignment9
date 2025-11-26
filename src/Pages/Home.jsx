import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import banner1 from "/banner1.jpg"
import banner2 from "/banner2.jpeg"
import banner3 from '/banner3.png';

const Home = () => {
  const [toys, setToys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    document.title = "ToyTopia | Home";
  }, []);

  useEffect(() => {
    fetch("/toys.json")
      .then((res) => res.json())
      .then((data) => setToys(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const popularToys = toys.slice(0, 6);

  const filteredToys =
    selectedCategory === "All"
      ? popularToys
      : popularToys.filter((toy) => toy.subCategory === selectedCategory);

  return (
    <div className="space-y-12">
      {/* Swiper Slider */}
      <section className="mt-6">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          className="rounded-2xl shadow-xl"
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div className="relative">
              <img
                src={banner1}
                className="w-full max-h-[380px] object-cover"
                alt="Toy banner 1"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center px-8">
                <div className="text-white space-y-3 max-w-md">
                  <h2 className="text-3xl md:text-4xl font-bold">
                    Fun Building Toys for Kids
                  </h2>
                  <p>Boost creativity with colorful block sets.</p>
                  <Link to="/extra" className="btn btn-primary btn-sm">
                    Explore More
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div className="relative">
              <img
                src={banner2}
                className="w-full max-h-[380px] object-cover"
                alt="Toy banner 2"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center px-8">
                <div className="text-white space-y-3 max-w-md">
                  <h2 className="text-3xl md:text-4xl font-bold">
                    Educational Toys for Smart Learning
                  </h2>
                  <p>Make learning fun with interactive toys.</p>
                  <Link to="/" className="btn btn-secondary btn-sm">
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide>
            <div className="relative">
              <img
                src={banner3}
                className="w-full max-h-[380px] object-cover"
                alt="Toy banner 3"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center px-8">
                <div className="text-white space-y-3 max-w-md">
                  <h2 className="text-3xl md:text-4xl font-bold">
                    Soft Toys for Cozy Bedtime
                  </h2>
                  <p>Cuddly plush toys for sweet dreams.</p>
                  <Link to="/my-profile" className="btn btn-outline btn-sm">
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* Popular Toys + Categories */}
      <section className="mt-10">
        <h2 className="text-3xl font-bold mb-6">Popular Toys</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* LEFT SIDE → Categories */}
          <div className="md:col-span-1 space-y-3">
            <h3 className="text-xl font-semibold mb-3">Shop by Category</h3>

            {[
              "All",
              "Building Blocks",
              "Dolls & Figures",
              "Cars & Vehicles",
              "Educational Toys",
              "Puzzles",
              "Soft Toys",
            ].map((cat, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(cat)}
                className={`btn btn-sm w-full justify-start ${
                  selectedCategory === cat ? "btn-primary" : "btn-outline"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* RIGHT SIDE → Toys Grid */}
          <div className="md:col-span-3">
            {loading ? (
              <div className="min-h-[120px] flex justify-center items-center">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            ) : (
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {filteredToys.map((toy) => (
                  <div key={toy.toyId} className="card bg-base-100 shadow-md">
                    <figure className="px-4 pt-4">
                      <img
                        src={toy.pictureURL}
                        alt={toy.toyName}
                        className="rounded-xl h-40 w-full object-cover"
                      />
                    </figure>

                    <div className="card-body">
                      <h3 className="card-title text-lg">{toy.toyName}</h3>
                      <p className="text-sm text-gray-500">
                        Category: {toy.subCategory}
                      </p>

                      <div className="flex justify-between text-sm mt-2">
                        <span>
                          <span className="font-semibold">Price:</span> $
                          {toy.price}
                        </span>
                        <span>
                          <span className="font-semibold">Rating:</span> ⭐
                          {toy.rating}
                        </span>
                      </div>

                      <p className="text-sm mt-1">
                        <span className="font-semibold">Available:</span>{" "}
                        {toy.availableQuantity}
                      </p>

                      <div className="card-actions justify-end mt-3">
                        <Link
                          to={`/toy/${toy.toyId}`}
                          className="btn btn-sm btn-primary"
                        >
                          View More
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}

                {!loading && filteredToys.length === 0 && (
                  <p className="text-center text-gray-500 col-span-full">
                    No toys found in this category.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Extra Section: Why Parents Love ToyTopia */}
      <section className="pb-10">
        <h2 className="text-3xl font-bold mb-4">Why Parents Love ToyTopia</h2>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="card bg-base-100 shadow-sm p-4">
            <h3 className="font-semibold">Trusted Local Sellers</h3>
            <p className="text-sm text-gray-500">
              Support your community by buying from local toy shops.
            </p>
          </div>

          <div className="card bg-base-100 shadow-sm p-4">
            <h3 className="font-semibold">Safe & Curated Toys</h3>
            <p className="text-sm text-gray-500">
              All toys are carefully checked and age-appropriate.
            </p>
          </div>

          <div className="card bg-base-100 shadow-sm p-4">
            <h3 className="font-semibold">Easy Reviews & Ratings</h3>
            <p className="text-sm text-gray-500">
              Share feedback to help other parents make great choices.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;