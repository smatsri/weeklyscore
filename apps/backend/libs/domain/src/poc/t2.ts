type CreateSession = {
  type: 'create-session';
  payload: {
    playingGroupId: string;
  };
};

type CreatePlayer = {
  type: 'create-player';
  payload: {
    name: string;
  };
};

type SessionCreated = {
  type: 'session-created';
  payload: {
    id: string;
  };
};

type PlayerCreated = {
  type: 'player-created';
  payload: {
    id: string;
  };
};

type SessionCmd = CreateSession | CreatePlayer;
type SessionEvent = SessionCreated | PlayerCreated;
