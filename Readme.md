# Hydra API

NodeJS библиотека для работы с API сервиса "Hydra Coin"

# Установка
**npm**
 `npm i hcoinapi`

## Подключение

``` js
const {
    HydraApi
} = require('hcoinapi')
const hapi = new HydraApi('Token', 'user_id')
```

## Методы API

***getBalance*** - Получить баланс пользователей

| Параметр | Тип | Обязателен | Описание |
|--|--|--|--|
| userIds | Array<Number>/Number | да |  ID пользователя, чей баланс нужно вернуть |

**Пример:**

``` js
async function run() {
    const info = await hapi.getBalance(1);
    console.log(info);
};

run().catch(console.error);
```


***getProjectInfo*** - Получить информацию о Вашем проекте

**Пример:**

``` js
async function run() {
    const info = await hapi.getProjectInfo()
    console.log(info)
}
run().catch(console.error);
```

##
***editProjectInfo*** - Редактировать информацию о Вашем проекте

| Параметр | Тип | Обязателен | Описание |
|--|--|--|--|
| name | string | Да | Название проекта |
| avatar| string | Да | Прямая ссылка на новый аватар проекта |
| group_id| number | Да | ID группы проекта |

* Все параметры должны быть переданы 

**Пример:**

``` js
async function run() {
    const info = await hapi.editProjectInfo(
        'My app',
        'vk.com/images/camera_200.png',
        1
    );
    console.log(info)
};

run().catch(console.error);
```

##
***sendPayment*** - Совершить перевод монет указанному пользователю

| Параметр | Тип | Обязателен | Описание |
|--|--|--|--|
| toId| number | да| ID пользователя, которому Вы собираетесь совершить перевод |
| amount | number | да|Количество монет, которое Вы собираетесь перевести указанному пользователю  |

**Пример:**

``` js
async function run() {
    const info = await hapi.sendPayment(1, 1);
    console.log(info);
};

run().catch(console.error);
```

##
***getPaymentLink*** - Получить ссылку на перевод монет проекту

**Пример:**

``` js
async function run() {
    const info = await hapi.getPaymentLink();
    console.log(info);
};

run().catch(console.error);
```

##
***Прослушивание входящих переводов:***

> *Наша библиотека автоматически сверяет hash входящих переводов, защищая Вас от злоумышленников.*

Для начала Вам стоит вызвать функцию **start**

| Параметр | Тип | Обязателен | Описание |
|--|--|--|--|
| path| string\number  | да | Ваш IP адрес или домен |
| port | number | нет |Прослушиваемый порт |

Затем Вам нужно подписаться на входящие переводы, используя функцию **onPayment**, в параметры который нужно передать callback функцию.

**Пример:**

``` js
function run() {
    hapi.start('http://82.112.51.71', 80);

    hapi.onPayment(context => {
        const {
            amount,
            fromId
        } = context;
        console.log(context);
    });
};

run().catch(console.error);
```
