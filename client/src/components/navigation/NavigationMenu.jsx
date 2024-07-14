import NavigationElement from "./NavigationElement";

export default function NavigationMenu() {
    const navElements = [
        {text: 'Home', path: '/'},
        {text: 'Forum', path: '/forum'},
        {text: 'TBD', path: '/'}
    ]
    return (
        <div className="nav-ele-container">
            {navElements.map(navEle => (<NavigationElement key={navEle.text} text={navEle.text} path={navEle.path}/>))}
        </div>
    );
}