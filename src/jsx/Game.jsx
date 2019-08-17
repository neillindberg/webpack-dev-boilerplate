import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import MemCard from './MemCard';

export default class Game extends React.Component {
    constructor (props) {
        super(props);
        this.secondFlip = false;
        this.state = {
            showCover: true,
            selectedGroup: null,
            deck: [],
            foundCount: 0
        };
    }

    componentDidMount () {
        this.setState({ deck: this.props.deck });
    }

    startGame () {
        if (!this.state.gameOn) {
            document.getElementById('intro').play();
            this.setState({ showCover: false, gameOn: true });
        }
    }

    markFlip = (idString) => {
        if (this.secondFlip) return;
        const { lastCardClicked, selectedGroup, deck } = this.state;
        const card = deck.find(x => x.id === idString);

        // FIRST: fresh flip, set card and group (show face)
        if (!lastCardClicked && !selectedGroup) {
            card.showFace = true;
            this.setState({ selectedGroup: card.group, lastCardClicked: card.id, deck: deck });
            return;
        }
        // DUPLICATE: second click on same first card in series, same card, flip back over and reset
        if (card.id === this.state.lastCardClicked) {
            card.showFace = false;
            this.setState({ selectedGroup: null, lastCardClicked: null, deck });
            return;
        }
        // NOMATCH: second flip, diffrent index than first, NOT same group = NO MATCH = reset (flip all non-found back over)
        if (card.id !== lastCardClicked && card.group !== selectedGroup) {
            document.getElementById('nomatch').play();
            this.secondFlip = true;
            const lastCard = deck.find(x => x.id === lastCardClicked);
            card.showFace = true;
            this.setState({ deck });
            setTimeout(() => {
                this.secondFlip = false;
                card.showFace = false;
                lastCard.showFace = false;
                this.setState({ selectedGroup: null, lastCardClicked: null, deck });
            }, 1000);
            return;
        }
        // MATCH: second flip, different index than first, same group = match found (dead card spots)
        if (card.id !== lastCardClicked && card.group === selectedGroup) {
            document.getElementById('match').play();
            this.secondFlip = true;
            const lastCard = deck.find(x => x.id === lastCardClicked);
            card.showFace = true;
            this.setState({ deck });
            setTimeout(() => {
                this.secondFlip = false;
                card.found = true;
                lastCard.found = true;
                this.setState({ selectedGroup: null, lastCardClicked: null, deck, foundCount: this.state.foundCount + 1 }, this.checkForWin);
            }, 500);
            return;
        }
    }

    checkForWin = () => {
        // TODO: Introduce shuffle, etc., and use that and add some sort of "YOU WON!" animation.
        if (this.props.deck.length / 2 === this.state.foundCount) {
            const deck = this.props.shuffle(this.props.deck.map(card => _.pick(card, ['value', 'group'])));
            this.setState({ gameOn: false, showCover: true, foundCount: 0, deck });
        }
    }

    render () {
        const { deck, gameOn, showCover } = this.state;
        return (
            <Fragment>
                {this.props.sounds.map((sound, index) => <audio {...sound} key={'audio_' + index} />)}
                <div onClick={() => gameOn || this.startGame()}>
                    {
                        showCover ?
                            <div
                                className='cover'
                            >Xin Ya&rsquo;s Memory Game</div> :
                            <div
                                className='game'
                            >
                                {deck.map((cardData, mapIndex) => {
                                    const idKey = 'card_' + mapIndex;
                                    cardData.id = idKey;
                                    return <MemCard {...cardData}
                                        onClick={this.markFlip}
                                        id={idKey}
                                        key={idKey} />;
                                })}
                            </div>
                    }
                </div>
            </Fragment>);
    }
}


Game.propTypes = {
    deck: PropTypes.array,
    sounds: PropTypes.array,
    shuffle: PropTypes.func
};