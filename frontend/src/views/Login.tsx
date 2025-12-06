import { useState } from 'react';
import api from '../services/api'; // Certifique-se que o caminho está correto
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
        // Centralização da tela
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            fontFamily: "'Poppins', sans-serif"
        }}>
            
            {/* Div de login */}
            <div style={{
                width: '100%',
                maxWidth: '350px',
                backgroundColor: '#ffffff',
                padding: '40px',
                borderRadius: '15px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                textAlign: 'center'
            }}>
                
                <h2 style={{ 
                    color: '#333', 
                    marginBottom: '30px', 
                    marginTop: 0 
                }}>
                    Login Escolar
                </h2>
                
                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <input 
                        type="email"
                        placeholder="E-mail" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                        style={{
                            width: '100%',
                            padding: '15px',
                            borderRadius: '8px',
                            border: '1px solid #e1e1e1',
                            backgroundColor: '#f9f9f9',
                            fontSize: '16px',
                            boxSizing: 'border-box'
                        }}
                    />
                    
                    <input 
                        type="password" 
                        placeholder="Senha" 
                        value={senha} 
                        onChange={e => setSenha(e.target.value)} 
                        style={{
                            width: '100%',
                            padding: '15px',
                            borderRadius: '8px',
                            border: '1px solid #e1e1e1',
                            backgroundColor: '#f9f9f9',
                            fontSize: '16px',
                            boxSizing: 'border-box'
                        }}
                    />
                    
                    <button 
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '15px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '18px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            marginTop: '10px'
                        }}
                    >
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
}