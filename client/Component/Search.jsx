import React from 'react';
import Select from 'react-virtualized-select'

class Search extends React.Component{
    constructor(props){
        super(props);
        this.state = { }
        this.callbackForAddEater = this.callbackForAddEater.bind(this)
    }

    callbackForAddEater(e){
        const { addEater } = this.props
        e.preventDefault();
        console.log(this.state)
        addEater(this.state.selectValue);
    }

    render(){
        // const { addEater } = this.props
        const options = [
            { label: "One", value: 1 },
            { label: "Two", value: 2 },
            { label: "Three", value: 3, disabled: true }
            // And so on...
          ]
        return (
            <div>
                 <Select
                    options={options}
                    onChange={(selectValue) => this.setState({ selectValue })}
                    value={this.state.selectValue}
                 />
                 <button type='submit' onClick={this.callbackForAddEater} value="Add Eater">Add Eater</button>
            </div>
        )
    }
}


export default Search

// function Search(props){

//     // does this needs states
//     // whichever user is logged in, I will need to have their friends
//     // already loaded in on the client side. Use this tactic for time being because 
//     // it gets much more difficult if I am trying to use the freinds plus also use
//     // the all of the users that are using this app


//     // Instead of using handleSubmit everywhere, change this so its 
//     // on change...as I am typing it should be asking the server
//     // in order to do that the state needs to update, as the state updates
//     // the render function should be running, inside the render make cbs to app
//     // app will send requests to the server and the server will respond with matches
//     // those matches will be send back here with a boolean,
//     // boolean will tell me if I should do a drop down of suggests
//     // each of these near matching suggests will have to be buttons as well
//     // once I click one of them , then the call back add eater should be initiated

//     const { addEater } = props
//     return (
//         <form onSubmit={addEater} name="addEater">
//             <input type="text"/>
//             <input type="submit" value="Add Eater"/>
//         </form>
//     )
// }

// export default Search;