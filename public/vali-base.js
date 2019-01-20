//前端使用
$(()=>{
	var status = {}
	var $submit= $(':submit')
	var $valid = $('[data-valid]')
	//copy paste會觸發input
	$valid.not($submit).on('input', {f(){
		var $this = $(this)
		var checkName = `check${$this.attr('name')}`
		var result = univer[checkName]($this.val())
		$this[`${result ? 'remove' : 'add'}Class`]('warn')
		status[checkName] = result
		var ary = Object.keys(status) //所有arrt轉換成陣列
		//every() 符合陣列的每一個回傳boolean
		$submit[`${$valid.length === ary.length && ary.map(key =>status[key]).every(val=>val)? 'remove' : 'add'}Class`]('warn') 

	}}.f) //當在輸入時就會觸發
	$('.form').submit(e=>{
		$submit.hasClass('warn') && (e.stopImmediatePropagation() || e.preventDefault())
	})
})