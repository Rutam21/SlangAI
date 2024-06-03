# SlangAI: Revolutionizing Slang Learning Experience

![Cover](https://github.com/Rutam21/SlangAI/assets/47860497/cc2ef4d4-214d-45b0-bbf1-b4104ab598a3)


## Table of Contents

- [Introduction](#introduction)
- [Walkthrough](#walkthrough)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Introduction

**Welcome to SlangAI, the official repository for the [SLANGAI.CO](https://slangai.co/) application. SlangAI is a cutting-edge web app designed to revolutionize the way you interact with slang. Leveraging advanced AI technology powered by Gemini, SlangAI provides accurate and engaging translations, generating slang sentences, and exploring the etymology of various slangs. This app is perfect for developers, writers, linguists, and anyone fascinated by the ever-evolving world of slang.**

## Walkthrough

**You can find a short demo of the App below. Feel free to check it out yourself at https://slangai.co/.**

https://github.com/Rutam21/SlangAI/assets/47860497/165733ae-2448-4112-9866-06c457491e59

**The demo is also uploaded on YouTube. Check it out!**

[![YouTube](https://github.com/Rutam21/SlangAI/assets/47860497/5542342d-b476-4b52-b81f-5e54640377e3)](https://www.youtube.com/watch?v=cMHkWLckW6k)

## Features

### Know the Slang

**SlangAI offers the Know the Section that instantly finds the full forms and meanings of a given slang.**
  
![Know the Slang](https://github.com/Rutam21/SlangAI/assets/47860497/562741c3-5b3b-454b-9361-9c04ef146c71)

### Daily Slangs
 
**This section offers users four new slang words daily, complete with their meanings and example sentences to illustrate their usage. The slang words are refreshed every day at 00:00 UTC.**

![Daily Slangs](https://github.com/Rutam21/SlangAI/assets/47860497/fdda02a5-b5fb-4bef-ada6-ce3dd8951bfd)

### Slang Etymology

**This section enables the users to dive deep into the origins, evolution over time, and the cultural impact of a given slang.**

![Slang Etymology](https://github.com/Rutam21/SlangAI/assets/47860497/54b3d35e-11db-4404-8413-712f67f2ad0a)

### Slangslator

**In this section, the users can input a sentence that contains one or more slang terms and get it translated instantly to standard English.**

![Slangslator](https://github.com/Rutam21/SlangAI/assets/47860497/8c80d9b8-e433-4f15-afc3-d86d49c81605)

### Slangtence

**This section randomly generates a sentence with slang and also provides its meaning for creative inspiration.**

![Slangtence](https://github.com/Rutam21/SlangAI/assets/47860497/01e4bb0b-2632-45f0-9c47-8abf7e03972e)


## Other App Features

### ShepherdJS App Tour

**This app utilizes ShepherdJS to offer users a guided tour of its various functional sections, providing contextual information as soon as the webpage loads without any user intervention to start the tour.**

![App Tour Start](https://github.com/Rutam21/SlangAI/assets/47860497/19d26f53-bca8-4e7c-af17-69422e1af9cd)

**The App also uses ShepherdJS in the [Slang Etymology](#slang-etymology) section to display the results to the user. Here, as soon as the user clicks any of the headers in the result panel i.e., Origin or Evolution or Cultural Impact, it opens a tour step that shows the brief description of the header.**

![Slang Etymology Origin Response in ShepherdJS Tour Step](https://github.com/Rutam21/SlangAI/assets/47860497/cf446bc6-c93a-45e7-b9ee-d2942c9cc1bb)

**The ShepherdJS Tour window has been modified with CSS to match the app brand colors and maintain the aesthetics.**

**If the user completes the tour fully, then the tour is not shown again. A value named `tour_complete` is marked as `TRUE` and is stored in the local storage with a validity of 1 hour. The tour is shown again only after this value has expired i.e., after an hour.**

[![Shepherd Bannner](https://github.com/Rutam21/SlangAI/assets/47860497/de12c421-ab7d-4628-8ed6-1995a8fa4d2a)](https://shepherdpro.com/)

### Caching

**The App has its caching mechanism in place to retrieve the results faster and keep the API limits for Gemini under control.**

**Caching is in use for the following sections in the App.**

- [Know the Slang](know-the-slang)
- [Slang Etymology](#slang-etymology)
- [Slangslator](slangslator)

**The cached data is stored in the local storage and stays valid for a maximum of 24 hours.**

### Error Handling

**The App has implemented robust error handling to enhance the user experience and deliver clearer logs to troubleshoot in case of any failures.**

### Health Check

**The app has a separate endpoint that serves as a health check update. When a user hits this endpoint, the server returns a 200 status if it is up and running.**

![Health Check Page](https://github.com/Rutam21/SlangAI/assets/47860497/f1a8b81e-abb1-4cf7-a625-c17383b0639f)

### Others

**The app has also used input validation to restrict misuse of the input forms and also has an animated loading screen to imply that the response is currently under processing.**

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Rutam21/slangai.git
   ```
2. **Navigate to the project directory:**
   ```bash
   cd slangai
   ```
3. **Install the dependencies:**
   ```bash
   npm install
   ```
4. **Create a `.env` file with all the variables and their correct values as mentioned in the `.env.example` file.**

## Usage

1. **Start the development server:**
   ```bash
   npm start
   ```
2. Open your browser and navigate to `http://localhost:3000`.

## API Endpoints

- **POST /getSlang**
  - Description: Provides the full form and meaning of the input slang.
  - Request Body: JSON object with a `text` field.
  - Response: Slang Details.

- **GET /slangData**
  - Description: Fetches 4 slangs that are updated daily at 00:00 UTC.
  - Response: JSON Array object with daily slangs, their meanings, and an expale sentence using them.

- **POST /getSlangEtymology**
  - Description: Provides the etymology of a given slang.
  - Request Body: JSON object with a `text` field.
  - Response: Etymology of the slang containing its Origin, Evolution, and Cultural Impact.

- **POST /getSlangslator**
  - Description: Translates a given sentence with slangs to standard English.
  - Request Body: JSON object with a `text` field.
  - Response: Standard English translation of the Slang Sentence.

- **GET /getSlangtence**
  - Description: Fetches a random slang sentence.
  - Response: JSON object with `slangtence` and `meaning`.

- **GET /health**
  - Description: Server health check endpoint.
  - Response: Server health status.

## Contributing

We welcome contributions from the community! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

Thank you for using SlangAI! If you have any questions or feedback, feel free to open an issue or submit a pull request. Enjoy exploring and learning slang!

---

![SalngAI Tech Stack Banner](https://github.com/Rutam21/SlangAI/assets/47860497/b74d496d-68e0-4552-9618-84e031af9381)
