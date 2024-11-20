import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/header'; // Adjust the path and capitalization as needed
import Footer from './components/footer'; // Adjust the path and capitalization as needed
import List from './components/list'; // Adjust the path and capitalization as needed

const App = () => {
  const [listTitle] = useState("Today");
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch initial items from the server
    axios.get('/api/items')
      .then(response => {
        setItems(response.data); // Assuming the server returns an array of items
      })
      .catch(err => console.error("Error fetching items:", err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`/api/items/${id}`) // Updated to use the DELETE method and correct endpoint
      .then(() => {
        // Remove the deleted item from the state
        setItems(prevItems => prevItems.filter(item => item._id !== id));
      })
      .catch(err => console.error("Error deleting item:", err));
  };

  const handleAddItem = (itemName) => {
    axios.post('/api/items', { name: itemName }) // Ensure this matches the server setup
      .then(response => {
        setItems(prevItems => [...prevItems, response.data]); // Add the new item to the list
      })
      .catch(err => console.error("Error adding item:", err));
  };

  const handleUpdateItem = (id, updatedName) => {
    axios.put(`/api/items/${id}`, { name: updatedName }) // Call the update API
      .then(response => {
        // Update the item in the state
        setItems(prevItems => prevItems.map(item => (item._id === id ? response.data : item)));
      })
      .catch(err => console.error("Error updating item:", err));
  };

  return (
    <div>
      <Header />
      <List 
        listTitle={listTitle} 
        newListItems={items}  
        onDeleteItem={handleDelete} 
        onAddItem={handleAddItem} 
        onUpdateItem={handleUpdateItem} // Pass the update function to the List component
      />
      <Footer />
    </div>
  );
};

export default App;





