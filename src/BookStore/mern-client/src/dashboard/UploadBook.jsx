import React from 'react'
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';

const UploadBook = () => {
  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Upload Books</h2>
    
      <form className="flex lg:w-{1100px} flex-col flex-wrap gap-4">
    {/*first row */}
    <div className='flex gap=8 '>
    <div className='lg:w-1/2'>
        <div className="mb-2 block">
          <Label htmlFor="email1" value="Your email" />
        </div>
        <TextInput 
        id="bookTitle"
        name='bookTitle'
         type="text" placeholder="Book name" required />
      </div>

      {/*author name */}
      <div className='lg:w-1/2'>
        <div className="mb-2 block">
          <Label htmlFor="authorName" value="Author Name" />
        </div>
        <TextInput 
        id="authorName"
        name='authorName'
         type="text" placeholder="Author Name" required />
      </div>
    </div>
     
     {/*second row */}
     <div className='flex gap=8 '>
    <div className='lg:w-1/2'>
        <div className="mb-2 block">
          <Label htmlFor="imageURL" value="Book Image URL" />
        </div>
        <TextInput 
        id="imageURL"
        name='imageURL'
         type="text" placeholder="Book Image URL" required />
      </div>

      {/*Category */}
      <div className='lg:w-1/2'>
        <div className="mb-2 block">
          <Label htmlFor="authorName" value="Author Name" />
        </div>
        <TextInput 
        id="authorName"
        name='authorName'
         type="text" placeholder="Author Name" required />
      </div>
    </div>

    </form>
    </div>
  )
}

export default UploadBook
