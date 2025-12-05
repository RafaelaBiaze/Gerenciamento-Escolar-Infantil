import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    // Função auxiliar para validar e-mail
    const isValidEmail = (email: string) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        // --- VALIDAÇÕES ---
        if (!email.trim() || !senha.trim()) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        if (!isValidEmail(email)) {
            alert('Por favor, insira um e-mail válido (ex: nome@dominio.com).');
            return;
        }
        // ------------------

        try {
            const response = await api.post('/login', { email, senha });
            localStorage.setItem('token', response.data.token);
            alert('Login realizado com sucesso!');
            navigate('/users');
        } catch (error) {
            alert('Erro no login: Verifique suas credenciais.');
        }
    };

    return (
        <div style={{ padding: 20, display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
            <div style={{ width: '300px', border: '1px solid #ccc', padding: '20px', borderRadius: '8px', background: '#fff' }}>
                <h2 style={{ textAlign: 'center' }}>Login Escolar</h2>
                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <input 
                        placeholder="E-mail" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                    />
                    <input 
                        type="password" 
                        placeholder="Senha" 
                        value={senha} 
                        onChange={e => setSenha(e.target.value)} 
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                    />
                    <button 
                        type="submit"
                        style={{ padding: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
}