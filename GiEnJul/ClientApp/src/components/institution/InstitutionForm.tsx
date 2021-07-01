import * as React from 'react';
import { useState } from 'react';
import Location from './InstitutionLocation';
import FormPerson from './FormPerson';
import IFormPerson from './IFormPerson';
import LOCATIONS from '../../common/constants/Locations';
import Gender from '../../common/enums/Gender';
import InputValidator from '../InputFields/Validators/InputValidator';
import { isEmail, isNotNull, isPhoneNumber } from '../InputFields/Validators/Validators';


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
    
    const [dinnerRadio, setDinnerRadio] = useState("");
    const [dinnerInput, setDinnerInput] = useState("");

    const [dessertRadio, setDessertRadio] = useState("");
    const [dessertInput, setDessertInput] = useState("");

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

    const getDinner = () => {
        return dinnerRadio === "annet" ? dinnerInput : dinnerRadio;
    }

    const getDessert = () => {
        return dessertRadio === "annet" ? dessertInput : dessertRadio;
    }

    const allIsValid = () => {
        return getDinner() &&
            getDessert() &&
            isValidPid &&
            isValidContactName &&
            isValidContactPhoneNumber &&
            isValidContactEmail &&
            persons.every(p => {
                return p.isValidAge && p.isValidGender && p.isValidWish;
            })
    }

    const onSubmitForm = (e : any) => {
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
        fetch('https://localhost:5001/api/recipient', {
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
                    <FormPerson 
                        key={"person" + i} 
                        person={p} 
                        viewErrorTrigger={viewErrorTrigger}
                        updatePerson={(newPerson: IFormPerson) => updatePerson(newPerson, i)} 
                    />)}
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
                <InputValidator 
                    viewErrorTrigger={viewErrorTrigger}
                    validators={[(input) => {return dinnerRadio !== "annet" || isNotNull(input)}]}
                    errorMessages={['Vennligst velg en middag']}
                    onChange={(e) => setDinnerInput(e.target.value)} 
                    value={dinnerInput} 
                    name="dinner" 
                    disabled={dinnerRadio !== "annet"} 
                    label="Annen middag"
                />

                <h4>Dessert</h4>
                <input type="radio" id="riskrem" name="dessert" value="riskrem" onChange={onDessertRadioChange}/>
                <label>Riskrem</label><br/>
                <input type="radio" id="sjokoladepudding" name="dessert" value="sjokoladepudding" onChange={onDessertRadioChange}/>
                <label>Sjokoladepudding</label><br/>
                <input type="radio" id="annet" name="dessert" value="annet" onChange={onDessertRadioChange}/>
                <label>Annet</label>
                <InputValidator 
                    viewErrorTrigger={viewErrorTrigger}
                    validators={[(input) => {return dessertRadio !== "annet" || isNotNull(input)}]}
                    errorMessages={['Vennligst velg en dessert']}
                    onChange={(e) => setDessertInput(e.target.value)} 
                    value={dessertInput} 
                    name="dessert" 
                    disabled={dessertRadio !== "annet"} 
                    label="Annen dessert"
                />

                <br/>
                <input value={specialNeeds} onChange={(e) => setSpecialNeeds(e.target.value)} type="texarea" placeholder="Spesielle behov (hala, vegetar, allergier)"/>
            </div>
            <div className="form-group">
                <label>ID</label><br/>
                <InputValidator 
                    viewErrorTrigger={viewErrorTrigger}
                    validators={[isNotNull]}
                    errorMessages={['Vennligst skriv inn en pid']}
                    setIsValids={setIsValidPid}
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
        </form>
    );
}

export default RegistrationForm;