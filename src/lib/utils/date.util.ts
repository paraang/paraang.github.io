type DateStyle = Intl.DateTimeFormatOptions['dateStyle'];
type TimeStyle = Intl.DateTimeFormatOptions['timeStyle'];

export function formatDate(
	date: string,
	dateStyle: DateStyle = 'full',
	timeStyle: TimeStyle = 'short',
	locales = 'ko-KR'
) {
	const formatter = new Intl.DateTimeFormat(locales, { dateStyle, timeStyle, hour12: false });
	return formatter.format(new Date(date));
}
