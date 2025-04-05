/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState, useEffect, FormEvent, useMemo } from 'react';
import axios from 'axios';
import Meteors from '@/components/ui/meteors';

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

  const randomValue = useMemo(() => Math.random(), []); // Memoize random value

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="max-w-lg w-full p-8 bg-gray-800 bg-opacity-70 rounded-2xl shadow-xl backdrop-blur-md">
        <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
          <input
            className="flex-1 p-4 text-white bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all duration-300 placeholder-gray-400"
            type="text"
            name="search"
            placeholder="Search GitHub username"
          />
          <button
            type="submit"
            className="px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Search
          </button>
        </form>
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        {user && (
          <div className="rounded-xl bg-gray-800/50 border border-gray-700 p-6 transition-all duration-300 hover:shadow-xl">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <img
                  src={user.avatar_url}
                  alt={user.name}
                  className="rounded-lg h-24 w-24 object-cover border border-gray-600"
                />
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <h2 className="text-xl font-semibold text-white">{user.name || user.login}</h2>
                  {user.bio && <p className="text-gray-400 text-sm mt-1">{user.bio}</p>}
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <span className="block font-medium text-blue-400">{user.followers}</span>
                    <span className="text-gray-400">Followers</span>
                  </div>
                  <div className="text-center">
                    <span className="block font-medium text-blue-400">{user.following}</span>
                    <span className="text-gray-400">Following</span>
                  </div>
                  <div className="text-center">
                    <span className="block font-medium text-blue-400">{user.public_repos}</span>
                    <span className="text-gray-400">Repos</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-300">Repositories</h3>
                  <div className="flex flex-wrap gap-2">
                    {repos.slice(0, 5).map((repo) => (
                      <a
                        key={repo.name}
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-gray-700/50 rounded-md text-sm text-white hover:bg-gray-700 transition-colors duration-200"
                      >
                        {repo.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Meteors number={250} />
    </div>
  );
};

export default App;
