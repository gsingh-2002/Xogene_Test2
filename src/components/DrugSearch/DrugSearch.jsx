import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./DrugSearch.css";

const DrugSearch = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState("");
  const nav = useNavigate();

  const fetchSuggestions = async (input) => {
    if (!input) {
      setSuggestions([]);
      return;
    }

    setError("");

    const url = `https://rxnav.nlm.nih.gov/REST/spellingsuggestions.json?name=${encodeURIComponent(
      input
    )}`;

    try {
      const sugRes = await axios.get(url);

      const suggestionList =
        sugRes.data.suggestionGroup?.suggestionList?.suggestion || [];
      setSuggestions(suggestionList.length > 0 ? suggestionList : []);
    } catch (suggestionError) {
      console.error("Error fetching suggestions:", suggestionError);
      setError("Error fetching suggestions. Please try again.");
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchSuggestions(query);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  const handleSearch = async () => {
    if (!query) {
      setError("Please enter a search term.");
      return;
    }

    setError("");
    setSuggestions([]);

    try {
      const res = await axios.get(
        `${import.meta.VITE_API_URL}/REST/drugs.json?name=${encodeURIComponent(
          query
        )}`
      );
      nav(`/drugs/${query}`);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("No results found.");
      } else {
        setError("Error fetching data. Please try again.");
      }
    }
  };

  return (
    <div className="drug-search-container">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a drug"
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">
        🔎
      </button>

      {error && <div className="error">{error}</div>}

      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((sugg, index) => (
            <li
              key={index}
              onClick={() => {
                setQuery(sugg);
                setSuggestions([]);
              }}
              className="suggestion-item"
            >
              {sugg}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DrugSearch;
