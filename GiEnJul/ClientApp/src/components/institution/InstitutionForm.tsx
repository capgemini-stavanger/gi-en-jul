import * as React from 'react';
import { useState } from 'react';
import InputEmail from '../InputFields/Validators/InputEmail';
import InputNotNull from '../InputFields/Validators/InputNotNull';
import InputPhoneNumber from '../InputFields/Validators/InputPhoneNumber';
import Location from './InstitutionLocation';
import FormPerson from './FormPerson';
import IFormPerson from './IFormPerson';
import LOCATIONS from '../../common/constants/Locations';
import Gender from '../../common/enums/Gender';


type PersonType = {
    Wish?: string,
    Age?: number,
    Gender?: Gender,
    Family?: string,
}

type submittype = {
    Dinner?: string,
    Dessert?: string,
    Note?: string,
    Event?: string,
    Location?: string,
    ContactFullName?: string,
    ContactEmail?: string,
    ContactPhoneNumber?: string,
    Institution?: string,
    ReferenceId?: string,
    FamilyMembers?: PersonType[],
}

const RegistrationForm = () => {
    const [persons, setPersons] = useState([{} as IFormPerson]);
    const [location, setLocation] = useState("");
    
    const [dinnerRadio, setDinnerRadio] = useState("");
    const [dinnerInput, setDinnerInput] = useState("");
    const [isValidDinnerInput, setIsValidDinnerInput] = useState(false);

    const [dessertRadio, setDessertRadio] = useState("");
    const [dessertInput, setDessertInput] = useState("");
    const [isValidDessertInput, setIsValidDessertInput] = useState(false);

    const [specialNeeds, setSpecialNeeds] = useState("");

    const [pid, setPid] = useState("");
    const [isValidPid, setIsValidPid] = useState(false);

    const [contactName, setContactName] = useState("");
    const [isValidContactName, setIsValidContactName] = useState(false);

    const [contactPhoneNumber, setContactPhoneNumber] = useState("");
    const [isValidContactPhoneNumber, setIsValidContactPhoneNumber] = useState(false);

    const [contactEmail, setContactEmail] = useState("");
    const [isValidContactEmail, setIsValidContactEmail] = useState(false);


    const addPerson = () => {
        setPersons(formpersons => [...formpersons, {} as IFormPerson]);
        console.log(persons);
    }

    const updatePerson = (newPerson: IFormPerson, index: number) => {
        setPersons(formpersons => {
            formpersons[index] = newPerson;
            return formpersons;
        });
    }

    const onLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocation(e.target.value);
    }

    const onDinnerRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDinnerRadio(e.target.value);
        if (e.target.value !== "annet") setDinnerInput("");
    } 

    const onDessertRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDessertRadio(e.target.value);
        if (e.target.value !== "annet") setDessertInput("");
    } 

    const onSubmitForm = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let personsList = Array<PersonType>();
        persons.forEach(p => {
            const p1:PersonType = {
                Wish: p.wish,
                Age: parseInt(p.age),
                Gender: p.gender,
            };
            personsList.push(p1);
        });

        let submit:submittype = {
            Dinner:dinnerRadio,
            Dessert:dessertRadio,
            Note:specialNeeds,
            Event:"JUL2021",
            Location:location,
            ContactFullName:contactName,
            ContactEmail:contactEmail,
            ContactPhoneNumber: contactPhoneNumber,
            Institution:"NAV",
            ReferenceId:pid,
            FamilyMembers: personsList
        }
        fetch('https://localhost:5001/api/recipent', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(submit)
        })
    }

    return(
        <form className="thisclass" onSubmit={onSubmitForm}>
            <div>
                <h3>Hvor ønsker du å registrere familie (velg en)</h3>
                <div>
                    {
                    LOCATIONS.map(l => (
                        <Location key={l} onChange={onLocationChange} value={l}/>
                    ))}
                </div>
                {location}
            </div>
            <div>
                {persons.map((p, i) =>
                    <FormPerson key={"person" + i} person={p} updatePerson={(newPerson: IFormPerson) => updatePerson(newPerson, i)} />)}
            </div>
            <input type="button" onClick={addPerson} value="Legg til flere" />
            <div className="form-group">
                <h3>Matønsker</h3>
                <h4>Middag</h4>
                <input type="radio" id="ribbe" name="middag" value="ribbe" onChange={onDinnerRadioChange}/>
                <label>Ribbe</label><br/>
                <input type="radio" id="pinnekjøtt" name="middag" value="pinnekjøtt" onChange={onDinnerRadioChange}/>
                <label>Pinnekjøtt</label><br/>
                <input type="radio" id="annet" name="middag" value="annet" onChange={onDinnerRadioChange}/>
                <label>Annet (ikke fisk)</label>
                <InputNotNull setIsValid={setIsValidDinnerInput} onChange={(e) => setDinnerInput(e.target.value)} value={dinnerInput} 
                className={isValidDinnerInput ? "bg-success" : "bg-danger"} disabled={dinnerRadio !== "annet"} type="textfield" />

                <h4>Dessert</h4>
                <input type="radio" id="riskrem" name="dessert" value="riskrem" onChange={onDessertRadioChange}/>
                <label>Riskrem</label><br/>
                <input type="radio" id="sjokoladepudding" name="dessert" value="sjokoladepudding" onChange={onDessertRadioChange}/>
                <label>Sjokoladepudding</label><br/>
                <input type="radio" id="annet" name="dessert" value="annet" onChange={onDessertRadioChange}/>
                <label>Annet</label>
                <InputNotNull setIsValid={setIsValidDessertInput} onChange={(e) => setDessertInput(e.target.value)} value={dessertInput} 
                className={isValidDessertInput ? "bg-success" : "bg-danger"} disabled={dessertRadio !== "annet"} type="textfield" />

                <br/>
                <input value={specialNeeds} onChange={(e) => setSpecialNeeds(e.target.value)} type="texarea" placeholder="Spesielle behov (hala, vegetar, allergier)"/>
            </div>
            <div className="form-group">
                <label>ID</label><br/>
                <InputNotNull setIsValid={setIsValidPid} onChange={(e) => setPid(e.target.value)} value={pid} 
                className={isValidPid ? "bg-success" : "bg-danger"} type="textarea" id="PID" placeholder="PID eller annen ID dere bruker for å godkjenne familien" />
                <br/>

                <label>Kontaktperson</label><br/>
                <InputNotNull setIsValid={setIsValidContactName} onChange={(e) => setContactName(e.target.value)} value={contactName} 
                className={isValidContactName ? "bg-success" : "bg-danger"} type="textarea" id="kontaktnavn" placeholder="Navn" />

                <InputPhoneNumber setIsValid={setIsValidContactPhoneNumber} onChange={(e) => setContactPhoneNumber(e.target.value)} value={contactPhoneNumber} 
                className={isValidContactPhoneNumber ? "bg-success" : "bg-danger"} type="textarea" id="kontaktperson" placeholder="Telefon" />
                <br/>

                <InputEmail setIsValid={setIsValidContactEmail} onChange={(e) => setContactEmail(e.target.value)} value={contactEmail} 
                className={isValidContactEmail ? "bg-success" : "bg-danger"} type="textarea" id="kontaktepost" placeholder="Epost" />
                <br/>

            </div>
            <input type="submit" value="Send" />
        </form>
    );
}

export default RegistrationForm;