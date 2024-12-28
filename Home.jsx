import React, { useEffect, useState } from 'react';
import { Container, InputGroup, FormControl, Button, Card, Row } from 'react-bootstrap';

import './Home.css'; 
const CLIENT_ID = '96afb4944cee433c87ff9cb126e2319b';
const CLIENT_SECRET = 'fd31b0d831b6407db50183ace2ae66fc';

function Home() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [tracks, setTracks] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [likedTracks, setLikedTracks] = useState([]);

  // Fetch Access Token
  useEffect(() => {
    const auth = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
    };

    fetch('https://accounts.spotify.com/api/token', auth)
      .then((result) => result.json())
      .then((data) => setAccessToken(data.access_token));
  }, []);

  // Search Function
  async function search() {
    const searchParams = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const trackData = await fetch(
      `https://api.spotify.com/v1/search?q=${searchInput}&type=track&limit=10`,
      searchParams
    )
      .then((response) => response.json())
      .then((data) => data.tracks.items);

    setTracks(trackData);
  }

  // Handle Track Selection
  const handleSelectTrack = (track) => {
    if (audio) {
      audio.pause(); // Stop any previously playing track
    }
    const newAudio = new Audio(track.preview_url); // Create a new audio instance
    setAudio(newAudio);
    setSelectedTrack(track);
    setIsPlaying(false);
  };

  // Play/Pause/Stop Controls
  const playTrack = () => {
    if (audio) {
      audio.play();
      setIsPlaying(true);
    }
  };

  const pauseTrack = () => {
    if (audio) {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const stopTrack = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0; // Reset to start
      setIsPlaying(false);
    }
  };

  // Like/Dislike Functionality
  const likeTrack = (track) => {
    if (!likedTracks.includes(track.id)) {
      setLikedTracks([...likedTracks, track.id]);
    }
  };

  const dislikeTrack = (track) => {
    setLikedTracks(likedTracks.filter((id) => id !== track.id));
  };

  return (
    <div className="App">
      {/* Search Section */}
      <Container>
        <InputGroup className="mb-3" size="lg">
          <FormControl
            placeholder="Search for Songs"
            type="input"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                search();
              }
            }}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Button onClick={search}>Search</Button>
        </InputGroup>
      </Container>

      {/* Track List */}
      <Container>
        <Row className="mx-2 row row-cols-4">
          {tracks.map((track) => (
            <Card key={track.id} style={{ width: '18rem', margin: '10px' }}>
              <Card.Img
                variant="top"
                src={track.album.images[0]?.url || 'placeholder.jpg'}
              />
              <Card.Body>
                <Card.Title>{track.name}</Card.Title>
                <Button
                  variant="primary"
                  onClick={() => handleSelectTrack(track)}
                >
                  Select
                </Button>
              </Card.Body>
            </Card>
          ))}
        </Row>
      </Container>

      {/* Selected Track Controls */}
      {selectedTrack && (
        <Container className="mt-4">
          <h3>Now Playing: {selectedTrack.name}</h3>
          <p>Artist: {selectedTrack.artists[0].name}</p>
          <Button variant="success" onClick={playTrack} disabled={isPlaying}>
            Play
          </Button>{' '}
          <Button variant="warning" onClick={pauseTrack} disabled={!isPlaying}>
            Pause
          </Button>{' '}
          <Button variant="danger" onClick={stopTrack}>
            Stop
          </Button>{' '}
          <Button
            variant="info"
            onClick={() => likeTrack(selectedTrack)}
            disabled={likedTracks.includes(selectedTrack.id)}
          >
            Like
          </Button>{' '}
          <Button
            variant="secondary"
            onClick={() => dislikeTrack(selectedTrack)}
            disabled={!likedTracks.includes(selectedTrack.id)}
          >
            Dislike
          </Button>
        </Container>
      )}
    </div>
  );
}

export default Home;
