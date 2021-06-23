import * as React from 'react';
import CollapseContainer from '../../components/CollapseContainer';

const Questions = () => (
    <div id='questions'>
        <h3>Ofte stilte spørsmål</h3>
        <div>
        <CollapseContainer title='Hva koster det å Gi en jul?' body='Juleeskene skal minimum inneholde ubrukte gaver til minimum 300 per person, og en julemiddag og dessert til hele familien. Hvis ønskelig kan dere bidra med en ekstra middag, som pølse og potetmos, medisterkaker og poteter, julepølse og poteter.'/>
        <CollapseContainer title='Når får jeg familie?' body='Familiene deles ut fortløpende, og vi prøver å gi deg familien din i god tid før jul.' ></CollapseContainer>
        <CollapseContainer title='Kan jeg legge oppi noe ekstra?' body='Dersom du har noe pent brukt som passer til alderen, kan du legge det oppi. Merk: Dette erstatter ikke julegaven, og det må være i god stand.'></CollapseContainer>
        <CollapseContainer title='Kan jeg velge familie selv?' body= 'Du kan komme med ønske for antall familiemedlemmer.'></CollapseContainer>
        {/* <CollapseContainer title='Hvordan vet jeg hva familien ønsker seg?' body='Når du får tildelt familie vil du også få vite hva de ønsker seg. Dersom de ikke har kommet med ønsker, er lue, skjerf, votter, lys, servietter, sjokolade og pledd noen tips.'></CollapseContainer> */}
        </div>
        
    </div>
    
    
)

export default (Questions);