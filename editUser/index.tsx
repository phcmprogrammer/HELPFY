import { Header } from "../../components/Header";
import { Form } from "../../components/Form";
import { useState, useEffect } from "react";
import { Logo } from "../../components/Logo";
import Message from "../../components/Message/Message";

import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function EditUser() {
    const [userData, setUserData] = useState({}); // Dados do usuário a ser editado
    const [proceed, setProceed] = useState(true);
    const { register } = useForm();
    const nav = useNavigate();
    const { id } = useParams();
    const favorites: String[] = [];
    const [message, setMessage] = useState<string>();
    const [type, setType] = useState('error');
    const genres = ["Jazz", "Pop", "Rock", "Funk", "MPB", "Sertanejo", "K-Pop", "Grunge", "Heavy Metal", "Hard Rock", "Gospel", "Rap", "Trap", "Hip Hop", "Samba", "Pagode", "Forró", "Eletrônica"];

    useEffect(() => {
        // Carregar os dados do usuário a ser editado com base no ID
        axios.get(`http://localhost:3000/users/${id}`)
            .then((response) => {
                setUserData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [id]);

    function updateUser() {
        // Atualizar os dados do usuário no servidor
        axios.put(`http://localhost:3000/users/${id}`, userData)
            .then(() => {
                setType('success');
                setMessage("Dados do usuário atualizados com sucesso! Redirecionando...");
                setTimeout(() => {
                    nav('/');
                }, 3000);
            })
            .catch((error) => {
                setType('error');
                setMessage('Erro ao atualizar os dados do usuário.');
                console.error(error);
            });
    }

    function toggleScreen() {
        // Lógica para verificar os campos e permitir ou não a edição
        // Adapte de acordo com seus requisitos
    }

    function updateFavorites(genre:string) {
        if (!favorites.includes(genre)) {
            favorites.push(genre);
        }
    }

    // Renderização da página de edição
    return (
        <div className="bg-gradient-to-tl from-green-950 to-green-500 h-screen text-white">
            <Header.HeaderWrapper>
                <Link to="/">
                    <Logo />
                </Link>
            </Header.HeaderWrapper>
            {message && <Message type={type} text={message} />}
            {proceed ?
                <Form.FormWrapper handleSubmit={toggleScreen}>
                    {/* Renderize campos de formulário com os dados do usuário a ser editado */}
                    <Form.Input label="Nome de usuário" type="text" name="username" value={userData.username} {...register('username')} />
                    <Form.Input label="E-mail" type="email" name="email" value={userData.email} {...register('email')} />
                    {/* Outros campos de edição */}
                    <div>
                        <Form.Button text="Salvar Alterações" width="400" handleSubmit={updateUser} />
                    </div>
                </Form.FormWrapper>
                :
                <Form.FormWrapper handleSubmit={updateUser}>
                    {/* Campos para edição de outros dados do usuário */}
                    <Form.Input label="Nome de exibição" type="text" name="nickname" value={userData.nickname} {...register('nickname')} />
                    <div className="max-w-md">
                        <hr className="my-2" />
                        <label>Vamos conhecer mais sobre seu gosto musical!<br /></label>
                        {genres.map((genre) => (
                            <button key={genre} className={`mx-1 px-1 my-3 border-2 border-green-500 hover:bg-green-500 hover:text-white rounded-lg focus:bg-green-500`} type="button" onClick={() => updateFavorites(genre)}>{genre}</button>
                        ))}
                        <hr className="my-2" />
                    </div>
                    <Form.Checkbox label="Concordo com os termos de serviço." name="termsOfService" />
                    <Form.Checkbox label="Concordo em receber e-mails sobre novidades e ofertas." name="emails" />
                    <div>
                        <Form.Button text="Salvar Alterações" width="400" type="submit" />
                    </div>
                </Form.FormWrapper>
            }
        </div>
    );
}