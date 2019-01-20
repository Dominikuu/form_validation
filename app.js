var universal = require('./public/univer')
var express = require('express')
var bodyParser = require('body-parser') // Express  可以載POST的套件
var fileUpload = require('express-fileupload')
var sizeOf = require('image-size')//因為後段沒有瀏覽器的Image套件可以計算圖片的長寬
var app= express()
app.use(fileUpload())//使用express套件都要透過use
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('./public'))
app.post('/step2.html', (req, res) =>{
	universal.checkEmail(req.body.Email)&& //在express framework中只會接受GET，不會接受POST
	universal.checkPassword(req.body.Password)&&
	universal.checkConfirmPassword(req.body.ConfirmPassword) ?(() =>{
		res.redirect('/step2.html')
		console.log(req.body)
	})(): res.send('error')

})
app.post('/step3.html', (req, res)=>{
	universal.checkPhone(req.body.Phone)&&
	universal.checkAddress(req.body.Address)?(()=>{
		res.redirect('/step3.html')
	})(): res.send("error")
})
app.post('/step4.html', (req, res)=>{
	var uploadFiles = req.files.Photos //前端post過來的資料
	uploadFiles && !Array.isArray(uploadFiles) && (()=>{
		uploadFiles = [uploadFiles]
	})()
	var files = uploadFiles&&uploadFiles.map(file=>{
		var size = sizeOf(file.data)
		return {width:size.width, height: size.height}
	})
	//將photos儲存到路徑下
	var result = false
	uploadFiles && universal.checkImage(files)&&(()=>{
		uploadFiles.forEach(file=>{
			file.mv(`./upload/${file.name}`)
		})
		result = true
	})()
	req.headers['x-requested-with'] === 'XMLHttpRequest'?( //表示此請求是ajax
		res.json(result? '/step4.html': '')) : ( // <- 吐回去到json
		result? res.redirect('/step4.html') : res.send('error')) //<-利用post

})
app.post('/step4.html', (req, res)=>{
	universal.checkCardNumber(req.body.CardNumber)? (()=>{
		res.redirect('/step5.html')
	})() : res.send('error')
})
app.listen(3000, function(){
	console.log("hey")
})