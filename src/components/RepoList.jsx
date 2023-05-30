import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import CommitList from "./CommitList";

function RepoList({ repositories }) {
  const [selectedRepository, setSelectedRepository] = useState(null);

  const handleRepositoryClick = async (repository) => {
    try {
      const response = await fetch(
        repository.commits_url.replace("{/sha}", "")
      );
      const data = await response.json();
      setSelectedRepository({ ...repository, commits: data });
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div>
      <ul>
        {repositories.map((repository) => (
          <a
            key={repository.id}
            onClick={() => handleRepositoryClick(repository)}
          >
            <h3>{repository.name}</h3>
            <p>Language: {repository.language}</p>
            <p>Description: {repository.description}</p>
            <p>Stars: {repository.stargazers_count}</p>
            <p>Forks: {repository.forks_count}</p>
            <p>Date Created: {repository.created_at}</p>
          </a>
        ))}
      </ul>
      {selectedRepository && <CommitList repository={selectedRepository} />}
    </div>
  );
}

RepoList.propTypes = {
  repositories: PropTypes.string.isRequired,
};

export default RepoList;
