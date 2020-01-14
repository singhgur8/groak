import React from 'react';
import {RangeInput, Grid, Box} from 'grommet';
import SummaryItem from './SummaryItem.jsx'

function Summary(props){
    const {selectedFriends} = props
    return(
        <div>
                <Grid
                    rows={['medium']}
                    columns={['medium', 'xxsmall']}
                    gap="xxsmall"
                    areas={[
                    { name: 'summary', start: [0, 0], end: [1, 0] },
                    { name: 'range', start: [1, 0], end: [1, 0] },
                    ]}
                >
                    <Box gridArea='summary'>
                            {selectedFriends.map((friend)=>{
                                return(
                                    <SummaryItem
                                    friend = {friend}    
                                    ></SummaryItem>
                                )
                            })}
                    </Box>

                    {/* cthis needs to go inside of summary item */}

                    <Box gridArea='range'>
                        <RangeInput></RangeInput>
                    </Box>

                </Grid>
        </div>
    )
}

export default Summary;