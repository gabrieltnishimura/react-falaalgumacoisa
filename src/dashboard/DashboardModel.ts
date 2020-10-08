import DashboardActionModel from './DashboardActionModel';

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
          src: action.banner.src,
          alt: action.banner.alt,
        } : undefined,
      }
    }) || [];
  }
}
