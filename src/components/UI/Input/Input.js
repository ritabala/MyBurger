import React from 'react';
import Classes from './Input.css';


const input = (props) =>{
    let inputelement = null;
    let inputClass=[];
    
    inputClass.push(Classes.InputElement);
// console.log(props)
    if (props.valid === false && props.touched){
        inputClass.push(Classes.Invalid);   
    }
    switch(props.elementtype){
        case('input'):
            inputelement=<input onChange={props.changed}  
                                className={inputClass.join(' ')} 
                                type={props.elementconfiq.type} 
                                placeholder={props.elementconfiq.placeholder}/>
            break;

        case('textarea'):
            inputelement=<textarea {...props}/>  
            break;

        case ('select'):
            const options = props.elementconfiq.options.map((occ)=>{
                                return <option value={occ.value} key={occ.value}>{occ.displayValue}</option>
                            })
            inputelement = <select onChange={props.changed} value={props.value} className={inputClass.join(' ')} >
                                {options}    
                            </select>
            break;   

        default :
            inputelement=<input {...props}/>
            break;      
    }
    return(
        <div>
            <label className={Classes.Label} ></label>
            {inputelement}
           { (!props.valid)?<p className={Classes.ValidationError}>{props.errorMessage}</p>:null}
        </div>
    )
}

export default input;