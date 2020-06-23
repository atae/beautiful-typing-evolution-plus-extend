import React, {useEffect} from 'react';
import anime from 'anime';
import animation from '../../helpers/canvasAnimation';

export default function Canvas() {
    useEffect(() => { 
        animation();
    }, []);

    return (<canvas id="c"/>);
};