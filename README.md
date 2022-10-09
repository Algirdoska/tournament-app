# 1.1. Sistemos paskirtis

Projekto tikslas – palengvinti turnyro eigos atvaizdavimą ir peržiūrą.
Veikimo principas – pačią kuriamą platformą sudaro dvi dalys: internetinė aplikacija, kuria naudosis žaidėjai, administratorius bei aplikacijų programavimo sąsaja (angl. trump. API).
Naudotojas, norėdamas naudotis šia platforma, prisiregistruos prie internetinės aplikacijos ir galės sukurti turnyrus pasirinkdamas turnyro kategoriją ir dydį ir sukurti komandas.

## 1.2.Funkciniai reikalavimai

### Svečias galės:

1.	Peržiūrėti pagrindinį puslapį.
2.	Peržiūrėti turnyrų kategorijas
3.	Peržiūrėti turnyrus.
4.	Prisijungti ir prisiregistruoti prie internetinės aplikacijos.

### Registruotas naudotojas galės:

1.	Atsijungti nuo internetinės aplikacijos;
2.	Sukurti turnyrą:
3.	Nustatyti turnyro dydį;
4.	Valdyti savo sukurtus turnyrus;
5.	Pridėti dalyvaujančias komandas;

### Administratorius galės:
1.	Valdyti turnyrus
2.	Valdyti naudotojus.
3.	Valdyti turnyrų kategorijas


# 2.	Sistemos architektūra

###  Sistemos sudedamosios dalys:

•	Kliento pusė (ang. Front-End) – naudojant React.js;

•	Serverio pusė (angl. Back-End) – naudojant PHP Laravel. Duomenų bazė – MySQL.

2.1 pav. pavaizduota kuriamos sistemos diegimo diagrama. Sistemos talpinimui yra naudojamas Azure serveris. Kiekviena sistemos dalis yra diegiama tame pačiame serveryje. Internetinė aplikacija yra pasiekiama per HTTP protokolą. Šios sistemos veikimui (pvz., duomenų manipuliavimui su duomenų baze) yra reikalingas API, kuris pasiekiamas per aplikacijų programavimo sąsają. Pats API vykdo duomenų mainus su duomenų baze - tam naudojama ORM sąsaja.
 

 ![](Pictures\Picture1.png)

2.1 pav. Sistemos diegimo diagrama


---

# API

## Category

URL: api/categories

Metodas: GET

Gražina visą kategorijų sąrašą

Užklausos atsakymas

```json
{
        "id": 1,
        "title": "Action",
        "created_at": "2022-10-09T13:47:30.000000Z",
        "updated_at": "2022-10-09T13:47:30.000000Z",
        "tournaments": [
            {
                "name": "ULTIMATE DOOM SPEEDRUN"
            },
            {
                "name": "CS:GO knifes only"
            },
            {
                "name": "WOW raid race"
            },
            {
                "name": "League of Legends championship"
            },
            {
                "name": "testing"
            }
        ]
    }
```

Atsakymo kodas: 200

Klaidų kodai: 404

---

URL: api/categories

Metodas: POST

Įdeda naują kategoriją į duomenų bazę

Užklausos atsakymas

```json
{
    "title": "test",
    "updated_at": "2022-10-09T21:05:44.000000Z",
    "created_at": "2022-10-09T21:05:44.000000Z",
    "id": 8,
    "tournaments": []
}
```

Atsakymo kodas: 201

Klaidų kodai: 422 

---

URL: api/categories/{id}

Metodas: PUT

Atnaujina kategoriją duomenų bazėje

Užklausos atsakymas

```json
{
{
    "id": 8,
    "title": "test",
    "created_at": "2022-10-09T21:05:44.000000Z",
    "updated_at": "2022-10-09T21:05:44.000000Z",
    "tournaments": []
}
}
```

Atsakymo kodas: 200

Klaidų kodai: 422; 404 

