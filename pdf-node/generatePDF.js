const { renderToStream } = require("@react-pdf/renderer");
const ItinerarioPDFNode = require("../src/pdf/ItinerarioPDF.node.js");

async function generatePDFNode(titulo, resumen) {
  return await renderToStream(
    React.createElement(ItinerarioPDFNode, { titulo, resumen })
  );
}

module.exports = { generatePDFNode };
