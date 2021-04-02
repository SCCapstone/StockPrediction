import React from 'react'
import {apiStockAction} from './lookup'

import { Button, makeStyles, fade } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    button: {
        background: 'linear-gradient(180deg, #FE6B8B 30%, #E8A87C 90%)',
        marginLeft: '5px',
        marginRight: '5px',
        borderRadius: '50px',
        "&:hover": {
            background: 'linear-gradient(180deg, #FE6B8B 0%, #E8A87C 0%)',
        }
    }
}));

export function ActionButton (props) {
    const classes = useStyles();
    const {ticker, isTracking, predict, handleActionBackend} = props

    const handleClick = (event) => {
        event.preventDefault()
        apiStockAction(ticker, predict, handleActionBackend)
    }
    const display = isTracking === true ? 'Remove' : 'Add'
    return predict === true ? <Button variant="contained" className={classes.button} onClick={handleClick}>Predict</Button> : <Button variant="contained" className={classes.button} onClick={handleClick}> {display} </Button>
}