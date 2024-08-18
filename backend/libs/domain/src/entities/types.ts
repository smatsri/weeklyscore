export type PlayingGroup = {
  id: string
  name: string
  playSessions: PlaySession[]
  createdAt: Date
  updatedAt: Date
}

export type Player = {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
}

export type PlaySession = {
  id: string
  buyins: Buyin[]
  createdAt: Date
  updatedAt: Date
}

export type Buyin = {
  id: string
  amount: number
  player: Player
  createdAt: Date
  updatedAt: Date
}