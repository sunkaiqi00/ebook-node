const env = require('./env')

let resUrl,
    mp3FilePath,
    dbHost,
    dbUser,
    dbPwd;

if(env === 'dev') {
  resUrl = 'http://192.168.3.20:7070';
  mp3FilePath = 'E:/nginxstatic/resource/mp3';
  dbHost='localhost';
  dbUser='root';
  dbPwd='123456'
}else{
  resUrl = 'http://112.74.181.88';
  mp3FilePath = '/root/nginx/upload/mp3';
  dbHost = '112.74.181.88';
  dbUser = 'root';
  dbPwd = '160320SunkaiqI'
}

const category = [
  'Biomedicine',
  'BusinessandManagement',
  'ComputerScience',
  'EarthSciences',
  'Economics',
  'Engineering',
  'Education',
  'Environment',
  'Geography',
  'History',
  'Laws',
  'LifeSciences',
  'Literature',
  'SocialSciences',
  'MaterialsScience',
  'Mathematics',
  'MedicineAndPublicHealth',
  'Philosophy',
  'Physics',
  'PoliticalScienceAndInternationalRelations',
  'Psychology',
  'Statistics'
];
module.exports = {
  resUrl,
  category,
  mp3FilePath,
  dbHost,
  dbUser,
  dbPwd
};
