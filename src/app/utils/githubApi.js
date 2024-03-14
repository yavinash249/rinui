import axios  from "axios";

const APIURL = 'https://api.github.com/users/';

export const getUser =  async (username) => {
    try {
         const { data} = await axios(`${APIURL}${username}`);
         return data;   
    } catch (err) {
        if(err.response.status === 404){
            throw new Error('No Profile with this username')
        }else{
            throw new Error('Problem fetching user');
        }
    }
} ;

export const getRepos = async(username)=> {
    try {
        const {data} = await axios(`${APIURL} ${username}/repos?sort=created`);
        return data.slice(0,5)
    } catch (err) {
        throw new Error('Problem fetching the repos')
    }
};