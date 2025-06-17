import axios from "axios";
import CliTable3 from "cli-table3";

export default {

    name: 'get-alunos',
    description: 'obter alunos',
    arguments: {
        seconds: "number",
    },

    handle: async function () {

        /**
         * No ./docker-compose.yml, nas linhas 55/56, dei o nome "web_host" para o host do container nginx.
         * Se você rodar o cli fora da rede do docker, você pode usar "localhost:8080" para acessar o nginx.
         * Caso contrário, voce deve chamar o nginx pelo nome do host do container na porta 80
         */
        const url = (process.env.IS_CONTAINER) ? ("http://web_host:80") : ("http://localhost:8080");



        console.log('URL do servidor:', url);


        /**
         * URLSearchParams é usado para gerenciar o request body dados no formato x-www-form-urlencoded.
         */
        const data = new URLSearchParams();
        data.append('email', 'user1@example.com');
        data.append('senha', '123456');

        /**
         * Primeira etapa é fazer o login com o endpoint /login para obter o token JWT.
         */
        try {
            const response = await axios.post(`${url}/login`, data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            const tokenData = response.data;

            console.log('Token obtido:', tokenData.token);

            const token = tokenData.token;

            /**
             *  Aqui devemos usar um loop para fazer várias requisições paginadas para /api/alunos
             */

            let limit = 10;
            let offset = 0;

            const table = new CliTable3({
                head: ['Nome', 'Materias'],
                colWidths: [20, 20],
                style: {
                    head: ['cyan'],
                    border: ['grey']
                }
            })
            
            /** Codar Aqui */
            while (offset !== null) {
                const response = await axios.get(`${url}/api/alunos`, {
                    params: { 'offset': offset, 'limit': limit },
                    headers: { "Authorization": `Bearer ${token}` }
                });

                offset = response.data.next;

                response.data.rows.forEach(row => {
                    const materias = row.materias.map(materias => materias.nome).join(',\n');

                    table.push([row.nome, materias]);
                });

            }

            console.log(table.toString());

        } catch (error) {
            console.error('Erro na requisição:', error.response?.data || error.message);
            return;
        }
    }
}