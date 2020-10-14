import DashboardActionModel from './DashboardActionModel';

export enum DashboardActionTypes {
  REGISTER = 'REGISTER',
  RECORDING = 'RECORDING',
  EXTRA = 'EXTRA',
}

export default class DashboardModel {
  user: {
    name: string,
  };
  score: {
    total: number,
  };
  actions: DashboardActionModel[];

  constructor(data: any) {
    this.user = {
      name: data?.user?.name,
    };
    this.score = {
      total: data?.score?.total,
    };
    this.actions = data?.actions?.map((action: any): DashboardActionModel => {
      const bannerImg = action.type === DashboardActionTypes.REGISTER ?
        '/icons/pencil.png' : action.type === DashboardActionTypes.EXTRA ? '/icons/people.svg' : action.banner?.src;
      const bannerAlt = action.type === DashboardActionTypes.REGISTER ?
        'lapis' : action.type === DashboardActionTypes.EXTRA ? 'pessoas' : action.banner?.alt;

      return {
        id: action.id,
        type: action.type,
        points: action.points,
        isRecording: Boolean(action.isRecording),
        background: {
          src: action.background.src,
          alt: action.background.alt,
        },
        banner: action.banner ? {
          title: action.banner.title,
          src: bannerImg,
          alt: bannerAlt,
        } : undefined,
      }
    }) || [];
  }
}
