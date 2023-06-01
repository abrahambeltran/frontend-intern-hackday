import React, { useState } from "react";
import PropTypes from "prop-types";

const Navbar = ({ onSearch }) => {
    const [orgName, setOrgName] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(orgName);
    };

    return (
        <nav className=" bg-slate-400 py-4">
            <div className="container mx-auto flex items-center justify-between">
                <h1 className="text-xl font-bold">GitHub Org Search</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter organization name"
                        className="px-4 py-2 rounded mx-4"
                        value={orgName}
                        onChange={(e) => setOrgName(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Search
                    </button>
                </form>
            </div>
        </nav>
    );
};

Navbar.propTypes = {
    onSearch: PropTypes.func.isRequired,
};

export default Navbar;
