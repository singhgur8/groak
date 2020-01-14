import React from 'react';
import axios from 'axios';
import styles from './styles/app.css';
import AddGuest from './AddGuest.jsx'
import Search from './Search.jsx'
import Summary from './Summary.jsx'
import { Home, User, Help, FormSearch } from 'grommet-icons';
import { RangeInput, Clock, Grid, Box } from 'grommet'


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      username: 'Gurjot',
      show: {
        guestStatement: false,
      },
      friends: [],
      selectedFriends: [],
    };


    this.addEater = this.addEater.bind(this);
    this.addGuest = this.addGuest.bind(this);
    this.findRestaurant = this.findRestaurant.bind(this)
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

    // also when this loads, it shoudl send over all of the details andfriends of the current 
    // user over search bar. The list of options eventually needs to be an array of objects
    // with label and value keys, whenever someone is selected, disabled gets turned on
    // this data processing will have to happen somewhere. better to do it on server end

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

    axios.get(`${user}friends`)
    .then((data) => {
      this.setState({
        friends: data.data.friends
      })
    })
    .catch()

  }



  addGuest(e){
    e.preventDefault()
    console.log('Adding a guest')
    // opens a modal that lets you input information for guest
    // needs a close button and a createEater button
  }

  addEater(username){
    console.log('Adding a Eater', username)
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
      //update the state so the username  also appears in in the next component
      // for the selected friends i should add a disable true property to the friends list
      // might as well update both states together

  }

  findRestaurant(e){
    e.preventDefault();
    axios.get('/restaurant', {

    })
    // This should also display why this restaurant was chosen, like what was
    // the filter based on. Most people want:
  }

  handleChange(event) {
  }

  handleSubmit(event) {
    event.preventDefault();
  }


  render() {
    const { show } = this.state;
    // // Stops scrolling of the page if Modal opens up
    // const objRef = document.body;
    // if (!show.gallery) {
    //   objRef.style['overflow-y'] = 'hidden';
    // } else {
    //   objRef.style['overflow-y'] = 'auto';
    // }

    return (
      <div className='container'>
        <Grid
          justify = 'center'
          justifyContent = 'center'
          rows={['xxsmall', 'xxsmall', 'xxsmall', 'small']  }
          columns={['medium', 'small']}
          gap="xxsmall"
          areas={[
            { name: 'header', start: [0, 0], end: [1, 0] },
            { name: 'nav', start: [0, 1], end: [1, 1] },
            { name: 'search', start: [0, 2], end: [1, 2] },
            { name: 'addGuest', start: [0, 3], end: [1, 3] },
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
{/* the add button is inside this so i have to make a grid inside this as well */}
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

        </Grid>


        <div>
          {/* add a Selection Summary Component here */}
          <Summary selectedFriends={this.state.selectedFriends} />
          <RangeInput/>
        </div>

        <div>
          <button>
            <div>Find Restaurant!</div>
            <FormSearch></FormSearch>
          </button>
        </div>

        {/* This could be conditionally rendered once the search is hit */}
        <div>
          {/* Suggested Restaurant */}
          RESULTS:
        </div>

        <Clock type='digital'></Clock>

      </div>
    )
  }
}

export default App;
