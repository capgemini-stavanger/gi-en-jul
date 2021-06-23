import React from "react";
import {Collapse, NavbarToggler} from 'reactstrap';

interface Props {
    title: string,
    body: string
}

interface State {
    isOpen: boolean,
}
class CollapseContainer extends React.PureComponent<Props,State>{
    state: State = {
        isOpen: false
    };

    onClick = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render () {
            return(
                <div>
                    <NavbarToggler onClick={this.onClick} >
                    <p><strong>{this.props.title}</strong></p>
                    <p>
                    <Collapse isOpen = {this.state.isOpen}>
                        <p>{this.props.body}</p>
                    </Collapse>
                    </p>
                    </NavbarToggler>
                </div>
            )
    }
}

export default CollapseContainer