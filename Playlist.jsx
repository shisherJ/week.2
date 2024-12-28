import React from "react";
import { Link } from "react-router-dom";

const Playlist = () => {
  const playlist = JSON.parse(localStorage.getItem("playlist")) || [];

  return (
    <div className="container mt-5">
      <h1>Your Playlist</h1>
      <Link to="/" className="btn btn-secondary mb-3">
        Back to Home
      </Link>
      <div className="row">
        {playlist.map((track, index) => (
          <div key={index} className="col-md-4">
            <div className="card mb-3">
              <img
                src={track.album.images[0].url}
                className="card-img-top"
                alt={track.name}
              />
              <div className="card-body">
                <h5 className="card-title">{track.name}</h5>
                <p className="card-text">{track.artists[0].name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playlist;
