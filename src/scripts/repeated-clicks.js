export function createRepeatedClickTrigger({clicks = 3, windowMs = 600} = {}) {
  let recentClicks = [];

  return (timestamp) => {
    recentClicks = recentClicks.filter(
      (previousTimestamp) => timestamp >= previousTimestamp && timestamp - previousTimestamp <= windowMs,
    );
    recentClicks.push(timestamp);

    if (recentClicks.length < clicks) return false;

    recentClicks = [];
    return true;
  };
}
