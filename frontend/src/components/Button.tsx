import React from "react";

interface IButton {
    name: string;
    onClick?: () => void;
};

const Button: React.FC<IButton> = ({ name, onClick }) => {
    return (
        <button onClick={onClick} className="text-white bg-zinc-500 px-2 py-2 w-32 rounded-md hover:bg-zinc-800">{name}</button>
    )
};

export default Button;
