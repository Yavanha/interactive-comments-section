import classes from './ScoreButton.module.css'
import MinusIcon from '../../UI/Icon/MinusIcon';
import PlusIcon from '../../UI/Icon/PlusIcon';
const ScoreButton = props => {

    return (
        <div className={classes.likes }>
            <button disabled={props.disabledPlus} onClick={props.onPlus}><PlusIcon /></button>
            <div className={classes.score}>{props.score}</div>
            <button disabled={!props.disabledPlus} onClick={props.onMinus}><MinusIcon /></button>
        </div>
    )
}
export default ScoreButton;