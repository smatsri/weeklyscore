type CreateSession = {
  type: 'create-session'
  payload: {
    groupId: string
  }
}

type AddPlayer = {
  type: 'add-player'
  payload: {
    name: string
  }
}

type AddBuyin = {
  type: 'add-buyin'
  payload: {
    sessionId: string
    playerId: string
    amount: number
  }
}

export type Command = CreateSession | AddPlayer | AddBuyin

type SessionCreated = {
  type: 'session-created',
  payload: {
    sessionId: string
  }
}

type PlayerAdded = {
  type: 'player-added',
  payload: {
    playerName: string
    playerId: string
  }
}

type BuyinAdded = {
  type: 'buyin-added',
  payload: {
    sessionId: string
    playerId: string
    amount: number
  }
}

export type Event = SessionCreated | PlayerAdded | BuyinAdded
