const weather = require('../model/weather');
const request = require('request');
const jwt = require('jsonwebtoken')
var api_key = '9c84a34e765b64034fbddb9e03fe7518';
exports.getData = (req, res) => {
    url = `http://api.openweathermap.org/data/2.5/weather?q=Karachi&units=metric&APPID=${api_key}`;
    request({ url: url, json: true }, (err, result) =>{
        if(result){
            const insertData = new weather({
                userBy : req.userInfo.userId,
                weather : JSON.stringify(result)
            })
            insertData.save((err, inserted) => {
                if(inserted){
                    res.status(200).json({
                        data: 'Data inserted.'
                    });
                }else{
                    res.json({
                        error: err 
                    })                    
                }
            })
        }else{
            res.json({
                error: err 
            })

        }
    });
};