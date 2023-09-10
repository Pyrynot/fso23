const mongoose = require('mongoose');

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://pyry:${password}@cluster0.quvcjiz.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

const person = new Person({
  name,
  number,
});

if (name && number) {
  person.save().then(() => { // result
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  Person.find({}).then((result) => {
    console.log('phonebook:');
    result.forEach((entry) => {
      console.log(`${entry.name} ${entry.number}`);
    });
    mongoose.connection.close();
  });
}
