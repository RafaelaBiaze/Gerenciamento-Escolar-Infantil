// swagger.js
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';

import createSwaggerDocs from './createSwaggerDocs.js';

export default await (async function () {

    const docsDir = path.join(CONSTANTS.DIR, 'docs');

    const server = `http://localhost:${process.env.PORT || 3000}`;

    const document = await createSwaggerDocs(docsDir, server)
    const fullJson = swaggerJSDoc(document);

    return swaggerUi.setup(fullJson);

})();