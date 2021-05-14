import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Button from "react-bootstrap/Button";

class Recipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      user: {}
    };

    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem('jwt')) {
      const recipeUrl = axios.get("/api/v1/recipes");
      const userUrl = axios.get("/api/v1/users/" + localStorage.getItem("user_id"));
      axios.all([recipeUrl, userUrl])
        .then(axios.spread((...responses) => {
          this.setState({ recipes: responses[0].data });
          this.setState({ user: responses[1].data })
        }))
        .catch(error => {
          console.log(error);
          this.props.history.push("/")
        })
    } else {
      this.props.history.push('/login');
    }
  }

  logout(event) {
    event.preventDefault();
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    localStorage.removeItem("user_id");
    this.props.history.push("/");
  }

  render() {
    const { recipes, user } = this.state;
    const allRecipes = recipes.map((recipe, index) => (
      <div key={index} className="col-md-6 col-lg-4">
        <div className="card mb-4">
          <img
            src={recipe.image}
            className="card-img-top"            
            alt={`${recipe.name} image`}
          />
          <div className="card-body">
            <h5 className="card-title">{recipe.name}</h5>
            <Link to={`/recipe/${recipe.id}`} className="btn custom-button">
              View Recipe
            </Link>
          </div>
        </div>
      </div>
    ));
    const noRecipe = (
      <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
        <h4>
          No recipes yet. Why not <Link to="/recipe">create one</Link>
        </h4>
      </div>
    );

    return (
      <>
        <section className="jumbotron jumbotron-fluid text-center">
          <Button className="mr-4 mt-1" style={{ float: 'right' }} variant="danger" onClick={this.logout}>
            Log Out
          </Button>
          <div className="container py-5">
            <h1 className="display-2">
              Welcome back {user.first_name} {user.last_name}!
            </h1>
            <h1 className="display-4">Recipes for every occasion</h1>
            <p className="lead text-muted">
              We’ve pulled together our most popular recipes, our latest
              additions, and our editor’s picks, so there’s sure to be something
              tempting for you to try.
            </p>
          </div>
        </section>
        <div className="py-5">
          <main className="container">
            <div className="text-right mb-3">
              <Link to="/recipe" className="btn custom-button">
                Create New Recipe
              </Link>
            </div>
            <div className="row">
              {recipes.length > 0 ? allRecipes : noRecipe}
            </div>
            <Link to="/" className="btn btn-link">
              Home
            </Link>
          </main>
        </div>
      </>
    );
  }
}
export default Recipes;