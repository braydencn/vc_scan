var loginData = "Loginasync=true&LoginUserName=" + encodeURIComponent(self.options.username) + 
                "&UserPassword=" + encodeURIComponent(self.options.password)+ "&Validate=&type=web";
$.post( "http://login.vancl.com/login/XmlCheckUserName.ashx",loginData); 
self.postMessage();