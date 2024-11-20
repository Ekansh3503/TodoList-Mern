import React, { useState } from 'react';
import '../styles.css'; 

const List = ({ listTitle, newListItems, onDeleteItem, onAddItem, onUpdateItem }) => {
  const [newItem, setNewItem] = useState('');
  const [editItemId, setEditItemId] = useState(null); // Track the item being edited
  const [editItemName, setEditItemName] = useState('');

  const handleCheckboxChange = (itemId) => {
    onDeleteItem(itemId); // Call the delete function passed from the parent
  };

  const handleInputChange = (e) => {
    setNewItem(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (newItem) {
      onAddItem(newItem); // Call the add function passed from the parent
      setNewItem(''); // Clear the input field
    }
  };

  const handleEditChange = (e) => {
    setEditItemName(e.target.value); // Update the edit input
  };

  const handleEditSubmit = (e, itemId) => {
    e.preventDefault();
    if (editItemName) {
      onUpdateItem(itemId, editItemName); // Call the update function passed from the parent
      setEditItemId(null); // Clear the edit state
      setEditItemName(''); // Clear the edit input
    }
  };

  return (
    <div>
      <div className="box" id="heading">
        <h1>{listTitle}</h1>
      </div>

      <div className="box">
        {newListItems.map((item) => (
          <div className="item" key={item._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <input
              type="checkbox"
              name="checkbox"
              value={item._id}
              onChange={() => handleCheckboxChange(item._id)}
            />
            {editItemId === item._id ? (
              <form onSubmit={(e) => handleEditSubmit(e, item._id)} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <input
                  type="text"
                  value={editItemName}
                  onChange={handleEditChange}
                  placeholder="Edit Item"
                  style={{ marginRight: '10px', flex: 1 }} // Flex to take available space
                />
                <button type="submit" className="update">U</button> {/* Update button styled */}
              </form>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flex: 1, width: '100%' }}>
                <p style={{ flex: 1 }}>{item.name}</p>
                <button
                  className="update-button" 
                  onClick={() => {
                    setEditItemId(item._id); // Set the item ID to edit
                    setEditItemName(item.name); // Set the item name for editing
                  }}
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        ))}

        <form className="item" onSubmit={handleFormSubmit} style={{ display: 'flex', width: '100%', marginTop: '10px' }}>
          <input
            type="text"
            name="newItem"
            placeholder="New Item"
            value={newItem}
            onChange={handleInputChange}
            autoComplete="off" // Flex for the input field
          />
          <button className="submit" type="submit">+</button>
        </form>
      </div>
    </div>
  );
};

export default List;
