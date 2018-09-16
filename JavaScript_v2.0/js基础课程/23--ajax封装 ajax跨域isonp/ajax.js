/*
	@ 调用方法   ajax( 对象实参 );
	@ 对象实参需要传的属性：
		method : 访问方式（选填），默认'get',
		url : 访问地址（必填）,
		data : 传输数据（选填），需要传数据时才填,
		aysn : 是否异步（选填），默认true,
		success : 请求成功后执行的函数，第一个形参代表返回的数据,
		error : 请求失败后执行的函数，第一个形参代表错误状态码
*/
function ajax(mJson){
	var method = mJson.method || 'get';
	var url = mJson.url;
	var data = '';
	var aysn = mJson.aysn || true;
	var success = mJson.success;
	var error = mJson.error;
	if ( mJson.data )
	{
		var arr = [];
		for (var key in mJson.data )
		{
			arr.push( key + '=' + mJson.data[key] );
		};
		data = arr.join('&');
	};
	if ( data && method.toLowerCase()=='get' )url += '?' + data;
	var xhr = new XMLHttpRequest();
	xhr.open( method , url , aysn );
	xhr.setRequestHeader('content-type' , 'application/x-www-form-urlencoded');
	xhr.send(data);
	xhr.onreadystatechange = function(){
		if ( xhr.readyState == 4 )
		{
			if ( xhr.status >= 200 && xhr.status < 300 )
			{
				success && success( xhr.responseText );
			}else
			{
				error && error( xhr.status );
			};
		}
	};
};