Проверял на СУБД - postgresql, MySql.

Примеры запросов JSON в первом сервисе:

127.0.0.1:8081/add_store
{
    "name": "DuinoStor"
}
ответ:
{
    "id": 8,
    "name": "DuinoStor",
    "updatedAt": "2024-11-25T14:57:38.407Z",
    "createdAt": "2024-11-25T14:57:38.407Z"
}

127.0.0.1:8081/add_product
{
    "name": "Резистор 100 Om 0805",
    "plu": 275,
    "store": "ЧипOne30"
}
ответ:
{
    "message": "Добавили"
}

127.0.0.1:8081/create_balance
{
    "name": "Резистор 101 Om 0805",
    "is_on_shelf": 2,
    "is_on_order": 2
}
ответ:
{
    "message": "Добавили остатки"
}

127.0.0.1:8081/balance_Up
{
    "name": "Резистор 100 Om 0805",
    "where": "is_on_order"
}
ответ:
{
    "message": "Up"
}

127.0.0.1:8081/balance_Down
{
    "name": "Резистор 100 Om 0805",
    "where": "is_on_shelf"
}
ответ:
{
    "message": "Down"
}

127.0.0.1:8081/get_product
{
    "name": "Резистор 94 Om 0805",
    "plu": 273
}

Примеры запросов JSON во втором сервисе:
127.0.0.1:8082/get_journal
{
    "StoreId": 5,
    "plu": 275,
    "from": "2024-11-25T13:23:02.000Z",
    "to": "2024-11-25T13:57:35.000Z",
    "action": "up balance-order"
}
Ответ:
[
    {
        "plu": 275,
        "where": "up balance-order",
        "data": 2
    },
    {
        "plu": 275,
        "where": "up balance-order",
        "data": 1
    }
]
