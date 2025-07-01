db = connect("mongodb://admin:password@localhost:27017/admin");

db = db.getSiblingDB("LibraryDB");

db.createCollection("Authors");

db = db.getSiblingDB("LibraryDB");

db.createCollection("Authors");

const authors = db.Authors.insertMany([
  { _id: ObjectId(), name: "Carlos", lastName: "Ruiz Zafón", academicDegree: "Bachelor in Information Sciences" },
  { _id: ObjectId(), name: "Gabriel", lastName: "García Márquez", academicDegree: "Bachelor in Journalism" },
  { _id: ObjectId(), name: "Antoine", lastName: "de Saint-Exupéry", academicDegree: "Graduate of École spéciale militaire de Saint-Cyr" },
  { _id: ObjectId(), name: "Juan", lastName: "Rulfo", academicDegree: "Bachelor in Literature and Law" },
  { _id: ObjectId(), name: "Aldous", lastName: "Huxley", academicDegree: "Master in English Literature" },
  { _id: ObjectId(), name: "George", lastName: "Orwell", academicDegree: "Bachelor in English Literature" },
  { _id: ObjectId(), name: "Jorge Luis", lastName: "Borges", academicDegree: "Bachelor in Philosophy and Letters" },
  { _id: ObjectId(), name: "Fyodor", lastName: "Dostoevsky", academicDegree: "Graduate of Nikolayev Military Engineering Institute" },
  { _id: ObjectId(), name: "Laura", lastName: "Esquivel", academicDegree: "Diploma in Dramatic Arts and Education" },
  { _id: ObjectId(), name: "Umberto", lastName: "Eco", academicDegree: "Doctorate in Philosophy and Letters" },
  { _id: ObjectId(), name: "Miguel", lastName: "de Cervantes", academicDegree: "Self-educated; recognized literary master" },
  { _id: ObjectId(), name: "Harper", lastName: "Lee", academicDegree: "Bachelor in Law (incomplete)" },
  { _id: ObjectId(), name: "Hermann", lastName: "Hesse", academicDegree: "Honorary Doctorate in Literature" },
  { _id: ObjectId(), name: "Paulo", lastName: "Coelho", academicDegree: "Honorary Doctorate in Literature" },
  { _id: ObjectId(), name: "Isabel", lastName: "Allende", academicDegree: "Bachelor in Hispanic Philology" },
  { _id: ObjectId(), name: "Stephen", lastName: "King", academicDegree: "Bachelor in English and Journalism" }
]);

db.createCollection("Books");

db.Books.insertMany([
  {
    title: "The Shadow of the Wind",
    description: "A gripping tale of books, mystery, and love in post-war Barcelona.",
    price: 19.99,
    publishDate: new Date("2001-06-06"),
    author: authors.insertedIds[0] // Carlos Ruiz Zafón
  },
  {
    title: "One Hundred Years of Solitude",
    description: "The Buendía family saga in the mythical town of Macondo.",
    price: 14.5,
    publishDate: new Date("1967-05-30"),
    author: authors.insertedIds[1] // Gabriel García Márquez
  },
  {
    title: "The Little Prince",
    description: "A poetic and philosophical journey through interplanetary adventures.",
    price: 9.99,
    publishDate: new Date("1943-04-06"),
    author: authors.insertedIds[2] // Antoine de Saint-Exupéry
  },
  {
    title: "Pedro Páramo",
    description: "A surreal dive into Mexican magical realism.",
    price: 11.75,
    publishDate: new Date("1955-03-19"),
    author: authors.insertedIds[3] // Juan Rulfo
  },
  {
    title: "Brave New World",
    description: "A dystopian vision of a futuristic society driven by control and pleasure.",
    price: 12.99,
    publishDate: new Date("1932-08-31"),
    author: authors.insertedIds[4] // Aldous Huxley
  },
  {
    title: "1984",
    description: "A chilling portrayal of totalitarianism and surveillance.",
    price: 13.49,
    publishDate: new Date("1949-06-08"),
    author: authors.insertedIds[5] // George Orwell
  },
  {
    title: "Ficciones",
    description: "A labyrinth of metaphysical stories from the master of Argentine literature.",
    price: 15.2,
    publishDate: new Date("1944-01-01"),
    author: authors.insertedIds[6] // Jorge Luis Borges
  },
  {
    title: "Crime and Punishment",
    description: "A psychological dive into guilt and morality in 19th-century Russia.",
    price: 17.89,
    publishDate: new Date("1866-01-01"),
    author: authors.insertedIds[7] // Fyodor Dostoevsky
  },
  {
    title: "Like Water for Chocolate",
    description: "A romantic tale infused with Mexican culture and magical realism.",
    price: 10.99,
    publishDate: new Date("1989-09-01"),
    author: authors.insertedIds[8] // Laura Esquivel
  },
  {
    title: "The Name of the Rose",
    description: "A medieval mystery rich with semiotics and suspense.",
    price: 16.75,
    publishDate: new Date("1980-11-01"),
    author: authors.insertedIds[9] // Umberto Eco
  },
  {
    title: "Don Quixote",
    description: "The timeless adventures of a nobleman lost in chivalric delusions.",
    price: 18.95,
    publishDate: new Date("1605-01-16"),
    author: authors.insertedIds[10] // Miguel de Cervantes
  },
  {
    title: "To Kill a Mockingbird",
    description: "A stirring story of justice and morality in the racially tense American South.",
    price: 14.25,
    publishDate: new Date("1960-07-11"),
    author: authors.insertedIds[11] // Harper Lee
  },
  {
    title: "Siddhartha",
    description: "A spiritual journey of self-discovery inspired by Eastern philosophy.",
    price: 9.5,
    publishDate: new Date("1922-01-01"),
    author: authors.insertedIds[12] // Hermann Hesse
  },
  {
    title: "The Alchemist",
    description: "A philosophical parable about pursuing one’s destiny.",
    price: 12.3,
    publishDate: new Date("1988-04-15"),
    author: authors.insertedIds[13] // Paulo Coelho
  },
  {
    title: "The House of the Spirits",
    description: "A family saga interwoven with Chilean history and magical realism.",
    price: 13.85,
    publishDate: new Date("1982-01-01"),
    author: authors.insertedIds[14] // Isabel Allende
  }
]);
