import React from 'react';

interface CityListProps {
    cities: string[];
}

const CityList: React.FC<CityListProps> = ({ cities }) => {
    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 text-center">City List</h2>
            <ul className="grid gap-2">
                {cities.map((city, index) => (
                    <li key={index} className="p-2 bg-gray-200 rounded-md text-center">{city}</li>
                ))}
            </ul>
        </div>
    );
};

export default CityList;
