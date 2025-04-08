import React, { useState, useEffect } from 'react';
import UpdateItem from './components/UpdateItem';


const API_URI = `http://localhost:8000/doors`;

function App() {
  const [item, setItem] = useState(null); 

 
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await fetch(`${API_URI}/1`); 
        if (!res.ok) {
          throw new Error('Failed to fetch door');
        }
        const data = await res.json();
        setItem(data); 
      } catch (error) {
        console.error('Error fetching door:', error);
      }
    };

    fetchItem();
  }, []);

  return (
    <div>
      <h1>Update Door Item</h1>
      {item ? (
        <UpdateItem item={item} /> 
      ) : (
        <p>Loading...</p> 
      )}
    </div>
  );
}

export default App;