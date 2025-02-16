import React from 'react';
import { X } from 'lucide-react';

export default function WishlistModal({
  isOpen,
  onClose,
  wishlist,
  products,
  skinType,
  onMoveToCart,
}) {
  if (!isOpen) return null;

  const wishlistItems = products.filter((product) =>
    wishlist.includes(product.id)
  );

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-2xl font-bold'>My Wishlist</h2>
          <button
            onClick={onClose}
            className='p-2 hover:bg-gray-100 rounded-full'
          >
            <X className='w-6 h-6' />
          </button>
        </div>

        {wishlistItems.length === 0 ? (
          <p className='text-gray-500 text-center py-8'>
            Your wishlist is empty
          </p>
        ) : (
          <div className='space-y-4'>
            {wishlistItems.map((product) => (
              <div
                key={product.id}
                className='flex gap-4 p-4 bg-gray-50 rounded-lg'
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className='w-24 h-24 object-cover rounded-lg'
                />
                <div className='flex-1'>
                  <h3 className='font-semibold'>{product.name}</h3>
                  <p className='text-sm text-gray-600'>{product.brand}</p>
                  <div className='flex justify-between items-center mt-2'>
                    <span className='font-bold'>${product.price}</span>
                    <button
                      onClick={() => onMoveToCart(product)}
                      className={`px-4 py-2 rounded-full text-white ${
                        skinType.gender === 'female'
                          ? 'bg-rose-600'
                          : 'bg-cyan-600'
                      }`}
                    >
                      Move to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
