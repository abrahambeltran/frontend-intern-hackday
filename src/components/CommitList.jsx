import React from "react";
import PropTypes from "prop-types";

function CommitList({ repository }) {
  return (
    <div>
      <h2>Commits for {repository.name}</h2>
      <ul>
        {repository.commits.map((commit) => (
          <li key={commit.sha}>
            <h4>{commit.commit.message}</h4>
            {commit.committer && (
              <div>
                <p>Committer: {commit.committer.login}</p>
                <p>Commit Hash: {commit.sha}</p>
                <p>Date Created: {commit.commit.committer.date}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
CommitList.propTypes = {
  repository: PropTypes.string.isRequired,
};
export default CommitList;
