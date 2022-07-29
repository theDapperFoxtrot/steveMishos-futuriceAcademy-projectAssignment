import "./App.css";
import { useState, useEffect } from "react";

// Rendering a header component
function GithubUser({ name, avatar }) {
  return (
    <div>
      <h1>
        <a href="https://github.com/theDapperFoxtrot">
          {name}'s GitHub at-a-glance
        </a>
      </h1>
      <h2>(Excluding Forks - Alpha Order)</h2>
      <a href="https://github.com/theDapperFoxtrot">
        <img height="200px" src={avatar} alt="" />
      </a>
    </div>
  );
}

// Rendering a repo display of all my personal public repos (excluding forks)
function GithubUserRepos({ repos }) {
  return <div>{repos}</div>;
}

// The main app component
function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.github.com/users/theDapperFoxtrot/repos`)
      .then((response) => response.json())
      .then(setData)
      .then(() => setLoading(false))
      .catch(setError);
  }, []);

  //Loading prompt; Error catching / null data contingencies
  if (loading) return <h2>Loading...</h2>;
  if (error) return <pre>{JSON.stringify(error)}</pre>;
  if (!data) return <h2>Something went wrong! Terribly sorry.</h2>;

  return (
    <>
      <GithubUser
        name={data[0].owner.login}
        avatar={data[0].owner.avatar_url}
      />

      {/* Mapping over my repos to dynamically display them */}
      <GithubUserRepos
        repos={data.map((each, index) =>
          //If the repo is not a fork, render. Otherwise, do not display.
          !each.fork ? (
            <>
              <h3 key={index}>Name: {each.name}</h3>
              <h4 key={index}>
                Description: {each.description ? each.description : "N/A"}
              </h4>
              <h5>Updated at: {each.updated_at}</h5>
              <a href={each.html_url}>
                <h4 key={index}>{each.html_url}</h4>
              </a>
            </>
          ) : null,
        )}
      />
    </>
  );
}

export default App;
