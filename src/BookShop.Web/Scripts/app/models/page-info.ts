export class PageInfo {
    constructor(
        public totalPageCount: number,
        public currentPage: number,
        public pageSize: number,
        public totalItemsCount: number
    ) { }
}