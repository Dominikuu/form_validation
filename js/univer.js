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
	}
})
