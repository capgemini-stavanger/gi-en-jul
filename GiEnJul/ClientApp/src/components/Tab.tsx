import * as React from 'react';
import { Route } from 'react-router-dom';
import { Link, animateScroll as scroll } from "react-scroll";
import { Button } from 'reactstrap';
import './Tab.css'

interface TabState{
    isVisible: boolean, 

};
interface TabProps {
    maxPagePosition: number, 
    textField: string,
    styling: string,
    path: string,

}

class Tab extends React.PureComponent<TabProps, TabState> {
    state: TabState = {
        // optional second annotation for better type inference
        isVisible: false,
      };

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
      }
    
      componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
      };

    handleScroll= () => {
        if (window.pageYOffset > this.props.maxPagePosition) {
            this.setState({isVisible: true});
        }
        else{
            this.setState({isVisible: false});
        }
    }
    
    render(){
        if(this.state.isVisible){
            if(this.props.path == 'top'){
                return(

                    <Button className={this.props.styling} onClick = {() => {scroll.scrollToTop()}}> {this.props.textField} </Button>
                )
            }
            else{
                return(
                    <Route render={({ history}) => (
                        <Button className={this.props.styling} onClick={() => { history.push(this.props.path) }}>{this.props.textField}
                        </Button>)}/>
                )
            }
            
        }
        else{
            return(
                null
            )
        }
        }
    }

export default Tab
