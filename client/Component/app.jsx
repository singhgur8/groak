import React from 'react';
import axios from 'axios';
import styles from './styles/app.css';
import AddGuest from './AddGuest.jsx'
import Search from './Search.jsx'


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      show: {
        guestStatement: false,
      },
      value: 'coconut'
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
  }



  addGuest(e){
    e.preventDefault()
    console.log('Adding a guest')
    // opens a modal that lets you input information for guest
    // needs a close button and a createEater button
  }

  // add eater submit
  addEater(username){
    console.log('Adding a Eater', username)

    // this needs to get whatever is put into the form

    // run this if the add eater fails
    this.setState({
      show: {
        guestStatement: true
      }
    })
  }

  // find restaurant
  findRestaurant(e){
    e.preventDefault();
    axios.get('/restaurant', {

    })
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
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
      <div>
        {/* Logo and Mission Statement */}
        <div>
          <h1>GROAK</h1>
          <p>Enchancing your food searching experience since 2020!</p>
        </div>

          {/* navigation bar */}
        <div>
          <button>Home</button>
          <button>About</button>
          <button>Sign In</button>
        </div>

        {/* Search Bar */}
        <div>
          <Search addEater={this.addEater}></Search>
        </div>

        <div>
          <AddGuest addGuest={this.addGuest} show={this.state.show}/>
        </div>

        <div>
          {/* add a Selection Summary Component here */}
        </div>

        {/* This could be conditionally rendered once the search is hit */}
        <div>
          {/* Suggested Restaurant */}
        </div>

      </div>
    )


    // if (show.gallery) {
    //   return (
    //     <div>
    //       Hello World
    //       {/* <Gallery info={photos} onClick={this.changePage} /> */}
    //     </div>
    //   );
    // }
    // return (
    //   // className={styles.CarouselPage}
    //   <div >
    //     {/* <CarouselPage onClick={this.changePage} info={photos} showPhoto={show} /> */}
    //   </div>
    // );
  }
}

export default App;
