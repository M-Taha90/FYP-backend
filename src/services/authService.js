// src/services/authService.js
export const verifyToken = async (token) => {
  const response = await fetch('http://localhost:4000/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '', // Send the token in the Authorization header
    },
  });

  if (!response.ok) {
    throw new Error('Token is invalid');
  }

  const data = await response.json();
  return data; // Return the data if the token is valid
};
