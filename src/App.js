import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Col, Container, Row,Spinner } from 'react-bootstrap';

function App() {

  let [data, setdata] = useState([]);
  const [loading,setLoading] = useState(true);
  let [search,setsearch] = useState([]);

  useEffect(() => {

    axios.get('https://rickandmortyapi.com/api/character')
      .then(function (response) {
        console.log(response.data.results);
        setdata(response.data.results);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      })

  },[]);

  const searchhendler = () =>{

    let val = data.filter((ele,ind) =>{
      return ele.name === search
    })

    setdata(val);
    // console.log(val);

  }

  return (
    <>
        
      <Container>
        <Row>
          <Col>
            <h1 className='text-center heading'>The Rick and Morty API</h1>
          </Col>
        </Row>
      </Container>

      <input type="text" onChange={(e) => setsearch(e.target.value)}/>
      <input type="button" value="click here" onClick={searchhendler} />

      <div className="main">
        <Container>
          <Row>
            {
          loading ? <Spinner animation="border" variant="danger" /> : 
          data.map((ele, ind) => {
                return (
                  <Col key={ind} xl={6}>
                    <div className="box d-flex">
                      <div className="image">
                        <img src={ele.image} />
                      </div>
                      <div className="info">
                        <div className="name">
                          <h4 className='fw-bold'>{ele.name}</h4>
                          <span className='status d-flex align-items-center'>
                            <span className='status_icon' style={{
                              backgroundColor: ele.status == "Alive" ? "green" :
                                ele.status == "Dead" ? "red" : ele.status == "unknown"
                            }}></span>
                            <p className='m-0'> {ele.status} - {ele.species}</p>
                          </span>
                        </div>
                        <div className="info-2">
                          <p>Last known location:</p>
                          <span>{ele.location.name}</span>
                        </div>
                        <div className="info-3">
                          <p className='fw-bold p-0 m-0'>First seen in:</p>
                          <span>{ele.origin.name}</span>
                        </div>
                      </div>
                    </div>
                  </Col>
                )
              })
            }
          </Row>
        </Container>
      </div>
      
    </>
  );
}

export default App;
