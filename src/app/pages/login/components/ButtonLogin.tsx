import { ReactNode } from "react";

interface IButtomLoginProps {
    onClick: () => void;
    type?: "button" | "submit" | "reset";

    children: ReactNode;
}



//React.FC utilizado para definir um parametro de tipagem
export const ButtonLogin: React.FC<IButtomLoginProps> = ({ type, onClick, children }) => {
    return (
        <button type={type} onClick={onClick}>
            {children}
        </button>
    )
}