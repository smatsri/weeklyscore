export type PlayingGroup = {
  id: string;
  name: string;
  playSessions: PlaySession[];
  createdAt: Date;
  updatedAt: Date;
};

export type Player = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type PlaySession = {
  id: string;
  buyins: Buyin[];
  playingGroupId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Buyin = {
  id: string;
  amount: number;
  player: Player;
  playerId: string;
  playSessionId: string;
  playSession: PlaySession;
  createdAt: Date;
  updatedAt: Date;
};
