//需同時兼容前後端資源
(obj =>{
	//前端module不會是object
	typeof module ==='object' && module.exports? module.exports = obj : this[obj.name] = obj //在global指定的名稱設定一個obj
})({
	name: 'univer',
	//arrow function不能使用this
	checkEmail: val => /.+@.+\..+/.test(val),
	checkPassword(val){
		return /.{8,}/.test(this._password = val)
	},
	checkConfirmPassword(val){
		return this._password === val
	},
	checkPhone: val=> /^09\d{8}/.test(val),
	checkAddress: val=>/[\u4e00-\u9fa5]/.test(val), //繁體中文unicode的區間範圍//\u針對unicode
	checkImage: ary=> ary.length <=3 && ary.every(file=>file.width <=150 || file.height <= 150),
	checkCardNumber(val){
		val = val.replace(/\s/g, '')
		return (/^4[0-9]{12}(?:[0-9]{3})?$/.test(val) && 'visa') ||
		(/^5[1-5][0-9]{14}$/.test(val) && 'master') ||''
	}

})
