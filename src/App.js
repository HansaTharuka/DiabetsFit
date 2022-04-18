// import logo from "./logo.svg";
import { useEffect, useState } from "react";
import { Button, Container, Form, Nav, Navbar, Table ,ListGroup} from "react-bootstrap";
import "./App.css";

//images
import homeImage from "./images/home.jpg";

//plan 1
import p1s1 from "./images/Plan 1 - over weight diabetes possitive/step 1- scott with a wall.webp";
import p1s2 from "./images/Plan 1 - over weight diabetes possitive/step 2 - punches.webp";
import p1s3 from "./images/Plan 1 - over weight diabetes possitive/step 3 - leg raises.jpg";
import p1s4 from "./images/Plan 1 - over weight diabetes possitive/step 4 - hip raises.PNG";
import p1s5 from "./images/Plan 1 - over weight diabetes possitive/step 5 - push up.PNG";
import p1s6 from "./images/Plan 1 - over weight diabetes possitive/step 6 - crunches.webp";
import p1s7 from "./images/Plan 1 - over weight diabetes possitive/step 7 - dog leg raises.webp";
import p1s8 from "./images/Plan 1 - over weight diabetes possitive/step 8 - pilates swimming.PNG";

//plan 2
import p2s1 from "./images/Plan 2 - over weight diabetes negative/step 1 - jumping jack.webp";
import p2s2 from "./images/Plan 2 - over weight diabetes negative/step 2 - push up.PNG";
import p2s3 from "./images/Plan 2 - over weight diabetes negative/step 3 - sit up.webp";
import p2s4 from "./images/Plan 2 - over weight diabetes negative/step 4 - scott.PNG";
import p2s5 from "./images/Plan 2 - over weight diabetes negative/step 5 - arm rotation.PNG";
import p2s6 from "./images/Plan 2 - over weight diabetes negative/step 6 - back extension.PNG";
import p2s7 from "./images/Plan 2 - over weight diabetes negative/step 7 - leg raises.PNG";
import p2s8 from "./images/Plan 2 - over weight diabetes negative/step 8 - back kick.PNG";
import p2s9 from "./images/Plan 2 - over weight diabetes negative/step 9 - toe touch.PNG";
import p2s10 from "./images/Plan 2 - over weight diabetes negative/step 10 - leg extension.webp";
import p2s11 from "./images/Plan 2 - over weight diabetes negative/step 11 - calf raise.PNG";
import p2s12 from "./images/Plan 2 - over weight diabetes negative/step 12 - plank.PNG";

//plan 3
import p3s1 from "./images/Plan 3 - under weight diabetes possitive/step 1 - scott.PNG";
import p3s2 from "./images/Plan 3 - under weight diabetes possitive/step 2 - push up.PNG";
import p3s3 from "./images/Plan 3 - under weight diabetes possitive/step 3 - bicycle crunch.PNG";
import p3s4 from "./images/Plan 3 - under weight diabetes possitive/step 4 - donkey kick.PNG";
import p3s5 from "./images/Plan 3 - under weight diabetes possitive/step 5 - plank.PNG";
import p3s6 from "./images/Plan 3 - under weight diabetes possitive/step 6 - hip raise.PNG";

//plan 4
import p4s1 from "./images/Plan 4 - under weight diabetes negative/step 1 - step up.PNG";
import p4s2 from "./images/Plan 4 - under weight diabetes negative/step 2 - push up.PNG";
import p4s3 from "./images/Plan 4 - under weight diabetes negative/step 3 - crunches.webp";
import p4s4 from "./images/Plan 4 - under weight diabetes negative/step 4 - lunges.webp";
import p4s5 from "./images/Plan 4 - under weight diabetes negative/step 5 - one leg raise.webp";
import p4s6 from "./images/Plan 4 - under weight diabetes negative/step 6 - leg raise.PNG";

const divStyle = {
  color: 'white'
};

