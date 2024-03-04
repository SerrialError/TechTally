// pages/index.tsx
"use client";
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

const Home: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const router = useRouter()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push('/dashboard');
    try {
      await axios.post('http://localhost:3001/api/users', { name: inputValue });
      setInputValue('');
      console.log('Data inserted successfully!');
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };

  return (
    <div>
      <h1>Hello World!</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Team Name"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Home;
