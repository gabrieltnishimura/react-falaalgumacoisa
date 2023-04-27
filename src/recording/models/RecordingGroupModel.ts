import { RecordingModalTypes } from './RecordingModalTypes';

export class RecordingGroupItemModel {
  id: string;
  text: string;
  skipped: boolean;
  spoken: boolean;

  constructor(data: any) {
    this.id = data.id;
    this.text = data.text;
    this.skipped = Boolean(data.skipped);
    this.spoken = Boolean(data.spoken);
  }
}
export class RecordingGroupModalEventModel {
  type: RecordingModalTypes;
  eventIndex: number;
  score: number;

  constructor(data: any) {
    this.type = data.type;
    this.eventIndex = parseInt(data.eventIndex, 10);
    this.score = parseInt(data.score, 10);
  }
}
export class RecordingGroupModel {
  groupId: string;
  title: string;
  cover: string;
  stepsCap: number;
  skippedSteps: number;
  total: number;
  phrases: RecordingGroupItemModel[];
  modalEvents: RecordingGroupModalEventModel[];

  constructor(data: any) {
    this.groupId = data.themeId;
    this.title = data.title;
    this.cover = data.cover;
    this.stepsCap = parseInt(data.stepsCap, 10);
    this.skippedSteps = parseInt(data.skippedSteps, 10);
    this.total = parseInt(data.total, 10);
    this.phrases =
      data.phrases && data.phrases.map((each: any) => new RecordingGroupItemModel(each));
    this.modalEvents =
      data.modalEvents &&
      data.modalEvents.map((each: any) => new RecordingGroupModalEventModel(each));
  }
}
