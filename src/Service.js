import axios from 'axios';

export const fetchNutritionData = async (upc) => {
  const options = {
    method: 'GET',
    url: `https://trackapi.nutritionix.com/v2/search/instant/?upc=${upc}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'x-app-id': process.env.REACT_APP_NUTRITIONIX_APP_ID,
      'x-app-key': process.env.REACT_APP_NUTRITIONIX_APP_KEY
    }
  };

  try {
    const response = await axios(options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching nutrition data:', error);
    throw error;
  }
};

/////////////////////////////////////////////////////////////////////////////

/*
var request = require('request');

function fetchAutocompleteSuggestions(query) {
  var options = {
    'method': 'GET',
    'url': `https://trackapi.nutritionix.com/v2/search/instant?query=${query}`,
    'headers': {
      'Content-Type': 'application/json',
      'x-app-id': process.env.REACT_APP_NUTRITIONIX_APP_ID,
      'x-app-key': process.env.REACT_APP_NUTRITIONIX_APP_KEY
    }
  };

  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
    // You can parse and return the response here
    // Remember to handle the response in your frontend component
  });
}

// Example usage
fetchAutocompleteSuggestions("hamburger"); */

/////////////////////////////////////////////////////////////////////////////

export const fetchAutocompleteSuggestions = async (query) => {
  const url = `https://trackapi.nutritionix.com/v2/search/instant?query=${encodeURIComponent(query)}`;
  const headers = {
    'Content-Type': 'application/json',
    'x-app-id': process.env.REACT_APP_NUTRITIONIX_APP_ID,
    'x-app-key': process.env.REACT_APP_NUTRITIONIX_APP_KEY
  };

  try {
    const response = await axios.get(url, { headers });
    return response.data; // Ensure this aligns with the expected structure on the front-end
  } catch (error) {
    console.error('Error fetching autocomplete suggestions:', error.response ? error.response.data : error);
    throw error;
  }
};


//////////////////////////////////////////////////////////////////////////////

export const fetchNutritionDataForCommon = async (foodName) => {
  // Implement the API call to /natural/nutrients with the food_name
  // Return the detailed nutrition data
};

export const fetchNutritionDataForBranded = async (nixItemId) => {
  // Implement the API call to /search/item with the nix_item_id
  // Return the detailed nutrition data
};
