import _ from 'lodash';
import './style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Thing from './Thing';

ReactDOM.render(
    <Thing name="World" />,
    document.getElementById('root')
);