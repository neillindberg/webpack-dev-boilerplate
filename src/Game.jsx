import React from 'react';
import MemCard from './MemCard';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showCover: true,
            selectedGroup: null,
            deck: []
        }
    }

    componentDidMount() {
        console.log("Game - componentDidMount");
        this.setState({ deck: this.props.deck });
    }

    startGame() {
        console.log("******** START GAME **********");
        if (!this.state.gameOn) {
            this.setState({ showCover: !this.state.showCover, gameOn: true });
        }
    }

    markFlip = (idString) => {
        // TODO: Flip doesn't happen on non-matching 2nd choice. We want to show the user the 2nd and then flip both back over.
        const { lastCardClicked, selectedGroup, deck } = this.state;
        const card = deck.find(x => x.id === idString);
        // console.log('markFlip ENTER: ', deck, " ID STRING: ", idString, " last? ", lastCardClicked, selectedGroup);
        // console.log('should be a single card: ', card);
        // fresh flip, set card and group (show face)
        if (!lastCardClicked && !selectedGroup) {
            console.log('fresh flip, set card and group (show face) - showFace true');
            card.showFace = true;
            this.setState({ selectedGroup: card.group, lastCardClicked: card.id, deck: deck });
            return;
        }
        // second click on same first card in series, same card, flip back over and reset
        if (card.id === this.state.lastCardClicked) {
            console.log('second click in series, same card, flip back over and reset - showFace false');
            card.showFace = false;
            this.setState({ selectedGroup: null, lastCardClicked: null, deck });
            return;
        }
        //
        // The following two scenarios need to cause a flip first, THEN indicate match/no-match (disappear or flip back over)
        //
        // second flip, diffrent index than first, NOT same group = NO MATCH = reset (flip all non-found back over)
        if (card.id !== lastCardClicked && card.group !== selectedGroup) {
            console.log('second flip, different index than first, NOT same group = NO MATCH = reset (flip all non-found back over)');
            const lastCard = deck.find(x => x.id === lastCardClicked);
            card.showFace = true;
            this.setState({ deck });
            setTimeout(() => {
                card.showFace = false;
                lastCard.showFace = false;
                this.setState({ selectedGroup: null, lastCardClicked: null, deck });
            }, 1000);
            return;
        }
        // second flip, different index than first, same group = match found (dead card spots)
        if (card.id !== lastCardClicked && card.group === selectedGroup) {
            console.log('second flip, different index than first, same group = match found (dead card spots)');
            const lastCard = deck.find(x => x.id === lastCardClicked);
            card.showFace = true;
            this.setState({ deck });
            setTimeout(() => {
                card.found = true;
                lastCard.found = true;
                this.setState({ selectedGroup: null, lastCardClicked: null, deck });
            }, 1000);
            return;
        }
    }

    render() {
        return (
            <div onClick={() => this.state.gameOn || this.startGame()}>
                {
                    this.state.showCover ?
                        <div
                            className='cover'
                        >Xin Ya's Memory Game</div> :
                        <div
                            className='game'
                        >
                            {console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>> GAME RERENDER <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')}
                            {this.state.deck.map((cardData, mapIndex) => {
                                const idKey = 'card_' + mapIndex;
                                cardData.id = idKey;
                                    return <MemCard {...cardData}
                                    onClick={this.markFlip}
                                    id={idKey}
                                    key={idKey} />})}
                        </div>
                }
            </div>);
    }
}