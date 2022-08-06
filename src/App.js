// I elected to create a portfolio-style web app to showcase my personal repos. This is a very practical addition to my portfolio website that will allow the list to dynamically populate and order themselves based on my activity. I loved the inspiration provided by the assignment! I can't wait to learn more and take ideas like this even farther!

import "./App.css";
import { useState, useEffect } from "react";

// Rendering a header component
function GithubUser({ name, avatar }) {
  return (
    <div>
      <h2>
        <a
          className="repoLink"
          href="https://github.com/theDapperFoxtrot"
          target="_blank"
          rel="noreferrer"
        >
          {name}'s (Steve) GitHub at-a-glance
        </a>
      </h2>
      <a
        href="https://github.com/theDapperFoxtrot"
        target="_blank"
        rel="noreferrer"
      >
        <img
          height="200px"
          src={avatar}
          alt="the dapper foxtrot sporting a happy smile! click to visit their git hub"
        />
      </a>
      <h2 tabindex="0">(Excluding Forks - By Last Push)</h2>
      <h2 className="a11y">
        For my accessibility friends, these repos will be listed in alphabetical
        order by name.
      </h2>
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

  const convert = (time) => {
    let date = new Date(time);

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    return (
      <>
        <div>{`${year}-${month}-${day}`}</div>
        <div>{`@ ${hour}:${minute}:${second}`}</div>
      </>
    );
  };

  const handleHamburger = () => {
    const hamburger = document.querySelector("#hamburger");
    const menu = document.querySelector("#menu");
    hamburger.classList.toggle("hamburger-active");
    hamburger.classList.toggle("hamburger-background");
    menu.classList.toggle("menu-active");
  };

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.github.com/users/theDapperFoxtrot/repos?sort=pushed`)
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
      <header>
        <a
          className="titleLink"
          href="https://dapperfans.com/"
          target="_blank"
          rel="noreferrer"
        >
          <h1 className="title">DapperFans.com</h1>
        </a>
        <nav id="menu" className="menu">
          <ul>
            <li>
              <a href="https://dapperfans.com/" id="homeNav">
                Home
              </a>
            </li>
            <li>
              <a href="https://dapperfans.com/pages/aboutme" id="aboutNav">
                About Steve
              </a>
            </li>
            <li>
              <a href="https://kaunis-alku.netlify.app/" id="portfolioNav">
                Portfolio
              </a>
            </li>
          </ul>
        </nav>
        <div
          id="hamburger"
          className="hamburger-container"
          onClick={handleHamburger}
        >
          <div className="hamburger-menu"></div>
        </div>
      </header>
      <GithubUser
        name={data[0].owner.login}
        avatar={data[0].owner.avatar_url}
      />

      {/* Mapping over my repos to dynamically display them */}
      <GithubUserRepos
        repos={data.map((each, index) =>
          //If the repo is not a fork, render. Otherwise, do not display.
          !each.fork ? (
            <div className="container">
              <hr />
              <h5 tabindex="0" key={`pushed_at.${index}`}>
                Pushed at: {convert(each.pushed_at)}
              </h5>
              <h3 tabindex="0" key={`name.${index}`}>
                <a
                  tabindex="0"
                  key={`html_url.${index}`}
                  href={each.html_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Name: {each.name}
                </a>
              </h3>
              <h4 tabindex="0" key={`description.${index}`}>
                Description: {each.description ? each.description : "N/A"}
              </h4>
              <a
                tabindex="0"
                key={`html_url.${index}`}
                href={each.html_url}
                target="_blank"
                rel="noreferrer"
              >
                <h4 tabindex="0">Repo Link</h4>
              </a>
              <h4 className="demoText">Demo:</h4>
              <a
                tabindex="0"
                key={`homepage.${index}`}
                href={each.homepage}
                target="_blank"
                rel="noreferrer"
              >
                {each.homepage ? (
                  each.homepage
                ) : (
                  <p>This demo currently is not live.</p>
                )}
              </a>
            </div>
          ) : null,
        )}
      />
      <footer class="mainFooter">
        <h2>Contact Me!</h2>
        <form name="contact" method="POST" data-netlify="true">
          <p>
            <label class="formLabels">
              Your Name: <input type="text" name="name" />
            </label>
          </p>
          <p>
            <label class="formLabels">
              Your Email: <input type="email" name="email" />
            </label>
          </p>
          <p class="formRoleSelect">
            <label class="formLabels">
              Your Role:
              <select name="role[]">
                <option value="client">Client</option>
                <option value="follower">Follower</option>
                <option value="recruiter">Recruiter</option>
              </select>
            </label>
          </p>
          <p class="formMessage">
            <label class="formLabels">
              Message: <textarea name="message"></textarea>
            </label>
          </p>
          <p>
            <button class="formButton" type="submit">
              Send
            </button>
          </p>
        </form>

        <div class="socialsContainer">
          <ul>
            <a
              href="https://twitter.com/FoxtrotDapper"
              target="_blank"
              rel="noreferrer"
            >
              <li class="socialIcon">
                <img
                  class="socialImage"
                  src="./svg/twitter-brands.svg"
                  alt="the dapper foxtrot twitter"
                />
              </li>
            </a>
            <a
              href="https://github.com/theDapperFoxtrot"
              target="_blank"
              rel="noreferrer"
            >
              <li class="socialIcon">
                <img
                  class="socialImage"
                  src="./svg/github-brands.svg"
                  alt="the dapper foxtrot git hub"
                />
              </li>
            </a>
            <a
              href="https://www.youtube.com/channel/UC3CshKcydQEdd2zMfd9UsAg"
              target="_blank"
              rel="noreferrer"
            >
              <li class="socialIcon">
                <img
                  class="socialImage"
                  src="./svg/icons8-youtube-64.svg"
                  alt="the dapper foxtrot on YouTube"
                />
              </li>
            </a>
            <a
              href="https://www.twitch.tv/thedapperfoxtrot"
              target="_blank"
              rel="noreferrer"
            >
              <li class="socialIcon">
                <img
                  class="socialImage"
                  src="./svg/icons8-twitch-50.svg"
                  alt="the dapper foxtrot on Twitch"
                />
              </li>
            </a>
          </ul>
        </div>
        <p>© Copyright 2022 The Dapper Foxtrot. All Rights Reserved.</p>
        <p class="tinyFont">Made with HTML, CSS, and Vanilla JS</p>
      </footer>
    </>
  );
}

export default App;
