$(function () {	alert('RUN');
		var url=location.href;	
		var pos=url.lastIndexOf('/');
		var token=url.slice(pos+1,url.length);
		url=url.slice(0,pos);
		pos=url.lastIndexOf('/');
		key=url.slice(pos+1,url.length);
		var data={"key":key,"token":token};
		alert(data);		
		$.ajax({
			url:"/find",
			type:"POST",			
			data:JSON.stringify(data),
			dataType:"json",
			contentType:"application/json",
			success:function(res){					
				var data=$.parseJSON(res);					
				$('#filename').html(data.originalname);
				$('#filesize').html(data.size+'MB');
				$('#filetype').html(data.type);
				$('#filedesc').html(data.description!==null?data.description:data.originalname);
				if(data.password!=null){
					$('#filepass').html('Yes');	
					$('#divPass').removeClass('hide');				
				}else{
					$('#filepass').html('No');					
				}
			}
		});
		 $('#btnDeleteFile').on('click', function (evt) {
       			evt.preventDefault();
			var d={"filename":key+"."+$('#filetype').html()};
			alert(d);
			$.ajax({
				url:"/delete",
				type:"POST",			
				data:JSON.stringify(d),
				dataType:"json",
				contentType:"application/json",
				success:function(res){	
					location.href="http://localhost:3000";	
				}
			});
		});
	});