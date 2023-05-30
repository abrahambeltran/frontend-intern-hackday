import React, { useState, useEffect } from 'react';
import RepoList from "./components/RepoList";
import NavBar from "./components/NavBar";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await fetch('https://api.github.com/orgs/Netflix/repos');
        const data = await response.json();
        setRepositories(data);
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchRepositories();
  }, []);
  return (
    <>
    <h1>Netflix Repositories</h1>
    <NavBar/>
    <RepoList repositories={repositories} />
    </>
  );
}

export default App;
