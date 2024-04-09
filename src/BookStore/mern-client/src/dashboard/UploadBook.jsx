import React, { useState } from 'react';
import { Button, Label, TextInput, Textarea } from 'flowbite-react';

const UploadBook = () => {
  const bookCategories = [
    "Fiction",
    "Non-Fiction",
    "History",
    "Programming",
    "Science Fiction",
    "Fantasy",
    "Horror",
    "Self help",
    "Memoir",
    "Business",
    "Children Books",
    "Travel",
    "Religion",
    "Art and Design"
  ];

  const [selectedBookCategory, setSelectedBookCategory] = useState(bookCategories[0]);

  const handleChangeSelectedValue = (event) => {
    setSelectedBookCategory(event.target.value);
  };

  const handleBookSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const bookTitle = form.bookTitle.value;
    const authorName = form.authorName.value;
    const imageURL = form.imageURL.value;
    const category = selectedBookCategory; // Use the selected category state
    const bookDescription = form.bookDescription.value;
    const bookPDFURL = form.bookPDFURL.value;

    const bookObj = {
      bookTitle,
      authorName,
      imageURL,
      category,
      bookDescription,
      bookPDFURL
    };

    console.log(bookObj);

    //send data to db
    fetch("http://localhost:5000/upload-book", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(bookObj)
    }).then(res => res.json()).then(data => {
      alert("Book uploaded successfully");
      form.reset();
    });
  };

  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Upload Books</h2>

      <form onSubmit={handleBookSubmit} className="lg:w-1/2 flex flex-col gap-4">
        <div className='flex gap-8'>
          <div className='w-1/2'>
            <Label htmlFor="bookTitle" value="Book Title" />
            <TextInput id="bookTitle" name='bookTitle' type="text" placeholder="Book title" required />
          </div>
          <div className='w-1/2'>
            <Label htmlFor="authorName" value="Author Name" />
            <TextInput id="authorName" name='authorName' type="text" placeholder="Author Name" required />
          </div>
        </div>

        <div className='flex gap-8'>
          <div className='w-1/2'>
            <Label htmlFor="imageURL" value="Book Image URL" />
            <TextInput id="imageURL" name='imageURL' type="text" placeholder="Book Image URL" required />
          </div>
          <div className='w-1/2'>
            <Label htmlFor="inputState" value="Book Category" />
            <select id='inputState' name='categoryName' className='w-full rounded' value={selectedBookCategory} onChange={handleChangeSelectedValue}>
              {bookCategories.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>
        </div>

        <div>
          <Label htmlFor='bookDescription' value='Book Description' />
          <Textarea id="bookDescription" name='bookDescription' className='w-full' placeholder='Write your book description' required type='text' rows={5} />
        </div>

        <div>
          <Label htmlFor='bookPDFURL' value='Book PDF URL' />
          <TextInput id="bookPDFURL" name='bookPDFURL' placeholder='Book PDF URL' required type="text" />
        </div>

        <div>
          <Button type='submit' className='mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            Upload Book
          </Button>
        </div>

      </form>
    </div>
  );
};

export default UploadBook;
