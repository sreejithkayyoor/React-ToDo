import styles from "./Loading.module.css";
const Loading = function () {
    return (<div className={styles["lds-roller"]}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>);
}

export default Loading;