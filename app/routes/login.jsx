// src/components/MyIframe.js

import React, { useState } from 'react';

const MyIframe = ({ src, width = '100%', height = '600px' }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState('');




  const validateForm = () => {
    setError('');
    if (!username || !password) {
      setError('Username and password are required.');
      return false;
    }
    // Add additional validation as needed
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      setFormSubmitted(true);
    }
  };

  return (
    <div>
      {!formSubmitted ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button type="submit">Submit</button>
          {error && <p>{error}</p>}
        </form>
      ) : (
        <iframe src={src} width={width} height={height} frameBorder="0" allowFullScreen></iframe>
      )}
    </div>
  );
};

export default MyIframe;

