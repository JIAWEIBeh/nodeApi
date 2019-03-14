var express = require('express');
var router = express.Router();
var format = require('./formatText.js');
const urlt = require('url');
const bodyParser = require('body-parser');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/getN', function(req, res, next) {
    let url_info = urlt.parse(req.url, true);
    let num = url_info.query.num;
    if(num&&parseInt(num)>0){
    	reqreutrn(res,format.contentZJ(parseInt(num)-1))
    }else{
    	reqreutrn(res,{name:'0',num:'0'})
    }
});

router.get('/getColor', function(req, res, next) {
    var num = getReqStrByKey(req,'num')
    if(!num){
    	num = 1;
    }
    function color(num) {
	    var colors = ['#FFFFFF', '#00FF00', '#0000FF', '#FF00FF', '#00FFFF', '#FFFF00', '#000000', '#F0F8FF', '#70DB93', '#5C3317', '#9F5F9F', '#B5A642', '#D9D919', '#A62AA2', '#8C7853', '#A67D3D', '#5F9F9F', '#D98719', '#B87333', '#FF7F00', '#5C4033', '#2F4F2F', '#4A766E', '#4F4F2F', '#9932CD', '#871F78', '#6B238E', '#2F4F4F', '#97694F', '#7093DB', '#855E42', '#545454', '#856363', '#D19275', '#8E2323', '#238E23', '#CD7F32', '#DBDB70', '#527F76', '#93DB70', '#215E21', '#4E2F2F', '#9F9F5F', '#C0D9D9', '#A8A8A8', '#8F8FBD', '#E9C2A6', '#32CD32', '#E47833', '#8E236B', '#32CD99', '#3232CD', '#6B8E23', '#EAEAAE', '#9370DB', '#426F42', '#7F00FF', '#7FFF00', '#70DBDB', '#DB7093', '#A68064', '#2F2F4F', '#23238E', '#4D4DFF', '#FF6EC7', '#00009C', '#EBC79E', '#CFB53B', '#FF7F00', '#FF2400', '#DB70DB', '#8FBC8F', '#BC8F8F', '#EAADEA', '#D9D9F3', '#5959AB', '#6F4242', '#8C1717', '#238E68', '#8E6B23', '#E6E8FA', '#3299CC', '#007FFF', '#FF1CAE', '#00FF7F', '#236B8E', '#38B0DE', '#DB9370', '#ADEAEA', '#5C4033', '#CDCDCD', '#4F2F4F', '#CC3299', '#D8D8BF', '#99CC32'];
	    var result = [];
	    for (var i = 0; i < num; i++) {
	      result.push(colors[Math.round(Math.random() * 95)])
	    }
	    return result
	}
	reqreutrn(res,{data:{color:color(num)}})
});

router.post('/getNum',bodyParser.json(), function(req, res, next) {
    var num = getReqStrByKey(req,'num')
    reqreutrn(res,{num})
})

var getReqStrByKey = function(req,key){
    if(req.body[key]){
        return req.body[key];
    }else if(require('url').parse(req.url, true).query[key]){
        return require('url').parse(req.url, true).query[key]
    }else{
        return null;
    }
}

function reqreutrn(res,obj){
    res.send(obj);
}
module.exports = router;
