type TargetTime = {
  day?: number;
  hour?: number;
  minute?: number;
};

function formatter(datetime: Date) {
  return datetime.toISOString().slice(0, 19).replace("T", " ");
}

export function now() {
  return formatter(new Date());
}

export function future(target: TargetTime) {
  const { day = 0, hour = 0, minute = 0 } = target;

  const totalMiliseconds = Math.max(0, day) * 86_400_000 + Math.max(0, hour) * 3_600_000 + Math.max(0, minute) * 60_000;

  const targetTime = new Date(Date.now() + totalMiliseconds);

  return formatter(targetTime);
}
