import styles from "./Card.module.css";
function Card(props) {
    return (
        <div className={props.styles}>
            {props.children}
        </div>
    )

}

export default Card