import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Row from "react-bootstrap/Row"
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const url = "/api/v1/sessions";
    const { email, password } = this.state;

    if (email.length === 0 || password.length === 0) return;

    const form = new FormData();
    form.append("email", email);
    form.append("password", password);

    // const token = document.querySelector('meta[name="csrf-token"]').content;
    // axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
    axios.post(url, form)
    .then(response => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;  
      localStorage.setItem('jwt', response.data.jwt);
      localStorage.setItem('user_id', response.data.user_id);       
      this.props.history.push('/recipes')
    })  
    .catch(err => console.log(err.messages));
  }

  render() {
    return (
      <Container className="mt-5">
        <Row>
          <Col sm={12} lg={{ span: 6, offset: 3 }}>
            <h1 className="font-weight-normal mb-5">
              Log in to view recipies.
            </h1>
            <Form onSubmit={this.onSubmit}>
              <Form.Group controlId="emailInput">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                  type="text" 
                  name="email" 
                  required 
                  placeholder="example@example.com" 
                  onChange={this.onChange}
                />
              </Form.Group>

              <Form.Group controlId="passwordInput">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type="password" 
                  name="password" 
                  required 
                  placeholder="********" 
                  onChange={this.onChange}
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="btn custom-button mt-3">
                Log In
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Login;