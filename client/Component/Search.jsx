import React from 'react';
import Select from 'react-virtualized-select'
import {UserAdd} from 'grommet-icons';
import { Grid, Box } from 'grommet';

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
        // clears the search after submission
        this.setState({
            selectValue: ""
        })
    }

    render(){
        const { friends, selectedFriends } = this.props

        var options = [];
        for (var i = 0; i < friends.length; i ++) {
            var obj = {}
            obj.label = friends[i];
            obj.value = friends[i].toLowerCase();

            // disables already selected friends
            if (selectedFriends.indexOf(friends[i]) !== -1) {
                obj.disabled = true;
            }

            options.push(obj)
        }

        return (
            <div>
                <Grid
                    rows={['small']}
                    columns={['medium', 'xsmall']}
                    gap="xxsmall"
                    areas={[
                    { name: 'search', start: [0, 0], end: [0, 0] },
                    { name: 'button', start: [1, 0], end: [1, 0] },
                    ]}
                >
                    <Box gridArea='search'>
                        <Select
                            options={options}
                            onChange={(selectValue) => this.setState({ selectValue })}
                            value={this.state.selectValue}
                        />
                    </Box>

                    <Box gridArea='button'>
                        <button type='submit' onClick={this.callbackForAddEater}><UserAdd size='small'></UserAdd><div>Add Eater</div></button>
                    </Box>

                </Grid>
            </div>
        )
    }
}


export default Search
