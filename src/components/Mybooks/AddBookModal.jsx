import React, { useState, useEffect } from "react";
import axios from "axios";

function AddBookModal({ onClose }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [ISBN, setIsbn] = useState("");
  const [summary, setSummary] = useState("");

  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  const [languages, setLanguages] = useState([]);
  const [categories, setCategories] = useState([]);

  const [isLoading, setIsLoading] = useState(true);


  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/v1/category/getall");
      if (data.success) {
        setCategories(data.categories.rows);
        console.log("Categories:", data.categories.rows);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchLanguages = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/v1/language/getall");
      if (data.success) {
        setLanguages(data.languages.rows);
        console.log("Languages:", data.languages.rows);
      }
    } catch (error) {
      console.error("Error fetching languages:", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([fetchCategories(), fetchLanguages()]);
      setIsLoading(false);
    };
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const clubId = localStorage.getItem("clubId");
  
    try {
      const { data } = await axios.post("http://localhost:3000/api/v1/book/addbook", {
        title,
        author,
        ISBN,
        summary,
        clubId,
        token,
        languageId: selectedLanguage.id,
        categoryId: selectedCategory.id,
        isAvailable: true,
      });
      if (data.success) {
        alert("Book added successfully!");
        onClose();
      } else {
        alert("Failed to add book.");
      }
    } catch (error) {
      console.error("Error submitting book:", error);
      alert("An error occurred while adding the book.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className="bg-br-blue-light p-4 rounded-lg max-w-3xl w-full">
        <div className="bg-white p-6 rounded-lg">
          <h3 className="text-2xl font-bold mb-4 text-br-blue-medium">Book Details</h3>

          {isLoading ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            <form className="space-y-4 w-full" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-bold mb-2 text-br-blue-medium">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-white border border-br-gray-dark rounded-xl py-3 px-4 w-full"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="author" className="block text-sm font-bold mb-2 text-br-blue-medium">
                  Author Name
                </label>
                <input
                  id="author"
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="bg-white border border-br-gray-dark rounded-xl py-3 px-4 w-full"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="isbn" className="block text-sm font-bold mb-2 text-br-blue-medium">
                  ISBN Number
                </label>
                <input
                  id="isbn"
                  type="text"
                  value={ISBN}
                  onChange={(e) => setIsbn(e.target.value)}
                  className="bg-white border border-br-gray-dark rounded-xl py-3 px-4 w-full"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="summary" className="block text-sm font-bold mb-2 text-br-blue-medium">
                  Summary
                </label>
                <textarea
                  id="summary"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="bg-white border border-br-gray-dark rounded-xl py-3 px-4 w-full h-24"
                />
              </div>

              <div className="mb-4 flex gap-4 w-full">
                {/* Language Dropdown */}
                <div className="w-1/2 relative">
                  <label className="block text-sm font-bold mb-2 text-br-blue-medium">Language</label>
                  <button
                    type="button"
                    className="bg-white border border-br-gray-dark rounded-xl py-3 px-4 w-full text-left flex justify-between items-center"
                    onClick={() => setLanguageDropdownOpen((prev) => !prev)}
                    onBlur={() => setTimeout(() => setLanguageDropdownOpen(false), 200)}
                  >
                    {selectedLanguage ? selectedLanguage.LanguageName : "Select a language"}
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {languageDropdownOpen && (
                    <div className="absolute top-full left-0 w-full border border-br-gray-light rounded-lg bg-white z-10 mt-1 max-h-48 overflow-y-auto">
                      {languages.length > 0 ? (
                        languages.map((language) => (
                          <div
                            key={language.LanguageName}
                            className="p-3 hover:bg-br-blue-light cursor-pointer"
                            onClick={() => {
                              setSelectedLanguage(language);
                              setLanguageDropdownOpen(false);
                            }}
                          >
                            {language.LanguageName}
                          </div>
                        ))
                      ) : (
                        <div className="p-3 text-gray-500">No languages available</div>
                      )}
                    </div>
                  )}
                </div>

                {/* Category Dropdown */}
                <div className="w-1/2 relative">
                  <label className="block text-sm font-bold mb-2 text-br-blue-medium">Category</label>
                  <button
                    type="button"
                    className="bg-white border border-br-gray-dark rounded-xl py-3 px-4 w-full text-left flex justify-between items-center"
                    onClick={() => setCategoryDropdownOpen((prev) => !prev)}
                    onBlur={() => setTimeout(() => setCategoryDropdownOpen(false), 200)}
                  >
                    {selectedCategory ? selectedCategory.CategoryName : "Select a category"}
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {categoryDropdownOpen && (
                    <div className="absolute top-full left-0 w-full border border-br-gray-light rounded-lg bg-white z-10 mt-1 max-h-48 overflow-y-auto">
                      {categories.length > 0 ? (
                        categories.map((category) => (
                          <div
                            key={category.id}
                            className="p-3 hover:bg-br-blue-light cursor-pointer"
                            onClick={() => {
                              setSelectedCategory(category);
                              setCategoryDropdownOpen(false);
                            }}
                          >
                            {category.CategoryName}
                          </div>
                        ))
                      ) : (
                        <div className="p-3 text-gray-500">No categories available</div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end mt-4 space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-br-blue-medium text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition"
                >
                  Add Book
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddBookModal;
