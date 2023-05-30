import React, { useState } from "react";
import PropTypes from "prop-types";

function NavBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <nav>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter organization name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </nav>
  );
}
NavBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default NavBar;
