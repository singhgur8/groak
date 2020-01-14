import React from 'react';
import axios from 'axios';
import styles from './styles/app.css';
import AddGuest from './AddGuest.jsx'
import Search from './Search.jsx'
import Summary from './Summary.jsx'
import Results from './Results.jsx'
import { Home, User, Help, FormSearch } from 'grommet-icons';
import { Clock, Grid, Box } from 'grommet'


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      username: 'Gurjot',
      show: {
        guestStatement: false,
      },
      notLoggedIn: false,
      friends: [],
      selectedFriends: [],
      showResults: false,
      restaurant: {},
      reasoning: ""
    };


    this.addEater = this.addEater.bind(this);
    this.addGuest = this.addGuest.bind(this);
    this.findRestaurant = this.findRestaurant.bind(this)
    this.changePage = this.changePage.bind(this)
  }

  componentDidMount() {
    var sucesscb = (data) => {
      axios.post('/coordinates', {
        latitude: data.coords.latitude,
        longitude: data.coords.longitude
      })
      .then(data => console.log('posted coordinates are', data.data))
      .catch(err => console.log('failed post req for coordinates', err))
    }

    var errorcb = (err)=>{
      console.log(err)
    }

    navigator.geolocation.getCurrentPosition(sucesscb, errorcb)


    // based on endpoint, it can be a show of who is logged in right now.
    // defaults to me
    var user = window.location.pathname;
    // if the input in nothing then default to /vel_animi_tempora/
    if ( window.location.pathname === '/') {
      user = '/gurjot_singh/'
    }

    // update user name in account tab in nav bar
    var username = user.slice(1,user.length-1).split("_").join(" ")
    this.setState({username})

    // user will eat as well so add them
    axios.post('/addEater', {username: username})
      .then(() => {
        const selectedFriends = this.state.selectedFriends.slice();
        selectedFriends.push(username)
        this.setState({
          selectedFriends: selectedFriends
        });
    }) 

    axios.get(`${user}friends`)
    .then((data) => {
      this.setState({
        friends: data.data.friends
      })
    })
    .catch(err=>{
      this.setState({
        notLoggedIn: true
      })

    })

  }

  changePage(e){
    e.preventDefault()
    this.setState({
      showResults: false
    })
  }



  addGuest(e){
    e.preventDefault()
    console.log('Adding a guest')
    // opens a modal that lets you input information for guest
    // needs a close button and a createEater button
  }

  addEater(username){
    if (username === null || username === undefined) {
      this.setState({
        show: {
          guestStatement: true
        }
      })
    }
      axios.post('/addEater', {username: username.label})
      .then(() => {
        // push user into selected friends array
        const selectedFriends = this.state.selectedFriends.slice();
        selectedFriends.push(username.label)
        this.setState({
          selectedFriends: selectedFriends
        });
      }) 
  }

  findRestaurant(e){
    e.preventDefault();
    axios.get(`/api/getRestaurant`)
    .then((data) => {
      console.log(data.data)
      // change to show results
      // pass in the props of restauraant and choice to component
      this.setState({
        showResults: true,
        reasoning: data.data.filter,
        restaurant: data.data.restaurant
      })


    })
    .catch()
   }


  render() {
    const { notLoggedIn, showResults, reasoning, restaurant } = this.state;

    if (notLoggedIn) {
      return (
        <div>
          User Not Found, Please Log In -- Implement Authentication [TO DO]
        </div>
      )
    } else if (!showResults){
      return (
        <div className='container'>
          <Clock type='digital'></Clock>
          <Grid
            justify = 'center'
            justifyContent = 'center'
            rows={['xxsmall', 'xxsmall', 'xxsmall', 'xxsmall', 'small', 'small']  }
            columns={['medium', 'small']}
            gap="xxsmall"
            areas={[
              { name: 'header', start: [0, 0], end: [1, 0] },
              { name: 'nav', start: [0, 1], end: [1, 1] },
              { name: 'search', start: [0, 2], end: [1, 2] },
              { name: 'addGuest', start: [0, 3], end: [1, 3] },
              { name: 'summary', start: [0, 4], end: [1, 4] },
              { name: 'findRes', start: [0, 5], end: [1, 5] },
            ]}
          >
            <Box gridArea='header'>
              <div>
                <h1>GROAK</h1>
                <p>Enchancing your food searching experience since 2020!</p>
              </div>
            </Box>
  
            <Box gridArea='nav'>
              <div>
                <button><Home size='small'></Home></button>
                <button><Help size='small'></Help></button>
                <button><User size='small'></User> {this.state.username}</button>
              </div>
            </Box>

            <Box gridArea='search'>
              <div>
                <Search addEater={this.addEater} friends={this.state.friends} selectedFriends={this.state.selectedFriends}></Search>
              </div>
            </Box>
  
            <Box gridArea='addGuest'>
              <div>
                <AddGuest addGuest={this.addGuest} show={this.state.show}/>
              </div>
            </Box>
  
            <Box gridArea='summary'>
                <div>
                  <Summary selectedFriends={this.state.selectedFriends} />
                </div>
            </Box>
  
            <Box gridArea='findRes'>
              <button onClick={this.findRestaurant}>
                <div>Find Restaurant!</div>
                <FormSearch></FormSearch>
              </button>
            </Box>

          </Grid> 
        </div>
      )
    } else if (showResults) {
      return (
        <div>
          <div>
            <Clock type='digital'></Clock>
          </div>
          <div>
            <button onClick={this.changePage}>Home</button>
          </div>
          <div>
            Currently In The Mood For: {reasoning}
            <Results restaurant={restaurant} ></Results>
          </div>
        </div>
      )
    }

    
  }
}

export default App;
