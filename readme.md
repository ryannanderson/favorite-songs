# Project My Favorite Songs

- My favorite songs allows the user to input their favorite songs and create a log of what their favorite songs are.

## Resource

Songs Attributes

- Name (string)
- Artist (string)
- Album (string)
- Genre (string)
- Year (integer)

Users Attributes

- First Name (string)
- Last Name (string)
- Email (string)
- Password (string)

## Schema

```sql
CREATE TABLE songs (
id INTEGER PRIMARY KEY,
name TEXT,
artist TEXT,
album TEXT,
genre TEXT,
year INTEGER);
```

```sql
CREATE TABLE users (
id INTEGER PRIMARY KEY,
firstName TEXT,
lastName TEXT,
email TEXT,
password TEXT);
```

## REST Endpoints

| Name                      | Method | Path      |
| ------------------------- | ------ | --------- |
| Retrieve songs Collection | GET    | /songs    |
| Retrieve song Member      | GET    | /songs/id |
| Create song Member        | POST   | /songs    |
| Update song Member        | PUT    | /songs/id |
| Delete song Member        | DELETE | /songs/id |
| Create user Member        | POST   | /users    |
| Create session            | POST   | /sessions |

```
bcrypt.hashlib used to encrypt passwords with random salt

```
