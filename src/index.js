import _ from 'lodash';
import './style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Game from './Game';


const shuffle = (deck) => {
    let numCards = deck.length;
    const unshuffled = deck.splice(0);
    const shuffled = [];
    while (numCards > 0) {
        const cardToSelect = Math.floor(Math.random() * numCards);
        const theCard = unshuffled.splice(cardToSelect, 1);
        shuffled.push(theCard[0]);
        numCards--;
    }
    return shuffled;
};
const baseSet = ['yellow', 'orange', 'red', 'blue', 'green', 'purple', 'magenta', 'teal'].map((color, group) => {
    return { value: color, group };
});
// const duplicateSet = [...baseSet, ...baseSet]; // Leaves reference!!! And, you thought you were smooth!
const duplicateSet = _.cloneDeep(baseSet).concat(_.cloneDeep(baseSet));
// add index
const shuffled = shuffle(duplicateSet.splice(0));

ReactDOM.render(
    <Game deck={shuffled} />,
    document.getElementById('root')
);