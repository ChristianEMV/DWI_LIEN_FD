import axios from 'axios';

export const getBooks = async () => {
  try {
    const response = await axios.get('https://kqwpa7r6ec.execute-api.us-east-2.amazonaws.com/Prod/all');
    return response.data;
  } catch (error) {
    console.error("Error fetching books: ", error);
    throw error;
  }
};

export const updateBook = async (book) => {
  try {
    const response = await axios.put('https://kqwpa7r6ec.execute-api.us-east-2.amazonaws.com/Prod/edi', book);
    return response.data;
  } catch (error) {
    console.error("Error editing book: ", error);
    throw error;
  }
};


export const deleteBook = async (idbook) => {
  try {
    const response = await axios.delete(`https://kqwpa7r6ec.execute-api.us-east-2.amazonaws.com/Prod/delete/${idbook}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting book: ", error);
    throw error;
  }
};

export const createBook = async (book) => {
  try {
    const response = await axios.post('https://kqwpa7r6ec.execute-api.us-east-2.amazonaws.com/Prod/add', book);
    return response.data;
  } catch (error) {
    console.error("Error creating book: ", error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await axios.get('https://fwa4x6g5k8.execute-api.us-east-2.amazonaws.com/Prod/all');
    return response.data;
  } catch (error) {
    console.error("Error fetching users: ", error);
    throw error;
  }
};

export const addUser = async (user) => {
  try{
    const response = await axios.post('https://fwa4x6g5k8.execute-api.us-east-2.amazonaws.com/Prod/add', user);
    return response.data;
  }catch (error){
    console.error("Error creating user: ", error);
    throw error;
  }
};

export const deleteUser = async (username) => {
  try {
    const response = await axios.request({
      url: 'https://fwa4x6g5k8.execute-api.us-east-2.amazonaws.com/Prod/delete_user',
      method: 'POST',
      data: { username },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting user: ", error);
    throw error;
  }
};
