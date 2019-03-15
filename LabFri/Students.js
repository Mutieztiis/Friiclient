
let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();
let cors = require('cors');
let app = express();
app.use(cors());

// all of our routes will be prefixed with /api
app.use('/api', bodyParser.json(), router);   //[use json]
app.use('/api', bodyParser.urlencoded({ extended: false }), router);

let students = [{'id':5935512001,'name':'Somchai','surname':'Khamlad','Major':'CoE','GPA':3.32},
   {'id':5935512002,'name':'Yaya','surname':'Rakngam','Major':'CoE','GPA':3.90}
];

let stuIndex=2;

router.route('/students').get((req, res) =>  res.json(students) )
   
  //router.route('/students/:stu_id').get ( (req,res) => res.json(students)) 
   .post( (req, res)=> {
       var student = {};
       student.id = req.body.id
       student.name = req.body.name
       student.surname = req.body.surname;
       student.Major = req.body.Major;
       student.GPA = req.body.GPA;   
       students.push(student);
       res.json( {message: 'Student created!'} )
   })

   router.route('/students/:stu_id')

.get ( (req,res) => res.json(students[req.params.stu_id]))  // get a bear
   .put ( (req,res) => {                               // Update a bear
       var id = req.params.stu_id
       students[id].name = req.body.name;
       students[id].surname = req.body.surname;
       students[id].Major = req.body.Major;
       students[id].GPA = req.body.GPA;   
       res.json({ message: 'Student updated!' + req.params.stu_id});
   })

   .delete ( (req,res) => {                   // Delete a bear
       delete     students[req.params.stu_id]
       res.json({ message: 'Student deleted: ' + req.params.stu_id});
   })



app.use("*", (req,res) => res.status(404).send('404 Not found') );
app.listen(8000,  () => console.log("Server is running") );
