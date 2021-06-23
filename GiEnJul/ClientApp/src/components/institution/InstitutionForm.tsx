import * as React from 'react';
import { useState } from 'react';
import Location from './InstitutionLocation';
import InstitutionPerson from './InstitutionPerson';



let prelokasjon: {[name: string]: boolean} = {
    'Stavanger': false,
    'Sandnes': false,
    'Bodø': false,
    'Sola': false,
    'Nittedal': false,
};

function RegistrationForm() {
    const [formpersons, setPersons] = useState([1]);
    const [Lokasjon, setLokasjon] = useState(prelokasjon);


        function addPerson(){
            setPersons(formpersons => [...formpersons,setPersons.length+1]);
        }

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const name = event.target.id;
            const val = event.target.checked
            setLokasjon(prevLoc => ({...prevLoc,[name]:val}))
        }

        return(
            <form className="thisclass">
                <div>
                    <h3>Hvor ønsker du å registrere familie (velg en)</h3>
                    <div>
                        {
                        Object.keys(Lokasjon).map((k1, i1) => (
                            <Location key={k1+i1} check={Lokasjon[k1]} onchange={handleChange} name={k1}/>
                        ))}
                    </div>         
                </div>
                <div>
                    {formpersons.map(p =>
                        <InstitutionPerson key={p} personid={p} />)}
                </div>
                <input type="button" onClick={addPerson} value="Legg til flere" />
                <div className="form-group">
                            <h3>Matønsker</h3>
                            <h4>Middag</h4>
                            <input type="radio" id="ribbe" name="middag" value="ribbe"/>
                            <label>Ribbe</label><br/>
                            <input type="radio" id="pinnekjøtt" name="middag" value="pinnekjøtt"/>
                            <label>Pinnekjøtt</label><br/>
                            <input type="radio" id="annet" name="middag" value="annet"/>
                            <label>annet (ikke fisk)</label><input type="textfield" />
                            <h4>Dessert</h4>
                            <input type="radio" id="riskrem" name="dessert" value="riskrem"/>
                            <label>Riskrem</label><br/>
                            <input type="radio" id="sjokoladepudding" name="dessert" value="sjokoladepudding"/>
                            <label>Sjokoladepudding</label><br/>
                            <input type="radio" id="annet" name="dessert" value="annet"/>
                            <label>Annet</label><br/>
                            <input type="texarea" placeholder="Spesielle behov (hala, vegetar, allergier)"/>
                        </div>
                        <div className="form-group">
                            <label>ID</label><br/>
                            <input type="textarea" id="PID" placeholder="PID eller annen ID dere bruker for å godkjenne familien" /><br/>
                            <label>Kontaktperson</label><br/>
                            <input type="textarea" id="kontaktnavn" placeholder="Navn" /> <input type="textarea" id="kontaktperson" placeholder="Telefon" /><br/>
                            <input type="textarea" id="kontaktepost" placeholder="Epost" /><br/>
                        </div>
                        <input type="submit" value="Send" />
            </form>
        );
    }

export default RegistrationForm;