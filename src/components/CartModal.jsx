import React from 'react';
import { X, Minus, Plus, Trash2 } from 'lucide-react';

export default function CartModal({
  isOpen,
  onClose,
  cart,
  skinType,
  onUpdateQuantity,
  onRemoveItem,
}) {
  if (!isOpen) return null;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-2xl font-bold'>Shopping Cart</h2>
          <button
            onClick={onClose}
            className='p-2 hover:bg-gray-100 rounded-full'
          >
            <X className='w-6 h-6' />
          </button>
        </div>

        {cart.length === 0 ? (
          <p className='text-gray-500 text-center py-8'>Your cart is empty</p>
        ) : (
          <>
            <div className='space-y-4 mb-6'>
              {cart.map((item) => (
                <div
                  key={item.id}
                  className='flex gap-4 p-4 bg-gray-50 rounded-lg'
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className='w-24 h-24 object-cover rounded-lg'
                  />
                  <div className='flex-1'>
                    <h3 className='font-semibold'>{item.name}</h3>
                    <p className='text-sm text-gray-600'>{item.brand}</p>
                    <div className='flex justify-between items-center mt-2'>
                      <div className='flex items-center space-x-2'>
                        <button
                          onClick={() =>
                            onUpdateQuantity(
                              item.id,
                              Math.max(0, item.quantity - 1)
                            )
                          }
                          className='p-1 hover:bg-gray-200 rounded'
                        >
                          <Minus className='w-4 h-4' />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.id, item.quantity + 1)
                          }
                          className='p-1 hover:bg-gray-200 rounded'
                        >
                          <Plus className='w-4 h-4' />
                        </button>
                      </div>
                      <span className='font-bold'>
                        ${item.price * item.quantity}
                      </span>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className='p-2 hover:bg-gray-200 rounded'
                      >
                        <Trash2 className='w-4 h-4 text-red-500' />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className='border-t pt-4'>
              <div className='flex justify-between items-center mb-4'>
                <span className='font-semibold'>Total</span>
                <span className='text-xl font-bold'>${total.toFixed(2)}</span>
              </div>
              <button
                className={`w-full py-3 rounded-full text-white ${
                  skinType.gender === 'female' ? 'bg-rose-600' : 'bg-cyan-600'
                }`}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
