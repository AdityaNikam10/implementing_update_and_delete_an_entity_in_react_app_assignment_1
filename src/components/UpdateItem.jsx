import React, { useState } from 'react';
import PropTypes from 'prop-types';

const UpdateItem = ({ item }) => {
  const [updatedItem, setUpdatedItem] = useState(item?.name || '');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const handleUpdateItem = async (e) => {
    e.preventDefault();

    const API_URI = `http://localhost:8000/doors/${item.id}`;

    try {
      const res = await fetch(API_URI, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: updatedItem }),
      });

      if (!res.ok) {
        throw new Error('Failed to update item');
      }

      const data = await res.json();
      setResponse('Item updated successfully!');
    } catch (error) {
      setError('Error updating item: ' + error.message);
    }
  };

  const handleInputChange = (e) => {
    setUpdatedItem(e.target.value);
  };

  return (
    <div>
      <h2>Update Item</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {response && <p style={{ color: 'green' }}>{response}</p>}

      <form onSubmit={handleUpdateItem}>
        <label>
          Item Name:
          <input
            type="text"
            value={updatedItem}
            onChange={handleInputChange}
            placeholder="Update item name"
          />
        </label>
        <button type="submit">Update Item</button>
      </form>
    </div>
  );
};

// ✅ PropTypes validation
UpdateItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default UpdateItem;
