Home challenge

You are tasked with creating an Angular application focused on dog breeds. The frontend communicates with a Backend for Frontend (BFF) built in Node.js or Java, serving as a proxy to the [Dog API](https://dog.ceo/dog-api/documentation/).

Requirements:

1. Angular App:

- Use Angular CLI to initialize a new project named `dog-app`.

2. Node.js/Java/Kotlin BFF:

- Create a Node.js BFF with Express or a Java BFF.

- Implement two endpoints:

- `GET /breeds/list/all?size=10`: Fetch paginated breed data from Dog API, flatten the list, and cache it.

- `GET /breeds/detail/:id`: Retrieve breed details from the cache based on the provided ID.

3. Caching:

- Implement in-memory caching for the fetched breed data.

5. Angular Service:

- Develop an Angular service to interact with the BFF endpoints.

- Use Angular HttpClient to make requests to the BFF.

6. Angular Components:

- Build two Angular components:

- `BreedListComponent`: Display a paginated list of breeds.

- `BreedDetailComponent`: Show details of a selected breed.

- Utilize the service to fetch and display data.

Submission:

- Share the GitHub repository containing your Angular app and BFF code.

- Include a README with instructions on how to run the app.

Kindly upload your source code on github and share the link with us
