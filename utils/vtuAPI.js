import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// const VTU_API_KEY = 
// const VTU_API_BASE_URL = 

// Function to purchase a data bundle via VTU.ng
export const purchaseDataBundle = async (phoneNumber, dataAmount) => {
  try {
    const response = await axios.post(
      `${VTU_API_BASE_URL}/purchase/data`,
      {
        phoneNumber,
        dataAmount,
      },
      {
        headers: {
          Authorization: `Bearer ${VTU_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('VTU API Error:', error.message);
    return { success: false, message: error.message };
  }
};
