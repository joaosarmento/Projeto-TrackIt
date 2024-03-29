import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';
import { Rings } from  'react-loader-spinner';


import logo from '../../assets/logo-trackit.png';

export default function Register(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [disable, setDisable] = useState(false);

    const navigate = useNavigate();

    function sendData(event){
        event.preventDefault();
        setDisable(true);
        const  URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up';
        const promise = axios.post(URL, {
            email,
	        name,
	        image,
	        password
        });
        promise.then(response => {
            const {data} = response;
            console.log(data);
            navigate('/');
        });
        promise.catch(erro => {
            alert('Houve um erro no Cadastro! '+ erro.response.status);
            setDisable(false);
        })

    }

    return disable ?(
        <RegisterScreen disabled = {disable}>
            <img className='logo' src={logo} alt='TrackIt Logo' />
            <h1>TrackIt</h1>
            <form onSubmit={sendData}  >
                <input type="email" disabled placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
                <input type="password" disabled placeholder='senha' value={password} onChange={(e) => setPassword(e.target.value)}  required />
                <input type="text" disabled placeholder='nome' value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="url" disabled placeholder='foto' value={image} onChange={(e) => setImage(e.target.value)} required />
                <button disabled type="submit"><Rings color="#FFFFFF"  width={30} /><Rings color="#FFFFFF"  width={30} /><Rings color="#FFFFFF"  width={30} /></button>
            </form>
            <Link to="/"><p>Já tem uma conta? Faça login!</p></Link>
        </RegisterScreen>
    ) : (
        <RegisterScreen>
            <img className='logo' src={logo} alt='TrackIt Logo' />
            <h1>TrackIt</h1>
            <form onSubmit={sendData}  >
                <input type="email" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
                <input type="password" placeholder='senha' value={password} onChange={(e) => setPassword(e.target.value)}  required />
                <input type="text" placeholder='nome' value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="url" placeholder='foto' value={image} onChange={(e) => setImage(e.target.value)} required />
                <button type="submit">Cadastrar</button>
            </form>
            <Link to="/"><p>Já tem uma conta? Faça login!</p></Link>
        </RegisterScreen>
    )
}

const RegisterScreen = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: 'Lexend Deca', sans-serif;

    img{
        height: 100px;
        width: 180px;
        margin-top: 68px;
    }
    h1{
        color: #126BA5;
        font-size: 68.982px;
        margin-bottom: 33px;
        font-family: 'Playball', cursive;
    }
    form{
        display: flex;
        flex-direction: column;
        width: 330px;
    }

    form input{
        height: 45px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        box-sizing: border-box;
        border-radius: 5px;
        margin-bottom: 6px;
        font-size: 20.976px;
        font-family: 'Lexend Deca', sans-serif;
        padding: 10px;
        opacity: ${props => props.disabled ? '0.7' : '1'};
    }
    input::placeholder{  
        padding-left: 1px;
        color: #DBDBDB;
    }

    form button{
        height: 45px;
        background: #52B6FF;
        border-radius: 4.63636px;
        border: none;
        color: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 25px;
        font-size: 20.976px;
        font-family: 'Lexend Deca', sans-serif;
        opacity: ${props => props.disabled ? '0.7' : '1'};
    }
    p{
        color: #52B6FF;
        text-decoration-line: underline;
        font-size: 14px;
    }
`