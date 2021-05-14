import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Toast from "react-bootstrap/Toast";

const AuthenticatedUser = () => {
  return (
    <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
        <div className="jumbotron jumbotron-fluid bg-transparent">
          <div className="container secondary-color">
            <h1 className="display-4">Food Recipes</h1>
            <p className="lead">
              A curated list of recipes for the best homemade meal and delicacies.
            </p>
            <hr className="my-4" />
            <Link
              to="/recipes"
              className="btn btn-lg custom-button"
              role="button"
            >
              View Recipes
            </Link>
          </div>
        </div>
      </div>
  )
}

const UnauthenticatedUser = () => {
  return (
    <div>      
        <div
          aria-live="polite"
          aria-atomic="true"
          style={{
            position: 'relative',
            minHeight: '100px',
          }}
        >
          <Toast
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
            }}
          >
            <Toast.Header>              
              <strong className="mr-auto">Error</strong>
              <small></small>
            </Toast.Header>
            <Toast.Body>You must log in to view your recipes</Toast.Body>
          </Toast>
        </div>

          <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
            <div className="jumbotron jumbotron-fluid bg-transparent">
              <div className="container secondary-color">
                <h1 className="display-4">Sign in to view your recipes.</h1>
                <hr className="my-4" />
                <Link
                  to="/login"
                  className="btn btn-lg custom-button"
                  role="button"
                >
                  Go to Login
                </Link>
              </div>
            </div>
        </div>
      </div>
  )
}

const Home = (props) => {
  const [authenticated, setAuthentication] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("jwt") && localStorage.getItem("user_id")) {
      setAuthentication(true);
    } else {
      props.history.push("/login");
    }
  })

  return (
    <>
      {authenticated ? <AuthenticatedUser /> : <UnauthenticatedUser />}
    </>
  )
}

export default Home;