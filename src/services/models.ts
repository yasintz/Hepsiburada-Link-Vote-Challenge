export interface LinkModel {
  name: string;
  url: string;
  upVoteCount: number;
  downVoteCount: number;
  createdAt: string;
}

export type SerializedLink = Omit<LinkModel, 'createdAt'> & {
  createdAt: Date;
  score: number;
};
