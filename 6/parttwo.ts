import { readTxt, removeUndefinedFromArray } from "../common/utils";

const getTimeDistance = (texts: string[]) => {
  const time = texts[0].split(" ");
  const newTime1 = removeUndefinedFromArray(time).slice(1);
  const newTime2 = newTime1.join("");

  const distance = texts[1].split(" ");
  const newDistance1 = removeUndefinedFromArray(distance).slice(1);
  const newDistance2 = newDistance1.join("");

  return { time: Number(newTime2), distance: Number(newDistance2) };
};

const getNumberOfTracks = (texts: string[]) => {
  const time = texts[0].split(" ");
  const newTime = removeUndefinedFromArray(time);
  return newTime.length - 1;
};

const getTrack = (res: { time: string[]; distance: string[] }, num: number) => {
  return {
    time: Number(res.time[num + 1]),
    distance: Number(res.distance[num + 1]),
  };
};

const trackSuccess = (
  holdTime: number,
  selectedTrack: { time: number; distance: number }
) => {
  const speed = holdTime * 1;
  const { distance: distanceTarget, time } = selectedTrack;

  const distanceTraveled = speed * (time - holdTime);

  if (distanceTraveled > distanceTarget) return true;
  return false;
};

const allPossibleTracksSuccess = (track: {
  time: number;
  distance: number;
}) => {
  let count = 0;
  for (let i = 0; i < track.time; i++) {
    const isSuccess = trackSuccess(i, track);
    if (isSuccess) count++;
  }
  return count;
};

const main = async (url: string) => {
  let ans = 1;
  const texts = await readTxt(url);
  const timeDistance = getTimeDistance(texts);
  console.log(timeDistance);

  let count = 0;
  for (let i = 0; i < timeDistance.time; i++) {
    const isSuccess = trackSuccess(i, timeDistance);
    if (isSuccess) count++;
  }
  ans = count;
  return ans;
};

console.log("start");
const ans = await main("./input.txt");
console.log("ans:", ans);
