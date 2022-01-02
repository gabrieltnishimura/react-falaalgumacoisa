# Fala Alguma Coisa

The "Fala Alguma Coisa" ecosystem consists of three applications (app, backend and recognition). It stores anonymous data and voice recordings (Portuguese Brazil) to a database. This data is later used to train a speech recognition system.

## Ecosystem

- App: Contains voice recording, collection of basic anonymous data, gamified user jorney to learn and contribute to science. (this repo)
- Backend: Anonymous data and recordings are stored to a database. It also manages word suggestion to the app recordings. (https://github.com/gabrieltnishimura/node-falaalgumacoisa)
- Speech Recognition: Using Tensorflow APIs (>2.0.0), speech data is converted to MFCC to train a neural network using [Graves's CTC](https://www.cs.toronto.edu/~graves/icml_2006.pdf). (https://github.com/gabrieltnishimura/tf2-ctc-speech-recognition)

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn start

# production
$ yarn build && node server

# Will be available at http://localhost:8080/
```

## Test

```bash
# unit tests
$ yarn test
```