function App() {
  const [page, setPage] = useState("home");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [pregnancies, setpregnancies] = useState("");
  const [glucose, setGlucose] = useState("");
  const [bloodpressure, setBloodpressure] = useState("");
  const [skinthickness, setSkinthickness] = useState("");
  const [insulin, setInsulin] = useState("");
  const [dpf, setDpf] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState();

  useEffect(() => {
    document.getElementById("form").reset();
  }, [page]);

  useEffect(() => {
    if (result) {
      setPage("result");
    }
  }, [result]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (page === "login") {
      if (username === "admin@gmail.com" && password === "admin") {
        setPage("form");
      } else {
        alert(`Check Your credentials!`);
      }
    } else if (page === "form") {
      if (
        pregnancies &&
        glucose &&
        bloodpressure &&
        skinthickness &&
        insulin &&
        dpf &&
        age &&
        weight &&
        height
      ) {
        checkBMI();
        // var json = {
        //   bmi: 39,
        //   plan: 4,
        //   prediction: 0,
        // };
        // setResult(json);
      } else {
        alert(`Form incomplete!`);
      }
    }
  };

  const checkBMI = async () => {
    try {
      setLoading(true);

      const url = `https://diabetespredictorchamodi.herokuapp.com/summary`;

      var config;

      const data = new FormData();
      data.append("pregnancies", pregnancies);
      data.append("glucose", glucose);
      data.append("bloodpressure", bloodpressure);
      data.append("skinthickness", skinthickness);
      data.append("insulin", insulin);
      data.append("dpf", dpf);
      data.append("age", age);
      data.append("weight", weight);
      data.append("height", height);

      config = {
        method: "POST",
        headers: {
          // Accept: "application/json",
          // "Content-Type": "multipart/form-data",
        },
        body: data,
      };
      fetch(url, config)
        // .then((response) => console.log(response));
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          setLoading(false);
          setResult(json);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand onClick={() => setPage("home")} className="home">
            diabetsFit
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Nav className="navi">
            <Nav.Item onClick={() => setPage("login")}>
              <Nav.Link>Login</Nav.Link>
            </Nav.Item>
            <Nav.Item onClick={() => setPage("register")}>
              <Nav.Link>Register</Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
      <header className="App-header">
        <Form id="form" onSubmit={handleSubmit} className="form">
          {page === "home" ? (
            <>
              <img src={homeImage} className="homeimage" alt="home" />
            </>
          ) : page === "login" ? (
            <>
              <h2>Login</h2>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter email"
                />
                <Form.Text className="text-muted">
                  We'll never share your username with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
              <Nav onClick={() => setPage("register")}>
                <Nav.Item>
                  <Nav.Link>Register</Nav.Link>
                </Nav.Item>
              </Nav>
            </>
          ) : page === "register" ? (
            <>
              <h2>Register</h2>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter email"
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                />
                <Form.Text className="text-muted">
                  We'll never share your username with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
              <Nav onClick={() => setPage("login")}>
                <Nav.Item>
                  <Nav.Link>Login</Nav.Link>
                </Nav.Item>
              </Nav>
            </>
          ) : page === "form" ? (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Pregnancies</Form.Label>
                <Form.Control
                  type="number"
                  name="pregnancies"
                  value={pregnancies}
                  onChange={(e) => setpregnancies(e.target.value)}
                  placeholder="1"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Glucose</Form.Label>
                <Form.Control
                  type="number"
                  name="glucose"
                  value={glucose}
                  onChange={(e) => setGlucose(e.target.value)}
                  placeholder="148"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Blood pressure</Form.Label>
                <Form.Control
                  type="number"
                  name="bloodpressure"
                  value={bloodpressure}
                  onChange={(e) => setBloodpressure(e.target.value)}
                  placeholder="72"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Skin thickness</Form.Label>
                <Form.Control
                  type="number"
                  name="skinthickness"
                  value={skinthickness}
                  onChange={(e) => setSkinthickness(e.target.value)}
                  placeholder="35"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Insulin</Form.Label>
                <Form.Control
                  type="number"
                  name="insulin"
                  value={insulin}
                  onChange={(e) => setInsulin(e.target.value)}
                  placeholder="0"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>DPF</Form.Label>
                <Form.Control
                  type="text"
                  name="dpf"
                  value={dpf}
                  onChange={(e) => setDpf(e.target.value)}
                  placeholder="0.627"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  name="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="50"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Weight</Form.Label>
                <Form.Control
                  type="number"
                  name="weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="92"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Height</Form.Label>
                <Form.Control
                  type="number"
                  name="height"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="92"
                />
              </Form.Group>
              <br></br>
              {loading ? (
                <label className="label3">Loading...</label>
              ) : (
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              )}
            </>
          ) : page === "result" ? (
            <><br /><br />
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th><p style={divStyle}>Your BMI : </p></th>
                    <th><p style={divStyle}>Diabatic : </p></th>
                    <th><p style={divStyle}>Plan : </p></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><p style={divStyle}>{result.bmi}</p></td>
                    <td><p style={divStyle}>{result.prediction === 0 ? "Negative" : "Positive"}</p></td>
                    <td><p style={divStyle}>{result.plan}</p></td>
                  </tr>
                </tbody>
              </Table>
              <h4 className="navigation-link" onClick={() => setPage("form")}>
                Back
              </h4>
              <br></br>
              <br></br>
              {result.plan === 1 ? (
                <>
                <ListGroup>
                    <ListGroup.Item>Do each exercise for 30 seconds</ListGroup.Item>
                    <ListGroup.Item>Then rest for 30 seconds</ListGroup.Item>
                    <ListGroup.Item>After finishing all the 8 exercises take a 5 minutes rest</ListGroup.Item>
                    <ListGroup.Item>Repeat three sets from each exercise</ListGroup.Item>
                  </ListGroup>
                  <br/>
                  <img src={p1s1} className="image" alt="image1" />
                  <img src={p1s2} className="image" alt="image1" />
                  <img src={p1s3} className="image" alt="image1" />
                  <img src={p1s4} className="image" alt="image1" />
                  <img src={p1s5} className="image" alt="image1" />
                  <img src={p1s6} className="image" alt="image1" />
                  <img src={p1s7} className="image" alt="image1" />
                  <img src={p1s8} className="image" alt="image1" />
                </>
              ) : result.plan === 2 ? (
                <>
                <ListGroup>
                    <ListGroup.Item>Do each exercise for 30 seconds</ListGroup.Item>
                    <ListGroup.Item>Then rest for 30 seconds</ListGroup.Item>
                    <ListGroup.Item>After finishing all the 12 exercises take a 3 minutes rest</ListGroup.Item>
                    <ListGroup.Item>Repeat three sets from each exercise</ListGroup.Item>
                  </ListGroup>
                  <br></br>
                  <img src={p2s1} className="image" alt="image1" />
                  <img src={p2s2} className="image" alt="image1" />
                  <img src={p2s3} className="image" alt="image1" />
                  <img src={p2s4} className="image" alt="image1" />
                  <img src={p2s5} className="image" alt="image1" />
                  <img src={p2s6} className="image" alt="image1" />
                  <img src={p2s7} className="image" alt="image1" />
                  <img src={p2s8} className="image" alt="image1" />
                  <img src={p2s9} className="image" alt="image1" />
                  <img src={p2s10} className="image" alt="image1" />
                  <img src={p2s11} className="image" alt="image1" />
                  <img src={p2s12} className="image" alt="image1" />
                </>
              ) : result.plan === 3 ? (
                <>
                <ListGroup>
                    <ListGroup.Item>Do each exercise for 20 seconds</ListGroup.Item>
                    <ListGroup.Item>Then rest for 40 seconds</ListGroup.Item>
                    <ListGroup.Item>After finishing all the 6 exercises take a 8 minutes rest</ListGroup.Item>
                    <ListGroup.Item>Repeat three sets from each exercise</ListGroup.Item>
                  </ListGroup>
                  <br></br>
                  <img src={p3s1} className="image" alt="image1" />
                  <img src={p3s2} className="image" alt="image1" />
                  <img src={p3s3} className="image" alt="image1" />
                  <img src={p3s4} className="image" alt="image1" />
                  <img src={p3s5} className="image" alt="image1" />
                  <img src={p3s6} className="image" alt="image1" />
                </>
              ) : result.plan === 4 ? (
                <>
                <ListGroup>
                    <ListGroup.Item>Do each exercise for 20 seconds</ListGroup.Item>
                    <ListGroup.Item>Then rest for 40 seconds</ListGroup.Item>
                    <ListGroup.Item>After finishing all the 6 exercises take a 3 minutes rest</ListGroup.Item>
                    <ListGroup.Item>PRepeat three sets from each exercise</ListGroup.Item>
                  </ListGroup>
                  <br></br>
                  <img src={p4s1} className="image" alt="image1" />
                  <img src={p4s2} className="image" alt="image1" />
                  <img src={p4s3} className="image" alt="image1" />
                  <img src={p4s4} className="image" alt="image1" />
                  <img src={p4s5} className="image" alt="image1" />
                  <img src={p4s6} className="image" alt="image1" />
                </>
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}
        </Form>
        {/* )} */}
      </header>
    </div>
  );
}

export default App;
