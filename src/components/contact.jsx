import { useState } from "react";
import React from "react";

const initialState = {
  name: "",
  email: "",
  message: "",
};

export const Contact = (props) => {
  const [{ name, email, message }, setState] = useState(initialState);
  const [loading, setLoading] = useState(false); // ✅ loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const clearState = () => {
    setState({ ...initialState });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ start loading

    fetch(
      "https://script.google.com/macros/s/AKfycbyP-jIYxieL4cuZYGy6aUYto2iT8bcKeXFavbQnCLsN7iRrXbVWWbViiSE0raSQyRIT/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify({ name, email, message }),
      }
    )
      .then(() => {
        alert("Thank you! Your message has been sent successfully.");
        clearState();
      })
      .catch((err) => {
        console.error("Error:", err);
        alert("Oops! Something went wrong. Please try again later.");
      })
      .finally(() => {
        setLoading(false); // ✅ stop loading
      });
      
  };

  return (
    <div>
      <div id="contact">
        <div className="container">
          <div className="col-md-8">
            <div className="row">
              <div className="section-title">
                <h2>Get In Touch</h2>
                <p>
                  Please fill out the form below to send us an email and we will
                  get back to you as soon as possible.
                </p>
              </div>
              <form name="sentMessage" validate onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        placeholder="Name"
                        required
                        value={name}
                        onChange={handleChange}
                        disabled={loading}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={handleChange}
                        disabled={loading}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    id="message"
                    className="form-control"
                    rows="4"
                    placeholder="Message"
                    required
                    value={message}
                    onChange={handleChange}
                    disabled={loading}
                  ></textarea>
                </div>
                <div id="success"></div>
                <button
                  type="submit"
                  className="btn btn-custom btn-lg"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
                {loading && (
                  <div className="loader-overlay">
                    <div className="loader"></div>
                  </div>
                )}

              </form>
            </div>
          </div>
          <div className="col-md-3 col-md-offset-1 contact-info">
            <h3>Contact Info</h3>
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-envelope-o"></i> Email
                </span>{" "}
                {props.data ? props.data.email : "loading"}
              </p>
            </div>
          </div>
          <div className="col-md-12">
            <div className="row">
              <div className="social">
                <ul>
                  <li>
                    <a href={props.data ? props.data.linkedin : "/"}>
                      <i className="fa fa-linkedin"></i>
                    </a>
                  </li>
                  <li>
                    <a href={props.data ? props.data.twitter : "/"}>
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href={props.data ? props.data.youtube : "/"}>
                      <i className="fa fa-youtube"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="footer">
        <div className="container text-center">
          <p>
            &copy; 2025 All rights reserved{" "}
            <a href="https://dataprow.com/" rel="nofollow">
              dataprow.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
