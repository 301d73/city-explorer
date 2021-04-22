import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      location: {},
      image_ur: '',
      forecasts: [],
    }
  }

  getLocation = async () => {
    const API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_MAP_KEY}&q=${this.state.searchQuery}&format=json`;
    console.log('API', API);
    const res = await axios.get(API);
    const location = res.data[0];
    console.log(location)
    this.setState({ location });

    const image_url = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_MAP_KEY}&center=${location.lat},${location.lon}&size=${window.innerWidth}x300&format=jpg&zoom=12`;

    // e.g. https://maps.locationiq.com/v3/staticmap?key=pk.21783be57f80675e394cca25994f4ece&center=47.6038321,-122.3300624&size=918x300&format=jpg&zoom=12

    console.log(image_url)

    this.setState({ image_url });

    const weatherUrl = `https://city-explorer-weather.herokuapp.com/weather?lat=100&lon=100`;
    const weatherResponse = await axios.get(weatherUrl);

    this.setState({
      forecasts: weatherResponse.data,
    });


  }

  render() {
    return (
      <>
        <h1>City Explorer</h1>
        <input onChange={(e) => this.setState({ searchQuery: e.target.value })} placeholder="search for a city"></input>
        <button onClick={this.getLocation}>Explore!</button>
        {this.state.location.place_id &&
          <h2>The city is: {this.state.location.display_name}</h2>
        }
        <img src={this.state.image_url} alt="location" />

        <ul>
          {this.state.forecasts.map((item, index) => <li key={index}>{JSON.stringify(item)}</li>)}
        </ul>
      </>
    )
  }
}

export default App;