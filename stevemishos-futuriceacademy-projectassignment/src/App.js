// I elected to create a portfolio-style web app to showcase my personal repos. This is a very practical addition to my portfolio website that will allow the list to dynamically populate and order themselves based on my activity. I loved the inspiration provided by the assignment! I can't wait to learn more and take ideas like this even farther!

import "./App.css";
import { useState, useEffect } from "react";

// Rendering a header component
function GithubUser({ name, avatar }) {
  return (
    <div>
      <h1>
        <a href="https://github.com/theDapperFoxtrot">
          {name}'s (Steve) GitHub at-a-glance
        </a>
      </h1>
      <a href="https://github.com/theDapperFoxtrot">
        <img height="200px" src={avatar} alt="" />
      </a>
      <h2>(Excluding Forks - By Last Updated)</h2>
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
    fetch(`https://api.github.com/users/theDapperFoxtrot/repos?sort=updated`)
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
              <hr />
              <h3 key={`name.${index}`}>Name: {each.name}</h3>
              <h4 key={`description.${index}`}>
                Description: {each.description ? each.description : "N/A"}
              </h4>
              <h5 key={`updated_at.${index}`}>Updated at: {each.updated_at}</h5>
              <a key={`html_url.${index}`} href={each.html_url}>
                <h4>{each.html_url}</h4>
              </a>
              <a key={`homepage.${index}`} href={each.homepage}>
                {each.homepage ? (
                  each.homepage
                ) : (
                  <p>This demo currently is not live.</p>
                )}
              </a>
            </>
          ) : null,
        )}
      />
    </>
  );
}

export default App;
