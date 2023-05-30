import React, { useState} from 'react';
import RepoList from "./components/RepoList";

function App() {
  const [searchedOrg, setSearchedOrg] = useState('');

  const handleSearch = orgName => {
    setSearchedOrg(orgName);
  };
  return (
    <>
    <RepoList orgName={searchedOrg} onSearch={handleSearch}/>
    </>
  );
}

export default App;
