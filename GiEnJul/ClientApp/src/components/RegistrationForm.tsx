import * as React from 'react';


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
            AlderTilpass: false
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
        // this.setState({
        //     Lokasjon.Sandnes : true,
        //     });
        console.log(this.state)
    }
    // handleSubmit(event) {
    //     alert('En familie ble sendt inn: ' + this.state.value);
    //     event.preventDefault();
    // }
    render() {
        return ( 
            <form>
                <label>
                    <h3>Hvor ønsker du å registrere familie (velg en)</h3>
                        <div>
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
                        Families here
                </label>
                <input type="submit" />
            </form>
        );
    }

}

export default RegistrationForm;