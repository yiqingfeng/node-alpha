declare interface resData<T> {
    errCode: number | string;
    data: T;
}

declare interface Cert {
    cert: string | undefined; // 公钥
    key: string | undefined; // 私钥
}
