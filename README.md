## To run the API live


[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/15242040-cd21dd4d-0e83-40be-b753-1da75b50d75a?action=collection%2Ffork&collection-url=entityId%3D15242040-cd21dd4d-0e83-40be-b753-1da75b50d75a%26entityType%3Dcollection%26workspaceId%3D13b48930-2b8b-4ccb-9df0-f9b721f42b4e) 

## To run the API locally
1. ``` git clone https://github.com/vapranav/YBox.git```
2. ``` npm install ```
3. Create .env file and specify environment variables like so,
```DB_NAME=""```
```DB_USER=""```
```DB_PASSWORD=""```
4. Run the utility functions in ```app.js``` by uncommenting them to populate the database.
5. ``` node app.js ```

## Additional Notes 
The database contains 5 competitions and 10 submissions each. 50 submissions likes were created and randomly given to the submissions. (See ```createLikes()``` in ```app.js```)
 
