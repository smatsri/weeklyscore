interface Transaction {
  date: Date;
  amount: number;
}

type Buyins = Transaction[][];
function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function initArray(length: number) {
  let arr = new Array(length);
  for (let i = 0; i < length; i++) {
    arr[i] = 0;
  }
  return arr;
}

export function shuffle<T>(arr: T[]) {
  //implted Fisher-Yates shuffle
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

function getNumMinute(date1: Date, date2: Date) {
  return (date2.getTime() - date1.getTime()) / 1000 / 60;
}

function getBuyinAmounts(
  numPlayers: number,
  numBuyins: number,
  buyinSize: number,
) {
  let buyins = [];
  let remainingBuyins = numBuyins;
  for (let i = 0; i < numBuyins; i++) {
    let player = Math.floor(Math.random() * numPlayers);
    let numBayins = Math.min(3, getRandomInt(1, remainingBuyins));
    remainingBuyins -= numBayins;
    if (remainingBuyins < 0) {
      break;
    }
    buyins.push({ player, amount: buyinSize * numBayins });
  }

  let buyinsByPlayer: number[][] = buyins.reduce(
    (acc, buyin) => {
      if (!acc[buyin.player]) {
        acc[buyin.player] = [];
      }
      acc[buyin.player].push(-buyin.amount);
      return acc;
    },
    new Array(numPlayers).fill(null).map((_) => [-50]),
  );

  const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);

  let totalLoses = -sum(buyinsByPlayer.map((buyins) => sum(buyins)).flat());

  let numLosers = getRandomInt(2, numPlayers - 1);

  let [totalWins]: [number[]] = initArray(numLosers).reduce(
    ([players, curLoses], _, i) => {
      const winAmout =
        i === numLosers - 1 ? curLoses : getRandomInt(5, curLoses);
      players.push(winAmout);
      curLoses -= winAmout;
      return [players, curLoses];
    },
    [[], totalLoses],
  );

  shuffle(buyinsByPlayer);
  totalWins.forEach((win, i) => {
    buyinsByPlayer[i].push(win);
  });

  return buyinsByPlayer;
}

function getBuyingDates(
  buyinAmounts: number[][],
  startDate: Date,
  endDate: Date,
) {
  const totalMinuts = getNumMinute(startDate, endDate);

  const buyinsPerPlayer = buyinAmounts.map((bs) => {
    let buyins = [{ date: startDate, amount: bs[0] }];
    let cutDate = new Date(startDate);
    let delay = Math.floor(totalMinuts / bs.length);
    for (let i = 1; i < bs.length; i++) {
      if (i === bs.length - 1 && bs[i] > 0) {
        buyins.push({ date: endDate, amount: bs[i] });
      } else {
        const numMinuts = getRandomInt(15, delay);
        cutDate.setMinutes(cutDate.getMinutes() + numMinuts);
        buyins.push({
          date: new Date(cutDate),
          amount: bs[i],
        });
      }
    }
    return buyins;
  });

  return buyinsPerPlayer;
}

export function getBuyings({
  numPlayers,
  numBuyins,
  buyinSize,
  startDate,
  endDate,
}: {
  numPlayers: number;
  numBuyins: number;
  buyinSize: number;
  startDate: Date;
  endDate: Date;
}) {
  const buyinAmounts = getBuyinAmounts(numPlayers, numBuyins, buyinSize);

  const buyinDates = getBuyingDates(buyinAmounts, startDate, endDate);
  return buyinDates;
}

function findAllThursdays(year: number) {
  const startDate = new Date(year, 0, 1, 0, 0, 0, 0);
  const endDate = new Date(year, 11, 31, 0, 0, 0, 0);
  const thursdays: Date[] = [];
  for (let d = startDate; d <= endDate; d = new Date(d.getTime() + (24 * 60 * 60 * 1000))) {
    if (d.getDay() === 4) {
      thursdays.push(d);
    }
  }

  return thursdays;
}

export function getYearSessions(year: number) {
  return findAllThursdays(year).map((thursday) => {
    const numPlayers = getRandomInt(5, 8);
    const numBuyins = getRandomInt(numPlayers * 2, numPlayers * 3);
    const buyinSize = 50;
    const startDate = new Date(thursday.getFullYear(), thursday.getMonth(), thursday.getDate(), 22, 0, 0, 0);
    const durationInMin = getRandomInt(180, 270);
    const endDate = new Date(startDate.getTime() + (durationInMin * 60 * 1000));
    const buyins = getBuyings({
      numBuyins,
      numPlayers,
      buyinSize,
      startDate,
      endDate,
    })
    return {
      startDate,
      endDate,
      buyins,
    };
  });
}

export function getSessions(starYear: number, endYear: number): ReturnType<typeof getYearSessions> {
  let sessions = [];
  for (let year = starYear; year <= endYear; year++) {
    sessions = [...sessions, ...getYearSessions(year)];
  }
  return sessions;

}