---

URL: api/categories/{id}

Metodas: DELETE

Ištrina kategoriją iš duomenų bazės

Užklausos atsakymas

```
```

Atsakymo kodas: 200

Klaidų kodai:  404 

---

## Tournament

URL: api/tournaments

Metodas: GET

Gražina visą turnyrų sąrašą

Užklausos atsakymas

```json
 {
        "id": 1,
        "name": "ULTIMATE DOOM SPEEDRUN",
        "created_at": "2022-10-09T13:49:54.000000Z",
        "updated_at": "2022-10-09T13:49:54.000000Z",
        "categories": [
            {
                "title": "Action"
            },
            {
                "title": "SinglePlayer"
            }
        ],
        "teams": [
            {
                "name": "DrLa"
            },
            {
                "name": "visconic"
            }
        ]
    }
```

Atsakymo kodas: 200

Klaidų kodai: 404

---

URL: api/tournaments

Metodas: POST

Įdeda naują turnyrą į duomenų bazę

Užklausos atsakymas

```json
{
    "name": "test",
    "updated_at": "2022-10-09T21:17:09.000000Z",
    "created_at": "2022-10-09T21:17:09.000000Z",
    "id": 8,
    "categories": [
        {
            "title": "Action"
        },
        {
            "title": "RPG"
        }
    ]
}
```

Atsakymo kodas: 201

Klaidų kodai: 422; 404

---

URL: api/tournaments/{id}

Metodas: PUT

Atnaujina turnyrą duomenų bazėje

Užklausos atsakymas

```json
{
    "id": 9,
    "name": "test",
    "created_at": "2022-10-09T21:17:34.000000Z",
    "updated_at": "2022-10-09T21:17:34.000000Z",
    "categories": [
        {
            "title": "Action"
        },
        {
            "title": "RPG"
        }
    ],
    "teams": [
        {
            "name": "DrLa"
        },
        {
            "name": "visconic"
        }
    ]
}
```

Atsakymo kodas: 200

Klaidų kodai: 422; 404 

---

URL: api/tournaments/{id}

Metodas: DELETE

Ištrina turnyrą iš duomenų bazės

Užklausos atsakymas

```
```

Atsakymo kodas: 200

Klaidų kodai:  404 

---

## Team

URL: api/team

Metodas: GET

Gražina visą komandų sąrašą

Užklausos atsakymas

```json
 {
        "id": 1,
        "name": "DrLa",
        "created_at": "2022-10-09T13:52:16.000000Z",
        "updated_at": "2022-10-09T13:52:16.000000Z",
        "tournaments": [
            {
                "name": "ULTIMATE DOOM SPEEDRUN"
            },
            {
                "name": "test"
            }
        ]
    },
```

Atsakymo kodas: 200

Klaidų kodai: 404

---

URL: api/teams

Metodas: POST

Įdeda naują komandą į duomenų bazę

Užklausos atsakymas

```json
{
    "name": "testing team",
    "updated_at": "2022-10-09T21:31:52.000000Z",
    "created_at": "2022-10-09T21:31:52.000000Z",
    "id": 3
}
```

Atsakymo kodas: 201

Klaidų kodai: 422; 404

---

URL: api/teams/{id}

Metodas: PUT

Atnaujina komandą duomenų bazėje

Užklausos atsakymas

```json
{
    "id": 3,
    "name": "testing team",
    "created_at": "2022-10-09T21:31:52.000000Z",
    "updated_at": "2022-10-09T21:31:52.000000Z",
    "tournaments": [
        {
            "name": "WOW raid race"
        }
    ]
}
```

Atsakymo kodas: 200

Klaidų kodai: 422; 404 

---

URL: api/teams/{id}

Metodas: DELETE

Ištrina komandą iš duomenų bazės

Užklausos atsakymas

```
```

Atsakymo kodas: 200

Klaidų kodai:  404 

---
