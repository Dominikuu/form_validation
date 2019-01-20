$(()=>{
	var $img = $('.img')
	var $msg = $('.msg')
	var $form = $('form')
	var addFile = []
	var showImg = list =>{
		$img.find('img').removeAttr('src')
		list.forEach((a, i) =>{
			$img.eq(i).find('img').attr('src', URL.createObjectURL(a))
		})
		$(':submit')[list.length ===3? 'removeClass':'addClass']('warn')
	}
	

	$('[type="file"]').change({f (){

		var selectFile = [].slice.call(this.files)
		$form[0].reset() //如果沒有reset 則會被視為同意張照片，不會觸發change事件
		$msg.val('')
		addFile.length + selectFile.length <=3 ?(()=>{
			var task = []
			selectFile.forEach(file=>{
				task.push(new Promise((resolve,reject)=>{ //非同步讀取圖片的大小
					var img = new Image()
					img.onload = {f(){
						resolve({width: this.width, height: this.height})
					}}.f
					img.onerror = e=>{
						reject(e.type)
					}
					img.src = URL.createObjectURL(file)
				}))
			})
			Promise.all(task).then(result=>{ //Promise.all 不具有順序性
				univer.checkImage(result)? (()=>{
					selectFile.forEach(file=>{
						addFile.push(file)
					})
					showImg(addFile)
				})():$msg.val("Size is over 150 x 150")
			},() =>{
				$msg.val('Wrong File Type')
			})
		})() : $msg.val("Selected more than 3 pcs")
	}}.f)
	$img.click({f(){
		$msg.val('')
		console.log(addFile)
		addFile.splice($img.index(this),1)
		showImg(addFile)
		console.log(addFile)
	}}.f)
	$form.submit(e=>{
		var formData = new FormData()
		addFile.forEach(file=>{
			formData.append('Photos', file) //檔案加到photos表單
			console.log(file)
		})
		$.ajax({
			type:'POST',
			url: '/step4.html',
			data: formData,
			contentType: false, //if true 會進行編碼 造成檔案內容錯誤
			processData: false
		})
		.done(url=>{ //當完成，回傳的url將導向另個page
			url? location.href = url: alert('error')
		})
		e.preventDefault()
	})
})