'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SecretButton() {
  const [count, setCount] = useState(0);
  const router = useRouter();

  const handleClick = () => {
    const newCount = count + 1;
    setCount(newCount);

    // Animacja (np. wstrząs lub zmiana koloru)
    const body = document.body;
    body.style.transition = 'background-color 0.1s';
    body.style.backgroundColor = newCount === 1 ? '#ff0000' : newCount === 2 ? '#00ff00' : '#0000ff';
    
    setTimeout(() => {
      body.style.backgroundColor = ''; // Reset
    }, 100);

    if (newCount >= 3) {
      router.push('/studio');
      setCount(0);
    }
  };

  return (
    <span 
      onClick={handleClick} 
      style={{ cursor: 'default', userSelect: 'none' }}
      title=""
    >
      &copy;
    </span>
  );
}
