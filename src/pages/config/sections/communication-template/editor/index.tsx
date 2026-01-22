import EditorContent from "./content";
import EditorHeader from "./header";

interface CommunicationTemplateEditorProps {}

const mockData = {
  id: "template-retard-train-001",
  name: "Information voyageurs – Retard de train",
  description:
    "Communication envoyée aux voyageurs suite à un retard ou incident sur la ligne.",
  motif:
    "Informer les passagers d’un retard de circulation et des solutions proposées.",
  stages: [
    {
      id: "stage-information-initiale",
      name: "Information initiale",
      executedAt: "2025-02-03T07:45:00Z",
      active: true,
      actions: [
        {
          id: "action-email-voyageurs",
          type: "ExternalEmail",
          details: {
            subject: "Information importante – Retard de votre train",
            body: "Bonjour,\n\nEn raison d’un incident technique sur la ligne, votre train subit actuellement un retard estimé à 30 minutes.\n\nNos équipes sont mobilisées pour rétablir la circulation dans les meilleurs délais.\n\nNous vous prions de nous excuser pour la gêne occasionnée et vous remercions pour votre compréhension.\n\nCordialement,\nLe service clients",
            recipients: ["voyageur1@email.com", "voyageur2@email.com"],
          },
        },
      ],
    },
    {
      id: "stage-mise-a-jour",
      name: "Mise à jour de la situation",
      executedAt: "2025-02-03T08:15:00Z",
      active: true,
      actions: [
        {
          id: "action-email-maj",
          type: "ExternalEmail",
          details: {
            subject: "Mise à jour – Circulation de votre train",
            body: "Bonjour,\n\nLa circulation reprend progressivement suite à l’incident survenu plus tôt ce matin.\n\nLe retard estimé est désormais de 20 minutes. Nous vous invitons à rester attentifs aux annonces en gare et à bord.\n\nMerci de votre patience.\n\nCordialement,\nLe service clients",
            recipients: ["voyageur1@email.com", "voyageur2@email.com"],
          },
        },
        {
          id: "action-email-interne",
          type: "InternalEmail",
          details: {
            subject: "Incident ligne – Information voyageurs envoyée",
            body: "Les voyageurs du train concerné ont été informés du retard et de la reprise progressive de la circulation.",
            recipients: ["exploitation@train.fr", "centre-operation@train.fr"],
          },
        },
      ],
    },
    {
      id: "stage-fin-incident",
      name: "Fin de l’incident",
      executedAt: "2025-02-03T09:00:00Z",
      active: true,
      actions: [
        {
          id: "action-email-fin",
          type: "ExternalEmail",
          details: {
            subject: "Fin de l’incident – Reprise normale du trafic",
            body: "Bonjour,\n\nL’incident ayant impacté votre trajet est désormais résolu et la circulation est revenue à la normale.\n\nNous vous remercions pour votre patience et vous prions de nous excuser pour la gêne occasionnée.\n\nBon voyage.\n\nCordialement,\nLe service clients",
            recipients: ["voyageur1@email.com", "voyageur2@email.com"],
          },
        },
      ],
    },
  ],
};

const CommunicationTemplateEditor: React.FC<
  CommunicationTemplateEditorProps
> = ({}) => {
  return (
    <div>
      <EditorHeader template={mockData as any} />
      <EditorContent template={mockData as any} />
    </div>
  );
};

export default CommunicationTemplateEditor;
