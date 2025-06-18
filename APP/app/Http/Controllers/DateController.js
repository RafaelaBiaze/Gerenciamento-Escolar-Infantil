export default (request, response) => {

    const now = new Date;

    const data = {};

    data.isoString = now.toISOString();

    data.localeStringSaoPaulo = now.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });

    data.localeStringUTC = now.toLocaleString("pt-BR");

    data.microtimeMilisegundos = now.getTime();

    data.timestampSegundos = parseInt(data.microtimeMilisegundos / 1E3);

    return response.status(CONSTANTS.HTTP.SUCCESS).json(data);

}