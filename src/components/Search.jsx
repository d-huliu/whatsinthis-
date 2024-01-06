import React, { useState } from 'react';
import _ from 'lodash';
import { BiSearchAlt2 } from 'react-icons/bi';
import Loading from './Loading';
import Searchbar from './SearchBar';
import { fetchNutritionData } from '../Service';
import { fetchAutocompleteSuggestions } from '../Service';
import { fetchNutritionDataForCommon } from '../Service';
import { fetchNutritionDataForBranded } from '../Service';
import NutritionLabel from './NutritionLabel'; // Component to display each nutrition item

const Search = () => {
    const [query, setQuery] = useState('');
    const [nutritionData, setNutritionData] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    // Debounce the fetchAutocompleteSuggestions call
    const debouncedFetchSuggestions = _.debounce(async (query) => {
        if (query.length > 2) {
            try {
                const suggestions = await fetchAutocompleteSuggestions(query);
                setSuggestions(suggestions);
            } catch (error) {
                console.error('Autocomplete error:', error);
            }
        } else {
            setSuggestions([]);
        }
    }, 300);

    /*
    useEffect(() => {
        debouncedFetchSuggestions(query);
        // Cancel the debounce on useEffect cleanup.
        return debouncedFetchSuggestions.cancel;
    }, [query]);   */
 

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const data = await fetchNutritionData(query);
            setNutritionData(data);
        } catch (error) {
            console.error('Failure fetching nutrition data', error);
            setError('No Nutrition Data Found');
        } finally {
            setLoading(false);
        }
    };
    
    const handleSuggestionClick = async (query, isBranded = false) => {
        setLoading(true);
        setError(null);
        try {
            let data;
            if (isBranded) {
                // For branded foods, use the nix_item_id to fetch details
                data = await fetchNutritionDataForBranded(query);
            } else {
                // For common foods, use the food_name to fetch details
                data = await fetchNutritionDataForCommon(query);
            }
            setNutritionData(data);
        } catch (error) {
            console.error('Error fetching nutrition details:', error);
            setError('Failed to fetch nutrition details');
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className='w-full'>
            <div className='flex items-center justify-center pt-10 pb-5'>
                <form className='w-full' onSubmit={handleSearch}>
                    <Searchbar 
                        placeholder="Enter Food Name or UPC Address"
                        handleInputChange={handleInputChange}
                        rightIcon={<BiSearchAlt2 className='text-gray-600' onClick={handleSearch} />}
                    />
                </form>
            </div>

            {loading && <Loading />}

            {!loading && nutritionData?.length > 0 && (
                <div className='w-full flex flex-wrap gap-10 px-0 lg:px-10 py-10'>
                    {nutritionData.map((item, index) => (
                        <NutritionLabel data={item} key={index} />
                    ))}
                </div>
            )}

            {!loading && nutritionData?.length === 0 && (
                <div className='text-white w-full items-center justify-center py-10'>
                    <p className='text-center'>{error}</p>
                </div>
            )}

            {/* Autocomplete Suggestions */}
            {suggestions && (
            <div className="autocomplete-dropdown">
                {suggestions.common?.map((item, index) => (
                <div key={`common-${index}`} className="suggestion-item" onClick={() => handleSuggestionClick(item.food_name)}>
                    {item.food_name}
                </div>
                ))}
                {suggestions.branded?.map((item, index) => (
                <div key={`branded-${index}`} className="suggestion-item" onClick={() => handleSuggestionClick(item.nix_item_id, true)}>
                    {item.food_name} - {item.brand_name}
                </div>
                ))}
            </div>
            )}
                
        </div>
    );
};

export default Search;
