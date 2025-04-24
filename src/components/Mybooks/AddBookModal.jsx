import React, { useState } from "react";

function AddBookModal() {
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  const languages = [
    { name: "English", value: "english" },
    { name: "Spanish", value: "spanish" },
    { name: "French", value: "french" }
  ];
  
  const categories = [
    { name: "Fiction", value: "fiction" },
    { name: "Non-Fiction", value: "non-fiction" },
    { name: "Science Fiction", value: "sci-fi" }
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className="bg-br-blue-light p-4 rounded-lg max-w-3xl w-full">
        <div className="bg-white p-6 rounded-lg">
          <h3 className="text-2xl font-bold mb-4 text-br-blue-medium">Book Details</h3>
          <form className="space-y-4 w-full">
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm text-br-blue-medium font-bold mb-2"
              >
                Title
              </label>
              <input
                className="bg-white border border-br-gray-dark rounded-xl py-3 px-4 w-full"
                type="text"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="author"
                className="block text-sm text-br-blue-medium font-bold mb-2"
              >
                Author Name
              </label>
              <input
                className="bg-white border border-br-gray-dark rounded-xl py-3 px-4 w-full"
                type="text"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="author"
                className="block text-sm text-br-blue-medium font-bold mb-2"
              >
                ISBN Number
              </label>
              <input
                className="bg-white border border-br-gray-dark rounded-xl py-3 px-4 w-full"
                type="text"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="summary"
                className="block text-sm text-br-blue-medium font-bold mb-2"
              >
                Summary
              </label>
              <textarea
                className="bg-white border border-br-gray-dark rounded-xl py-3 px-4 w-full h-24"
                id="summary"
              />
            </div>
            <div className="mb-4 flex gap-4 w-full">
              {/* Custom Language Dropdown */}
              <div className="w-1/2 relative">
                <label
                  className="block text-sm text-br-blue-medium font-bold mb-2"
                >
                  Language
                </label>
                <div 
                  className="relative"
                  onMouseEnter={() => setLanguageDropdownOpen(true)}
                  onMouseLeave={() => setLanguageDropdownOpen(false)}
                >
                  <button 
                    type="button"
                    className="bg-white border border-br-gray-dark rounded-xl py-3 px-4 w-full text-left flex justify-between items-center"
                    onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                  >
                    {selectedLanguage ? selectedLanguage.name : "Select a language"}
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                  
                  {languageDropdownOpen && (
                    <div className="absolute top-full left-0 w-full border border-br-gray-light rounded-lg bg-white z-10 mt-1 overflow-hidden">
                      {languages.map((language, index) => (
                        <div 
                          key={index} 
                          className="  p-3 hover:bg-br-blue-light cursor-pointer"
                          onClick={() => {
                            setSelectedLanguage(language);
                            setLanguageDropdownOpen(false);
                          }}
                        >
                          <div className="text-br-blue-medium">{language.name}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Custom Category Dropdown */}
              <div className="w-1/2 relative">
                <label
                  className="block text-sm text-br-blue-medium font-bold mb-2"
                >
                  Category
                </label>
                <div 
                  className="relative"
                  onMouseEnter={() => setCategoryDropdownOpen(true)}
                  onMouseLeave={() => setCategoryDropdownOpen(false)}
                >
                  <button 
                    type="button"
                    className="bg-white border border-br-gray-dark rounded-xl py-3 px-4 w-full text-left flex justify-between items-center"
                    onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                  >
                    {selectedCategory ? selectedCategory.name : "Select a category"}
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                  
                  {categoryDropdownOpen && (
                    <div className="absolute top-full left-0 w-full border border-br-gray-light rounded-lg bg-white z-10 mt-1 overflow-hidden">
                      {categories.map((category, index) => (
                        <div 
                          key={index} 
                          className=" p-3 hover:bg-br-blue-light cursor-pointer"
                          onClick={() => {
                            setSelectedCategory(category);
                            setCategoryDropdownOpen(false);
                          }}
                        >
                          <div className="text-br-blue-medium">{category.name}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
          <div className="flex justify-end mt-4">
            <button className="bg-br-blue-medium text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition">
              Add Book
            </button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default AddBookModal;