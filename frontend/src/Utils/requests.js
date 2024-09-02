import { server } from './hosts';
import axios from 'axios';


const GET = 'GET';
const PUT = 'PUT';
const POST = 'POST';
const DELETE = 'DELETE';

// all request functions should utilize makeRequest and return an obj with structure {data, err}
const makeRequest = async ({ method, path, data, auth = true, error }) => {
    let res = null;
    let err = null;
    const config = true;
  
    try {
      switch (method) {
        case GET:
          res = (await axios.get(path, config)).data;
          break;
        case POST:
          res = (await axios.post(path, data, config)).data;
          break;
        case PUT:
          res = (await axios.put(path, data, config)).data;
          break;
        case DELETE:
          res = (await axios.delete(path, config)).data;
          break;
        default:
          throw Error('Invalid method.');
      }
    } catch (e) {
      console.error(e);
      err = error ? error : 'An error occurred.';
    }
  
    return { data: res, err: err };
  };

  export const getGames = async () =>  
    makeRequest(
        {method: GET,
        path: `${server}/games`,
        auth:true,
        error: 'Games could not be retrieved'
    });

    export const getSeasons = async () =>  
        makeRequest(
            {method: GET,
            path: `${server}/seasons`,
            auth:true,
            error: 'Games could not be retrieved'
        });

  export const getPulls = async () =>
    makeRequest({
      method: GET,
      path: `${server}/pulls`,
      auth: true,
      error: 'Sessions could not be retrieved.',
    });

    export const checkPullCode = async (id, code) =>
        makeRequest({
          method: POST,
          path: `${server}/pulls/verify`,
          auth: true,
          data:{
            id: id,
            givenCode: code
          },
          error: 'Sessions could not be retrieved.',
        });

    export const addStudent = async (studentname, classyr, availability, pull) =>
      makeRequest({
        method: POST,
        path: `${server}/students`,
        auth: true,
        data: {
          Name: studentname,
          Class: classyr,
          Availability: availability,
          pull: pull,
        },
        error: 'Could not add student to pull group'
      });

      export const addGroup = async (pullname, code, game) =>
        makeRequest({
          method: POST,
          path: `${server}/pulls`,
          auth: true,
          data: {
            Group: pullname,
            Code: code,
            game: game,
          },
          error: 'Could not add student to pull group'
        });

        export const skipToGroup = async (pullcode) =>
          makeRequest({
            method: POST,
            path: `${server}/pulls/skip`,
            auth: true,
            data: {
              Code: pullcode
            },
            error: 'Could not find your pull group'
          });
          export const getThisDay = async (id) =>
            makeRequest({
              method: GET,
              path: `${server}/pulls/${id}`,
              auth: true,
              error: 'Could not find your pull group'
            });