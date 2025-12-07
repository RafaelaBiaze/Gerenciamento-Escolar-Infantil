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

    // --- VALIDAÇÃO (Reintegrada) ---
    const validateForm = () => {
        // 1. Valida Nome
        if (form.nome_professor.trim().length < 3) {
            alert("Nome do professor deve ter no mínimo 3 letras.");
            return false;
        }
        
        // 2. Valida CPF (Remove tudo que não é número)
        const cpfLimpo = form.cpf_professor.replace(/\D/g, '');
        if (cpfLimpo.length !== 11) {
            alert(`CPF inválido: Você digitou ${cpfLimpo.length} números. O CPF deve ter exatamente 11.`);
            return false;
        }

        // 3. Valida Telefone (Remove tudo que não é número)
        const telLimpo = form.telefone_professor.replace(/\D/g, '');
        // Aceita 10 (Fixo) ou 11 (Celular)
        if (telLimpo.length < 10 || telLimpo.length > 11) {
            alert(`Telefone inválido: Você digitou ${telLimpo.length} números. Deve ter 10 ou 11 (DDD + Número).`);
            return false;
        }

        // 4. Valida Vínculo de Usuário
        if (form.id_user === 0) {
            alert("Você deve vincular um Usuário de Acesso ao professor.");
            return false;
        }

        return true;
    };

    const handleSave = async () => {
        if (!validateForm()) return; // Barra se falhar na validação

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

    return (
        <div style={{ padding: 20, maxWidth: '800px', margin: '0 auto' }}>
            <h1>Gestão de Professores</h1>
            
            <div style={{ border: '1px solid #ccc', padding: 20, borderRadius: 8, marginBottom: 30, background: '#fff' }}>
                <h3 style={{marginTop: 0}}>{editingId ? `Editando Professor #${editingId}` : 'Novo Professor'}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <input placeholder="Nome Completo" value={form.nome_professor} onChange={e => setForm({...form, nome_professor: e.target.value})} />
                    <input placeholder="CPF (11 números)" value={form.cpf_professor} onChange={e => setForm({...form, cpf_professor: e.target.value})} maxLength={14} />
                    <input placeholder="Telefone (DDD + Número)" value={form.telefone_professor} onChange={e => setForm({...form, telefone_professor: e.target.value})} maxLength={15} />
                    <label style={{ fontSize: 14, fontWeight: 'bold' }}>Vincular Usuário de Acesso:</label>
                    <select value={form.id_user} onChange={e => setForm({...form, id_user: Number(e.target.value)})} style={{ padding: 10, borderRadius: 4, border: '1px solid #ccc' }}>
                        <option value={0}>-- Selecione um Usuário --</option>
                        {users.map((u: any) => (<option key={u.id} value={u.id}>{u.login} ({u.email})</option>))}
                    </select>
                    <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                        <button onClick={handleSave} style={{ flex: 1, padding: 10, background: editingId ? '#ffc107' : '#007bff', color: editingId ? '#000' : 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 'bold' }}>
                            {editingId ? 'Atualizar Dados' : 'Salvar Professor'}
                        </button>
                        {editingId && <button onClick={cancelEdit} style={{ padding: 10, background: '#6c757d', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}>Cancelar</button>}
                    </div>
                </div>
            </div>

            <h3>Lista de Professores</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {profs.map((p: any) => (
                    <li key={p.id} style={{ background: '#fff', border: '1px solid #ddd', padding: 15, marginBottom: 10, borderRadius: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <strong>{p.nome_professor}</strong><br/>
                            <small>CPF: {p.cpf_professor} | Tel: {p.telefone_professor}</small><br/>
                            <small style={{ color: 'blue' }}>Usuário: {p.user?.login || '—'}</small>
                        </div>
                        <div>
                            <button onClick={() => handleEdit(p)} style={{ marginRight: 5, background: '#ffc107', border: 'none', padding: '5px 10px', borderRadius: 4, cursor: 'pointer' }}>Editar</button>
                            <button onClick={() => handleDelete(p.id)} style={{ background: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', borderRadius: 4, cursor: 'pointer' }}>Excluir</button>
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
            
            <br /><a href="/users" style={{ textDecoration: 'none', color: '#007bff' }}>&larr; Voltar para Usuários</a>
        </div>
    );
}