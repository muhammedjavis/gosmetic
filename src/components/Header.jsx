import React, { useState } from 'react';
import { Heart, ShoppingCart, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Header({
  skinType,
  wishlist,
  cart,
  onOpenWishlist,
  onOpenCart,
  showActions,
}) {
  const { signOut, user } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await signOut();
    setIsSigningOut(false);
  };

  return (
    <header className='bg-white shadow-sm sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 py-4'>
        <div className='flex items-center justify-between'>
          <div className='w-24'></div>

          <div className='flex items-center space-x-2'>
            <Sparkles className='w-6 h-6 text-rose-600' />
            <h1 className='text-xl font-bold text-gray-800'>Gosmetic</h1>
          </div>

          <div className='flex items-center space-x-4 w-24 justify-end'>
            {showActions && (
              <>
                <button
                  onClick={onOpenWishlist}
                  className='relative p-2 hover:bg-gray-100 rounded-full transition-colors'
                >
                  <Heart
                    className={`w-6 h-6 ${
                      skinType.gender === 'female'
                        ? 'text-rose-600'
                        : 'text-cyan-600'
                    }`}
                  />
                  {wishlist.length > 0 && (
                    <span
                      className={`absolute -top-1 -right-1 w-5 h-5 rounded-full ${
                        skinType.gender === 'female'
                          ? 'bg-rose-600'
                          : 'bg-cyan-600'
                      } text-white text-xs flex items-center justify-center`}
                    >
                      {wishlist.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={onOpenCart}
                  className='relative p-2 hover:bg-gray-100 rounded-full transition-colors'
                >
                  <ShoppingCart
                    className={`w-6 h-6 ${
                      skinType.gender === 'female'
                        ? 'text-rose-600'
                        : 'text-cyan-600'
                    }`}
                  />
                  {cart.length > 0 && (
                    <span
                      className={`absolute -top-1 -right-1 w-5 h-5 rounded-full ${
                        skinType.gender === 'female'
                          ? 'bg-rose-600'
                          : 'bg-cyan-600'
                      } text-white text-xs flex items-center justify-center`}
                    >
                      {cart.length}
                    </span>
                  )}
                </button>
              </>
            )}
            {user && (
              <button
                onClick={handleSignOut}
                disabled={isSigningOut}
                className={`text-gray-600 hover:text-rose-600 ${
                  isSigningOut ? 'opacity-50' : ''
                }`}
              >
                {isSigningOut ? 'Signing out...' : 'Sign Out'}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
