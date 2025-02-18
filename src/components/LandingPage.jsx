import React from 'react';
import { Sparkles, Shield, Zap, Heart, Star, ArrowRight } from 'lucide-react';

const LandingPage = ({ onGetStarted }) => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-rose-50 via-white to-rose-50'>
      {/* Header */}
      <header className='bg-white/80 backdrop-blur-sm sticky top-0 shadow-sm'>
        <div className='max-w-7xl mx-auto px-4 py-4'>
          <div className='flex justify-between items-center'>
            <div className='flex items-center space-x-2'>
              <Sparkles className='w-6 h-6 text-rose-600' />
              <span className='text-xl font-bold text-gray-800'>Gosmetic</span>
            </div>
            <button
              onClick={onGetStarted}
              className='px-4 py-2 bg-rose-600 text-white rounded-full hover:bg-rose-700 transition-colors duration-200 flex items-center gap-2'
            >
              Sign In <ArrowRight className='w-4 h-4' />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <div className='max-w-7xl mx-auto px-4 py-20'>
          <div className='text-center mb-16'>
            <h1 className='text-6xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-rose-600 to-pink-600 inline-block text-transparent bg-clip-text'>
              Your Personal Skincare Journey
            </h1>
            <p className='text-xl text-gray-600 max-w-2xl mx-auto mb-8'>
              Discover personalized skincare recommendations tailored to your
              unique skin profile.
            </p>
            <button
              onClick={onGetStarted}
              className='px-8 py-4 bg-rose-600 text-white rounded-full text-lg hover:bg-rose-700 transition-all duration-200 hover:scale-105 transform flex items-center gap-2 mx-auto'
            >
              Get Started <ArrowRight className='w-5 h-5' />
            </button>
          </div>

          {/* Features Grid */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-20'>
            <div className='bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-200'>
              <div className='w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mb-4'>
                <Shield className='w-6 h-6 text-rose-600' />
              </div>
              <h3 className='text-xl font-semibold mb-2'>Expert Analysis</h3>
              <p className='text-gray-600'>
                Take our comprehensive skin quiz for personalized
                recommendations based on your unique needs.
              </p>
            </div>
            <div className='bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-200'>
              <div className='w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mb-4'>
                <Zap className='w-6 h-6 text-rose-600' />
              </div>
              <h3 className='text-xl font-semibold mb-2'>Smart Matching</h3>
              <p className='text-gray-600'>
                Get matched with products that work best for your skin type and
                concerns.
              </p>
            </div>
            <div className='bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-200'>
              <div className='w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mb-4'>
                <Heart className='w-6 h-6 text-rose-600' />
              </div>
              <h3 className='text-xl font-semibold mb-2'>Save Favorites</h3>
              <p className='text-gray-600'>
                Create wishlists and track your favorite skincare products
                easily.
              </p>
            </div>
          </div>

          {/* Testimonials Section */}
          <div className='text-center mb-20'>
            <h2 className='text-3xl font-bold mb-12'>
              Loved by Skincare Enthusiasts
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              {[1, 2, 3].map((i) => (
                <div key={i} className='bg-white p-6 rounded-xl shadow-md'>
                  <div className='flex justify-center mb-4'>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className='w-5 h-5 text-yellow-400 fill-current'
                      />
                    ))}
                  </div>
                  <p className='text-gray-600 mb-4'>
                    "Finally found products that work for my sensitive skin. The
                    personalized recommendations are amazing!"
                  </p>
                  <p className='font-semibold text-gray-800'>Sarah M.</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className='bg-rose-50 py-20'>
        <div className='max-w-7xl mx-auto px-4 text-center'>
          <h2 className='text-4xl font-bold mb-6'>
            Ready to Start Your Skincare Journey?
          </h2>
          <p className='text-xl text-gray-600 mb-8 max-w-2xl mx-auto'>
            Join thousands of others who have found their perfect skincare
            match.
          </p>
          <button
            onClick={onGetStarted}
            className='px-8 py-4 bg-rose-600 text-white rounded-full text-lg hover:bg-rose-700 transition-all duration-200 hover:scale-105 transform flex items-center gap-2 mx-auto'
          >
            Get Started Now <ArrowRight className='w-5 h-5' />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className='bg-white py-12 border-t'>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='flex items-center justify-center space-x-2 mb-8'>
            <Sparkles className='w-6 h-6 text-rose-600' />
            <span className='text-xl font-bold text-gray-800'>Gosmetic</span>
          </div>
          <p className='text-center text-gray-600'>
            © 2024 Gosmetic. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
