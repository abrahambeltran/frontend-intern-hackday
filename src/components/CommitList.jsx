import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const CommitList = ({ orgName, repoName }) => {
    const [commits, setCommits] = useState([]);

    useEffect(() => {
        fetchCommits();
    }, [orgName, repoName]);

    const fetchCommits = async () => {
        try {
            const response = await axios.get(
                `https://api.github.com/repos/${orgName}/${repoName}/commits`
            );
            const sortedCommits = response.data.sort(
                (a, b) =>
                    new Date(b.commit.author.date) -
                    new Date(a.commit.author.date)
            );
            setCommits(sortedCommits);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container mx-auto py-8">
            <h2 className="text-2xl font-bold mb-4">Commits for {repoName}</h2>
            <ul className="border rounded p-4">
                {commits.map((commit) => (
                    <li key={commit.sha} className="mb-2">
                        <h4 className="font-semibold">
                            {commit.commit.message}
                        </h4>
                        <p>Committer: {commit.commit.author.name}</p>
                        <p>Commit Hash: {commit.sha}</p>
                        <p>Date Created: {commit.commit.author.date}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

CommitList.propTypes = {
    orgName: PropTypes.string.isRequired,
    repoName: PropTypes.string.isRequired,
};

export default CommitList;
