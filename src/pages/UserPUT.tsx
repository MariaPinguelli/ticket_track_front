import React, { useState } from 'react';

const UserEdit = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  
  const handleUpdateUser = async () => {
    try {
      const response = await fetch('http://example.com/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      console.log('User updated successfully');
    } catch (error) {
      console.error('Error updating user:', error.message);
    }
  };
  
  return (
    <div>
      <h2>Edit User</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button onClick={handleUpdateUser}>Update User</button>
    </div>
  );
};

export default UserEdit;
