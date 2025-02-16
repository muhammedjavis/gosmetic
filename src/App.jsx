import React, { useState } from 'react';
import SkinTypeQuiz from './components/SkinTypeQuiz';
import ProductRecommendations from './components/ProductRecommendations';
import { Sparkles, Menu } from 'lucide-react';
import Header from './components/Header';
import WishlistModal from './components/WishlistModal';
import CartModal from './components/CartModal';
import { products } from './data/products';

function App() {
  const [skinType, setSkinType] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleUpdateCartQuantity = (productId, newQuantity) => {
    setCart((prev) => {
      if (newQuantity === 0) {
        return prev.filter((item) => item.id !== productId);
      }
      return prev.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const handleMoveToCart = (product) => {
    setWishlist((prev) => prev.filter((id) => id !== product.id));
    setCart((prev) => [...prev, { ...product, quantity: 1 }]);
  };

  const handleToggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCart = (product) => {
    setCart((prev) => [...prev, { ...product, quantity: 1 }]);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-neutral-50 to-gray-50'>
      <Header
        skinType={skinType}
        wishlist={wishlist}
        cart={cart}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        showActions={!!skinType}
      />

      <main className='max-w-7xl mx-auto px-4 pb-12 mt-10'>
        {!skinType ? (
          <div className='text-center mb-12'>
            <h2 className='text-5xl font-bold text-gray-900 mb-6'>
              Your Skin's Perfect Match
            </h2>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
              Discover personalized skincare recommendations tailored to your
              unique skin profile. Take our expert-crafted quiz and unlock your
              perfect routine.
            </p>
          </div>
        ) : null}

        {!skinType ? (
          <SkinTypeQuiz onComplete={setSkinType} />
        ) : (
          <ProductRecommendations
            skinType={skinType}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
          />
        )}
      </main>

      <footer className='bg-white py-12 border-t border-rose-100'>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-8 mb-8'>
            <div>
              <div className='flex items-center space-x-2 mb-4'>
                <Sparkles className='w-6 h-6 text-rose-600' />
                <span className='text-xl font-bold text-gray-800'>
                  Gosmetic
                </span>
              </div>
              <p className='text-gray-600'>
                Your personal guide to beautiful, healthy skin.
              </p>
            </div>
            <div>
              <h3 className='font-semibold mb-4'>Shop</h3>
              <ul className='space-y-2 text-gray-600'>
                <li>
                  <a href='#' className='hover:text-rose-600'>
                    All Products
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-rose-600'>
                    Bestsellers
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-rose-600'>
                    New Arrivals
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className='font-semibold mb-4'>About</h3>
              <ul className='space-y-2 text-gray-600'>
                <li>
                  <a href='#' className='hover:text-rose-600'>
                    Our Story
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-rose-600'>
                    Blog
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-rose-600'>
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className='font-semibold mb-4'>Help</h3>
              <ul className='space-y-2 text-gray-600'>
                <li>
                  <a href='#' className='hover:text-rose-600'>
                    Shipping
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-rose-600'>
                    Returns
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-rose-600'>
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className='pt-8 border-t border-gray-100 text-center text-gray-600'>
            <p>© 2025 Gosmetic. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        products={products}
        skinType={skinType}
        onMoveToCart={handleMoveToCart}
      />

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        skinType={skinType}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
      />
    </div>
  );
}

export default App;
