import * as React from 'react';
import { useState } from 'react';
import Locations from './InstitutionLocations';
import FormPerson from './FormPerson';
import IFormPerson from './IFormPerson';
import Gender from '../../common/enums/Gender';
import InputValidator from '../InputFields/Validators/InputValidator';
import { isEmail, isNotNull, isPhoneNumber } from '../InputFields/Validators/Validators';
import { Button, TextField } from '@material-ui/core';
import FormFood from './FormFood';
import { DINNERS } from '../../common/constants/Dinners';
import { DESSERTS } from '../../common/constants/Desserts';


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
    const [viewErrorTrigger, setViewErrorTrigger] = useState(0);

    const [persons, setPersons] = useState([{} as IFormPerson]);

    const [location, setLocation] = useState("");
    const [isValidLocation, setIsValidLocation] = useState(false);
    
    const [dinnerRadio, setDinnerRadio] = useState("");
    const [dinnerInput, setDinnerInput] = useState("");
    const [isValidDinner, setIsValidDinner] = useState(false);

    const [dessertRadio, setDessertRadio] = useState("");
    const [dessertInput, setDessertInput] = useState("");
    const [isValidDessert, setIsValidDessert] = useState(false);

    const [specialNeeds, setSpecialNeeds] = useState("");

    const [pid, setPid] = useState("");

    const [contactName, setContactName] = useState("");
    const [isValidContactName, setIsValidContactName] = useState(false);

    const [contactPhoneNumber, setContactPhoneNumber] = useState("");
    const [isValidContactPhoneNumber, setIsValidContactPhoneNumber] = useState(false);

    const [contactEmail, setContactEmail] = useState("");
    const [isValidContactEmail, setIsValidContactEmail] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const addPerson = () => {
        setPersons(formpersons => [...formpersons, {} as IFormPerson]);
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

    const getDinner = () => {
        return dinnerRadio === "annet" ? dinnerInput : dinnerRadio;
    }

    const getDessert = () => {
        return dessertRadio === "annet" ? dessertInput : dessertRadio;
    }

    const allIsValid = () => {
        return isValidDinner &&
            isValidDessert &&
            isValidLocation &&
            isValidContactName &&
            isValidContactPhoneNumber &&
            isValidContactEmail &&
            persons.every(p => {
                return p.isValidAge && p.isValidGender && p.isValidWish;
            })
    }

    const resetForm = () => {
        setViewErrorTrigger(0);

        setIsValidContactName(false);
        setIsValidContactPhoneNumber(false);
        setIsValidContactEmail(false);

        setPersons([]);
        addPerson();
        setLocation("");
        setDinnerRadio("");
        setDinnerInput("");
        setDessertRadio("");
        setDessertInput("");
        setSpecialNeeds("");
        setPid("");
        setContactName("");
        setContactEmail("");
        setContactPhoneNumber("");
    }

    const onSuccessSubmit = () => {
        alert("Familie registrert!");
        resetForm();
    }

    const onSubmitForm = async (e : any) => {
        e.preventDefault();
        if (!allIsValid()) {
            setViewErrorTrigger(v => v + 1);
            return;
        }

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
            Dinner:getDinner() ,
            Dessert:getDessert() ,
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
        setIsLoading(true);
        await fetch('/api/recipient', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(submit)
        })
        .then((response) => {
            if (response.status === 201) {
                setIsLoading(false);
                setTimeout(onSuccessSubmit, 10);
                return;
            }
        })
        .catch((errorStack) => {
            console.error(errorStack);
        })
        setIsLoading(false);
        setTimeout(() => alert("En feil oppsto. Vennligst prøv på nytt."), 10);
    }

    return(
        <form className="thisclass" onSubmit={onSubmitForm}>
            <Locations
                value={location}
                onChange={onLocationChange}
                viewErrorTrigger={viewErrorTrigger}
                setIsValidLocation={setIsValidLocation}
                include_header
            />
            {persons.map((p, i) =>
                <FormPerson 
                    key={"person" + i} 
                    person={p} 
                    viewErrorTrigger={viewErrorTrigger}
                    updatePerson={(newPerson: IFormPerson) => updatePerson(newPerson, i)} 
                />)}
            <Button 
            startIcon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                           <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                       </svg>} 
            variant="contained" color="primary" onClick={addPerson}>Legg til flere</Button>
            <div className="form-group">
                <h3>Matønsker</h3>
                <FormFood
                    viewErrorTrigger={viewErrorTrigger}
                    setInput={setDinnerInput}
                    input={dinnerInput}
                    radio={dinnerRadio}
                    onRadioChange={onDinnerRadioChange}
                    foods={DINNERS}
                    required
                    header={"Middag"}
                    inputLabel="Annen middag"
                    setIsValid={setIsValidDinner}
                />
                <FormFood
                    viewErrorTrigger={viewErrorTrigger}
                    setInput={setDessertInput}
                    input={dessertInput}
                    radio={dessertRadio}
                    onRadioChange={onDessertRadioChange}
                    foods={DESSERTS}
                    required
                    header={"Dessert"}
                    inputLabel="Annen dessert"
                    setIsValid={setIsValidDessert}
                />
                <br/>
                <label>Spesielle behov (hala, vegetar, allergier)</label><br/>
                <TextField
                    variant="outlined"
                    value={specialNeeds} 
                    onChange={(e) => setSpecialNeeds(e.target.value)} 
                    type="texarea" 
                    label="Spesielle behov"
                />
            </div>
            <div className="form-group">
                <label>ID</label><br/>
                <TextField
                    variant="outlined"
                    onChange={(e) => setPid(e.target.value)} 
                    value={pid} 
                    name="pid" 
                    id="PID" 
                    label="PID" 
                />
                <br/>

                <label>Kontaktperson</label><br/>
                <InputValidator 
                    viewErrorTrigger={viewErrorTrigger}
                    validators={[isNotNull]}
                    setIsValids={setIsValidContactName} 
                    errorMessages={['Vennligst skriv inn et navn']}
                    onChange={(e) => setContactName(e.target.value)} 
                    value={contactName} 
                    name="cname" 
                    id="kontaktnavn" 
                    label="Navn" 
                />

                <InputValidator 
                    viewErrorTrigger={viewErrorTrigger}
                    validators={[isPhoneNumber, isNotNull]}
                    setIsValids={setIsValidContactPhoneNumber} 
                    errorMessages={['Telefonnummeret er ikke gyldig', 'Vennligst skriv inn et telefonnummer']}
                    onChange={(e) => setContactPhoneNumber(e.target.value)} 
                    value={contactPhoneNumber} 
                    name="cphone" 
                    id="kontaktperson" 
                    label="Telefon" 
                    autoComplete="tel"
                />
                <br/>

                <InputValidator 
                    viewErrorTrigger={viewErrorTrigger}
                    validators={[isEmail, isNotNull]}
                    setIsValids={setIsValidContactEmail} 
                    errorMessages={['Eposten er ikke gyldig', 'Vennligst skriv inn en epost']}
                    onChange={(e) => setContactEmail(e.target.value)} 
                    value={contactEmail} 
                    name="cemail" 
                    id="kontaktepost" 
                    label="Epost" 
                    autoComplete="email"
                />
                <br/>

            </div>
            <input type="submit" value="Send" />
            {isLoading && <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>}
        </form>
    );
}

export default RegistrationForm;
