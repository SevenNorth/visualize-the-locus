export function getInitialError(trigger: string): ErrorType {
    return {
        code: '',
        message: '',
        notReported: false,
        err: null,
        lastReported: new Date(),
        trigger,
    };
}
export function getInitialRequestStatus<ParamsType = Record<string, unknown>>(
    trigger: string,
): RequestStatusType<ParamsType> {
    return {
        lastParams: null,
        isFetching: false,
        lastExecute: new Date(),
        lastUpdated: new Date(),
        didInvalidate: true,
        trigger,
    };
}
export function getInitialRequestState<DataType>(
    trigger: string,
): Omit<RequestStateType<DataType>, 'isActive' | 'isReady'> {
    return {
        status: getInitialRequestStatus(trigger),
        error: getInitialError(trigger),
        data: null,
    };
}

export function combineStatusAndError (
    type: string,
    destState: { status: RequestStatusType; error: ErrorType },
    request: Request<unknown, unknown>,
    srcState: RequestStateType<unknown>,
): void {
    switch (type) {
    case request.actionKeys.EXECUTE:
    case request.actionKeys.SUCCESS:
    case request.actionKeys.FAILED:
        destState.status = srcState.status;
        destState.error = srcState.error;
        break;
    default:
        break;
    }
}