export type IArrayResponse<T> = {
    [P in keyof T]?: T[P];
} & {
    count: number;
    hasMore: boolean;
}