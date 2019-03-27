export const updateObject =(oldObject,newProperties)=>{
    return({
        ...oldObject,
        ...newProperties //needs to be object only
    })
} 



export const checkValidity =(value,rules)=>{
    let valid=true;
    let errorMessage ='';
    if(rules) {
        if(rules.required===true && valid){
            valid = value.trim()!=='';
            if (valid === false){
                errorMessage = "value is required";
            }
        }
        if(rules.isEmail===true && valid){
            const pattern =/^\w+([./-]?\w+)*@\w+([./-]?\w+)*(\w{2,3})+$/;
            valid = pattern.test(value);
            if (valid === false){
                errorMessage = "invalid email";
            }
        }
        if(rules.minLength && valid){
            valid = value.trim().length >= rules.minLength;
            if (valid === false){
            errorMessage = "minimun length should be : " + rules.minLength ;
        }}

        if(rules.maxLength && valid){
            valid= value.trim().length<=rules.maxLength;
            if (valid === false){
            errorMessage = "exceeds maximum length : " + rules.maxLength ;
        }}
    }
    return {valid , errorMessage};
}
