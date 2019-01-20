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

	$('[data-from][data-to]').each({f(){
		var $this = $(this)
		var i = $this.data('from')
		do{
			$this.append(`<option value="${i}">${i}</option>`)
		}while(i++ <$this.data('to'))
	}}.f)

	var $city =$('.city')
	var $region = $('.region')
	$city.length&& $region.length&& $.getJSON('data.json',data =>{
		data.city.forEach((a,i)=>{
			$city.append(`<option value="${i}">${a}</option>`)
		})
		$city.change(()=>{
			$region.empty()
			data.region[$city.val()].forEach((a,i) =>{
				$region.append(`<option value="${i}">${a}</option>`)
			})

		});
	})
})