import * as React from 'react';
import ReactDOM from 'react-dom';
import PersonField from './PersonField';


class RegistrationForm extends React.Component <any, any>{
    constructor(props: any) {
        super(props);
        this.state = {
            value: '',
            Lokasjon: {
                'Stavanger':false, 
                'Sandnes':false,
                'Bodø':false,
                'Sola':false,
                'Nittedal':false},
            Alder: 0,
            Kjonn: '',
            Gaveonske: '',
            AlderTilpass: false,
            Persons: 2
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleInputChange(event: { target: any; }) {
        const target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name
        if (name === "Lokasjon") {
            let LokasjonList = this.state.Lokasjon;
            LokasjonList[target.id] = value;
            value = LokasjonList;
        }
        
        this.setState({
            [name]: value,
            });
        console.log(this.state)
    }
    // handleSubmit(event) {
    //     alert('En familie ble sendt inn: ' + this.state.value);
    //     event.preventDefault();
    // }
    handleClick() {
        // let nrPersons = this.state.Persons; 
        console.log("yea mate")
        const elem = <PersonField personid={40} />
        // this.setState({Persons: nrPersons+1})
        ReactDOM.render(elem,document.getElementById("persons"));
        // return( <PersonField personid={40} />);
    }



    render() {
        return ( 
            <form>
                <label>
                    <h3>Hvor ønsker du å registrere familie (velg en)</h3>
                        <div className= "form-group">
                            <input
                            name="Lokasjon"
                            type="checkbox"
                            id="Stavanger"
                            checked={this.state.Lokasjon["Stavanger"]}
                            onChange={this.handleInputChange} />
                            Stavanger
                            <input
                            name="Lokasjon"
                            type="checkbox"
                            id="Sandnes"
                            checked={this.state.Lokasjon["Sandnes"]}
                            onChange={this.handleInputChange} />
                            Sandnes
                            <input
                            name="Lokasjon"
                            type="checkbox"
                            id="Bodø"
                            checked={this.state.Lokasjon["Bodø"]}
                            onChange={this.handleInputChange} />
                            Bodø
                            <input
                            name="Lokasjon"
                            type="checkbox"
                            id="Sola"
                            checked={this.state.Lokasjon["Sola"]}
                            onChange={this.handleInputChange} />
                            Sola
                            <input
                            name="Lokasjon"
                            type="checkbox"
                            id="Nittedal"
                            checked={this.state.Lokasjon["Nittedal"]}
                            onChange={this.handleInputChange} />
                            Nittedal
                        </div>
                        <br />
                        <div className="form-group" id="persons">
                            <PersonField personid={1} />
                            <PersonField personid={2} />
                        </div>
                        <div>
                            <button onClick={this.handleClick}>
                                Legg til personer
                            </button>
                        </div>
                        <br />
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
                </label>
                <input type="submit" value="Send" />
            </form>
        );
    }

}

export default RegistrationForm;