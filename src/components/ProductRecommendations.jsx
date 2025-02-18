import React, { useState, useRef, useEffect } from 'react';
import { getProducts } from '../lib/products';
import { ROUTINE_STEPS } from '../data/routineSteps';
import {
  Star,
  ShoppingCart,
  Heart,
  ArrowLeft,
  User2,
  Check,
} from 'lucide-react';

const SKIN_TYPE_TIPS = {
  dry: [
    'Use lukewarm water instead of hot water',
    'Apply products to damp skin',
    'Layer multiple hydrating products',
  ],
  oily: [
    'Double cleanse in the evening',
    'Use lightweight, oil-free moisturizers',
    "Don't skip moisturizer",
  ],
  combination: [
    'Use different products for different areas',
    'Focus oil-control products on T-zone',
    'Hydrate dry areas separately',
  ],
  sensitive: [
    'Patch test new products',
    'Avoid fragranced products',
    'Introduce active ingredients slowly',
  ],
};

export default function ProductRecommendations({
  skinType,
  wishlist,
  onToggleWishlist,
  onAddToCart,
  onRetakeQuiz,
}) {
  const [activeTab, setActiveTab] = useState('all');
  const [filters, setFilters] = useState({
    priceRange: 'all',
    skinConcern: 'all',
    ingredients: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [timeOfDay, setTimeOfDay] = useState('AM');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    if (activeTab !== 'all' && product.type !== activeTab) return false;
    return true;
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

  const IngredientsFilter = ({ selectedIngredients, onChange, skinType }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target)
        ) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const allIngredients = [
      'Glycerin',
      'Hyaluronic Acid',
      'Niacinamide',
      'Aloe Vera',
      'Rose Water',
      'Vitamin C',
      'Retinol',
      'Peptides',
    ];

    const toggleIngredient = (ingredient) => {
      const newSelected = selectedIngredients.includes(ingredient)
        ? selectedIngredients.filter((i) => i !== ingredient)
        : [...selectedIngredients, ingredient];
      onChange(newSelected);
    };

    return (
      <div className='relative' ref={dropdownRef}>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Ingredients{' '}
          {selectedIngredients.length > 0 && `(${selectedIngredients.length})`}
        </label>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full px-4 py-2 bg-white border rounded-lg text-left flex justify-between items-center ${
            isOpen
              ? skinType.gender === 'female'
                ? 'border-rose-300'
                : 'border-cyan-300'
              : 'hover:border-gray-300'
          }`}
        >
          <span className='truncate'>
            {selectedIngredients.length === 0
              ? 'Select ingredients'
              : selectedIngredients.join(', ')}
          </span>
          <svg
            className={`w-4 h-4 text-gray-400 transition-transform ${
              isOpen ? 'transform rotate-180' : ''
            }`}
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              d='M19 9l-7 7-7-7'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
            />
          </svg>
        </button>

        {isOpen && (
          <div className='absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto'>
            <div className='p-2 space-y-1'>
              {allIngredients.map((ingredient) => (
                <button
                  key={ingredient}
                  onClick={() => toggleIngredient(ingredient)}
                  className='w-full flex items-center space-x-3 px-2 py-1.5 hover:bg-gray-50 rounded cursor-pointer'
                >
                  <div
                    className={`w-5 h-5 border rounded flex items-center justify-center ${
                      selectedIngredients.includes(ingredient)
                        ? skinType.gender === 'female'
                          ? 'bg-rose-500 border-rose-500'
                          : 'bg-cyan-500 border-cyan-500'
                        : 'border-gray-300'
                    }`}
                  >
                    {selectedIngredients.includes(ingredient) && (
                      <Check className='w-3.5 h-3.5 text-white' />
                    )}
                  </div>
                  <span className='text-sm text-gray-700'>{ingredient}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const getRoutineSteps = () => {
    let steps = [...ROUTINE_STEPS.basic];

    if (skinType.concerns && skinType.concerns.length > 0) {
      skinType.concerns.forEach((concern) => {
        if (ROUTINE_STEPS.concerns[concern]) {
          steps = [...steps, ...ROUTINE_STEPS.concerns[concern]];
        }
      });
    }

    return steps.sort((a, b) => a.step - b.step);
  };

  const getRecommendedProducts = (step) => {
    return products.filter(
      (product) =>
        product.type.toLowerCase() === step.type.toLowerCase() &&
        product.time_of_day &&
        product.time_of_day.includes(timeOfDay)
    );
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-[200px]'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900'></div>
      </div>
    );
  }

  return (
    <div className='space-y-12'>
      {/* Enhanced Profile Section */}
      <div className='bg-white p-8 rounded-xl shadow-lg'>
        <div className='max-w-4xl mx-auto'>
          <div className='flex flex-col md:flex-row md:items-center gap-6'>
            <div className='flex items-center gap-4'>
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  skinType.gender === 'female' ? 'bg-rose-100' : 'bg-cyan-100'
                }`}
              >
                <User2
                  className={`w-8 h-8 ${
                    skinType.gender === 'female'
                      ? 'text-rose-600'
                      : 'text-cyan-600'
                  }`}
                />
              </div>
              <div>
                <h2 className='text-2xl font-bold mb-1'>Your Skin Profile</h2>
                <div className='space-y-1'>
                  <p className='text-gray-600'>
                    <span className='font-medium'>Type:</span>{' '}
                    <span className='capitalize'>{skinType?.type}</span>
                  </p>
                  <p className='text-gray-600'>
                    <span className='font-medium'>Concerns:</span>{' '}
                    {skinType?.concerns?.map((concern, index) => (
                      <span
                        key={concern}
                        className={`capitalize ${
                          index < skinType.concerns.length - 1 ? 'mr-1' : ''
                        }`}
                      >
                        {concern}
                        {index < skinType.concerns.length - 1 ? ',' : ''}
                      </span>
                    ))}
                  </p>
                  {skinType?.climate && (
                    <p className='text-gray-600'>
                      <span className='font-medium'>Climate:</span>{' '}
                      <span className='capitalize'>{skinType.climate}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className='md:ml-auto flex items-center gap-4'>
              <button
                onClick={onRetakeQuiz}
                className={`px-4 py-2 rounded-full border transition-colors ${
                  skinType.gender === 'female'
                    ? 'border-rose-200 text-rose-600 hover:bg-rose-50'
                    : 'border-cyan-200 text-cyan-600 hover:bg-cyan-50'
                }`}
              >
                <div className='flex items-center gap-2'>
                  <ArrowLeft className='w-4 h-4' />
                  Retake Quiz
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Routine Section */}
      <div className='bg-white p-8 rounded-xl shadow-lg'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-2xl font-bold'>Your Personalized Routine</h2>
          <div className='flex gap-2 p-1 bg-gray-100 rounded-full'>
            <button
              onClick={() => setTimeOfDay('AM')}
              className={`px-4 py-1 rounded-full transition-colors ${
                timeOfDay === 'AM'
                  ? skinType.gender === 'female'
                    ? 'bg-rose-600 text-white'
                    : 'bg-cyan-600 text-white'
                  : ''
              }`}
            >
              Morning
            </button>
            <button
              onClick={() => setTimeOfDay('PM')}
              className={`px-4 py-1 rounded-full transition-colors ${
                timeOfDay === 'PM'
                  ? skinType.gender === 'female'
                    ? 'bg-rose-600 text-white'
                    : 'bg-cyan-600 text-white'
                  : ''
              }`}
            >
              Evening
            </button>
          </div>
        </div>

        <div className='space-y-8'>
          {getRoutineSteps()
            .filter((step) => step.time.includes(timeOfDay))
            .map((step, index) => (
              <div key={index} className='border-b pb-8'>
                <div className='flex items-center gap-4 mb-4'>
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      skinType.gender === 'female'
                        ? 'bg-rose-100'
                        : 'bg-cyan-100'
                    }`}
                  >
                    <span
                      className={`font-semibold ${
                        skinType.gender === 'female'
                          ? 'text-rose-600'
                          : 'text-cyan-600'
                      }`}
                    >
                      {Math.floor(step.step)}
                    </span>
                  </div>
                  <div>
                    <h3 className='font-semibold text-lg'>{step.type}</h3>
                    <p className='text-gray-600'>{step.description}</p>
                  </div>
                </div>

                {/* Product Recommendations for this step */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
                  {getRecommendedProducts(step).length > 0 ? (
                    getRecommendedProducts(step).map((product) => (
                      <div
                        key={product.id}
                        className='bg-white rounded-xl shadow-lg overflow-hidden'
                      >
                        <div className='p-6'>
                          <div className='flex justify-between items-start mb-4'>
                            <div>
                              <h4 className='text-lg font-semibold mb-1'>
                                {product.name}
                              </h4>
                              <p className='text-sm text-gray-500'>
                                {product.brand}
                              </p>
                            </div>
                            <span className='font-bold text-lg'>
                              ${product.price}
                            </span>
                          </div>
                          <p className='text-gray-600 text-sm mb-4'>
                            {product.description}
                          </p>
                          {product.ingredients && (
                            <div className='mb-4'>
                              <p className='text-sm font-medium text-gray-700 mb-2'>
                                Key Ingredients:
                              </p>
                              <div className='flex flex-wrap gap-2'>
                                {product.ingredients.map((ingredient) => (
                                  <span
                                    key={ingredient}
                                    className={`px-2 py-1 text-xs rounded-full ${
                                      skinType.gender === 'female'
                                        ? 'bg-rose-50 text-rose-700'
                                        : 'bg-cyan-50 text-cyan-700'
                                    }`}
                                  >
                                    {ingredient}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          <div className='flex justify-between items-center'>
                            <button
                              onClick={() => onToggleWishlist(product.id)}
                              className={`p-2 rounded-full ${
                                wishlist.includes(product.id)
                                  ? 'text-rose-600'
                                  : 'text-gray-400 hover:text-rose-600'
                              }`}
                            >
                              <Heart className='w-6 h-6' />
                            </button>
                            <button
                              onClick={() => onAddToCart(product)}
                              className={`px-4 py-2 rounded-full ${
                                skinType.gender === 'female'
                                  ? 'bg-rose-600 hover:bg-rose-700'
                                  : 'bg-cyan-600 hover:bg-cyan-700'
                              } text-white`}
                            >
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className='text-gray-500 italic'>
                      No products found for this step
                    </p>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
