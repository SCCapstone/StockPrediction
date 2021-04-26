import React from 'react'
import {apiStockAction} from './lookup'

import { Button, makeStyles, fade, Slide, Dialog, DialogContent, DialogContentText, DialogActions, DialogTitle } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    button: {
        background: 'linear-gradient(180deg, #FE6B8B 30%, #E8A87C 90%)',
        margin: '5px',
        borderRadius: '50px',
        "&:hover": {
            background: 'linear-gradient(180deg, #FE6B8B 0%, #E8A87C 0%)',
        }
    },
    dialog: {
        justifyContent: 'center'
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props}/>;
});

export function AddRemoveButton (props) {
    const classes = useStyles();
    const { ticker, isTracking, predict, handleActionBackend } = props;
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClick = (event) => {
        setOpen(false);
        event.preventDefault()
        apiStockAction(ticker, predict, handleActionBackend)
    }
    if (isTracking == true) {
        return (
            <div>
                <Button variant="contained" className={classes.button} onClick={handleClickOpen}>Remove</Button>
                <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleClose} aria-labelledby="alert-title" aria-describedby="alert-description">
                    <DialogTitle id="alert-title">{"Remove stock?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-description">Are you sure you want to remove this stock? Doing so will remove it from your list of tracked stocks.</DialogContentText>
                    </DialogContent>
                    <DialogActions className={classes.dialog}>
                        <Button variant="contained" className={classes.button} onClick={handleClick}>
                            Remove
                        </Button>
                        <Button variant="contained" className={classes.button} onClick={handleClose}>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    } else {
        return (
            <div>
                <Button variant="contained" className={classes.button} onClick={handleClick}>
                    Add
                </Button>
            </div>
        )
    }
}

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