// swagger.js
import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';
import swaggerJson from '../Core/swaggerJson.js';


const docsDir = path.join(CONSTANTS.DIR, 'docs');

const server = `http://localhost:${process.env.PORT || 3000}`;

const document = await swaggerJson(docsDir, server);

export default swaggerJSDoc(document);
