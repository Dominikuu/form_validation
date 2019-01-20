$(()=>{
	$('[name="CardNumber"]').on('input', {f () {
		$('.visa, .master').hide()
		var cardType = univer.checkCardNumber(this.value)
		cardType && $(`.${cardType}`).show()
	}}.f).on('keyup', {f (e){ //輸入四個數字後就自動空格
		var n = e.keyCode;
		this.value.length < 19 && ((n >= 48 && n <= 57) || (n >= 96 && n <= 105)) && (()=>{
			this.value=this.value.replace(/\s/g, '')
			this.value=this.value.replace(/(\d{4})/g, '$1 ')
		})()
	}}.f)
})