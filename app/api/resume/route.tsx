import { renderToBuffer } from "@react-pdf/renderer";
import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import { profile } from "@/data/profile";

// Register a standard, ATS-safe font (Helvetica is built in, but we set it
// explicitly for clarity and consistent rendering).
Font.register({
  family: "Helvetica",
  fonts: [{ src: "Helvetica" }],
});

const styles = StyleSheet.create({
  page: {
    padding: 36,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#16223A",
    lineHeight: 1.4,
  },
  name: { fontSize: 18, fontWeight: 700, marginBottom: 2 },
  tagline: { fontSize: 11, marginBottom: 6 },
  contactRow: { fontSize: 9, marginBottom: 12 },
  section: { marginTop: 12 },
  heading: {
    fontSize: 11,
    fontWeight: 700,
    textTransform: "uppercase",
    borderBottomWidth: 1,
    borderBottomColor: "#1B3A6B",
    paddingBottom: 2,
    marginBottom: 6,
    letterSpacing: 1,
  },
  paragraph: { marginBottom: 4 },
  bullet: { marginBottom: 2, paddingLeft: 10 },
  skillLine: { marginBottom: 3 },
  itemTitle: { fontWeight: 700, fontSize: 10.5 },
  itemMeta: { fontSize: 9, marginBottom: 2, fontStyle: "italic" },
});

function ResumeDocument() {
  return (
    <Document
      title={`${profile.name} - Resume`}
      author={profile.name}
      subject="Resume"
    >
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.tagline}>{profile.tagline}</Text>
        <Text style={styles.contactRow}>
          {profile.phone} | {profile.email} | {profile.linkedin} | {profile.github} |{" "}
          {profile.location}
        </Text>

        {/* Summary */}
        <View style={styles.section}>
          <Text style={styles.heading}>Professional Summary</Text>
          <Text style={styles.paragraph}>{profile.summary}</Text>
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.heading}>Technical Skills</Text>
          <Text style={styles.skillLine}>
            Programming Languages: {profile.skills.languages.join(", ")}
          </Text>
          <Text style={styles.skillLine}>
            Frontend Frameworks &amp; Libraries: {profile.skills.frontend.join(", ")}
          </Text>
          <Text style={styles.skillLine}>
            Build Tools &amp; DevOps: {profile.skills.tools.join(", ")}
          </Text>
          <Text style={styles.skillLine}>
            Hardware &amp; Electronics: {profile.skills.hardware.join(", ")}
          </Text>
          <Text style={styles.skillLine}>
            Domains &amp; Concepts: {profile.skills.domains.join(", ")}
          </Text>
          <Text style={styles.skillLine}>
            Growth Track: {profile.skills.emerging.join(", ")}
          </Text>
        </View>

        {/* Competencies */}
        <View style={styles.section}>
          <Text style={styles.heading}>Professional Competencies</Text>
          {profile.competencies.map((c) => (
            <Text key={c.title} style={styles.bullet}>
              • {c.title} — {c.detail}
            </Text>
          ))}
        </View>

        {/* Projects */}
        <View style={styles.section}>
          <Text style={styles.heading}>Projects</Text>
          {profile.projects.map((p) => (
            <View key={p.name} style={{ marginBottom: 6 }}>
              <Text style={styles.itemTitle}>{p.name}</Text>
              <Text style={styles.itemMeta}>
                {p.role} | Stack: {p.stack.join(", ")}
              </Text>
              <Text style={styles.paragraph}>{p.description}</Text>
              {p.highlights.map((h) => (
                <Text key={h} style={styles.bullet}>
                  • {h}
                </Text>
              ))}
            </View>
          ))}
        </View>

        {/* Education */}
        <View style={styles.section}>
          <Text style={styles.heading}>Education</Text>
          {profile.education.map((e) => (
            <View key={e.school} style={{ marginBottom: 4 }}>
              <Text style={styles.itemTitle}>
                {e.school} ({e.period})
              </Text>
              <Text style={styles.paragraph}>{e.detail}</Text>
            </View>
          ))}
        </View>

        {/* Soft skills */}
        <View style={styles.section}>
          <Text style={styles.heading}>Soft Skills</Text>
          <Text style={styles.paragraph}>{profile.softSkills.join(" | ")}</Text>
        </View>
      </Page>
    </Document>
  );
}

export async function GET() {
  const buffer = await renderToBuffer(<ResumeDocument />);

  return new Response(new Uint8Array(buffer), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${profile.name.replace(/\s+/g, "_")}_Resume.pdf"`,
      "Cache-Control": "no-store",
    },
  });
}
