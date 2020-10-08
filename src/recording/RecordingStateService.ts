import RecordingConfirmation from './models/RecordingConfirmation';
import RecordingStateModel from './models/RecordingStateModel';
import RecordingIntegrationService from './RecordingIntegrationService';
import WordSuggestionService from './WordSuggestionService';

export default class RecordingStateService {
  integrationService: RecordingIntegrationService;
  wordSuggestionService: WordSuggestionService;

  constructor() {
    console.log('Initializing RecordingStateService');
    this.integrationService = new RecordingIntegrationService();
    this.wordSuggestionService = new WordSuggestionService();
  }

  public async getNextStep(groupId: string): Promise<RecordingStateModel> {
    const group = await this.wordSuggestionService.getGroup(groupId);
    let found = -1;
    const phrase = group.phrases.find((phrase, index) => {
      found = index;
      return !phrase.spoken && !phrase.skipped;
    });

    if (!phrase) {
      console.error('No phrase available', phrase);
      throw Error('No phrases available');
    }

    return new RecordingStateModel({
      groupId: group.title,
      id: phrase.id,
      text: phrase.text,
      step: (found + 1),
      totalSteps: group.stepsCap,
    });
  }

  public async confirmStep(state: RecordingStateModel, data: Blob): Promise<RecordingConfirmation> {
    return await this.integrationService.sendRecording({
      phraseId: state.phrase.id,
      sampleRate: 16000,
      additionalMetadata: {
        userAgent: navigator.userAgent,
      },
    }, state.groupId, data);
  }

  public async skipStep(state: RecordingStateModel): Promise<void> {
    return await this.integrationService.skipPhrase(state.phrase, state.groupId, 'foo reason');
  }
}
