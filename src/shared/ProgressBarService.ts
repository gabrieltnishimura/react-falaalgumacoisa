const getBreakpointByLevel = (level: number) => {
  if (level === 0) {
    return 500;
  }
  return 500 * level + 100 * (level - 1);
}

const getLevelByPoints = (points: number) => {
  let level = 0;
  while (true) {
    const breakpoint = getBreakpointByLevel(level);
    if (points < breakpoint) {
      return level;
    }
    level++;
  }
}

const getBreakpointByPoints = (points: number) => {
  const level = getLevelByPoints(points);
  return getBreakpointByLevel(level);
}

export {
  getBreakpointByPoints,
  getLevelByPoints,
  getBreakpointByLevel,
};

