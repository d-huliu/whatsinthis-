import React, { useEffect, useRef } from 'react';
import $ from 'jquery'; // Make sure jQuery is installed and imported

const NutritionLabel = ({ data }) => {
    // Use useRef to get a reference to the container div for the nutrition label
    const nutritionLabelRef = useRef(null);

    useEffect(() => {
        // Ensure that jQuery and the plugin are loaded
        if (window.jQuery && nutritionLabelRef.current) {
            // Clear the container before initializing the plugin
            $(nutritionLabelRef.current).empty();

            // Initialize the plugin on the container element
            $(nutritionLabelRef.current).nutritionLabel({
                // Pass the nutrition data here, format it according to the plugin's requirements
                itemName: data.foods[0].food_name,
                // ... other properties from the food object as required by the plugin
            });
        }
    }, [data]); // Re-run this effect when the data prop changes

    if (!data || data.foods.length === 0) {
        return <p>No nutrition data available.</p>;
    }

    const food = data.foods[0];

    // Return the container element for the nutrition label
    return (
        <div className="nutrition-label-container" ref={nutritionLabelRef}>
            {/* The plugin will fill this div with the nutrition label */}
        </div>
    );
};

export default NutritionLabel;
