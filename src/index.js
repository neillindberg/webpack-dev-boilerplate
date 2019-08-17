import _ from 'lodash';
import './styles/style.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import Game from './jsx/Game';
// Sounds
// TODO: Think about a separate audio component with a SRC prop switch?
import lestPlaySrc from './sounds/xinya_lets_play.m4a';
import wowsSrc from './sounds/xinya_wow.m4a';
import utOhSrc from './sounds/xinya_ut_oh.m4a';
import tickleLaughSrc from './sounds/xilong_tickle_laugh_3_4_secs.m4a';

// React supports several HTML5 <audio> props - onEnded, autoPlay, etc.
const sounds = [
    {
        id: 'intro',
        src: lestPlaySrc
    },
    {
        id: 'nomatch',
        src: utOhSrc
    },
    {
        id: 'match',
        src: wowsSrc
    },
    {
        id: 'load',
        src: tickleLaughSrc,
        autoPlay: true
    }
];
// TODO: Inject card functions to game (perhaps encapsulte them in their own functional programming js file... :/)
const shuffle = (deck) => {

        let numCards = deck.length;
        const unshuffled = deck.splice(0),
            shuffled = [];
        while (numCards > 0) {

            const cardToSelect = Math.floor(Math.random() * numCards),
                theCard = unshuffled.splice(cardToSelect, 1);
            shuffled.push(theCard[0]);
            numCards--;

        }
        return shuffled;

    },
    baseSet = [
        'yellow',
        'orange',
        'red',
        'blue',
        'green',
        'purple',
        'teal',
        'pink'
    ].map((color, group) => ({'value': color,
        group})),
    // Const duplicateSet = [...baseSet, ...baseSet]; // Leaves reference!!! And, you thought you were smooth!
    duplicateSet = _.cloneDeep(baseSet).concat(_.cloneDeep(baseSet)),
    shuffled = shuffle(duplicateSet.splice(0));
    
ReactDOM.render(
    <Game deck={shuffled} shuffle={shuffle} sounds={sounds} />,
    document.getElementById('root')
);
