import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import logo from './assets/github-logo2.png'


function Home() {
  
  const { repository } = useParams();
  const [repos, setRepos] = useState([]);
  const [ owner, setOwner] = useState({});
  const [username] = useState(repository || 'camunda');
  
  useEffect(() => {
      async function loadRepos() {
        const response = await axios.get(`https://api.github.com/users/${username}/repos`, {
          
        } );
        setRepos( response.data)
        
      }
      loadRepos()
     }, [username])

     useEffect(() => {
        async function loadOwner() {
          const response = await axios.get(`https://api.github.com/users/${username}`)
          setOwner(response.data)
          console.log(response.data)
        }
        loadOwner()
       }, [username])



  return (

    <div>
      <div className="menu">
        <img src={logo} alt="logo"/>
        <input type="text" placeholder="Search or jump to..." />
        <button id="btn-input">/</button>
        <section className="menu-ancora">
        <a href={Home}>Pull Request</a>
        <a href={Home}>Issues</a>
        <a href={Home}>Marktplace</a>
        <a  href={Home} >Explore</a>
        </section>
      </div>

      <div className="header">
        <section className="info">
          
            <section className="info-user"> 
             <img src={owner.avatar_url || ''} alt="perfil"/> 
             <h1>{ owner.name }</h1>
             <section className="more-info">
             <a  href={Home}>{owner.location}</a>
             <a  href={Home}>{owner.blog}</a>
             <a  href={Home}>{owner.email}</a> 
             </section>
            </section>
         
           <section className="button-bottom">
           <a  href={Home}>Repositories</a>
           <a  href={Home}>Packages</a>
           <a  href={Home}> People</a>
           <a  href={Home}>Projects</a>
           </section>
           </section>
      </div>

      <div className="corpo">
       <section>
         <section className="search">
         <input type="text" placeholder="Find a repository..." />
         <button> Type: All </button>
         <button> Language: All </button>
         
         </section>
        </section>
      </div>

      <div className="all-repositorios">
         
        <section className="listagem"> 
        {repos.map(repo => (
          <ul>
            <li key={repo.id}>
               <section className="card-repo">
                 <a  href={Home}>{repo.name}</a>
                 <p>{repo.description}</p>
                 <section className="description">
                 <span>Language: {repo.language}</span>
                 <span>Stars: {repo.stargazers_count}</span> 
                 <span>Forks: {repo.forks_count}</span>
                 <span>Watchers: {repo.watchers_count}</span>
                 </section>
               </section>
             </li>
          </ul>

))}
        </section>
      </div>
    </div>
  );
}

export default Home;
