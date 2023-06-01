import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const RepoList = ({ orgName }) => {
    const [repositories, setRepositories] = useState([]);

    useEffect(() => {
        fetchRepositories();
    }, [orgName]);

    const fetchRepositories = async () => {
        try {
            const response = await axios.get(
                `https://api.github.com/orgs/${orgName}/repos`
            );
            const sortedRepos = response.data.sort(
                (a, b) => b.stargazers_count - a.stargazers_count
            );
            setRepositories(sortedRepos);
        } catch (error) {
            console.log(error);
        }
    };

    const handleRepoClick = (repoName) => {
        onRepoClick(repoName);
    };

    return (
        <div className="container mx-auto py-8">
            <h2 className="text-2xl font-bold mb-4">Repositories</h2>
            <ul className="border rounded p-4">
                {repositories.map((repo) => (
                    <li
                        key={repo.id}
                        className="cursor-pointer mb-4"
                        onClick={() => handleRepoClick(repo.name)}
                    >
                        <h3 className="text-lg font-semibold">{repo.name}</h3>
                        <p>Language: {repo.language}</p>
                        <p>Description: {repo.description}</p>
                        <p>Stars: {repo.stargazers_count}</p>
                        <p>Forks: {repo.forks_count}</p>
                        <p>Date Created: {repo.created_at}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

RepoList.propTypes = {
    orgName: PropTypes.string.isRequired,
};

export default RepoList;
