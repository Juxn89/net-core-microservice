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
  