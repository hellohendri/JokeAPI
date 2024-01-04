# JokeAPI

Welcome to JokeAPI, a delightful API that brings laughter to your applications! Explore a variety of jokes in different categories, fetch random jokes, contribute your own, and spread joy.

## Features

- Get a random joke with a single API call.
- Retrieve jokes by specific ID or type.
- Contribute new jokes to the collection.
- Explore jokes in various categories: Science, Puns, Wordplay, and more.

## API Documentation

Explore the API documentation [here](https://documenter.getpostman.com/view/18148666/2s9YsGgYDN).

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/JokeAPI.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the typescript:
   ```bash
   npm run build
   ```
4. Run the API:
   ```bash
   npm run start
   ```

The API will be available at [http://localhost:3000/api/jokes/random](http://localhost:3000/api/jokes/random)

## API Endpoints

- **GET /random:** Get a random joke.
- **GET /jokes/:id:** Get a specific joke by ID.
- **GET /jokes/filter?type=category:** Get jokes by filtering on the joke category.
- **POST /jokes:** Add a new joke.
- **PUT /jokes/:id:** Update a joke.
- **PATCH /jokes/:id:** Update part of a joke.
- **DELETE /jokes/:id:** Delete a specific joke.
- **DELETE /jokes:** Delete all jokes.

## Contributing

Feel free to contribute new jokes or improve existing ones! Follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature`.
3. Commit your changes: `git commit -m "Add your feature"`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Submit a pull request.

## License

This project is licensed under the MIT License.

Happy coding and spreading laughter! 🎉
