import React,{Component} from 'react';

export class Stock extends Component{
    render() {
        return(
            <span>
                <h3>SPA </h3> <br/>
                <button className="btn btn-primary mr-3">Add </button>  
                <button className="btn btn-danger">Remove </button>
            </span>
            )
    }
}