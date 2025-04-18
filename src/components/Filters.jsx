import React, { useState } from 'react'
import { FaSortDown } from "react-icons/fa6"
import Checkbox from './Checkbox'
import RadioButton from './RadioButton';

const Status_Options = [
    { id: 'all', label: 'All' },
    { id: 'borrowed', label: 'Borrowed' },
    { id: 'available', label: 'Available' }
];
const Categories_Options = [
    { id: 'action_adventure', label: 'Action & Adventure' },
    { id: 'arts_film_photography', label: 'Arts, Film & Photography' },
    { id: 'biographies', label: 'Biographies, Diaries & True Accounts' },
    { id: 'business_economics', label: 'Business & Economics' },
    { id: 'children', label: 'Children\'s Books' },
    { id: 'comics_mangas', label: 'Comics & Mangas' },
    { id: 'computers_internet', label: 'Computers & Internet' },
    { id: 'crafts_hobbies', label: 'Crafts, Hobbies & Home' },
    { id: 'crime_thriller', label: 'Crime, Thriller & Mystery' },
    { id: 'engineering', label: 'Engineering' },
    { id: 'exam_preparation', label: 'Exam Preparation' },
    { id: 'health_family', label: 'Health, Family & Personal Development' },
    { id: 'health_fitness', label: 'Health, Fitness & Nutrition' },
    { id: 'historical_fiction', label: 'Historical Fiction' },
    { id: 'history', label: 'History' },
    { id: 'humour', label: 'Humour' },
    { id: 'language_linguistics', label: 'Language, Linguistics & Writing' },
    { id: 'law', label: 'Law' },
    { id: 'literature_fiction', label: 'Literature & Fiction' },
    { id: 'maps_atlases', label: 'Maps & Atlases' },
    { id: 'medicine_textbooks', label: 'Medicine and Health Sciences Textbooks' },
    { id: 'politics', label: 'Politics' },
    { id: 'reference', label: 'Reference' },
    { id: 'religion_spirituality', label: 'Religion & Spirituality' },
    { id: 'romance', label: 'Romance' },
    { id: 'school_books', label: 'School Books' },
    { id: 'science_math_textbooks', label: 'Science and Mathematics Textbooks' },
    { id: 'scifi_fantasy', label: 'Science Fiction & Fantasy' },
    { id: 'science_tech_medicine', label: 'Sciences, Technology & Medicine' },
    { id: 'society_social', label: 'Society & Social Sciences' },
    { id: 'sports', label: 'Sports' },
    { id: 'teen_young_adult', label: 'Teen & Young Adult' },
    { id: 'textbooks_study', label: 'Textbooks & Study Guides' },
    { id: 'travel_tourism', label: 'Travel & Tourism' }
];
const Languages_Options = [
    { id: 'english', label: 'English' },
    { id: 'hindi', label: 'Hindi' },
    { id: 'marathi', label: 'Marathi' },
    { id: 'tamil', label: 'Tamil' },
    { id: 'telugu', label: 'Telugu' },
    { id: 'bengali', label: 'Bengali' },
    { id: 'malayalam', label: 'Malayalam' },
    { id: 'sanskrit', label: 'Sanskrit' },
    { id: 'urdu', label: 'Urdu' },
    { id: 'kannada', label: 'Kannada' },
    { id: 'punjabi', label: 'Punjabi' },
    { id: 'oriya', label: 'Oriya' },
    { id: 'gujarati', label: 'Gujarati' },
    { id: 'sindhi', label: 'Sindhi' },
    { id: 'assamese', label: 'Assamese' }
];

const Filters = () => {
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [selectedCategories, setSelectedCategories] = useState({});
    const [selectedLanguages, setSelectedLanguages] = useState({});

    const [isStatusVisible, setIsStatusVisible] = useState(true);
const [isCategoriesVisible, setIsCategoriesVisible] = useState(true);
const [isLanguagesVisible, setIsLanguagesVisible] = useState(true);

const handleStatusChange = (value) => {
    setSelectedStatus(value);
};

    const handleCategoryChange = (id) => (isChecked) => {
        setSelectedCategories(prev => ({
            ...prev,
            [id]: isChecked
        }));
    };

    const handleLanguageChange = (id) => (isChecked) => {
        setSelectedLanguages(prev => ({
            ...prev,
            [id]: isChecked
        }));
    };

    return (
        <div className='h-full w-71 flex flex-col bg-white p-5 rounded-b-lg shadow-md'>
            <h1 className='font-bold text-lg flex-none'>Filters</h1>

            <div className='flex-1 mt-4 space-y-4'>
                {/* Status Filters */}
                <div className='space-y-2'>
                    <div 
                        className='flex items-center justify-between bg-white rounded-lg sticky top-0 bg-white z-10 cursor-pointer'
                        onClick={() => setIsStatusVisible(!isStatusVisible)}
                    >
                        <h2 className='font-semibold'>Status</h2>
                        <FaSortDown className={`transform transition-transform duration-200 ${isStatusVisible ? '' : 'rotate-180'}`} />
                    </div>
                    <hr className="border-t-2 border-br-gray-light" />
                    {isStatusVisible && (
                        <div className='flex flex-col space-y-2 p-3'>
                            {Status_Options.map(option => (
                                 <RadioButton
                                 key={option.id}
                                 label={option.label}
                                 checked={selectedStatus === option.id}
                                 onChange={handleStatusChange}
                                 name="status"
                                 value={option.id}
                             />
                            ))}
                        </div>
                    )}
                </div>

                {/* Categories Filters */}
                <div className='space-y-2'>
                    <div 
                        className='flex items-center justify-between bg-white rounded-lg sticky top-0 bg-white z-10 cursor-pointer'
                        onClick={() => setIsCategoriesVisible(!isCategoriesVisible)}
                    >
                        <h2 className='font-semibold'>Categories</h2>
                        <FaSortDown className={`transform transition-transform duration-200 ${isCategoriesVisible ? '' : 'rotate-180'}`} />
                    </div>
                    <hr className="border-t-2 border-br-gray-light" />
                    {isCategoriesVisible && (
                        <div className='flex flex-col space-y-2 p-3'>
                            {Categories_Options.map(option => (
                                <Checkbox
                                    key={option.id}
                                    label={option.label}
                                    checked={selectedCategories[option.id] || false}
                                    onChange={handleCategoryChange(option.id)}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Languages Filters */}
                <div className='space-y-2'>
                    <div 
                        className='flex items-center justify-between bg-white rounded-lg sticky top-0 bg-white z-10 cursor-pointer'
                        onClick={() => setIsLanguagesVisible(!isLanguagesVisible)}
                    >
                        <h2 className='font-semibold'>Languages</h2>
                        <FaSortDown className={`transform transition-transform duration-200 ${isLanguagesVisible ? '' : 'rotate-180'}`} />
                    </div>
                    <hr className="border-t-2 border-br-gray-light" />
                    {isLanguagesVisible && (
                        <div className='flex flex-col space-y-2 p-3'>
                            {Languages_Options.map(option => (
                                <Checkbox
                                    key={option.id}
                                    label={option.label}
                                    checked={selectedLanguages[option.id] || false}
                                    onChange={handleLanguageChange(option.id)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Filters