import React from 'react';
import PropTypes from 'prop-types';

export default class MemCard extends React.Component {
    constructor(props) {
        super(props);
    }

    onClick = () => {
        this.props.onClick(this.props.id);
    }


    render() {
        return (<div id={this.props.id}>
            {this.props.found ? <div className={'card found'}></div> :
                this.props.showFace ?
                    <div
                        className={'card face'}
                        style={{ background: this.props.value }}
                        onClick={() => this.onClick(this.props.id)}>
                        <p>{this.props.value}</p>
                    </div> :
                    <div
                        className={'card back'}
                        onClick={() => this.onClick(this.props.id)}>
                    </div>
            }
        </div>
        );
    }
}

MemCard.propTypes = {
    found: PropTypes.bool,
    value: PropTypes.string.isRequired,
    showFace: PropTypes.bool,
    group: PropTypes.number,
    id: PropTypes.string
};