db = connect("mongodb://admin:password@localhost:27017/admin");

db = db.getSiblingDB("LibraryDB");

db.createCollection("Authors");

db = connect("mongodb://admin:password@localhost:27017/admin");

db = db.getSiblingDB("LibraryDB");

db.createCollection("Authors");

db.Authors.insertMany([
  { _id: ObjectId(), name: "Juan", lastName: "Perez", degree: "Literature" },
  { _id: ObjectId(), name: "Maria", lastName: "Gonzalez", degree: "History" },
  { _id: ObjectId(), name: "Carlos", lastName: "Rodriguez", degree: "Philosophy" },
  { _id: ObjectId(), name: "Ana", lastName: "Martinez", degree: "Linguistics" },
  { _id: ObjectId(), name: "Luis", lastName: "Fernandez", degree: "Political Science" },
  { _id: ObjectId(), name: "Sofia", lastName: "Lopez", degree: "Sociology" },
  { _id: ObjectId(), name: "Miguel", lastName: "Ramirez", degree: "Anthropology" },
  { _id: ObjectId(), name: "Elena", lastName: "Castillo", degree: "Psychology" },
  { _id: ObjectId(), name: "Fernando", lastName: "Mendoza", degree: "Education" },
  { _id: ObjectId(), name: "Gabriela", lastName: "Vasquez", degree: "Arts" }
]);

db.Books.insertMany([
  { title: "The Art of Writing", description: "An analysis of creative writing techniques", price: 25, publishDate: new Date("2022-03-15"), author: authors.insertedIds[0] },
  { title: "Ancient History", description: "Exploring past civilizations and their impact", price: 30, publishDate: new Date("2021-07-10"), author: authors.insertedIds[1] },
  { title: "Modern Philosophy", description: "Contemporary thoughts on philosophical ideas", price: 28, publishDate: new Date("2023-01-20"), author: authors.insertedIds[2] },
  { title: "Advanced Linguistics", description: "A deep study of language structures", price: 35, publishDate: new Date("2020-11-05"), author: authors.insertedIds[3] }
]);
