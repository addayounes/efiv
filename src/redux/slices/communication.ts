import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  Action,
  ActionDetails,
  ActionType,
  Stage,
} from "@/types/entity/communication";

const mockData: any = {
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

export interface CommunicationState {
  id: string;
  name: string;
  description: string;
  motif: string;
  stages: Stage[];
  selectedStage: Stage | undefined;
  selectedAction: Action | undefined;
}

const initialState: CommunicationState = {
  selectedStage: undefined,
  selectedAction: undefined,
  ...mockData,
};

export const communicationSlice = createSlice({
  name: "communication",
  initialState,
  reducers: {
    setSelectedStage: (state, action: PayloadAction<Stage | undefined>) => {
      state.selectedAction = undefined;
      state.selectedStage = action.payload;
    },
    setSelectedAction: (
      state,
      action: PayloadAction<{
        action: Action | undefined;
        stage: Stage | undefined;
      }>,
    ) => {
      state.selectedStage = action.payload?.stage;
      state.selectedAction = action.payload?.action;
    },
    addStageAtPosition: (
      state,
      action: PayloadAction<{ position: number }>,
    ) => {
      const newStage: Stage = {
        id: crypto.randomUUID(),
        name: "Nouveau stage",
        active: true,
        actions: [],
      };
      state.stages.splice(action.payload.position, 0, newStage);
      if (state.selectedAction) state.selectedAction = undefined;
      state.selectedStage = newStage;
    },
    addActionToStage: (
      state,
      action: PayloadAction<{ stageIndex: number; type: ActionType }>,
    ) => {
      const { stageIndex, type } = action.payload;
      const newAction: Action = {
        type,
        details: {} as any,
        id: crypto.randomUUID(),
      };
      state.stages[stageIndex].actions.push(newAction);
      state.selectedStage = state.stages[stageIndex];
      state.selectedAction = newAction;
    },
    updateAction: (
      state,
      action: PayloadAction<{
        stageId: string;
        actionId: string;
        data: Partial<ActionDetails>;
      }>,
    ) => {
      const { actionId, data, stageId } = action.payload;

      const newStages = (state.stages ?? []).map((s) =>
        s.id === stageId
          ? {
              ...s,
              actions: s.actions?.map((a) =>
                a.id === actionId
                  ? { ...a, details: { ...a.details, ...data } }
                  : a,
              ),
            }
          : s,
      );

      state.stages = newStages;

      const targetStage = newStages?.find((s) => s.id === stageId);
      const newAction = targetStage?.actions?.find((a) => a.id === actionId);

      state.selectedStage = targetStage;
      state.selectedAction = newAction;
    },
    updateStage: (
      state,
      action: PayloadAction<{ stageId: string; data: Partial<Stage> }>,
    ) => {
      const { data, stageId } = action.payload;

      const newStages = (state.stages ?? []).map((s) =>
        s.id === stageId ? { ...s, ...data } : s,
      );

      state.stages = newStages;

      const targetStage = newStages?.find((s) => s.id === stageId);

      state.selectedStage = targetStage;
    },
  },
});

export const {
  updateStage,
  updateAction,
  setSelectedStage,
  setSelectedAction,
  addStageAtPosition,
  addActionToStage,
} = communicationSlice.actions;

export default communicationSlice.reducer;
