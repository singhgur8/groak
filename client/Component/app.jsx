import React from 'react';
import axios from 'axios';
import styles from './styles/app.css';
import AddGuest from './AddGuest.jsx'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      show: {
        guestStatement: false,
      },
    };
    this.changePage = this.changePage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // let endpoint;
    // if (window.location.pathname === '/') {
    //   endpoint = 1;
    // } else {
    //   endpoint = window.location.pathname.split('/')[1];
    // }
    // axios.get(`http://localhost:3004/airbnb/listings/${endpoint}`)
    //   .then((data) => {
    //     this.setState({
    //       photos: data.data,
    //     });
    //   });
  }

  changePage(e) {
    // let photoNumber; // lets me use the same click function on different DOM element types
    // if (e.target.nodeName === 'DIV') {
    //   photoNumber = Number(e.target.className.split(' ')[0]);
    // } else {
    //   photoNumber = 0;
    // }

    // const { show } = this.state;
    // this.setState({
    //   show: {
    //     gallery: !show.gallery,
    //     photo: photoNumber,
    //   },
    // });
  }

  handleSubmit(e){
    e.preventDefault()
    console.log('Form was submitted', e.target)
    // if Add guest is clicked then it should pop up a modal which lets us create a eater
    // if add user if clicked then it should do what it says
    this.setState({
      show: {
        guestStatement: true
      }
    })
  }

  render() {
    // Stops scrolling of the page if Modal opens up
    const { show, photos } = this.state;
    const objRef = document.body;
    if (!show.gallery) {
      objRef.style['overflow-y'] = 'hidden';
    } else {
      objRef.style['overflow-y'] = 'auto';
    }

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

      {/* conditional rendering happening inside each child component */} 
        {/* Search Bar */}
        <div>
          <Search></Search>
          <AddGuest onClick={this.handleSubmit} show={this.state.show}/>
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
