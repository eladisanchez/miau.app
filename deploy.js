require('dotenv').config()

var FtpDeploy = require('ftp-deploy');
var ftpDeploy = new FtpDeploy();

var config = {
	user: process.env.FTP_USER, 
    password: process.env.FTP_PW,
	host: process.env.FTP_HOST,
	port: 21,
	localRoot: __dirname + '/dist',
	remoteRoot: '/web/',
	//include: ['index.html','bundle.js','manifest.json','service-worker.js'],
	include: ['*'],
    //exclude: ['img/**/*'],
    deleteRemote: true,
    forcePasv: true
}

// use with promises
ftpDeploy.deploy(config)
	.then(res => console.log('finished:', res))
	.catch(err => console.log(err))
