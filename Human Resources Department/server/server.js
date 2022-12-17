const express = require('express'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  fs = require('file-system'),
  multer = require('multer'),
  shortId = require('shortid'),
  mongoose = require('mongoose'),
  authRouter = require('./authRouter'),
  authMiddleware = require('./middleware/authMiddleware'),
  dbCurrent = 'employees.json',
  dbDismissed = 'dismissed.json',
  app = express();

app.use(express.json());
app.use('/auth', authRouter);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('common'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './images');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: fileStorage });

app.post('/api/single', upload.single('image'), (res, req) => {});

app.get('/api/employees', (req, res) => res.send(getEmployees()));

app.get('/api/employee/:id', (req, res) => {
  const currenttList = getEmployees(),
    employee = currenttList.find(employee => employee.id === req.params.id);
  employee ? res.send(employee) : res.status(404).send({ error: 'employee with given ID was not found' });
});

app.post('/api/employee', (req, res) => {
  const currentList = getEmployees(),
    employee = req.body;
  employee.id = shortId.generate();
  currentList.push(employee);
  setCurrent(currentList);
  res.send(employee);
});

app.put('/api/employee/:id', (req, res) => {
  const currenttList = getEmployees(),
    updateEmployee = currenttList.find(employee => employee.id === req.params.id);
  Object.assign(updateEmployee, req.body);
  setCurrent(currenttList);
  res.sendStatus(204);
});

app.post('/api/employee/:id/vacation/:start', (req, res) => {
  const currenttList = getEmployees(),
    employee = currenttList.find(employee => employee.id === req.params.id);
  employee.vacation = req.params.start;
  setCurrent(currenttList);
  res.sendStatus(204);
});

app.delete('/api/employee/:id/dismiss', (req, res) => {
  const dismissedEmployees = getDismissed(),
    employee = getEmployees().find(employee => employee.id == req.params.id);
  dismissedEmployees.push(employee);
  setDismissed(dismissedEmployees);
  const updatecurrenttList = getEmployees().filter(employee => employee.id !== req.params.id);
  setCurrent(updatecurrenttList);
  res.sendStatus(204);
});

app.delete('/api/employee/:id/vacation', (req, res) => {
  const currentList = getEmployees(),
    employee = currentList.find(employee => employee.id === req.params.id);
  delete employee.vacation;
  setCurrent(currentList);
  res.sendStatus(204);
});

app.delete('/api/employee/:id/remove', (req, res) => {
  const updatecurrenttList = getDismissed().filter(employee => employee.id !== req.params.id);
  setDismissed(updatecurrenttList);
  res.sendStatus(204);
});

app.get('/api/dismissed', (req, res) => res.send(getDismissed()));

function getEmployees() {
  return JSON.parse(fs.readFileSync(dbCurrent, 'utf8'));
}

function setCurrent(employeesData) {
  fs.writeFileSync(dbCurrent, JSON.stringify(employeesData));
}

function setDismissed(employeesData) {
  fs.writeFileSync(dbDismissed, JSON.stringify(employeesData));
}

function getDismissed() {
  return JSON.parse(fs.readFileSync(dbDismissed, 'utf8'));
}

const start = async () => {
  await mongoose.connect('mongodb+srv://admin:12345@authhdr.d9bsksb.mongodb.net/auth_hrd?retryWrites=true&w=majority');
  app.listen(3000, () => console.log('Server has been started...'));
};

start();
