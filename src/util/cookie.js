const cookie = {
	setCookie:function (name, value) {
		var oDate = new Date();
	    document.cookie=encodeURIComponent(name)+"="+encodeURIComponent(value)+";path=/;expires=-1";
	},
	getCookie:function (name) {
		var arr=document.cookie.replace(/\s/g,'').split(';');
		for (var i=0;i<arr.length;i++)
		{
			var arr2 = arr[i].split('=');
			if(decodeURIComponent(arr2[0])===name)
			{
				return decodeURIComponent(arr2[1]);
			}
		}
		return '';
	},
	delCookie:function (name) {
		cookie.setCookie(name,1,-1);
	}
}

export default cookie;