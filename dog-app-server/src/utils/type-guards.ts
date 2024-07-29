export function isPromiseSettledResultRejected(input: PromiseSettledResult<unknown>): input is PromiseRejectedResult {
	return input.status === 'rejected'
}

export function isPromiseSettledResultFulfilled<T>(input: PromiseSettledResult<T>): input is PromiseFulfilledResult<T> {
	return input.status === 'fulfilled'
} 
