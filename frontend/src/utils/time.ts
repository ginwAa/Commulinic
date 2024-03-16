export const unixSecondToYear = (unix: number | null | undefined): number => {
    if (unix === null || unix === undefined) {
        return 0;
    }
    return Math.floor(unix / 60 / 60 / 24 / 365);
}

export const unixSecondToDate = (unix: number | null | undefined): string => {
    if (unix === null || unix === undefined) {
        return '';
    }
    return new Date(unix * 1000).toLocaleDateString();
}
