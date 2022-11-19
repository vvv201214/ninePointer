//import app here

//set the environment variables

//connect the database

//start the server (extract server in a variable)

//handle suuden unexpected crashes here

//UNCOMMENT THE CODE BELOW FOR UNEXPECTED CRASH HANDLING!!

/* 

process.on('unhandledRejection', (err) => {
    console.log(err.name, err.message);
    console.log('UNHANDLED REJECTION! Shutting Down...');
    server.close(() => {
      process.exit(1);
    });
  });


*/
