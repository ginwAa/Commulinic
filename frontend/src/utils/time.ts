export const unixSecondToYear = (unix: number): number => {
    return Math.floor(unix / 60 / 60 / 24 / 365);
}

export const unixSecondToDate = (unix: number): string => {
    return new Date(unix * 1000).toLocaleDateString();
}
