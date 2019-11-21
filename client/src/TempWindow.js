import { Card } from 'semantic-ui-react'
import React from 'react';
export default function TempWindow(props) {
    console.log(props);
    return (
        <center>
            <Card>
                <Card.Content description={props.location.state.desc} />
            </Card>
        </center>
    )
}