
import classes from './Input.module.css';

const Input = ((props, ref) => {
    return (
        <input ref={ref} className = {classes.myInput} {...props}/>
        );
});

export default Input;