import axios from 'axios';

export const getBooks = async () => {
  try {
    const response = await axios.get('https://pcbdpjmpt2.execute-api.us-east-2.amazonaws.com/Prod/all');
    return response.data;
  } catch (error) {
    console.error("Error fetching books: ", error);
    throw error;
  }
};

export const updateBook = async (book) => {
  try {
    const response = await axios.put('https://pcbdpjmpt2.execute-api.us-east-2.amazonaws.com/Prod/edit', book);
    return response.data;
  } catch (error) {
    console.error("Error editing book: ", error);
    throw error;
  }
};


export const deleteBook = async (idbook) => {
  try {
    const response = await axios.delete(`https://pcbdpjmpt2.execute-api.us-east-2.amazonaws.com/Prod/delete/`,{
      data: {idbook}
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting book: ", error);
    throw error;
  }
};
