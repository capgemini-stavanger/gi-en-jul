import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import Gender from '../../common/enums/Gender';
import InputValidator from '../InputFields/Validators/InputValidator';
import { isNotNull } from '../InputFields/Validators/Validators';
import IFormPerson from './IFormPerson';


interface PersonProps {
    updatePerson: (newPerson: IFormPerson) => void,
    viewErrorTrigger: number,
    person: IFormPerson,
}

const InstitutionPerson: FC<PersonProps> = (
    { updatePerson, viewErrorTrigger, person }
    ) => {

    const [age, setAge] = useState("");
    const [gender, setGender] = useState(Gender.Unspecified);
    const [wish, setWish] = useState("");
    const [isAgeWish, setIsAgeWish] = useState(false);
    const [isValidAge, setIsValidAge] = useState(false);
    const [isValidGender, setIsValidGender] = useState(false);
    const [isValidWishInput, setIsValidWishInput] = useState(false);
    const [isValidWish, setIsValidWish] = useState(false);

    useEffect(() => {
        setIsValidWish(isValidWishInput || isAgeWish);
    }, [isValidWishInput, isAgeWish])

    useEffect(() => {
        let tmpPerson = person;
        tmpPerson.age = age;
        tmpPerson.gender = gender;
        tmpPerson.wish = isAgeWish ? undefined : wish;
        tmpPerson.isValidAge = isValidAge;
        tmpPerson.isValidGender = isValidGender;
        tmpPerson.isValidWish = isValidWish;        
        updatePerson(tmpPerson);
    })

    const onAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let strAge = e.target.value;
        let intAge = parseInt(strAge);
        if (intAge) {
            if (intAge > 130) {
                strAge = "130";
            } else if (intAge < 0) {
                strAge = "0";
            }
        }
        setAge(strAge);
    }
    
    const onGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        let newGender = parseInt(e.target.value);
        if (newGender !== Gender.Unspecified) {
            setGender(newGender);
            setIsValidGender(true);
        }
    }

    return(
        <div>
            <InputValidator
                viewErrorTrigger={viewErrorTrigger}
                validators={[isNotNull]}
                setIsValids={setIsValidAge}
                name="age"
                type="number"
                label="Age"
                value={age}
                onChange={onAgeChange}
            />
            <select value={gender} onChange={onGenderChange} className={isValidGender ? "bg-success" : "bg-danger"}>
                {gender === Gender.Unspecified && <option value={Gender.Unspecified}>-- Kjønn --</option>}
                <option value={Gender.Male}>Mann</option>
                <option value={Gender.Female}>Kvinne</option>
                <option value={Gender.Other}>Andre</option>
            </select>
            <InputValidator
                viewErrorTrigger={viewErrorTrigger}
                validators={[(input) => {return isAgeWish || isNotNull(input)}]}
                setIsValids={setIsValidWishInput}
                name="wish"
                label="Gaveønske (husk størrelse)"
                disabled={isAgeWish}
                value={wish}
                onChange={e => setWish(e.target.value)}
            />
            <input
            type="checkbox"
            checked={isAgeWish}
            onChange={e => setIsAgeWish(e.target.checked)}
            />
            <span>Giver kjøper alderstilpasset gave</span>
        </div>
    );
};

export default InstitutionPerson;
