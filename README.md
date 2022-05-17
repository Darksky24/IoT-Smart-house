
# IoT Smart House

This project aims to create a small scale smart house with many features and an app which can 
show the status along with necessary information such as "Door status" , "light density" ,"Temperature" ..etc


## Deployment
- This smart house is built with the core around microbit and its sensors, each sensors will play a different role and then transfer the data through the gateway on PC.
- Gateway will then publish the data on to Adafruit feeds via MQTT protocol
- The app subscribes to the feeds on Adafruit and retrieve the infomation it needs and display 
- This is a 2-ways communication . The app can control stuff via button and send it back to the house


## Main feature
- App: Login authentication with database
- Smart door: A door with password and can be changed through the app . Also held a function to notify with a buzzer if there password is wrong or the door is opened when the password hasnt been writen.
- Smart Curtain: A sensor on Microbit will detect light density and control the curtain so it can be the most suitable for the house
- Smart Temp: The Curtain could also be automatically open or close base on the temperature in the room

## Documentation

[Documentation](Refer to the PDF above)


## Acknowledgements
- [Sample Demonstration](https://www.youtube.com/watch?v=K4X5E1cIa_A)

## Tech Stack

**Hardware:** Microbit

**Server:** Adafruit, MQTT protocol

**App:** React Native

## Authors

- [@anhnohaxedo](https://github.com/anhnohaxedo)
- [@Darksky24](https://github.com/Darksky24)
- [@normalguy12](https://github.com/normalguy12)
- ÄoÃ n Viá»‡t TÃº
- Tráº§n Quá»‘c Duy

