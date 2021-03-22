const fetch = require('node-fetch');
const md5 = require('md5');
const fastify = require('fastify')();


class HydraApi {
    baseURL = 'https://apicoin.ru:8080/';
    onPaymentCallback

    /**
     * @param {string} access_token Токен проекта
	 * @param {string} user_id Айди юзера
     */
    constructor(access_token, user_id) {
        if (!access_token) {
            throw new ReferenceError(
                'Параметр "access_token" обязателен.'
            );
        }
this.access_token = access_token;
if (!user_id) {
            throw new ReferenceError(
                'Параметр "user_id" обязателен.'
            );
        }
        this.user_id = user_id;

    };


    /**
    * @param {string} methodName Название метода
    * @param {object} params Параметры метода
    * @description Вызов любого метода API
    * @returns {string | object} Ответ на Ваш API запрос
    */
    async call(methodName, params = {}) {
        if (!methodName) {
            throw new ReferenceError(
                'Вы не указали параметр "methodName"'
            )
        }
        const json = await fetch(this.baseURL + methodName, {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                access_token: this.access_token,
		user_id: this.user_id,
                ...params
            }),
            method: 'POST'
        })

        const response = await json.json()
        return response
    }

    /**
     * @description Вернет информацию о Вашем проекте
     * @returns {object} Информация о Вашем проекте
     */
    getProjectInfo() {
        return this.call('project.info')
    }

    /**
    * @param {Number} userId
    */
    async getBalance(userId) {
        if (!userId) throw new ReferenceError('Параметр "userId" обязателен.')
        return this.call('users.getBalance', { userId })
    }

    /**
     * @param {string} name - Новое имя проекта
     * @param {string} avatar - Прямая ссылка на новый аватар проекта
     * @param {Number} group_id - Цифровой ID нового сообщества проекта
     * @description Редактирует данные Вашего проекта
     */
    editProjectInfo(name, avatar, group_id) {
	    if (!name) throw new ReferenceError('Параметр "name" обязателен.')
	    if (!avatar) throw new ReferenceError('Параметр "avatar" обязателен.')
	    if (!group_id) throw new ReferenceError('Параметр "group_id" обязателен.')
        return this.call('project.edit', { name, avatar, group_id })
    }

    /**
     * @param {Number} toId ID пользователя
     * @param {Number} amount Количество монет
     * @description Совершает перевод монет указанному пользователю
     * @returns {object} Объект перевода
     */
    sendPayment(toId, amount) {
        return this.call('payment.send', { toId, amount })
    }

    /**
     * @description Получает ссылку для перевода монет
     * @returns {string} Ссылка на перевод монет Вашему проекту
     */
    async getPaymentLink(count = 1) {
        return 'https://vk.com/app7772933#id=pay_project&project_id='+this.user_id+'&count='+count+''
    }
	
    /**
     * @param {string | Number} path Ваш IP адрес или домен
     * @param {Number} port Прослушиваемый порт
     * @description Запускает прослушивание входящих переводов
     */
async start(path, port = 8080) {
        if (!path) throw new ReferenceError('Параметр "path" обязателен.')
        if (!path.startsWith('http')) throw new ReferenceError('Параметр "path" должен начинаться с протокола http(s):// .')
        this.call('api/webhook.set', {
            url: path + ':' + port + '/transfer'
        })
        return new Promise((resolve) => {
            fastify.post('/transfer', (req, res) => {
                res.send('ok')
                if (req.body.type === 'transfer') {
                    const { amount, fromId, hash } = req.body
if (hash === md5(this.access_token + amount + fromId)) {
                        this.onPaymentCallback({ amount, fromId })
                    } //Для безопасности (НЕ УДАЛЯТЬ)
                }
            })
            fastify.listen(port, '::', () => {
                resolve()
            })
        })
    }
    /**
     * @description CallBack входящих переводов
     * @returns {object} Информация о переводе 
     */
    onPayment(context) {
        this.onPaymentCallback = context
    }
}

module.exports = { HydraApi }
