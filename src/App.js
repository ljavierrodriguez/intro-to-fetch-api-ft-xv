import './App.css';
import { useEffect, useState } from 'react';

function App() {
  /* 
    1xx
    2xx
    3xx
    4xx
    5xx
  */
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getData(); // Sync
    getDataAsync(); // Async
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

  return (
    <div className="App">
      {/* <button onClick={getData}>Get Data</button> */}

      <ul>
        {
          users.length > 0 &&
          users.map(({ id, name, email }) => {
            return (
              <li key={id}>
                {`${name} ${email}`}
              </li>
            )
          })
        }
      </ul>
    </div>
  );
}

export default App;
