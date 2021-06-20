import { ENOTEMPTY } from 'constants';
import * as React from 'react';
import { Link, animateScroll as scroll } from "react-scroll";
import { Button } from 'reactstrap';
import './Tab.css';

interface ITabState{
    isVisible: boolean,
    isGiverVisible: boolean

}
class Tab extends React.PureComponent<{}, ITabState> {
    constructor(props: boolean){
        super(props)
        this.state  = {
            isVisible: false,
            isGiverVisible: false
        }
    }
    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
      }
    
      componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
      };

    handleScroll= () => {
        if (window.pageYOffset > 140) {
            this.setState({isGiverVisible: true});
            this.setState({isVisible: false});
        }
        if (window.pageYOffset > 300){
            this.setState({isGiverVisible: true});
            this.setState({isVisible: true});
        }
        if (window.pageYOffset < 140){
            this.setState({isGiverVisible: false});
            this.setState({isVisible: false});
        }
    }
    
    render(){
        if (this.state.isVisible && this.state.isGiverVisible){
            return(
                <div>
                    <Button className = 'button-to-top' onClick = {() => {scroll.scrollToTop()}}>Tilbake</Button>
                    <Button className='button-giver' onClick = {() => {scroll.scrollToTop()}}>Bli giver</Button>
                </div>

            )
        }
        if(this.state.isVisible){
            return(
                <Button className = 'button-to-top' onClick = {() => {scroll.scrollToTop()}}>Tilbake</Button>
            )
        }
        if(this.state.isGiverVisible){
            return(
                <Button className='button-giver' onClick = {() => {scroll.scrollToTop()}}>Bli giver</Button>
            )
        }
        else{
            return(
                null
            )
        }
        }
    }

export default Tab
