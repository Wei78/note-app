import { HeaderProps } from './Header.props';
import './Header.css';

export const Header = ({ ...props }: HeaderProps): JSX.Element => {

    return (
        <header {...props}>
            <h2>Noteapp</h2>
            <i className="fa-solid fa-circle-plus" style={{color: "#272829"}} onClick={props.handleOpen}></i>
        </header>
    );
};