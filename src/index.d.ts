declare class HydraApi {
    constructor(access_token: string, user_id: string);
    /** 
    * ����� ������ ������ API. 
    */
    call(methodName: string, params: object): Promise<string | object>;

    /** 
    * ������ ���������� � ����� �������. 
    */
    getProjectInfo(): object;

    /** 
    * ����������� ������ ������ ������� 
    */
    editProjectInfo(name: string, avatar: string, group_id: number): any;

    /** 
    * ���������� ��� ������ �� ���������, � ������ ������ - �� �������� � �������. 
    */
    sendVerify(): void;

    /** 
    * ��������� ������� ����� ���������� ������������. 
    */
    sendPayment(toId: number, amount: number): object;

    /** 
    * ���������� ������� ��������. 
    */
    getHistoryPayments(type: string, limit: number): object;

    /** 
    * ������� ������ ��������� ������������� (�� ����� 20). 
    */
    getBalance(userIds: number[] | number): Promise<object>;

    /** 
    * �������� ������ ��� �������� �����. 
    */
    getPaymentLink(): string;

    /** 
    * ��������� ������������� �������� ���������. 
    */
    Start(path: string | number, port: number): void;

    /** 
    * CallBack �������� ���������. 
    */
    onPayment(context: () => void): object;
}