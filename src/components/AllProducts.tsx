import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { MoveLeft, MoveRight } from "lucide-react";
import { useEffect, useState } from "react";
import { ProductSkeleton } from "./ProductSkeleton";
import { ProductType } from "@/types";
import { addFavorite, removeFavorite } from "@/redux/slice/favouriteSlice";
import { addToCart } from "@/redux/slice/cartSlice";

export const AllProducts = () => {
  const { filterProducts, loading } = useAppSelector((state) => state.products);

  const dispatch = useAppDispatch();
  const favourites = useAppSelector((state) => state.favourite.items);
  const toggleFavorite = (product: ProductType) => {
    if (favourites.find((item: ProductType) => item.id === product.id)) {
      dispatch(removeFavorite(product.id));
    } else {
      dispatch(addFavorite(product));
    }
  };

  const addToCartClick = (product: ProductType) => {
    dispatch(addToCart({ ...product, qty: 1 }));
  };

  //paginantion
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  // Calculate total pages
  const totalPages = Math.ceil(filterProducts.length / itemsPerPage);

  // Get the items for the current page
  const currentProducts = filterProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle previous page
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <section className="w-full">
      {filterProducts.length === 0 && (
        <p className="mt-4 text-primary text-center">
          No products found. Check back later :)
        </p>
      )}
      <div className=" ">
        {loading ? (
          <div className=" grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] max-sm:grid-cols-2   max-md:grid-cols-3 gap-4">
            {[...Array(6).keys()].map((index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] max-sm:grid-cols-2  max-md:grid-cols-3 gap-4">
              {currentProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  addToCartClick={addToCartClick}
                  favourites={favourites}
                  toggleFavorite={toggleFavorite}
                />
              ))}
            </div>
            {filterProducts.length !== 0 && (
              <div className="pagination mt-2 flex justify-between items-center gap-2 w-full">
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <div className="action flex items-center gap-2">
                  <Button
                    variant="ghost"
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                  >
                    <MoveLeft />
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <Button
                      key={i + 1}
                      onClick={() => handlePageChange(i + 1)}
                      className={
                        currentPage === i + 1
                          ? "active w-[1rem] h-[1rem]"
                          : "w-[1rem] h-[1rem]"
                      }
                    >
                      {i + 1}
                    </Button>
                  ))}
                  <Button
                    variant="ghost"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                  >
                    <MoveRight />
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
