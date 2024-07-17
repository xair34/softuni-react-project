import { Link } from "react-router-dom"

export default function NavigationElement({
    text,
    path
}) {
    return (
        <div>
            <Link to={path} className="capitalize">{text}</Link>
        </div>
    );
}