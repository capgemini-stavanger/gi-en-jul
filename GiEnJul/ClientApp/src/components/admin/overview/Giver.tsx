import { Container } from "@material-ui/core";
import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";

const Giver = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        await fetch('api/giver', {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(submit)
        })
        .then((response) => {
            if (response.status === 201) {
                trigger(true);
            }
        })
        .catch((errorStack) => {
            console.log(errorStack);
        })

    }, [])


    return (
        <Container>
            
        </Container>
    )

}

export default Giver;