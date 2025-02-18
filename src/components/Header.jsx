import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function Header({
  skinType,
  wishlist,
  cart,
  onOpenWishlist,
  onOpenCart,
  showActions,
}) {
  const { user, signOut } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsSigningOut(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <header className='bg-white shadow-sm'>
      <div className='max-w-7xl mx-auto px-4 h-16'>
        <div className='flex items-center justify-between h-full'>
          {/* Logo */}
          <div className='flex items-center gap-2'>
            <Link to='/'>
              <Sparkles className='w-6 h-6 text-rose-600' />
              <span className='text-xl font-bold text-gray-800'>Gosmetic</span>
            </Link>
          </div>

          {/* Actions */}
          {showActions && (
            <div className='flex items-center gap-4 sm:gap-6'>
              <button
                onClick={onOpenWishlist}
                className='relative p-2 text-gray-500 hover:text-gray-700'
              >
                <Heart className='w-6 h-6' />
                {wishlist.length > 0 && (
                  <span className='absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs flex items-center justify-center text-white bg-rose-500'>
                    {wishlist.length}
                  </span>
                )}
              </button>
              <button
                onClick={onOpenCart}
                className='relative p-2 text-gray-500 hover:text-gray-700'
              >
                <ShoppingCart className='w-6 h-6' />
                {cart.length > 0 && (
                  <span className='absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs flex items-center justify-center text-white bg-rose-500'>
                    {cart.length}
                  </span>
                )}
              </button>
            </div>
          )}

          <button
            onClick={handleSignOut}
            disabled={isSigningOut}
            className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50'
          >
            {isSigningOut ? 'Signing Out...' : 'Sign Out'}
          </button>
        </div>
      </div>
    </header>
  );
}
