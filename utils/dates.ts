export const getStringSlashedDateFromDate = (date: Date | number, locale: 'fr' | 'en'): string => {
    const convertedDate = typeof date === 'number' ? new Date(date) : date;
    const d = convertedDate.getDate() < 10 ? '0' + convertedDate.getDate() : convertedDate.getDate();
    const m = convertedDate.getMonth() + 1 < 10 ? '0' + (convertedDate.getMonth() + 1) : convertedDate.getMonth() + 1;
    const y = convertedDate.getFullYear();
    return locale === 'fr' ? `${ d }/${ m }/${ y }` : locale === 'en' ? `${ m }/${ d }/${ y }` : '';
};
