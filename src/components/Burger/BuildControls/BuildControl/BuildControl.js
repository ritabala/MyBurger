import React from 'react';
import classes from './BuildControl.css';

const buildControl = (props) => {
    // console.log(props.disabled);
    return(
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            {/* <div className={classes.Less} onClick={props.deleted.bind(this,props.type)}>Less</div> */}
            {/* <div className={classes.Less} onClick={()=>{props.deleted(props.type)}}>Less</div> */}
            <button className={classes.Less} onClick={props.deleted} disabled={props.disabled}>Less</button>
            <button className={classes.More} onClick={props.added}>More</button>
        </div>
    ) 
    }

export default buildControl;
