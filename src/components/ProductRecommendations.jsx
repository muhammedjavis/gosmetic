import React, { useState } from 'react';
import { products } from '../data/products';
import { Star, ShoppingCart, Heart, ArrowLeft, User2 } from 'lucide-react';

export default function ProductRecommendations({
  skinType,
  wishlist,
  onToggleWishlist,
  onAddToCart,
}) {
  const [activeTab, setActiveTab] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = products.filter((product) => {
    const matchesSkinType =
      product.suitableFor.includes(skinType.type) ||
      product.suitableFor.includes('all');
    const matchesGender =
      activeTab === 'all'
        ? product.gender === 'unisex' || product.gender === skinType.gender
        : product.gender === 'men';
    return matchesSkinType && matchesGender;
  });

  const ProductSkeleton = () => (
    <div className='bg-white rounded-xl shadow-lg overflow-hidden animate-pulse'>
      <div className='h-64 bg-gray-200'></div>
      <div className='p-6 space-y-4'>
        <div className='h-4 bg-gray-200 rounded w-2/3'></div>
        <div className='h-4 bg-gray-200 rounded w-1/2'></div>
        <div className='h-4 bg-gray-200 rounded w-full'></div>
      </div>
    </div>
  );

  const ProductModal = ({ product, onClose }) => {
    if (!product) return null;

    return (
      <div className='fixed inset-0 bg-black/50 flex items-center justify-center'>
        <div className='bg-white rounded-xl p-6 max-w-2xl w-full mx-4'>
          {/* Add detailed product information */}
        </div>
      </div>
    );
  };

  return (
    <div className='space-y-12'>
      <div className='bg-white p-8 rounded-xl shadow-lg'>
        <div className='max-w-4xl mx-auto'>
          <h2 className='text-3xl font-bold mb-6'>
            Your Personalized Skin Profile
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div
              className={`p-6 bg-gradient-to-br ${
                skinType.gender === 'female'
                  ? 'from-rose-50 to-rose-100'
                  : 'from-cyan-50 to-cyan-100'
              } rounded-xl`}
            >
              <p
                className={`text-sm ${
                  skinType.gender === 'female'
                    ? 'text-rose-600'
                    : 'text-cyan-600'
                } mb-2 uppercase tracking-wide`}
              >
                Skin Type
              </p>
              <p className='text-xl font-semibold capitalize'>
                {skinType.type}
              </p>
              <p className='text-gray-600 mt-2'>
                Your skin's natural characteristics
              </p>
            </div>
            <div
              className={`p-6 bg-gradient-to-br ${
                skinType.gender === 'female'
                  ? 'from-rose-50 to-rose-100'
                  : 'from-cyan-50 to-cyan-100'
              } rounded-xl`}
            >
              <p
                className={`text-sm ${
                  skinType.gender === 'female'
                    ? 'text-rose-600'
                    : 'text-cyan-600'
                } mb-2 uppercase tracking-wide`}
              >
                Main Concern
              </p>
              <p className='text-xl font-semibold capitalize'>
                {skinType.concerns[0]}
              </p>
              <p className='text-gray-600 mt-2'>What you'd like to improve</p>
            </div>
            <div
              className={`p-6 bg-gradient-to-br ${
                skinType.gender === 'female'
                  ? 'from-rose-50 to-rose-100'
                  : 'from-cyan-50 to-cyan-100'
              } rounded-xl`}
            >
              <p
                className={`text-sm ${
                  skinType.gender === 'female'
                    ? 'text-rose-600'
                    : 'text-cyan-600'
                } mb-2 uppercase tracking-wide`}
              >
                Climate
              </p>
              <p className='text-xl font-semibold capitalize'>
                {skinType.climate}
              </p>
              <p className='text-gray-600 mt-2'>Your environmental factors</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8'>
          <div className='flex-1'>
            <h2 className='text-3xl font-bold mb-2'>Recommended Products</h2>
            <div className='flex space-x-4'>
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-full transition-colors ${
                  activeTab === 'all'
                    ? skinType.gender === 'female'
                      ? 'bg-rose-600 text-white'
                      : 'bg-cyan-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All Products
              </button>
              <button
                onClick={() => setActiveTab('men')}
                className={`px-4 py-2 rounded-full transition-colors flex items-center space-x-2 ${
                  activeTab === 'men'
                    ? skinType.gender === 'female'
                      ? 'bg-rose-600 text-white'
                      : 'bg-cyan-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <User2 className='w-4 h-4' />
                <span>Men's Products</span>
              </button>
            </div>
          </div>
          <button
            className={`flex items-center text-gray-600 ${
              skinType.gender === 'female'
                ? 'hover:text-rose-600'
                : 'hover:text-cyan-600'
            } transition-colors`}
          >
            <ArrowLeft className='w-5 h-5 mr-2' />
            Retake Quiz
          </button>
        </div>

        <div className='flex items-center space-x-4 mb-4'>
          <label className='text-gray-600'>Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className='border rounded-lg px-3 py-2'
          >
            <option value='recommended'>Recommended</option>
            <option value='price-low'>Price: Low to High</option>
            <option value='price-high'>Price: High to Low</option>
            <option value='rating'>Highest Rated</option>
          </select>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {isLoading
            ? Array.from({ length: 6 }, (_, index) => (
                <ProductSkeleton key={index} />
              ))
            : filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className='bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow'
                >
                  <div className='relative'>
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className='w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300'
                    />
                    <button
                      onClick={() => onToggleWishlist(product.id)}
                      className={`absolute top-4 right-4 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center ${
                        skinType.gender === 'female'
                          ? 'hover:bg-rose-50'
                          : 'hover:bg-cyan-50'
                      } transition-colors`}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          wishlist.includes(product.id)
                            ? skinType.gender === 'female'
                              ? 'text-rose-600 fill-rose-600'
                              : 'text-cyan-600 fill-cyan-600'
                            : 'text-gray-600'
                        }`}
                      />
                    </button>
                    {product.gender === 'men' && (
                      <div
                        className={`absolute top-4 left-4 px-3 py-1 ${
                          skinType.gender === 'female'
                            ? 'bg-rose-600'
                            : 'bg-cyan-600'
                        } text-white text-sm rounded-full`}
                      >
                        Men
                      </div>
                    )}
                  </div>
                  <div className='p-6'>
                    <div className='flex justify-between items-start mb-4'>
                      <div>
                        <h3 className='text-lg font-semibold mb-1'>
                          {product.name}
                        </h3>
                        <p className='text-sm text-gray-600'>{product.brand}</p>
                      </div>
                      <div className='flex items-center bg-amber-50 px-2 py-1 rounded'>
                        <Star className='w-4 h-4 text-amber-500 fill-current' />
                        <span className='ml-1 text-sm font-medium'>4.5</span>
                      </div>
                    </div>
                    <p className='text-gray-600 text-sm mb-4'>
                      {product.description}
                    </p>
                    <div className='flex flex-wrap gap-2 mb-4'>
                      {product.ingredients
                        .slice(0, 3)
                        .map((ingredient, index) => (
                          <span
                            key={index}
                            className='text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600'
                          >
                            {ingredient}
                          </span>
                        ))}
                    </div>
                    <div className='flex items-center justify-between'>
                      <span className='text-xl font-bold'>
                        ${product.price}
                      </span>
                      <button
                        onClick={() => onAddToCart(product)}
                        className={`flex items-center space-x-2 ${
                          skinType.gender === 'female'
                            ? 'bg-rose-600 hover:bg-rose-700'
                            : 'bg-cyan-600 hover:bg-cyan-700'
                        } text-white px-6 py-2 rounded-full transition-colors`}
                      >
                        <ShoppingCart className='w-4 h-4' />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
