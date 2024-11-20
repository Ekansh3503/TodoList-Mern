import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/header'; 
import Footer from './components/footer'; 
import List from './components/list'; 

const App = () => {
  const [listTitle] = useState("Today");
  const [items, setItems] = useState([]);

  useEffect(() => {
   
    axios.get('/api/items')
      .then(response => {
        setItems(response.data); 
      })
      .catch(err => console.error("Error fetching items:", err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`/api/items/${id}`) 
      .then(() => {
     
        setItems(prevItems => prevItems.filter(item => item._id !== id));
      })
      .catch(err => console.error("Error deleting item:", err));
  };

  const handleAddItem = (itemName) => {
    axios.post('/api/items', { name: itemName }) 
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
        onUpdateItem={handleUpdateItem} 
      />
      <Footer />
    </div>
  );
};

export default App;





