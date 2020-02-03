const prompt = require("prompt-async");
const Wind = require("../dist/");
const wind = new Wind({
  clientId: "8C02BC28-F7E0-4232-B7AC-11D5900AE408"
});

const jack = `eyJhbGciOiJSUzI1NiIsImtpZCI6IjUxMjRjY2JhZDVkNWZiZjNiYTJhOGI1ZWE3MTE4NDVmOGNiMjZhMzYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcHJvamVjdC04MzEwOTM1MzI2NjE3MjYxNTY3IiwiYXVkIjoicHJvamVjdC04MzEwOTM1MzI2NjE3MjYxNTY3IiwiYXV0aF90aW1lIjoxNTc4NTU2MzgyLCJ1c2VyX2lkIjoiN1pGSzZ1TXUwT05KbnhsanFyODJpbnR6TlJvMiIsInN1YiI6IjdaRks2dU11ME9OSm54bGpxcjgyaW50ek5SbzIiLCJpYXQiOjE1Nzg1NTYzODIsImV4cCI6MTU3ODU1OTk4MiwicGhvbmVfbnVtYmVyIjoiKzMzNjc3ODEyMzE5IiwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJwaG9uZSI6WyIrMzM2Nzc4MTIzMTkiXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwaG9uZSJ9fQ.EwzZwYANfZBcJWo0WOPkHFJXrB6TNf2cP6vySMwXleip2dxSpCHD-kCvlM1M-CFPOrjworZqQk5OjED7f4VpGsL2sW3eMPi0TNndeajFd0vVEhHc525QUjf9djMGhnIGdTu8pD2FdHSoy_cs7q7GO_TkK57t6YcRdiZFC_MwCQ6ouFMp-2445uJzCWTSimG_hxjfAqZHG6ZuJUZXL3Hq6kPwjjxxXrGDmluXdCsBy2S4pfQrac90h3_RnKXkR6opKX1mkJKQXCpYC8TS-NzcOJKatQWktVMTmEVpMsEPgO6a8Kxpta8zsydV95p1sYHmoDKd5hs9phNFYoe_I7pHOg`;

async function init() {
  try {
    prompt.start();
    //const { token } = await prompt.get(["token"]);
    const login = await wind.login(jack, "il");
    console.log(login);

    /*await prompt.get(["add"]);
    const addCard = await wind.addCard({
      cardNumber: 4350441500183169,
      expMonth: 01,
      expYear: 2025,
      cardCvc: 760
    });
    //await wind.deleteCard();
    */
    

    const bikes = await wind.getBoardsNearby({
      latitude: 32.081215,
      longitude: 34.808956
    });
    console.log(bikes.items.filter(bike => bike.isReadyForRiding));

    const getBikeByBoardId = (boardId) => bikes.items.find(bike => bike.boardId === boardId)

    const { board } = await prompt.get(["board"]);

    const testBike = getBikeByBoardId(board);
    console.log(testBike)

    await wind.sendPlainRecords({
      latitude: testBike.latitude,
      longitude: testBike.longitude
    })

    const { code } = await prompt.get(["code"]);
    const scooterInfos = await wind.getScooter(testBike.boardNo, {
      latitude: testBike.latitude,
      longitude: testBike.longitude
    });
    console.log(scooterInfos);

    await wind.getBoardsNearby({
      latitude: testBike.latitude,
      longitude:  testBike.longitude
    });

    await wind.setAlarm(testBike.boardId, {
      latitude: testBike.latitude,
      longitude: testBike.longitude
    });

    await wind.sendPlainRecords({
      latitude: testBike.latitude,
      longitude: testBike.longitude
    })

    await prompt.get(["start"]);
    const ride = await wind.unlockScooter(testBike, {
      latitude: testBike.latitude,
      longitude: testBike.longitude
    });
    console.log(ride);

    await prompt.get(["end"]);
    await wind.endRide({
      latitude: testBike.latitude,
      longitude: testBike.longitude
    });

    await prompt.get(["history"]);
    const history = await wind.getHistory();
    console.log(history);
  } catch (err) {
    console.log(err);
  }
}
init();
