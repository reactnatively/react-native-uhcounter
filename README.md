# React Natively

Projects that use React Native to tell the story of humanity. Here we'll capture how humans interact with each other using technology.

## UhCounter

We're creating a simple app to allow iOS &amp; Android users the ability to count how many times they here the word "Uh" or "Um".
* The app would simply tally the amount of these filler words they heard and tap a simple "Um" button.
* The button would then send their latitude, longitude, user ID and a text string to an API we'll provide.

_PLEASE NOTE: It is important that this app be developed with React Native because we want to deploy to our student group for testing on either iOS or Android devices._

|User Action|View|Priority|
|-|-|-|
|User register|<img src="https://github.com/reactnatively/react-uhcounter/blob/master/uhcounter-register.png" width="150">|Medium|
|User login|<img src="https://github.com/reactnatively/react-uhcounter/blob/master/uhcounter-login.png" width="150">|Medium|
|Without location optin|<img src="https://github.com/reactnatively/react-uhcounter/blob/master/uhcounter-home-withoutlocationoptin.png" width="150">|Critical|
|With location optin|<img src="https://github.com/reactnatively/react-uhcounter/blob/master/uhcounter-home-withlocationoptin.png" width="150">|Critical|

## React Natively API
* URL: http://api.reactnatively.venny.co/v1/
* endpoint: /quotes

Explore the API a bit more via [Postman collection](https://documenter.getpostman.com/view/2396336/RWToQdmz)

|Key|Value (Example)|Description|
|-|-|-|
|token|NWU1MWQ4NzIwOTY0OGNjMTNkZWI1MjNiMjA1ZA==|Token required for access to the API|
|text|If you are not willing to risk the usual you will have to settle for the ordinary.|Quote  (1111 Characters|
|lines|_SVG_|Any SVG paths (1111 Characters)|
|image|directory/subdirectory/image.file|Image file associated with the quote (255 Characters)|
|audio|directory/subdirectory/audio.file|Audio file originated with the quote (255 Characters)|
|longitude|32.7820148|Longitude of user when post occurs|
|latitude|-96.8003555|Latitude of user when post occurs|
|altitude|150|Altitude of user when post occurs|
|author|83838383|User ID of the user authoring object|
|audience|33333333|User ID of the user who is audience to this object|

## Other requirements and key considerations

This is 1 of 4 React Natively mini projects that are meant to be stand alone apps that run on both iOS and Android. They may also be submitted to their respective mobile app stores - in some form - in the near future.

- iOS (Device preference: iPhone 6 and above)
- Android (OS: Latest OS or next the latest)
- React Native (v0.56)

What's expected is 4 separate, independent code bundles that successfully build Android and iOS binaries. All dependencies must be clearly identified.

Thanks!
