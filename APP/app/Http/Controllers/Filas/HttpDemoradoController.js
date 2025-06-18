export default async (request, response) => {
    await timerBySecond(4);
    return response.status(CONSTANTS.HTTP.SUCCESS).json({ "success": "Demorei" });
}