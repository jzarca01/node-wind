# node-wind

An API for Wind bikes and boards

\_Do you need a **paid license** ? [https://jzarca01.github.io/contact](https://jzarca01.github.io/contact)

## Usage

```javascript
const Wind = require('node-wind');
const wind = new Wind({
  licenseFilePath: './license_files/file.lic', // relative path to the root of the project
  licenseFile, // if you prefer to specify the raw content of the license file
  options = {}
});
```

## How to use options

```javascript
const Wind = require('node-wind');
const wind = new Wind({
  timeout: 3000000000,
  headers: {
    'User-Agent': 'Nintendo 64',
    'Device-id': 'your_own_uuid',
    Platform: 'ios',
    'App-Version': 'the latest version'
  }
  ...whatever you need to add
});
```

For a cool example, see _example/index.js_

## How to Log in

The authentication process is handled by Firebase, which relies on ReCAPTCHA whose implementation is only client-side
Consequently, in order to implement this API you need to have a client-side part

_*For a cool example, run :*_

```shell
node example/client/index.js
```

and browse to http://localhost:8080/index.html

Then, once you have your Firebase token you can use it with this API
For a cool example, see _example/index.js_

## Methods

### Login

```javascript
await wind.login(firebaseToken, (region = "fr"));
```

### Get boards (scooters) nearby

```javascript
await wind.getBoardsNearby({
  latitude,
  longitude
});
```

### Get bikes nearby

```javascript
await wind.getBikesNearby({
  latitude,
  longitude
});
```

### Get parking ports nearby

```javascript
await wind.getParkingPortsNearby({
  latitude,
  longitude
});
```

### Get operating countries

```javascript
await wind.getOperatingCountries();
```

### Get operating areas

```javascript
await wind.getOperatingAreas();
```

### Add card to account

```javascript
await wind.addCard({ cardNumber, expMonth, expYear, cardCvc });
```

### Delete card from account

```javascript
await wind.deleteCard();
```

### Get user

```javascript
await wind.getUser();
```

### Update profile

```javascript
await wind.updateProfile({
  firstName,
  lastName,
  email,
  region
});
```

### Add driver license

```javascript
await wind.addDriverLicense({
  firstName,
  lastName,
  licenseNumber
});
```

### Get ride history

```javascript
await wind.getHistory()
```

### Get scooter

```javascript
await wind.getScooter(boardNo, {latitude longitude})
// boardNo: S0024524
```

### Set alarm

```javascript
await wind.setAlarm(boardId, { latitude, longitude })
```

### Unlock scooter

```javascript
await wind.unlockScooter(boardId, { latitude, longitude })
/// boardId: "ef662f60-ade0-4022-ac5d-eae6cd0210ba"
```

### Get ONGOING ride status

```javascript
await wind.getRideStatus({latitude, longitude})
```

### End ride

```javascript
await wind.endRide({ latitude, longitude, finalPhoto = "https://..." })
```

### Send ONGOING ride waypoint

```javascript
await wind.sendRideWaypoint({ latitude, longitude })
```

### Send plain records

```javascript
await wind.sendPlainRecords(
    { latitude, longitude },
    eventType = "mainActivityEnter"
  )
```