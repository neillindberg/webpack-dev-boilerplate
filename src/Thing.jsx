import React, {Fragment} from 'react';


export default class Thing extends React.Component {
    constructor(props) {
        super(props);
    }

    // hide = () => {
    //     this.setState({ showCover: !this.state.showCover })
    // }

    render() {
        return (
            <Fragment>
                {/* FIXME: Arrow function breaks (figure out Babel): <div className='cover' onClick={ this.hide() }>Xin Ya's Memory Game</div> */}
                <div 
                className='cover' 
                style={ { background: (this.state.showCover) ? 'red' : 'black'} }
                onClick={ () => this.setState({showCover: !this.state.showCover}) }
                >Xin Ya's Memory Game</div>
            </Fragment>);
    }
}