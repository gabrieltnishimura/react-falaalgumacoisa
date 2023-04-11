import DashboardActionModel from './DashboardActionModel';

export enum DashboardActionTypes {
  REGISTER = 'REGISTER',
  RECORDING = 'RECORDING',
  EXTRA = 'EXTRA',
}

export default class DashboardModel {
  user: {
    name: string;
  };
  score: {
    total: number;
  };
  actions: DashboardActionModel[];

  constructor(data: any) {
    this.user = {
      name: data?.user?.name,
    };
    this.score = {
      total: data?.score?.total,
    };
    this.actions =
      data?.actions
        ?.map((action: any): DashboardActionModel | null => {
          if (
            action.type === DashboardActionTypes.REGISTER ||
            action.type === DashboardActionTypes.EXTRA
          ) {
            return null;
          }

          return {
            id: action.themeId,
            type: action.type,
            points: action.points,
            isRecording: Boolean(action.isRecording),
            background: {
              src: action.background.src,
              alt: action.background.alt,
            },
            banner: action.title
              ? {
                  title: action.title,
                }
              : undefined,
          };
        })
        .filter((action: any) => !!action) || [];
  }
}
