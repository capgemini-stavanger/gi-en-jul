import * as React from 'react';


type PersonProps = {
    personid: number
}

const PersonField = ({ personid }: PersonProps) => {
    return(
        <div >
            <input
            type="number"
            name="age"
            id={"person"+personid}
            />
            <select>
                <option>Kjønn</option>
                <option>Mann</option>
                <option>Kvinne</option>
                <option>Andre</option>
            </select>
            <input
             type="text"
             placeholder="Gaveønske (husk størrelse)"
             />
            <input
            type="checkbox"
            />
            <p>Giver kjøper alderstilpasset gave</p>
        </div>
    );
};

export default PersonField;

