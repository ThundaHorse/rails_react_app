import React from "react";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";

class Recipe extends React.Component {
  constructor(props) {
    super(props);    
    this.state = { 
      recipe: {
        ingredients: ""
      },
      show: false
    };    

    this.addHtmlEntities = this.addHtmlEntities.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    const url = `/api/v1/recipes/${id}`;

    axios.get(url)
      .then(response => {                
        this.setState({ recipe: response.data })
      })
      .catch(error => {
        console.log(error)
        this.props.history.push("/recipes")
      });
  }

  addHtmlEntities(str) {
    return String(str)
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
  }

  handleClose() {
    this.setState({ show: false })
  }

  handleShow() {
    this.setState({ show: true })
  }

  deleteRecipe() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const url = `/api/v1/recipes/${id}`;
    axios.delete(url)
      .then(response => {
        this.props.history.push("/recipes")
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    const { recipe, show } = this.state;
    let ingredientList = "No ingredients available";

    if (recipe.ingredients.length > 0) {
      ingredientList = recipe.ingredients
        .split(",")
        .map((ingredient, index) => (
          <li key={index} className="list-group-item">
            {ingredient}
          </li>
        ));
    }
    const recipeInstruction = this.addHtmlEntities(recipe.instruction);

    return (
      <div className="">
        <div className="hero position-relative d-flex align-items-center justify-content-center">
          <img
            src={recipe.image}
            alt={`${recipe.name} image`}
            className="img-fluid position-absolute"
          />
          <div className="overlay bg-dark position-absolute" />
          <h1 className="display-4 position-relative text-white">
            {recipe.name}
          </h1>
        </div>
        <div className="container py-5">
          <div className="row">
            <div className="col-sm-12 col-lg-3">
              <ul className="list-group">
                <h5 className="mb-2">Ingredients</h5>
                {ingredientList}
              </ul>
            </div>
            <div className="col-sm-12 col-lg-7">
              <h5 className="mb-2">Preparation Instructions</h5>
              <div
                dangerouslySetInnerHTML={{
                  __html: `${recipeInstruction}`
                }}
              />
            </div>

            <Modal
              show={show}
              onHide={this.handleClose}
              backdrop="static"
              centered
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Are you sure you want to delete {recipe.name}?</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Recipe will be permanently deleted!
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                  Close
                </Button>
                <Button variant="danger" onClick={this.deleteRecipe}>Confirm Delete</Button>
              </Modal.Footer>
            </Modal>

            <Col sm={12} lg={2}>
              <Button variant="secondary">
                Edit Recipe
              </Button>
              <Button variant="danger" onClick={this.handleShow}>
                Delete Recipe
              </Button>
            </Col>
            
          </div>
          <Link to="/recipes" className="btn btn-link">
            Back to recipes
          </Link>
        </div>
      </div>
    );
  }
}

export default Recipe;