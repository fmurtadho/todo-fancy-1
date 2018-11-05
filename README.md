**FANCY TODO - API DOCUMENTATION**
-----------------------------------------------------------

**REGISTER**
----

* **URL**

  /users/register

* **Method:**
  | `POST` |

* **Data Params**

  **Content:** `{ name : John Doe , email : example@mail.com , password : password }`

* **Success Response:**

    **Code:** 201 <br />
    **Content:** `{ data : { name : John Doe , email : example@mail.com , password : password } , message : Registration Success! you can use your email and password to log in }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Log in" , message : 'Internal Server Error, Register Failed' }`

    <br>IF INPUT NAME / PASSWORD LENGTH IS LESS THAN 4 

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ message : 'Minimum name & password length is 4' }`

    <br>IF EMAIL FORMAT IS INVALID 

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ message : 'Invalid email format'}`


**LOGIN**
----

* **URL**

  /users/login

* **Method:**
  
  

  | `POST` |
  
* **Data Params**

  {'email' : 'email@mail.com' , 'password' : 'password'}

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ token : "asdfasdf1243423asdfasdf" , userId : "asdfasdfasdfasdf123123414" }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Log in" , message : "Login Error" }`

    OR (if body password does not match password stored in database)

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "Invalid Password" }`

    OR (if body email and password length is less than 4)

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ message : "Invalid Email / Password" }`

**CREATE GROUP TASK**
----

* **URL**

  /todos/group/:id

* **Method:**

  | `POST` |
  
*  **URL Params**

   **Required:**
 
   `id=[string]`

*  **Headers**
    `access token`

* **Data Params**

  {name : 'name' , description : 'description' , due_date : '2018-11-11'}

* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** `{ message : "Add Task Success" , {name : 'name' , description : 'description' , due_date : '2018-11-11'} }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Create Task Failed" }`

**CREATE TASK**
----

* **URL**

  /todos

* **Method:**

  | `POST` |
  
*  **Headers**
    `access token`

* **Data Params**

  {name : 'name' , description : 'description' , due_date : '2018-11-11'}

* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** `{ message : "Add Task Success" , {name : 'name' , description : 'description' , due_date : '2018-11-11'} }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Create Task Failed" }`

**READ TASKS**
----

* **URL**

  /todos

* **Method:**

  | `GET` |

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{ task }]`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Failed to get all task list from database" }`

**READ TASK**
----

* **URL**

  /todos/:id

* **Method:**

  |  `GET` |
  
*  **URL Params**

   **Required:**
 
   `id=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ _id : 1234567890 , name : "name" , description : "description" , due_date : 2018-12-12 , status : false }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Error in finding specified Task" }`

**UPDATE TASK**
----

* **URL**

  /todos/:id

* **Method:**

  | `PUT` |
  
*  **URL Params** 

   **Required:**
 
   `id=[string]`

*  **Headers**
    `access-token`

* **Data Params**

  `{ _id : 1234567890 , name : "name" , description : "description" , due_date : 2018-12-12 , status : false }`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ _id : 1234567890 , name : " updated name" , description : "updated description" , due_date : "updated 2018-12-12" , status : false }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Edit Task Failed" , error : "error"}`

**DELETE TASK**
----

* **URL**

  /todos/:id

* **Method:**

  | `DELETE` |
  
*  **URL Params**

   **Required:**
 
   `id=[string]`

*  **Headers**
    `access-token`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ message : 'Task deleted' }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Failed to delete task" }`

**COMPLETE TASK**
----

* **URL**

  /todos/complete/:id

* **Method:**

  | `PUT` |
  
*  **URL Params**

   **Required:**
 
   `id=[string]`

*  **Headers**
    `access-token`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ message : "Task Completed" }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "failed to complete task (error)" }`

**UNCOMPLETE TASK**
----

* **URL**

  /todos/uncomplete/:id

* **Method:**

  | `PUT` |
  
*  **URL Params**

   **Required:**
 
   `id=[string]`

*  **Headers**
    `access-token`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ message : "Task uncompleted" }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Uncomplete task failed (error)" }`

**READ USER GROUP**
----

* **URL**

  /groups/mygroup

* **Method:**

  | `GET` |

* **headers:**
 
   `access-token`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{ groups data }]`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Failed To Get User Group Data" }`

**READ GROUP INVITATION**
----

* **URL**

  /groups/myinvitation

* **Method:**

  | `GET` |
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

*   **headers:**
 
    `access-token`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{ invitation data }]`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Error getting group invitation list" }`

**CREATE GROUP**
----

* **URL**

  /groups

*  **headers:**
 
    `access-token`

* **Method:**

  | `POST` |

* **Data Params**

  `{ name : "group name" , group : "group id" }`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{ created : { name : "group name" , sender : "sender id" , receiver : "receiver id" , group : "group id" , status : false } , message : "create group success" }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "create group failed" }`

**SEND GROUP INVITATION**
----

* **URL**

  /groups/invite

* **Method:**

  | `POST` |
  
*  **Headers**

   `access-token`

* **Data Params**

  `{ invited : "invited email"}`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ message : "Invitation Sent" }`
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ message : "Invitation Error" }`

**ACCEPT GROUP INVITATION**
----

* **URL**

  /groups/accept/:id

* **Method:**
  | `POST` |
  
*  **Headers**

   `access-token`

*  **Url Parameter**

   **Required:**
 
   `id=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ messsage : "You are now member of 'group name' " }`
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ message : "Error in adding member to 'group name' " }`

**REFUSE GROUP INVITATION**
----

* **URL**

  /groups/refuse/:id

* **Method:**

  | `POST` |
  
*  **URL Params**

   **Required:**
 
   `id=[string]`

*   **Headers**
    `access-token`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ message : 'group invitation refused' }`
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ message : "Refuse Invitation Error" }`












