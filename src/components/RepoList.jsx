import React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: "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",
});
const RepoList = ({ orgName, onSearch }) => {
  const [repositories, setRepositories] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [commits, setCommits] = useState([]);

  useEffect(() => {
    fetch(`https://api.github.com/orgs/Netflix/repos`)
      .then((response) => response.json())
      .then((data) => {
        const sortedRepos = data.sort(
          (a, b) => b.stargazers_count - a.stargazers_count
        );
        setRepositories(sortedRepos);
      })
      .catch((error) => console.log(error));
  }, [orgName]);

  const handleRepoClick = (repoName) => {
    fetch(`https://api.github.com/repos/${orgName}/${repoName}/commits`)
      .then((response) => response.json())
      .then((data) => {
        const sortedCommits = data.sort(
          (a, b) =>
            new Date(b.commit.author.date) - new Date(a.commit.author.date)
        );
        setCommits(sortedCommits);
        setSelectedRepo(repoName);
      })
      .catch((error) => console.log(error));
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    const newOrgName = event.target.elements.orgName.value;
    onSearch(newOrgName);

    try {
      const { data } = await octokit.repos.listForOrg({
        org: newOrgName,
      });

      const sortedRepos = data.sort(
        (a, b) => b.stargazers_count - a.stargazers_count
      );
      setRepositories(sortedRepos);
      setRepositories(sortedRepos);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex flex-row justify-evenly">
        <h1 className="m-6">GitHub Repositories</h1>
        <form onSubmit={handleSearch} className="m-6 border-2">
          <input
            type="text"
            name="orgName"
            placeholder="Enter organization name"
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="flex flex-row m-6">
        {orgName && (
          <ul className="flex flex-row m-6">
            {repositories.map((repo) => (
              <li key={repo.id} onClick={() => handleRepoClick(repo.name)}>
                <h3>{repo.name}</h3>
                <p>Language: {repo.language}</p>
                <p>Description: {repo.description}</p>
                <p>Stars: {repo.stargazers_count}</p>
                <p>Forks: {repo.forks_count}</p>
                <p>Date Created: {repo.created_at}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex flex-row m-6">
        {selectedRepo && (
          <div className="m-6">
            <h2>Commits for {selectedRepo}</h2>
            <ul className="flex flex-row m-6">
              {commits.map((commit) => (
                <li key={commit.sha}>
                  <h4>{commit.commit.message}</h4>
                  <p>Committer: {commit.commit.author.name}</p>
                  <p>Commit Hash: {commit.sha}</p>
                  <p>Date Created: {commit.commit.author.date}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

RepoList.propTypes = {
  repositories: PropTypes.string.isRequired,
  orgName: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default RepoList;
