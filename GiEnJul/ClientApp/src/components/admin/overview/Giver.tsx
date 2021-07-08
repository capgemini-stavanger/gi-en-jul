import { Container } from "@material-ui/core";
import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Datatable from "../common/Datatable";

const Giver = () => {
    const [data, setData] = useState([JSON]);

    useEffect(() => {
        fetch('api/admin/allgivers', {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((response) => 
            response.json())
            // if (response.status === 201) {
            //     trigger(true);
            // }
        .then((json) => setData(json))
        .catch((errorStack) => {
            console.log(errorStack);
        })
    }, [])

    console.log(data);
    console.log(data[1]);


    return (
        <Container>
            <Datatable
            data = {data}></Datatable>
            
        </Container>
    )

}

export default Giver;