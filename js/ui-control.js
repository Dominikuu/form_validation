$(() =>{

	$('[data-toggle="tooltip"]').each({f(){
		var showHide= $el =>{ 
			$el.tooltip($el.hasClass('warn')? 'show':'hide')
		}
		var $this =$(this)
		//選取的html標籤如果遭到變動，即通知
		new MutationObserver(mutations => {
			mutations.forEach(mutation => {
				mutation.attributeName === 'class' && showHide($this)
			})
		}).observe(this,{attributes: true, characterData: false, childList: false})
		$this.tooltip({ placement: 'right', trigger:'manual'})
		showHide($this)
	}}.f)
})