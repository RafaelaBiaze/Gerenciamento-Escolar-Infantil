import { useEffect, useState } from 'react';
import api from '../services/api';
import { useWebSocket } from '../hooks/useWebSocket';

interface ProfessorForm {
    nome_professor: string;
    cpf_professor: string;
    telefone_professor: string;
    id_user: number;
}

export default function Professores() {
    const [profs, setProfs] = useState<any[]>([]);
    const [users, setUsers] = useState<any[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [form, setForm] = useState<ProfessorForm>({ nome_professor: '', cpf_professor: '', telefone_professor: '', id_user: 0 });

    // --- ESTADOS DA PAGINAÇÃO ---
    const [offset, setOffset] = useState(0);
    const [limit] = useState(10); 
    const [nextOffset, setNextOffset] = useState<number | null>(null);
    // ----------------------------

    const { sendMessage } = useWebSocket();

    const fetchProfs = async () => {
        try {
            const res = await api.get(`/api/professores?limit=${limit}&offset=${offset}`);
            setProfs(res.data.rows || []);
            setNextOffset(res.data.next);
        } catch (error) { console.error("Erro ao buscar professores", error); }
    };

    const fetchUsers = async () => {
        try {
            const res = await api.get('/api/users?limit=100');
            setUsers(res.data.rows || []);
        } catch (error) { console.error("Erro ao buscar usuários", error); }
    };

    useEffect(() => { fetchProfs(); }, [offset]);
    useEffect(() => { fetchUsers(); }, []);

    const handleNext = () => { if (nextOffset !== null) setOffset(nextOffset); };
    const handlePrev = () => { if (offset - limit >= 0) setOffset(offset - limit); };

    // --- VALIDAÇÃO ---
    const validateForm = () => {
        if (form.nome_professor.trim().length < 3) {
            alert("Nome do professor deve ter no mínimo 3 letras.");
            return false;
        }
        const cpfLimpo = form.cpf_professor.replace(/\D/g, '');
        if (cpfLimpo.length !== 11) {
            alert(`CPF inválido: Você digitou ${cpfLimpo.length} números. O CPF deve ter exatamente 11.`);
            return false;
        }
        const telLimpo = form.telefone_professor.replace(/\D/g, '');
        if (telLimpo.length < 10 || telLimpo.length > 11) {
            alert(`Telefone inválido: Você digitou ${telLimpo.length} números. Deve ter 10 ou 11.`);
            return false;
        }
        if (form.id_user === 0) {
            alert("Você deve vincular um Usuário de Acesso ao professor.");
            return false;
        }
        return true;
    };

    const handleSave = async () => {
        if (!validateForm()) return;

        try {
            const payload = { user: form.id_user, nome: form.nome_professor, cpf: form.cpf_professor, telefone: form.telefone_professor };
            if (editingId) {
                await api.put(`/api/professores/${editingId}`, payload);
                sendMessage('atualizacao', { msg: `Professor atualizado: ${form.nome_professor}` });
                alert('Professor atualizado com sucesso!');
            } else {
                await api.post('/api/professores', payload);
                sendMessage('atualizacao', { msg: `Novo professor cadastrado: ${form.nome_professor}` });
                alert('Professor salvo com sucesso!');
            }
            fetchProfs();
            cancelEdit();
        } catch (e) { 
            console.error(e); 
            alert('Erro ao salvar.'); 
        }
    };

    const handleEdit = (p: any) => {
        setForm({ nome_professor: p.nome_professor, cpf_professor: p.cpf_professor, telefone_professor: p.telefone_professor, id_user: p.user?.id || p.id_user || 0 });
        setEditingId(p.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cancelEdit = () => { setForm({ nome_professor: '', cpf_professor: '', telefone_professor: '', id_user: 0 }); setEditingId(null); };

    const handleDelete = async (id: number) => { if (confirm('Tem certeza?')) { await api.delete(`/api/professores/${id}`); fetchProfs(); } };

    // --- ESTILOS REUTILIZÁVEIS ---
    const inputStyle = {
        width: '100%',
        padding: '15px',
        border: '1px solid #e1e1e1',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        fontSize: '15px',
        fontFamily: 'inherit',
        boxSizing: 'border-box' as const, 
        outline: 'none'
    };

    return (
        // Container Principal
        <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto', fontFamily: "'Poppins', sans-serif", color: '#333' }}>
            
            <h1 style={{ textAlign: 'center', marginBottom: '40px', fontWeight: '600' }}>Gestão de Professores</h1>
            
            {/* --- CARTÃO DO FORMULÁRIO --- */}
            <div style={{ 
                backgroundColor: '#ffffff', 
                padding: '30px', 
                borderRadius: '15px', 
                boxShadow: '0 10px 25px rgba(0,0,0,0.05)', 
                marginBottom: '40px' 
            }}>
                <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#444', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                    {editingId ? `Editando Professor #${editingId}` : 'Novo Professor'}
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <input 
                        placeholder="Nome Completo" 
                        value={form.nome_professor} 
                        onChange={e => setForm({...form, nome_professor: e.target.value})} 
                        style={inputStyle}
                    />
                    <input 
                        placeholder="CPF (11 números)" 
                        value={form.cpf_professor} 
                        onChange={e => setForm({...form, cpf_professor: e.target.value})} 
                        maxLength={14} 
                        style={inputStyle}
                    />
                    <input 
                        placeholder="Telefone (DDD + Número)" 
                        value={form.telefone_professor} 
                        onChange={e => setForm({...form, telefone_professor: e.target.value})} 
                        maxLength={15} 
                        style={inputStyle}
                    />
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '14px', fontWeight: '600', color: '#555' }}>Vincular Usuário de Acesso:</label>
                        <select 
                            value={form.id_user} 
                            onChange={e => setForm({...form, id_user: Number(e.target.value)})} 
                            style={{ ...inputStyle, cursor: 'pointer' }}
                        >
                            <option value={0}>-- Selecione um Usuário --</option>
                            {users.map((u: any) => (<option key={u.id} value={u.id}>{u.login} ({u.email})</option>))}
                        </select>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                        <button 
                            onClick={handleSave} 
                            style={{ 
                                flex: 1, 
                                padding: '15px', 
                                backgroundColor: editingId ? '#ffc107' : '#007bff', // Amarelo se editar, Azul se novo
                                color: editingId ? '#000' : 'white', 
                                border: 'none', 
                                borderRadius: '8px', 
                                cursor: 'pointer', 
                                fontWeight: '600',
                                fontSize: '16px',
                                transition: 'background 0.3s'
                            }}
                        >
                            {editingId ? 'Atualizar Dados' : 'Salvar Professor'}
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

            {/* --- LISTA DE PROFESSORES --- */}
            <h3 style={{ color: '#444', marginBottom: '20px', paddingLeft: '5px' }}>Lista de Professores</h3>
            
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {profs.map((p: any) => (
                    <li key={p.id} style={{ 
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
                            <strong style={{ fontSize: '17px', color: '#222' }}>{p.nome_professor}</strong><br/>
                            <div style={{ marginTop: '5px', color: '#666', fontSize: '14px' }}>
                                <span>CPF: {p.cpf_professor}</span> 
                                <span style={{ margin: '0 5px', color: '#ddd' }}>|</span> 
                                <span>Tel: {p.telefone_professor}</span>
                            </div>
                            <div style={{ marginTop: '5px', fontSize: '13px', color: '#007bff', fontWeight: '600' }}>
                                Usuário: {p.user?.login || '—'}
                            </div>
                        </div>
                        
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button 
                                onClick={() => handleEdit(p)} 
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
                                onClick={() => handleDelete(p.id)} 
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

            {/* --- PAGINAÇÃO (Estilo Moderno) --- */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px', padding: '0 10px' }}>
                <button 
                    onClick={handlePrev} 
                    disabled={offset === 0} 
                    style={{ 
                        padding: '10px 20px', 
                        backgroundColor: offset === 0 ? '#e0e0e0' : '#007bff', // Cinza se desativado
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
                <a href="/users" style={{ textDecoration: 'none', color: '#555', fontSize: '14px', fontWeight: '500' }}>
                    &larr; Voltar para Usuários
                </a>
            </div>
        </div>
    );
}