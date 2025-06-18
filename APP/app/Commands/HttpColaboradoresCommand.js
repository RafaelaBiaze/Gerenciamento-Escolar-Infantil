import axios from "axios"
import CliTable3 from "cli-table3";

export default {

    name: 'get-colaboradores',
    description: 'Get all colaboradores',

    handle: async function () {

        const url = (process.env.IS_CONTAINER) ? ("http://web_host:80") : ("http://localhost:8080");

        const data = new URLSearchParams();
        data.append('email', 'user1@example.com');
        data.append('senha', '123456');

        try {
            const response = await axios.post(`${url}/login`, data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            const tokenData = response.data;

            const token = tokenData.token;

            let offset = 0;
            const limit = 5;

            const table = new CliTable3({
                head: ['Nome', "Projetos"],
                colWidths: [40, 30],
                style: {
                    head: ['green'],
                    border: ['grey']
                }
            })

            while (offset !== null) {
                const response = await axios.get(`${url}/api/colaboradores`, {
                    params: { 'offset': offset, 'limit': limit },
                    headers: { "Authorization": `Bearer ${token}` }
                });

                offset = response.data.next;

                response.data.rows.forEach(row => {
                    const projetos = row.projetos.map(projeto => projeto.nome).join('\n');

                    table.push([row.nome, projetos]);
                });


            }

            console.log(table.toString());

        } catch (error) {
            console.error('Erro na requisição:', error.response?.data || error.message);
            return;
        }


    }
}