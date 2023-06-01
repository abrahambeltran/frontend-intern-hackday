import React, { useState } from "react";
import Navbar from "./components/Navbar";
import RepoList from "./components/RepoList";
import CommitList from "./components/CommitList";

const App = () => {
    const [orgName, setOrgName] = useState("");
    const [selectedRepo, setSelectedRepo] = useState("");

    const handleSearch = (orgName) => {
        setOrgName(orgName);
        setSelectedRepo("");
    };

    const handleRepoClick = (repoName) => {
        setSelectedRepo(repoName);
    };

    return (
        <div>
            <Navbar onSearch={handleSearch} />
            {!selectedRepo && (
                <RepoList orgName={orgName} onRepoClick={handleRepoClick} />
            )}
            {selectedRepo && (
                <CommitList orgName={orgName} repoName={selectedRepo} />
            )}
        </div>
    );
};

export default App;
