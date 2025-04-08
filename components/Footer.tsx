import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6 border-t-1 border-amber-500">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-4 px-4">
        {/* Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
          <a href="/" className="hover:underline hover:text-amber-500 transition-all duration-300">Home</a>
          <a href="/get-advice" className="hover:underline hover:text-amber-500 transition-all duration-300">Get Advice</a>
          <a href="/calculators" className="hover:underline hover:text-amber-500 transition-all duration-300">Calculators</a>
          <a href="/ebooks" className="hover:underline hover:text-amber-500 transition-all duration-300">E-Books</a>
          <a href="/newsletter" className="hover:underline hover:text-amber-500 transition-all duration-300">Newsletter</a>
          <a href="/privacy-policy" className="hover:underline hover:text-amber-500 transition-all duration-300">Privacy Policy</a>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col lg:flex-row items-center gap-4 text-sm">
          <a href="mailto:info@daradreamrealty.com" className="hover:underline hover:text-amber-500 transition-all duration-300">info@daradreamrealty.com</a>
          <a href="tel:5551234567" className="hover:underline hover:text-amber-500 transition-all duration-300">(555) 123-4567</a>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 max-w-screen-2xl mt-4 pt-4 text-center text-sm mx-auto">
        © 2025 Dara Dream Realty. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer