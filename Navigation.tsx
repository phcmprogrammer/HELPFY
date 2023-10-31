import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export function Navigation() {
    type User = {
        username: string,
        nickname: string,
        email: string,
        password: string,
        birthdate: string,
        favGenres: string[],
    }
    const [user, setUser] = useState<User>();
    useEffect(() => {
        const user: string | null= (localStorage.getItem("loggedUser")); 
        user ? setUser(JSON.parse(user)) : null
    }, [])
    function logOut() {
        localStorage.removeItem("loggedUser");
        window.location.reload();
    }
    return (
        <nav className="flex items-center mr-8 text-base">
            <ul className="flex gap-9">
                <li className="font-bold hover:text-green-500">Premium</li>
                <Link to="/faq" replace={true}>
                    <li className="font-bold hover:text-green-500">Suporte</li>
                </Link>
                <Link to="/search" replace={true}>
                    <li className="font-bold hover:text-green-500">Busca</li>
                </Link>
                <li className="font-bold hover:text-green-500">Baixar</li>
                <li>|</li>
                {user ?
                    <>
                        <Link to="/editUser" replace = {true}> <li className="hover:text-green-500">Olá, {user.username}!</li>
                        </Link>
                            <a className="hover:text-green-500 hover:click" onClick={logOut}>Sair</a>
                    </>
                    :
                    <>
                        <Link to="/signUp" replace={true}>
                            <li className="hover:text-green-500">Inscrever-se</li>
                        </Link>
                        <Link to="/login" replace={true}>
                            <li className="hover:text-green-500">Entrar</li>
                        </Link>
                    </>
                }
            </ul>
        </nav>
    )
}