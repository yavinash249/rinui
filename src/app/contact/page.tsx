/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import { Meteors } from '@/components/ui/meteors'


const APIURL = 'https://api.github.com/users/';

interface User {
  name: string;
  login: string;
  bio: string | null;
  avatar_url: string;
  followers: number;
  following: number;
  public_repos: number;
}

interface Repo {
  name: string;
  html_url: string;
}

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getUser = async (username: string) => {
    try {
      const { data } = await axios.get<User>(`${APIURL}${username}`);
      setUser(data);
      getRepos(username);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response && err.response.status === 404) {
        setError('No profile with this username');
      } else {
        setError('An error occurred while fetching the user');
      }
    }
  };

  const getRepos = async (username: string) => {
    try {
      const { data } = await axios.get<Repo[]>(`${APIURL}${username}/repos?sort=created`);
      setRepos(data);
    } catch (err) {
      setError('Problem fetching repos');
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = e.currentTarget.search.value;
    if (username) {
      getUser(username);
      e.currentTarget.reset();
    }
  };

  return (
    <div className="">
    <div className="h-[40rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased ">
            
   <div className='max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black'>
      <form onSubmit={handleSubmit} className='w-full max-w-[700px]'>
        <input 
        className='rounded-lg border border-neutral-800 focus:ring-2 text-white focus:ring-teal-500  w-full relative z-10 mt-4  bg-neutral-500 placeholder:text-neutral-400'  
        type="text"
        name="search"
        placeholder="Search GitHub username"
          
          />
        <button type="submit">Search</button>
      </form>
      {error && <div>{error}</div>}
      {user && (
        <div className="card">
          <div>
            <img
             src={user.avatar_url}
              alt={user.name} 
              className="rounded-full border-8 border-[#2a2a72] h-[150px] w-[150px] mb-4 md:mb-0" />
          </div>
          <div className="ml-0 md:ml-8 text-gray-300">
            <h2 className='text-white mb-2'>{user.name || user.login}</h2>
            {user.bio && <p>{user.bio}</p>}
            <ul className='list-none flex flex-wrap justify-between max-w-[400px]'>
              <li className='flex items-center mb-2 mr-4'>{user.followers} <strong>Followers</strong></li>
              <li className='flex items-center mb-2 mr-4' >{user.following} <strong>Following</strong></li>
              <li className='flex items-center mb-4' >{user.public_repos} <strong>Repos</strong></li>
            </ul>
            <div id="repos">
              {repos.slice(0, 5).map((repo) => (
                <a key={repo.name} href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-white bg-[#212a72] text-sm px-2 py-1 mr-2 mb-2 inline-block">
                  {repo.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
    
    </div>
    <Meteors number={250} />
    </div>

  );
};

export default App;