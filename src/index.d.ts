declare class HydraApi {
    constructor(access_token: string, user_id: string);

    call(methodName: string, params: object): Promise<string | object>;

    getProjectInfo(): object;

    editProjectInfo(name: string, avatar: string, group_id: number): any;
    
    getTransactionList(tx: number): object;
    
    formatCoins(coins: number): object;

    getBalance(userId: number): object;
    
    sendPayment(toId: number, amount: number): object;

    getPaymentLink(): string;

    Start(path: string | number, port: number): void;

    onPayment(context: () => void): object;
}
