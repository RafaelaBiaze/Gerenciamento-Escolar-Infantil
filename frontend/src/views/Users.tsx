import { useEffect, useState } from 'react';
import api from '../services/api';
import { useWebSocket } from '../hooks/useWebSocket';

interface UserForm {
    login: string;
    email: string;
    senha: string;
    role: number;
}

export default function Users() {
    const [users, setUsers] = useState<any[]>([]);
    const [form, setForm] = useState<UserForm>({ login: '', email: '', senha: '', role: 3 });
    const [editingId, setEditingId] = useState<number | null>(null);
    
    // --- ESTADOS DA PAGINAÇÃO ---
    const [offset, setOffset] = useState(0); 
    const [limit] = useState(10); 
    const [nextOffset, setNextOffset] = useState<number | null>(null);
    // -----------------------------

    const { sendMessage } = useWebSocket();

    const fetchUsers = async () => {
        try {
            const res = await api.get(`/api/users?limit=${limit}&offset=${offset}`);
            setUsers(res.data.rows || []);
            setNextOffset(res.data.next); 
        } catch (error) { console.error(error); }
    };

    useEffect(() => { fetchUsers(); }, [offset]);

    // --- FUNÇÕES DE NAVEGAÇÃO ---
    const handleNext = () => {
        if (nextOffset !== null) setOffset(nextOffset);
    };

    const handlePrev = () => {
        const newOffset = offset - limit;
        if (newOffset >= 0) setOffset(newOffset);
    };

    // --- VALIDAÇÃO ---
    const validateForm = () => {
        if (form.login.trim().length < 3) {
            alert("O Login deve ter pelo menos 3 caracteres.");
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(form.email)) {
            alert("Insira um e-mail válido (ex: usuario@dominio.com).");
            return false;
        }
        // Se for criação (não tem ID editando), senha é obrigatória e deve ser forte
        if (!editingId && form.senha.length < 6) {
            alert("A senha deve ter no mínimo 6 caracteres.");
            return false;
        }
        return true;
    };

    const handleSave = async () => {
        if (!validateForm()) return; 

        try {
            if (editingId) {
                await api.put(`/api/users/${editingId}`, form);
                sendMessage('atualizacao', { msg: `Usuário editado: ${form.login}` });
                alert('Usuário atualizado!');
            } else {
                await api.post('/api/users', form);
                sendMessage('atualizacao', { msg: `Novo usuário criado: ${form.login}` });
                alert('Usuário salvo!');
            }
            fetchUsers();
            cancelEdit();
        } catch (e) { 
            console.error(e);
            alert('Erro ao salvar. Verifique se o login ou e-mail já existem.'); 
        }
    };

    const handleEdit = (user: any) => {
        setForm({ login: user.login, email: user.email, senha: '', role: user.id_role || user.role?.id || 3 });
        setEditingId(user.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cancelEdit = () => {
        setForm({ login: '', email: '', senha: '', role: 3 });
        setEditingId(null);
    };

    const handleDelete = async (id: number) => {
        if (confirm('Tem certeza?')) {
            await api.delete(`/api/users/${id}`);
            fetchUsers();
        }
    };

    // --- ESTILO REUTILIZÁVEL ---
    const inputStyle = {
        width: '100%',
        padding: '15px',
        border: '1px solid #e1e1e1',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        fontSize: '15px',
        fontFamily: 'inherit',
        outline: 'none',
        boxSizing: 'border-box' as const 
    };

    return (
        // Container Principal
        <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto', fontFamily: "'Poppins', sans-serif", color: '#333' }}>
            
            <h1 style={{ textAlign: 'center', marginBottom: '40px', fontWeight: '600' }}>Gestão de Usuários</h1>
            
            {/* --- CARTÃO DO FORMULÁRIO --- */}
            <div style={{ 
                backgroundColor: '#ffffff', 
                padding: '30px', 
                borderRadius: '15px', 
                boxShadow: '0 10px 25px rgba(0,0,0,0.05)', 
                marginBottom: '40px' 
            }}>
                <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#444', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                    {editingId ? `Editando Usuário #${editingId}` : 'Novo Usuário'}
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <input 
                        placeholder="Login (mín. 3 caracteres)" 
                        value={form.login} 
                        onChange={e => setForm({...form, login: e.target.value})} 
                        style={inputStyle}
                    />
                    <input 
                        placeholder="Email (ex: nome@teste.com)" 
                        value={form.email} 
                        onChange={e => setForm({...form, email: e.target.value})} 
                        style={inputStyle}
                    />
                    <input 
                        type="password" 
                        placeholder={editingId ? "Nova Senha (opcional)" : "Senha (mín. 6 caracteres)"} 
                        value={form.senha} 
                        onChange={e => setForm({...form, senha: e.target.value})} 
                        style={inputStyle}
                    />
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '14px', fontWeight: '600', color: '#555' }}>Nível de Acesso:</label>
                        <select 
                            value={form.role} 
                            onChange={e => setForm({...form, role: Number(e.target.value)})} 
                            style={{ ...inputStyle, cursor: 'pointer' }}
                        >
                            <option value={1}>Administrador</option>
                            <option value={2}>Professor</option>
                            <option value={3}>Responsável</option>
                        </select>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                        <button 
                            onClick={handleSave} 
                            style={{ 
                                flex: 1, 
                                padding: '15px', 
                                backgroundColor: editingId ? '#ffc107' : '#007bff', // Azul padrão, Amarelo se editar
                                color: editingId ? '#000' : 'white', 
                                border: 'none', 
                                borderRadius: '8px', 
                                cursor: 'pointer', 
                                fontWeight: '600',
                                fontSize: '16px',
                                transition: 'background 0.3s'
                            }}
                        >
                            {editingId ? 'Atualizar Usuário' : 'Salvar Novo Usuário'}
                        </button>
                        
                        {editingId && (
                            <button 
                                onClick={cancelEdit} 
                                style={{ 
                                    padding: '15px', 
                                    backgroundColor: '#6c757d', 
                                    color: 'white', 
                                    border: 'none', 
                                    borderRadius: '8px', 
                                    cursor: 'pointer', 
                                    fontWeight: '600' 
                                }}
                            >
                                Cancelar
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* --- LISTA DE USUÁRIOS --- */}
            <h3 style={{ color: '#444', marginBottom: '20px', paddingLeft: '5px' }}>Lista de Usuários</h3>
            
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {users.map((u: any) => (
                    <li key={u.id} style={{ 
                        backgroundColor: '#ffffff', 
                        padding: '20px', 
                        marginBottom: '15px', 
                        borderRadius: '12px', 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        boxShadow: '0 4px 10px rgba(0,0,0,0.03)' 
                    }}>
                        <div>
                            <strong style={{ fontSize: '17px', color: '#222' }}>{u.login}</strong> 
                            <span style={{ color: '#666', fontSize: '14px', marginLeft: '5px' }}>({u.email})</span><br/>
                            
                            <div style={{ marginTop: '5px', fontSize: '13px', color: '#888' }}>
                                ID: {u.id} <span style={{ margin: '0 5px' }}>|</span> 
                                <span style={{ fontWeight: 'bold', color: u.id_role === 1 ? '#dc3545' : '#007bff' }}>
                                    {u.role?.nome || (u.id_role === 1 ? 'Admin' : u.id_role === 2 ? 'Professor' : 'Responsável')}
                                </span>
                            </div>
                        </div>
                        
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button 
                                onClick={() => handleEdit(u)} 
                                style={{ 
                                    backgroundColor: '#fff3cd', 
                                    color: '#856404', 
                                    border: 'none', 
                                    padding: '8px 15px', 
                                    borderRadius: '6px', 
                                    cursor: 'pointer', 
                                    fontWeight: '600', 
                                    fontSize: '14px' 
                                }}
                            >
                                Editar
                            </button>
                            <button 
                                onClick={() => handleDelete(u.id)} 
                                style={{ 
                                    backgroundColor: '#f8d7da', 
                                    color: '#721c24', 
                                    border: 'none', 
                                    padding: '8px 15px', 
                                    borderRadius: '6px', 
                                    cursor: 'pointer', 
                                    fontWeight: '600', 
                                    fontSize: '14px' 
                                }}
                            >
                                Excluir
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* --- PAGINAÇÃO --- */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px', padding: '0 10px' }}>
                <button 
                    onClick={handlePrev} 
                    disabled={offset === 0} 
                    style={{ 
                        padding: '10px 20px', 
                        backgroundColor: offset === 0 ? '#e0e0e0' : '#007bff', 
                        color: offset === 0 ? '#888' : 'white', 
                        border: 'none', 
                        borderRadius: '8px', 
                        cursor: offset === 0 ? 'not-allowed' : 'pointer',
                        fontWeight: '600'
                    }}
                >
                    &larr; Anterior
                </button>
                
                <span style={{ color: '#666', fontWeight: '600' }}>Página { (offset / limit) + 1 }</span>
                
                <button 
                    onClick={handleNext} 
                    disabled={nextOffset === null} 
                    style={{ 
                        padding: '10px 20px', 
                        backgroundColor: nextOffset === null ? '#e0e0e0' : '#007bff', 
                        color: nextOffset === null ? '#888' : 'white', 
                        border: 'none', 
                        borderRadius: '8px', 
                        cursor: nextOffset === null ? 'not-allowed' : 'pointer',
                        fontWeight: '600',
                        boxShadow: nextOffset !== null ? '0 4px 6px rgba(0,123,255,0.2)' : 'none'
                    }}
                >
                    Próxima &rarr;
                </button>
            </div>
            
            <div style={{ marginTop: '30px', textAlign: 'center' }}>
                <a href="/professores" style={{ textDecoration: 'none', color: '#007bff', fontSize: '15px', fontWeight: '500' }}>
                    Ir para Gestão de Professores &rarr;
                </a>
            </div>
        </div>
    );
}