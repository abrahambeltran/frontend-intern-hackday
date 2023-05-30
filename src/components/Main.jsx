import React from "react";
import { useState } from "react";

const Main = () => {
  const [search, setSearch] = useState("");

  const { Octokit } = require("@octokit/core");

  async function fetchRepositoriesByOrganization(orgName) {
    try {
      const octokit = new Octokit({
        auth: "YOUR-TOKEN",
      });

      const response = await octokit.request("GET /search/repositories", {
        q: `org:${orgName}`,
        sort: "stars",
        order: "desc",
        per_page: 10,
      });

      const repositories = response.data.items;

      repositories.forEach(async (repo, index) => {
        console.log(`Repository ${index + 1}:`);
        console.log(`Name: ${repo.name}`);
        console.log(`Language: ${repo.language}`);
        console.log(`Description: ${repo.description}`);
        console.log(`Stars: ${repo.stargazers_count}`);
        console.log(`Forks: ${repo.forks_count}`);
        console.log(`Date Created: ${repo.created_at}`);

        // Fetch commits for the repository
        const commitsResponse = await octokit.request(
          "GET /repos/{owner}/{repo}/commits",
          {
            owner: repo.owner.login,
            repo: repo.name,
            per_page: 5,
            sort: "committer-date",
            direction: "desc",
          }
        );

        const commits = commitsResponse.data;

        console.log(`Commits for Repository ${index + 1}:`);
        commits.forEach((commit, commitIndex) => {
          console.log(`Commit ${commitIndex + 1}:`);
          console.log(`Message: ${commit.commit.message}`);
          console.log(`User: ${commit.commit.author.name}`);
          console.log(`Hash: ${commit.sha}`);
          console.log(`Date Created: ${commit.commit.author.date}`);
          console.log("------------------------------");
        });

        console.log("------------------------------");
      });
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  // Form submission handler
  const form = document.getElementById("search-form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const orgName = document.getElementById("org-name").value;
    fetchRepositoriesByOrganization(orgName);
  });
  return (
    <div>
      <h1>Search for a GitHub organization</h1>
      <div>
        <div>
          <form>
            <div>
              <label htmlFor="githubOrgSearch" hidden>
                Search for GitHub organization
              </label>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                className="form-control"
                id="org-name"
                aria-describedby="githubOrgSearch"
                placeholder="Search for a GitHub Organization"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Main;
