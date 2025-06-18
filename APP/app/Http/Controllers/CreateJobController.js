import FirstJob from "../../Jobs/FirstJob.js"

export default async (request, response) => {

    await FirstJob.dispatch({ "from": "http" }, "email");

    return response.status(CONSTANTS.HTTP.SUCCESS).json({ "success": "Fila" });

}