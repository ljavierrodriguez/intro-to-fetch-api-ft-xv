import './App.css';
import { useEffect, useState } from 'react';
import { links } from './constants';
import { useGetData } from './hooks/data';

function App() {

  const { data } = useGetData('https://pokeapi.co/api/v2/pokemon');
  /* 
    1xx
    2xx
    3xx
    4xx
    5xx
  */
  const [users, setUsers] = useState([]);
  const [characters, setCharacters] = useState(null);
  const [locations, setLocations] = useState({});
  const [episodes, setEpisodes] = useState({});


  useEffect(() => {
    //const { characters, locations, episodes } = getAllData(links);
    getAllData(links).then(({ characters, locations, episodes }) => {
      setCharacters(characters);
      setLocations(locations);
      setEpisodes(episodes);
    });

    getData(); // Sync
  }, [])

  // peticion       response        data          error
  // fetch(params).then(function).then(function).catch(function)
  const getData = () => {
    console.log('Buscando Info');
    fetch('https://jsonplaceholder.typicode.com/users', { // fetch siempre se ejecuta por el metodo GET
      method: 'GET', // GET, POST, PUT, DELETE
      //body: '', // POST, PUT
      headers: {
        'Content-Type': 'application/json'
      }
    }) //optional
      .then((response) => { // Respuesta del Servidor
        //console.log(response)
        if (response.status === 404) throw new Error('Ha ocurrido un error');
        return response.json()
      })
      .then((data) => {
        console.log(data);
        setUsers(data);
      })
      .catch((error) => {
        console.error(error.message);
      })

    console.log('Terminando Info');
  }

  const getDataAsync = async () => {
    try {
      console.log('Buscando Info');
      const response = await fetch('https://jsonplaceholder.typicode.com/users', { // fetch siempre se ejecuta por el metodo GET
        method: 'GET', // GET, POST, PUT, DELETE
        //body: '', // POST, PUT
        headers: {
          'Content-Type': 'application/json'
        }
      }) //optional
      if (response.status === 404) throw new Error('Ha ocurrido un error');
      const data = await response.json();
      console.log(data);
      setUsers(data);
      console.log('Terminando Info');

    } catch (error) {
      console.error(error.message);
    }
  }

  const getAllData = async (links) => {
    if (!links) return Promise.reject({ error: 'Missing required param: links' });
    try {
      const responses = await Promise.all([
        fetch(links.characters),
        fetch(links.locations),
        fetch(links.episodes)
      ])

      const data = await Promise.all(
        responses.map((response) => response.json())
      );

      const [characters, locations, episodes] = data;

      return {
        characters,
        locations,
        episodes
      }

    } catch (error) {
      console.log(error)
      return Promise.resolve(null)
    }
  }

  return (
    <div className="container">
      {/* <button onClick={getData}>Get Data</button> */}
      <div className="row">
        <div className="col-md-12">
          {/* {!!data && data.id} {!!data && data.name} */}
          {
            !!data &&
            data.results.map((pok, index) => <span key={index} style={{ color: (index % 2 === 0 ? "black": "red")}}>{pok.name+", "}</span>)
          }
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <ul className='list-group'>
            {
              !!characters &&
              characters.results?.length > 0 &&
              characters.results.map(({ id, name }) => {
                return (
                  <li key={id} className='list-group-item'>
                    {`${name}`}
                  </li>
                )
              })
            }
          </ul>
        </div>
        <div className="col-md-4">
          <ul className='list-group'>
            {
              locations.results?.length > 0 &&
              locations.results.map(({ id, name }) => {
                return (
                  <li key={id} className='list-group-item'>
                    {`${name}`}
                  </li>
                )
              })
            }
          </ul>
        </div>
        <div className="col-md-4">
          <ul className='list-group'>
            {
              episodes.results?.length > 0 &&
              episodes.results.map(({ id, name }) => {
                return (
                  <li key={id} className='list-group-item'>
                    {`${name}`}
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <ul className='list-group'>
            {
              users.length > 0 &&
              users.map(({ id, name, email }) => {
                return (
                  <li key={id} className='list-group-item'>
                    {`${name} ${email}`}
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
