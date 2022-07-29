import "./App.css";
import { useState, useEffect } from "react";

function GithubUser({ name, avatar }) {
  return (
    <div>
      <h1>
        <a href="https://github.com/theDapperFoxtrot">
          {name}'s GitHub at-a-glance
        </a>
      </h1>
      <a href="https://github.com/theDapperFoxtrot">
        <img height="200px" src={avatar} alt="" />
      </a>
    </div>
  );
}

function GithubUserRepos({ repos }) {
  return <div>{repos}</div>;
}

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

  if (loading) return <h1>Loading...</h1>;
  if (error) return <pre>{JSON.stringify(error)}</pre>;
  if (!data) return null;

  return (
    <>
      <GithubUser
        name={data[0].owner.login}
        avatar={data[0].owner.avatar_url}
      />
      <GithubUserRepos
        repos={data.map((each, index) => (
          <>
            <h3 key={index}>
              #{index + 1} Project: {each.name}
            </h3>
            <h4 key={index}>
              Description: {each.description ? each.description : "N/A"}
            </h4>
            <a href={each.html_url}>
              <h4 key={index}>Repo Link: {each.html_url}</h4>
            </a>
          </>
        ))}
      />
    </>
  );
}

export default App;
