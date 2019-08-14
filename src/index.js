import _ from 'lodash';
import './styles/style.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import Game from './jsx/Game';

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
    <Game deck={shuffled} shuffle={shuffle} />,
    document.getElementById('root')
);
