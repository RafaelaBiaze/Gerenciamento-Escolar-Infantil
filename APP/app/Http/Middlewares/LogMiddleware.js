export default (request, response, next) => {

    if (request.user) {
        console.info("----------------");
        console.info(request.user.email, request.method, request.originalUrl);
        console.info(request.user);
        console.info("----------------");
    }



    return next();

}