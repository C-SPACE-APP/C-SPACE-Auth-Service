# C-SPACE-Auth-Service  
The Auth Services will handle all requests with relation to the session of C-\<SPACE> users. The main function of this service is the loggin/sign-up of users which is done using gooogle authentication. As of now, users can only create a C-\<SPACE> account using a valid **UP mail**.

<br/>

#### Login or Sign-up  
To login or sign-up for an account, an endpoint **GET /google** is made available. This endpoint will redirect the user to a google login page which will also show the information that will be collected by C-\<SPACE> from the account after a succesful login or sign-up.

#### Check if loogged in
To check if a user is currently logged in, an endpoint **GET /getUser** is made available. This endpoint will respond with an object containing information of the logged in user.

#### Logout  
To logout, the endpoint **GET /logout** can be used.
