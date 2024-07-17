import NavigationElement from "./NavigationElement";
import styles from './NavigatioMenu.module.css';
export default function NavigationMenu() {
    const navElements = [
        {text: 'Home', path: '/'},
        {text: 'Forum', path: '/forum'},
        {text: 'Login', path: '/login'}
    ]
    return (
        <div className={styles["nav-ele-container"]}>
            {navElements.map(navEle => (<NavigationElement key={navEle.text} className="navigation-ele" text={navEle.text} path={navEle.path}/>))}
        </div>
    );
}