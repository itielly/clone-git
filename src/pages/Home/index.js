import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './styled.css';
import axios from 'axios';
import logo from '../../assets/github-logo.png';

function Home() {
  
  const { repository } = useParams();
  const [reposPage, setReposPage] = useState(1)
  const [repos, setRepos] = useState([]);
  const [ owner, setOwner] = useState({});
  const [ repoFixed, setRepoFixed] = useState([]);
  const [username] = useState(repository || 'camunda');
  
  useEffect(() => {
      async function loadRepos() {
        const response = await axios.get(`https://api.github.com/users/${username}/repos`, {
          params: {
                      page: reposPage,
                      per_page: 5
                    }
        }, []);
        setRepos( response.data)
        
      }
      loadRepos()
     }, [reposPage, username])

     useEffect(() => {
      async function loadReposFixeds() {
        const response = await axios.get(`https://api.github.com/users/${username}/repos`, {
          params: {
                      page: setRepoFixed,
                      per_page: 3
                    }
        }, []);
        setRepoFixed( response.data)
        
      }
      loadReposFixeds()
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
            <tr> <td><img src={owner.avatar_url || ''} alt="perfil"/> </td></tr>
             
             <h1>{ owner.name }</h1>
             <tr> <td> <section className="more-info">
             <a  href={Home}>{owner.location}</a>
             <a  href={Home}>{owner.blog}</a>
             <a  href={Home}>{owner.email}</a>
             
             </section>
             </td></tr>
            </section>
         
           <section className="button-bottom">
           <a  href={Home}>Repositories</a>
           <a  href={Home}>Packages</a>
           <a  href={Home}> People</a>
           <a  href={Home}>Projects</a>
           </section>
           </section>
      </div>

      <section className="repositorios">
           
        <h3>Last repositories</h3>
        <section className="cards">
             {repoFixed.map(repo =>
              
               <ul>
                 <li>
                 
                   <section className="card">
                    <a href={Home}>{repo.name}</a>
                    <p>{repo.description}</p> 
                    <span id="language">{repo.language}</span>
                   </section>
                   
                 </li>
               </ul>
               
             )} 
             </section>
      </section>

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

      <div className="rodape">
        <section className="sec-rodape">
            
             
             <button className="btn-rodape" type="button" disabled={reposPage === 1} onClick={() => {
              setReposPage(reposPage-1)
             }}> Previous </button>

             <p>{reposPage}</p>
     
             <button className="btn-rodape" type="button" onClick={() => {
              setReposPage(reposPage+1)
             }}> Next </button>

        </section>
      </div>

      <div className="div-footer">

      <section className="footer">
          <a href={Home}> Terms</a>
          <a href={Home}> Privacy </a>
          <a href={Home}> Secutiry</a>
          <a href={Home}> Status</a>
          <a href={Home}> Help</a>

          <img src={logo} alt="logo"></img>

          <a href={Home}> Contact GitHub</a>
          <a href={Home}> Pricing </a>
          <a href={Home}> API</a>
          <a href={Home}> Training</a>
          <a href={Home}> Blog</a>
        </section>

      </div>

    </div>
  );
}

export default Home;
