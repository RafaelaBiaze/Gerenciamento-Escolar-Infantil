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

    // --- VALIDAÇÃO (Reintegrada) ---
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
        if (!validateForm()) return; // Barra se falhar na validação

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

    return (
        <div style={{ padding: 20, maxWidth: '800px', margin: '0 auto' }}>
            <h1>Gestão de Usuários</h1>
            
            <div style={{ border: '1px solid #ccc', padding: 20, borderRadius: 8, marginBottom: 30, background: '#fff' }}>
                <h3 style={{marginTop: 0}}>{editingId ? `Editando Usuário #${editingId}` : 'Novo Usuário'}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <input placeholder="Login (mín. 3 caracteres)" value={form.login} onChange={e => setForm({...form, login: e.target.value})} />
                    <input placeholder="Email (ex: nome@teste.com)" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                    <input type="password" placeholder={editingId ? "Nova Senha (opcional)" : "Senha (mín. 6 caracteres)"} value={form.senha} onChange={e => setForm({...form, senha: e.target.value})} />
                    
                    <label style={{ fontSize: 14, fontWeight: 'bold' }}>Nível de Acesso:</label>
                    <select value={form.role} onChange={e => setForm({...form, role: Number(e.target.value)})} style={{ padding: 10, borderRadius: 4, border: '1px solid #ccc' }}>
                        <option value={1}>Administrador</option>
                        <option value={2}>Professor</option>
                        <option value={3}>Responsável</option>
                    </select>

                    <div style={{ display: 'flex', gap: 10 }}>
                        <button onClick={handleSave} style={{ flex: 1, padding: 10, background: editingId ? '#ffc107' : '#28a745', color: editingId ? '#000' : 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 'bold' }}>
                            {editingId ? 'Atualizar Usuário' : 'Salvar Novo'}
                        </button>
                        {editingId && <button onClick={cancelEdit} style={{ padding: 10, background: '#6c757d', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}>Cancelar</button>}
                    </div>
                </div>
            </div>

            <h3>Lista de Usuários</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {users.map((u: any) => (
                    <li key={u.id} style={{ background: '#fff', border: '1px solid #ddd', padding: 15, marginBottom: 10, borderRadius: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <strong>{u.login}</strong> <span style={{ color: '#666' }}>({u.email})</span><br/>
                            <small>ID: {u.id} | Perfil: {u.role?.nome || (u.id_role === 1 ? 'Admin' : u.id_role === 2 ? 'Professor' : 'Responsável')}</small>
                        </div>
                        <div>
                            <button onClick={() => handleEdit(u)} style={{ marginRight: 5, background: '#ffc107', border: 'none', padding: '5px 10px', borderRadius: 4, cursor: 'pointer' }}>Editar</button>
                            <button onClick={() => handleDelete(u.id)} style={{ background: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', borderRadius: 4, cursor: 'pointer' }}>Excluir</button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* BOTÕES DE PAGINAÇÃO */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20, alignItems: 'center' }}>
                <button onClick={handlePrev} disabled={offset === 0} style={{ padding: '10px 20px', background: offset === 0 ? '#ccc' : '#007bff', color: 'white', border: 'none', borderRadius: 4, cursor: offset === 0 ? 'not-allowed' : 'pointer' }}>&larr; Anterior</button>
                <span>Página { (offset / limit) + 1 }</span>
                <button onClick={handleNext} disabled={nextOffset === null} style={{ padding: '10px 20px', background: nextOffset === null ? '#ccc' : '#007bff', color: 'white', border: 'none', borderRadius: 4, cursor: nextOffset === null ? 'not-allowed' : 'pointer' }}>Próxima &rarr;</button>
            </div>
            <br/><a href="/professores" style={{ textDecoration: 'none', color: '#007bff' }}>Ir para Gestão de Professores &rarr;</a>
        </div>
    );
}