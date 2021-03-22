declare class HydraApi {
    constructor(access_token: string, user_id: string);
    /** 
    * Вызов любого метода API. 
    */
    call(methodName: string, params: object): Promise<string | object>;

    /** 
    * Вернет информацию о Вашем проекте. 
    */
    getProjectInfo(): object;

    /** 
    * Редактирует данные Вашего проекта 
    */
    editProjectInfo(name: string, avatar: string, group_id: number): any;

    /** 
    * Отправляет Ваш проект на модерацию, в случае успеха - Вы попадете в каталог. 
    */
    sendVerify(): void;

    /** 
    * Совершает перевод монет указанному пользователю. 
    */
    sendPayment(toId: number, amount: number): object;

    /** 
    * Возвращает историю платежей. 
    */
    getHistoryPayments(type: string, limit: number): object;

    /** 
    * Получит баланс выбранных пользователей (не более 20). 
    */
    getBalance(userIds: number[] | number): Promise<object>;

    /** 
    * Получает ссылку для перевода монет. 
    */
    getPaymentLink(): string;

    /** 
    * Запускает прослушивание входящих переводов. 
    */
    Start(path: string | number, port: number): void;

    /** 
    * CallBack входящих переводов. 
    */
    onPayment(context: () => void): object;
}