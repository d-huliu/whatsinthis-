/*import React, { useState } from 'react';
import SearchBar from '../components/SearchBar'; // Import SearchBar component
import { fetchNutritionData } from '../Service';
import NutritionLabel from '../components/NutritionLabel'; // Component to display nutrition data

const NutritionDetail = () => {
    const [query, setQuery] = useState('');
    const [nutritionData, setNutritionData] = useState(null);

    const handleSearch = async () => {
        try {
            const data = await fetchNutritionData(query); // Adjust this to match your API query
            setNutritionData(data);
        } catch (error) {
            console.error('Failed to fetch nutrition data', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearch();
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <SearchBar
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter restaurant name or food"
                />
                <button type="submit">Search</button>
            </form>
            {nutritionData && <NutritionLabel data={nutritionData} />}
        </div>
    );
};

export default NutritionDetail;  */
