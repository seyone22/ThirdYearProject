import React, { useEffect, useState } from 'react';

const Shop = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/all-books")
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  return (
    <div className='mt-28 px-4 lg:px-24'>
      <h2 className='text-5xl font-bold text-center'>All books are here</h2>
      <div className='grid gap-8 my-12 lg:grid-cols-4 sm:grid-cols-3 md:grid-cols-3 grid-cols-1'>
        {books.map(book => (
          <div className="card shadow-lg rounded-lg overflow-hidden">
            <a href={book.href} className="block max-w-sm">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {book.bookTitle}
              </h5>
              <img src={book.imageURL} alt={book.bookTitle} className='h-96 object-cover w-full' />
              <p className="font-normal text-gray-600 dark:text-gray-300 text-center">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
              </p>
            </a>
            <button className='block mx-auto mt-4 bg-blue-700 font-semibold text-white py-2 px-4 rounded'>
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shop;
