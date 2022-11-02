const db = require('../database');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

const student = {
    getById: function (id, callback) {
        return db.query('select * from student where id_student=?', [id], callback);
    },
    getAll: function (callback) {
        return db.query('select * from student', callback);
    },
    add: function (add_data, callback) {
        bcrypt.hash(add_data.password, saltRounds, function (err, hashedPassword) {
        return db.query(
            'insert into student (id_student,fname,lname,password) values(?,?,?,?)',
            [add_data.id_student, add_data.fname, add_data.lname, hashedPassword],
            callback);
        });
    },
    delete: function (id, callback) {
        return db.query('delete from student where id_student=?', [id], callback);
    },
    update: function (id, update_data, callback) {
        bcrypt.hash(update_data.password, saltRounds, function (err, hashedPassword) {
            return db.query( 
                'update student set fname=?,lname=?, password=? where id_student=?',
                [update_data.fname, update_data.lname, hashedPassword, id],
                callback);
            });
        
    },
    checkPassword: function(id_student,callback){
        return db.query('select password from student where id_student=?',[id_student],callback);
    }
};
module.exports = student;