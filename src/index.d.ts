declare class HydraApi {
    constructor(access_token: string, user_id: string);
    /** 
    * Âûçîâ ëþáîãî ìåòîäà API. 
    */
    call(methodName: string, params: object): Promise<string | object>;

    /** 
    * Âåðíåò èíôîðìàöèþ î Âàøåì ïðîåêòå. 
    */
    getProjectInfo(): object;

    /** 
    * Ðåäàêòèðóåò äàííûå Âàøåãî ïðîåêòà 
    */
    editProjectInfo(name: string, avatar: string, group_id: number): any;

    /** 
    * Îòïðàâëÿåò Âàø ïðîåêò íà ìîäåðàöèþ, â ñëó÷àå óñïåõà - Âû ïîïàäåòå â êàòàëîã. 
    */
    sendVerify(): void;

    /** 
    * Ñîâåðøàåò ïåðåâîä ìîíåò óêàçàííîìó ïîëüçîâàòåëþ. 
    */
    sendPayment(toId: number, amount: number): object;

    /** 
    * Âîçâðàùàåò èñòîðèþ ïëàòåæåé. 
    */
    getHistoryPayments(type: string, limit: number): object;

    /** 
    * Ïîëó÷àåò ññûëêó äëÿ ïåðåâîäà ìîíåò. 
    */
    getPaymentLink(): string;

    /** 
    * Çàïóñêàåò ïðîñëóøèâàíèå âõîäÿùèõ ïåðåâîäîâ. 
    */
    Start(path: string | number, port: number): void;

    /** 
    * CallBack âõîäÿùèõ ïåðåâîäîâ. 
    */
    onPayment(context: () => void): object;
}
