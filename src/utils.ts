export const truncate = (text: string | undefined, length: number = 100) => {
	return text && text.length > length ? text.slice(0, length) + '...' : text
}
