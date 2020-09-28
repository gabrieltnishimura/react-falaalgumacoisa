export class RecordingGroupModel {
  title: string;
  stepsCap: number;
  total: number;
  phrases: RecordingGroupItemModel[];

  constructor(data: any) {
    this.title = data.title;
    this.stepsCap = parseInt(data.stepsCap, 10);
    this.total = parseInt(data.total, 10);
    this.phrases = data.phrases && data.phrases.map((each: any) => new RecordingGroupItemModel(each))
  }
}

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
