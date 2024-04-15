export const generateIssuesUrl = (input: string): string => {
  const rest = input.replace("https://github.com/", "");
  return `https://api.github.com/repos/${rest}/issues?state=all&per_page=15`;
};

export const generateAboutUrl = (input: string): string => {
  const rest = input.replace("https://github.com/", "");
  return `https://api.github.com/repos/${rest}`;
};

export const formatTimeAgo = (input: string | Date): string => {
  const date = input instanceof Date ? input : new Date(input);
  const formatter = new Intl.RelativeTimeFormat("en");
  const ranges = {
    year: 3600 * 24 * 365,
    month: 3600 * 24 * 30,
    week: 3600 * 24 * 7,
    day: 3600 * 24,
    hour: 3600,
    minute: 60,
    second: 1,
  };
  const secondsElapsed = (date.getTime() - Date.now()) / 1000;
  for (const key of Object.keys(ranges) as (keyof typeof ranges)[]) {
    if (typeof ranges[key] === "number") {
      if (ranges[key] < Math.abs(secondsElapsed)) {
        const delta = secondsElapsed / ranges[key];
        return formatter.format(Math.round(delta), key);
      }
    }
  }
  return "";
};

