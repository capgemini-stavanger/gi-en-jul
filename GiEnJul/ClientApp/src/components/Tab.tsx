import * as React from 'react';
import { Link, animateScroll as scroll } from "react-scroll";
import './Tab.css';

interface ITabState{
    isVisible: boolean;
}

class Tab extends React.PureComponent<{}, ITabState> {
    constructor(props: boolean){
        super(props)
        this.state  = {
            isVisible: false
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
            this.setState({isVisible: true});
        }
        else{
              this.setState({ isVisible: false});
        }
    }
    
    render(){
        if(this.state.isVisible){
            return(
                <div className='button-to-top' onClick = {() => {scroll.scrollToTop()}}>Til toppen</div>
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
