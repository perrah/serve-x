# Simple feedback portal

## Feedback Portal Backend 📝

The Feedback Portal Backend is the server-side application for collecting and displaying customer feedback. 
It is built using PHP and designed to work seamlessly with the Feedback Portal Frontend. 
This backend handles feedback submission and retrieves recent feedback stored in a MySQL database.

## Live Demo:-

You can test the frontend of the portal here:https://servex.com.ng/

## Features:-
1) Submit Feedback: Accepts customer feedback with a name, star rating, and comments.
2) Retrieve Feedback: Displays the most recent feedback in a structured format.
3) PHP-Based Backend: Processes client requests and connects to a MySQL database.
4) Integration-Ready: Easily integrates with any frontend via RESTful APIs.

## Prerequisites:-
Before setting up the backend, ensure you have the following installed:
-Node.js
-PHP 8.x
-MySQL
-Composer (optional, for additional dependencies)



## Setup Instructions:-
### 1. Clone the Repository
Clone the repository to your local machine:
```bash
git clone https://github.com/your-username/feedback-portal-backend.git
cd feedback-portal-backend
```



### 2. Configure the Database:-
Import the SQL schema:
Locate the db.sql file containing the database schema.
Import it into your MySQL server:
```bash
mysql -u your_user -p your_database < db.sql
```
Update the database connection in public/forms/db.php



### 3. Run Locally:-
Start a PHP development server:
```bash
php -S localhost:8080 -t public
```
Access the backend via http://localhost:8080.


### Contribution:-
Contributions are welcome! Please fork the repository and submit a pull request for any changes.

##License:-
This project is licensed under the MIT License.

If you need more info about this project or you want use to advance on it, let us know 


