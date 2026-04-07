const React = require("react");
const { Document, Page, Text, StyleSheet } = require("@react-pdf/renderer");

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12, fontFamily: "Helvetica" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, color: "#003366" },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginTop: 20, marginBottom: 6, color: "#0055aa" },
  highlight: { backgroundColor: "#fff3a3", padding: 4, borderRadius: 4, marginBottom: 10 },
  paragraph: { marginBottom: 10, lineHeight: 1.4 },
});

function ItinerarioPDFNode({ titulo, resumen }) {
  const lines = resumen.split("\n");

  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.title}>{titulo}</Text>

        {lines.map((line, i) => {
          if (line.includes("REGRESO AL ORIGEN"))
            return <Text key={i} style={styles.sectionTitle}>{line}</Text>;

          if (line.includes("RESUMEN DE PRESUPUESTO"))
            return <Text key={i} style={styles.sectionTitle}>{line}</Text>;

          if (line.startsWith("-") || line.startsWith("•"))
            return <Text key={i} style={styles.highlight}>{line}</Text>;

          return <Text key={i} style={styles.paragraph}>{line}</Text>;
        })}
      </Page>
    </Document>
  );
}

module.exports = ItinerarioPDFNode;
