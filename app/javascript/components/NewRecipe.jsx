import React from "react";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row"
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class NewRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      ingredients: "",
      instruction: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
  }

  stripHtmlEntities(str) {
    return String(str)
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const url = "/api/v1/recipes/create";
    const { name, ingredients, instruction } = this.state;

    if (name.length == 0 || ingredients.length == 0 || instruction.length == 0)
      return;

    const body = {
      name,
      ingredients,
      instruction: instruction.replace(/\n/g, "<br> <br>")
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.props.history.push(`/recipe/${response.id}`))
      .catch(error => console.log(error.message));
  }

  render() {
    return (
      <Container className="mt-5">
        <Row>
          <Col sm={12} lg={{ span: 6, offset: 3 }}>
            <h1 className="font-weight-normal mb-5">
              Add a new recipe.
            </h1>
            <Form onSubmit={this.onSubmit}>
              <Form.Group controlId="recipeName">
                <Form.Label>Recipe Name</Form.Label>
                <Form.Control 
                  type="text" 
                  name="name" 
                  required 
                  placeholder="Enter a recipe name" 
                  onChange={this.onChange}
                />
              </Form.Group>
              <Form.Group constrolId="recipeIngredients">
                <Form.Label>Ingredients</Form.Label>
                <Form.Control 
                  type="text"
                  name="ingredients"
                  required
                  placeholder="Separate each ingredient with a comma."
                  onChange={this.onChange}                      
                />
              </Form.Group>
              <Form.Group controlId="instructions">
                <Form.Label>Preparation Instructions</Form.Label>
                <Form.Control                   
                  name="instruction"                  
                  required
                  as="textarea" 
                  rows={5}
                  onChange={this.onChange}
                />
              </Form.Group>
              <Button type="submit" className="btn custom-button mt-3">
                Create Recipe
              </Button>
              <Link to="/recipes" className="btn btn-link mt-3">
                Back to recipes
              </Link>
            </Form>                 
          </Col>
        </Row>
      </Container>
    );
  }

}

export default NewRecipe;