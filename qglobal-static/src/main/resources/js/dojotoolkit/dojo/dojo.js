/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

/*
	This is an optimized version of Dojo, built for deployment and not for
	development. To get sources and documentation, please visit:

		http://dojotoolkit.org
*/

(function(){var _1=null;if((_1||(typeof djConfig!="undefined"&&djConfig.scopeMap))&&(typeof window!="undefined")){var _2="",_3="",_4="",_5={},_6={};_1=_1||djConfig.scopeMap;for(var i=0;i<_1.length;i++){var _7=_1[i];_2+="var "+_7[0]+" = {}; "+_7[1]+" = "+_7[0]+";"+_7[1]+"._scopeName = '"+_7[1]+"';";_3+=(i==0?"":",")+_7[0];_4+=(i==0?"":",")+_7[1];_5[_7[0]]=_7[1];_6[_7[1]]=_7[0];}eval(_2+"dojo._scopeArgs = ["+_4+"];");dojo._scopePrefixArgs=_3;dojo._scopePrefix="(function("+_3+"){";dojo._scopeSuffix="})("+_4+")";dojo._scopeMap=_5;dojo._scopeMapRev=_6;}(function(){if(typeof this["loadFirebugConsole"]=="function"){this["loadFirebugConsole"]();}else{this.console=this.console||{};var cn=["assert","count","debug","dir","dirxml","error","group","groupEnd","info","profile","profileEnd","time","timeEnd","trace","warn","log"];var i=0,tn;while((tn=cn[i++])){if(!console[tn]){(function(){var _8=tn+"";console[_8]=("log" in console)?function(){var a=Array.apply({},arguments);a.unshift(_8+":");console["log"](a.join(" "));}:function(){};console[_8]._fake=true;})();}}}if(typeof dojo=="undefined"){dojo={_scopeName:"dojo",_scopePrefix:"",_scopePrefixArgs:"",_scopeSuffix:"",_scopeMap:{},_scopeMapRev:{}};}var d=dojo;if(typeof dijit=="undefined"){dijit={_scopeName:"dijit"};}if(typeof dojox=="undefined"){dojox={_scopeName:"dojox"};}if(!d._scopeArgs){d._scopeArgs=[dojo,dijit,dojox];}d.global=this;d.config={isDebug:false,debugAtAllCosts:false};if(typeof djConfig!="undefined"){for(var _9 in djConfig){d.config[_9]=djConfig[_9];}}dojo.locale=d.config.locale;var _a="$Rev: 22487 $".match(/\d+/);dojo.version={major:1,minor:5,patch:0,flag:"",revision:_a?+_a[0]:NaN,toString:function(){with(d.version){return major+"."+minor+"."+patch+flag+" ("+revision+")";}}};if(typeof OpenAjax!="undefined"){OpenAjax.hub.registerLibrary(dojo._scopeName,"http://dojotoolkit.org",d.version.toString());}var _b,_c,_d={};for(var i in {toString:1}){_b=[];break;}dojo._extraNames=_b=_b||["hasOwnProperty","valueOf","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","constructor"];_c=_b.length;dojo._mixin=function(_e,_f){var _10,s,i;for(_10 in _f){s=_f[_10];if(!(_10 in _e)||(_e[_10]!==s&&(!(_10 in _d)||_d[_10]!==s))){_e[_10]=s;}}if(_c&&_f){for(i=0;i<_c;++i){_10=_b[i];s=_f[_10];if(!(_10 in _e)||(_e[_10]!==s&&(!(_10 in _d)||_d[_10]!==s))){_e[_10]=s;}}}return _e;};dojo.mixin=function(obj,_11){if(!obj){obj={};}for(var i=1,l=arguments.length;i<l;i++){d._mixin(obj,arguments[i]);}return obj;};dojo._getProp=function(_12,_13,_14){var obj=_14||d.global;for(var i=0,p;obj&&(p=_12[i]);i++){if(i==0&&d._scopeMap[p]){p=d._scopeMap[p];}obj=(p in obj?obj[p]:(_13?obj[p]={}:undefined));}return obj;};dojo.setObject=function(_15,_16,_17){var _18=_15.split("."),p=_18.pop(),obj=d._getProp(_18,true,_17);return obj&&p?(obj[p]=_16):undefined;};dojo.getObject=function(_19,_1a,_1b){return d._getProp(_19.split("."),_1a,_1b);};dojo.exists=function(_1c,obj){return !!d.getObject(_1c,false,obj);};dojo["eval"]=function(_1d){return d.global.eval?d.global.eval(_1d):eval(_1d);};d.deprecated=d.experimental=function(){};})();(function(){var d=dojo;d.mixin(d,{_loadedModules:{},_inFlightCount:0,_hasResource:{},_modulePrefixes:{dojo:{name:"dojo",value:"."},doh:{name:"doh",value:"../util/doh"},tests:{name:"tests",value:"tests"}},_moduleHasPrefix:function(_1e){var mp=d._modulePrefixes;return !!(mp[_1e]&&mp[_1e].value);},_getModulePrefix:function(_1f){var mp=d._modulePrefixes;if(d._moduleHasPrefix(_1f)){return mp[_1f].value;}return _1f;},_loadedUrls:[],_postLoad:false,_loaders:[],_unloaders:[],_loadNotifying:false});dojo._loadPath=function(_20,_21,cb){var uri=((_20.charAt(0)=="/"||_20.match(/^\w+:/))?"":d.baseUrl)+_20;try{return !_21?d._loadUri(uri,cb):d._loadUriAndCheck(uri,_21,cb);}catch(e){console.error(e);return false;}};dojo._loadUri=function(uri,cb){if(d._loadedUrls[uri]){return true;}d._inFlightCount++;var _22=d._getText(uri,true);if(_22){d._loadedUrls[uri]=true;d._loadedUrls.push(uri);if(cb){_22="("+_22+")";}else{_22=d._scopePrefix+_22+d._scopeSuffix;}if(!d.isIE){_22+="\r\n//@ sourceURL="+uri;}var _23=d["eval"](_22);if(cb){cb(_23);}}if(--d._inFlightCount==0&&d._postLoad&&d._loaders.length){setTimeout(function(){if(d._inFlightCount==0){d._callLoaded();}},0);}return !!_22;};dojo._loadUriAndCheck=function(uri,_24,cb){var ok=false;try{ok=d._loadUri(uri,cb);}catch(e){console.error("failed loading "+uri+" with error: "+e);}return !!(ok&&d._loadedModules[_24]);};dojo.loaded=function(){d._loadNotifying=true;d._postLoad=true;var mll=d._loaders;d._loaders=[];for(var x=0;x<mll.length;x++){mll[x]();}d._loadNotifying=false;if(d._postLoad&&d._inFlightCount==0&&mll.length){d._callLoaded();}};dojo.unloaded=function(){var mll=d._unloaders;while(mll.length){(mll.pop())();}};d._onto=function(arr,obj,fn){if(!fn){arr.push(obj);}else{if(fn){var _25=(typeof fn=="string")?obj[fn]:fn;arr.push(function(){_25.call(obj);});}}};dojo.ready=dojo.addOnLoad=function(obj,_26){d._onto(d._loaders,obj,_26);if(d._postLoad&&d._inFlightCount==0&&!d._loadNotifying){d._callLoaded();}};var dca=d.config.addOnLoad;if(dca){d.addOnLoad[(dca instanceof Array?"apply":"call")](d,dca);}dojo._modulesLoaded=function(){if(d._postLoad){return;}if(d._inFlightCount>0){console.warn("files still in flight!");return;}d._callLoaded();};dojo._callLoaded=function(){if(typeof setTimeout=="object"||(d.config.useXDomain&&d.isOpera)){setTimeout(d.isAIR?function(){d.loaded();}:d._scopeName+".loaded();",0);}else{d.loaded();}};dojo._getModuleSymbols=function(_27){var _28=_27.split(".");for(var i=_28.length;i>0;i--){var _29=_28.slice(0,i).join(".");if(i==1&&!d._moduleHasPrefix(_29)){_28[0]="../"+_28[0];}else{var _2a=d._getModulePrefix(_29);if(_2a!=_29){_28.splice(0,i,_2a);break;}}}return _28;};dojo._global_omit_module_check=false;dojo.loadInit=function(_2b){_2b();};dojo._loadModule=dojo.require=function(_2c,_2d){_2d=d._global_omit_module_check||_2d;var _2e=d._loadedModules[_2c];if(_2e){return _2e;}var _2f=d._getModuleSymbols(_2c).join("/")+".js";var _30=!_2d?_2c:null;var ok=d._loadPath(_2f,_30);if(!ok&&!_2d){throw new Error("Could not load '"+_2c+"'; last tried '"+_2f+"'");}if(!_2d&&!d._isXDomain){_2e=d._loadedModules[_2c];if(!_2e){throw new Error("symbol '"+_2c+"' is not defined after loading '"+_2f+"'");}}return _2e;};dojo.provide=function(_31){_31=_31+"";return (d._loadedModules[_31]=d.getObject(_31,true));};dojo.platformRequire=function(_32){var _33=_32.common||[];var _34=_33.concat(_32[d._name]||_32["default"]||[]);for(var x=0;x<_34.length;x++){var _35=_34[x];if(_35.constructor==Array){d._loadModule.apply(d,_35);}else{d._loadModule(_35);}}};dojo.requireIf=function(_36,_37){if(_36===true){var _38=[];for(var i=1;i<arguments.length;i++){_38.push(arguments[i]);}d.require.apply(d,_38);}};dojo.requireAfterIf=d.requireIf;dojo.registerModulePath=function(_39,_3a){d._modulePrefixes[_39]={name:_39,value:_3a};};dojo.requireLocalization=function(_3b,_3c,_3d,_3e){d.require("dojo.i18n");d.i18n._requireLocalization.apply(d.hostenv,arguments);};var ore=new RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$"),ire=new RegExp("^((([^\\[:]+):)?([^@]+)@)?(\\[([^\\]]+)\\]|([^\\[:]*))(:([0-9]+))?$");dojo._Url=function(){var n=null,_3f=arguments,uri=[_3f[0]];for(var i=1;i<_3f.length;i++){if(!_3f[i]){continue;}var _40=new d._Url(_3f[i]+""),_41=new d._Url(uri[0]+"");if(_40.path==""&&!_40.scheme&&!_40.authority&&!_40.query){if(_40.fragment!=n){_41.fragment=_40.fragment;}_40=_41;}else{if(!_40.scheme){_40.scheme=_41.scheme;if(!_40.authority){_40.authority=_41.authority;if(_40.path.charAt(0)!="/"){var _42=_41.path.substring(0,_41.path.lastIndexOf("/")+1)+_40.path;var _43=_42.split("/");for(var j=0;j<_43.length;j++){if(_43[j]=="."){if(j==_43.length-1){_43[j]="";}else{_43.splice(j,1);j--;}}else{if(j>0&&!(j==1&&_43[0]=="")&&_43[j]==".."&&_43[j-1]!=".."){if(j==(_43.length-1)){_43.splice(j,1);_43[j-1]="";}else{_43.splice(j-1,2);j-=2;}}}}_40.path=_43.join("/");}}}}uri=[];if(_40.scheme){uri.push(_40.scheme,":");}if(_40.authority){uri.push("//",_40.authority);}uri.push(_40.path);if(_40.query){uri.push("?",_40.query);}if(_40.fragment){uri.push("#",_40.fragment);}}this.uri=uri.join("");var r=this.uri.match(ore);this.scheme=r[2]||(r[1]?"":n);this.authority=r[4]||(r[3]?"":n);this.path=r[5];this.query=r[7]||(r[6]?"":n);this.fragment=r[9]||(r[8]?"":n);if(this.authority!=n){r=this.authority.match(ire);this.user=r[3]||n;this.password=r[4]||n;this.host=r[6]||r[7];this.port=r[9]||n;}};dojo._Url.prototype.toString=function(){return this.uri;};dojo.moduleUrl=function(_44,url){var loc=d._getModuleSymbols(_44).join("/");if(!loc){return null;}if(loc.lastIndexOf("/")!=loc.length-1){loc+="/";}var _45=loc.indexOf(":");if(loc.charAt(0)!="/"&&(_45==-1||_45>loc.indexOf("/"))){loc=d.baseUrl+loc;}return new d._Url(loc,url);};})();if(typeof window!="undefined"){dojo.isBrowser=true;dojo._name="browser";(function(){var d=dojo;if(document&&document.getElementsByTagName){var _46=document.getElementsByTagName("script");var _47=/dojo(\.xd)?\.js(\W|$)/i;for(var i=0;i<_46.length;i++){var src=_46[i].getAttribute("src");if(!src){continue;}var m=src.match(_47);if(m){if(!d.config.baseUrl){d.config.baseUrl=src.substring(0,m.index);}var cfg=_46[i].getAttribute("djConfig");if(cfg){var _48=eval("({ "+cfg+" })");for(var x in _48){dojo.config[x]=_48[x];}}break;}}}d.baseUrl=d.config.baseUrl;var n=navigator;var dua=n.userAgent,dav=n.appVersion,tv=parseFloat(dav);if(dua.indexOf("Opera")>=0){d.isOpera=tv;}if(dua.indexOf("AdobeAIR")>=0){d.isAIR=1;}d.isKhtml=(dav.indexOf("Konqueror")>=0)?tv:0;d.isWebKit=parseFloat(dua.split("WebKit/")[1])||undefined;d.isChrome=parseFloat(dua.split("Chrome/")[1])||undefined;d.isMac=dav.indexOf("Macintosh")>=0;var _49=Math.max(dav.indexOf("WebKit"),dav.indexOf("Safari"),0);if(_49&&!dojo.isChrome){d.isSafari=parseFloat(dav.split("Version/")[1]);if(!d.isSafari||parseFloat(dav.substr(_49+7))<=419.3){d.isSafari=2;}}if(dua.indexOf("Gecko")>=0&&!d.isKhtml&&!d.isWebKit){d.isMozilla=d.isMoz=tv;}if(d.isMoz){d.isFF=parseFloat(dua.split("Firefox/")[1]||dua.split("Minefield/")[1])||undefined;}if(document.all&&!d.isOpera){d.isIE=parseFloat(dav.split("MSIE ")[1])||undefined;var _4a=document.documentMode;if(_4a&&_4a!=5&&Math.floor(d.isIE)!=_4a){d.isIE=_4a;}}if(dojo.isIE&&window.location.protocol==="file:"){dojo.config.ieForceActiveXXhr=true;}d.isQuirks=document.compatMode=="BackCompat";d.locale=dojo.config.locale||(d.isIE?n.userLanguage:n.language).toLowerCase();d._XMLHTTP_PROGIDS=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"];d._xhrObj=function(){var _4b,_4c;if(!dojo.isIE||!dojo.config.ieForceActiveXXhr){try{_4b=new XMLHttpRequest();}catch(e){}}if(!_4b){for(var i=0;i<3;++i){var _4d=d._XMLHTTP_PROGIDS[i];try{_4b=new ActiveXObject(_4d);}catch(e){_4c=e;}if(_4b){d._XMLHTTP_PROGIDS=[_4d];break;}}}if(!_4b){throw new Error("XMLHTTP not available: "+_4c);}return _4b;};d._isDocumentOk=function(_4e){var _4f=_4e.status||0,lp=location.protocol;return (_4f>=200&&_4f<300)||_4f==304||_4f==1223||(!_4f&&(lp=="file:"||lp=="chrome:"||lp=="chrome-extension:"||lp=="app:"));};var _50=window.location+"";var _51=document.getElementsByTagName("base");var _52=(_51&&_51.length>0);d._getText=function(uri,_53){var _54=d._xhrObj();if(!_52&&dojo._Url){uri=(new dojo._Url(_50,uri)).toString();}if(d.config.cacheBust){uri+="";uri+=(uri.indexOf("?")==-1?"?":"&")+String(d.config.cacheBust).replace(/\W+/g,"");}_54.open("GET",uri,false);try{_54.send(null);if(!d._isDocumentOk(_54)){var err=Error("Unable to load "+uri+" status:"+_54.status);err.status=_54.status;err.responseText=_54.responseText;throw err;}}catch(e){if(_53){return null;}throw e;}return _54.responseText;};var _55=window;var _56=function(_57,fp){var _58=_55.attachEvent||_55.addEventListener;_57=_55.attachEvent?_57:_57.substring(2);_58(_57,function(){fp.apply(_55,arguments);},false);};d._windowUnloaders=[];d.windowUnloaded=function(){var mll=d._windowUnloaders;while(mll.length){(mll.pop())();}d=null;};var _59=0;d.addOnWindowUnload=function(obj,_5a){d._onto(d._windowUnloaders,obj,_5a);if(!_59){_59=1;_56("onunload",d.windowUnloaded);}};var _5b=0;d.addOnUnload=function(obj,_5c){d._onto(d._unloaders,obj,_5c);if(!_5b){_5b=1;_56("onbeforeunload",dojo.unloaded);}};})();dojo._initFired=false;dojo._loadInit=function(e){if(dojo._scrollIntervalId){clearInterval(dojo._scrollIntervalId);dojo._scrollIntervalId=0;}if(!dojo._initFired){dojo._initFired=true;if(!dojo.config.afterOnLoad&&window.detachEvent){window.detachEvent("onload",dojo._loadInit);}if(dojo._inFlightCount==0){dojo._modulesLoaded();}}};if(!dojo.config.afterOnLoad){if(document.addEventListener){document.addEventListener("DOMContentLoaded",dojo._loadInit,false);window.addEventListener("load",dojo._loadInit,false);}else{if(window.attachEvent){window.attachEvent("onload",dojo._loadInit);if(!dojo.config.skipIeDomLoaded&&self===self.top){dojo._scrollIntervalId=setInterval(function(){try{if(document.body){document.documentElement.doScroll("left");dojo._loadInit();}}catch(e){}},30);}}}}if(dojo.isIE){try{(function(){document.namespaces.add("v","urn:schemas-microsoft-com:vml");var _5d=["*","group","roundrect","oval","shape","rect","imagedata","path","textpath","text"],i=0,l=1,s=document.createStyleSheet();if(dojo.isIE>=8){i=1;l=_5d.length;}for(;i<l;++i){s.addRule("v\\:"+_5d[i],"behavior:url(#default#VML); display:inline-block");}})();}catch(e){}}}(function(){var mp=dojo.config["modulePaths"];if(mp){for(var _5e in mp){dojo.registerModulePath(_5e,mp[_5e]);}}})();if(dojo.config.isDebug){dojo.require("dojo._firebug.firebug");}if(dojo.config.debugAtAllCosts){dojo.config.useXDomain=true;dojo.require("dojo._base._loader.loader_xd");dojo.require("dojo._base._loader.loader_debug");dojo.require("dojo.i18n");}if(!dojo._hasResource["dojo._base.lang"]){dojo._hasResource["dojo._base.lang"]=true;dojo.provide("dojo._base.lang");(function(){var d=dojo,_5f=Object.prototype.toString;dojo.isString=function(it){return (typeof it=="string"||it instanceof String);};dojo.isArray=function(it){return it&&(it instanceof Array||typeof it=="array");};dojo.isFunction=function(it){return _5f.call(it)==="[object Function]";};dojo.isObject=function(it){return it!==undefined&&(it===null||typeof it=="object"||d.isArray(it)||d.isFunction(it));};dojo.isArrayLike=function(it){return it&&it!==undefined&&!d.isString(it)&&!d.isFunction(it)&&!(it.tagName&&it.tagName.toLowerCase()=="form")&&(d.isArray(it)||isFinite(it.length));};dojo.isAlien=function(it){return it&&!d.isFunction(it)&&/\{\s*\[native code\]\s*\}/.test(String(it));};dojo.extend=function(_60,_61){for(var i=1,l=arguments.length;i<l;i++){d._mixin(_60.prototype,arguments[i]);}return _60;};dojo._hitchArgs=function(_62,_63){var pre=d._toArray(arguments,2);var _64=d.isString(_63);return function(){var _65=d._toArray(arguments);var f=_64?(_62||d.global)[_63]:_63;return f&&f.apply(_62||this,pre.concat(_65));};};dojo.hitch=function(_66,_67){if(arguments.length>2){return d._hitchArgs.apply(d,arguments);}if(!_67){_67=_66;_66=null;}if(d.isString(_67)){_66=_66||d.global;if(!_66[_67]){throw (["dojo.hitch: scope[\"",_67,"\"] is null (scope=\"",_66,"\")"].join(""));}return function(){return _66[_67].apply(_66,arguments||[]);};}return !_66?_67:function(){return _67.apply(_66,arguments||[]);};};dojo.delegate=dojo._delegate=(function(){function TMP(){};return function(obj,_68){TMP.prototype=obj;var tmp=new TMP();TMP.prototype=null;if(_68){d._mixin(tmp,_68);}return tmp;};})();var _69=function(obj,_6a,_6b){return (_6b||[]).concat(Array.prototype.slice.call(obj,_6a||0));};var _6c=function(obj,_6d,_6e){var arr=_6e||[];for(var x=_6d||0;x<obj.length;x++){arr.push(obj[x]);}return arr;};dojo._toArray=d.isIE?function(obj){return ((obj.item)?_6c:_69).apply(this,arguments);}:_69;dojo.partial=function(_6f){var arr=[null];return d.hitch.apply(d,arr.concat(d._toArray(arguments)));};var _70=d._extraNames,_71=_70.length,_72={};dojo.clone=function(o){if(!o||typeof o!="object"||d.isFunction(o)){return o;}if(o.nodeType&&"cloneNode" in o){return o.cloneNode(true);}if(o instanceof Date){return new Date(o.getTime());}var r,i,l,s,_73;if(d.isArray(o)){r=[];for(i=0,l=o.length;i<l;++i){if(i in o){r.push(d.clone(o[i]));}}}else{r=o.constructor?new o.constructor():{};}for(_73 in o){s=o[_73];if(!(_73 in r)||(r[_73]!==s&&(!(_73 in _72)||_72[_73]!==s))){r[_73]=d.clone(s);}}if(_71){for(i=0;i<_71;++i){_73=_70[i];s=o[_73];if(!(_73 in r)||(r[_73]!==s&&(!(_73 in _72)||_72[_73]!==s))){r[_73]=s;}}}return r;};dojo.trim=String.prototype.trim?function(str){return str.trim();}:function(str){return str.replace(/^\s\s*/,"").replace(/\s\s*$/,"");};var _74=/\{([^\}]+)\}/g;dojo.replace=function(_75,map,_76){return _75.replace(_76||_74,d.isFunction(map)?map:function(_77,k){return d.getObject(k,false,map);});};})();}if(!dojo._hasResource["dojo._base.array"]){dojo._hasResource["dojo._base.array"]=true;dojo.provide("dojo._base.array");(function(){var _78=function(arr,obj,cb){return [(typeof arr=="string")?arr.split(""):arr,obj||dojo.global,(typeof cb=="string")?new Function("item","index","array",cb):cb];};var _79=function(_7a,arr,_7b,_7c){var _7d=_78(arr,_7c,_7b);arr=_7d[0];for(var i=0,l=arr.length;i<l;++i){var _7e=!!_7d[2].call(_7d[1],arr[i],i,arr);if(_7a^_7e){return _7e;}}return _7a;};dojo.mixin(dojo,{indexOf:function(_7f,_80,_81,_82){var _83=1,end=_7f.length||0,i=0;if(_82){i=end-1;_83=end=-1;}if(_81!=undefined){i=_81;}if((_82&&i>end)||i<end){for(;i!=end;i+=_83){if(_7f[i]==_80){return i;}}}return -1;},lastIndexOf:function(_84,_85,_86){return dojo.indexOf(_84,_85,_86,true);},forEach:function(arr,_87,_88){if(!arr||!arr.length){return;}var _89=_78(arr,_88,_87);arr=_89[0];for(var i=0,l=arr.length;i<l;++i){_89[2].call(_89[1],arr[i],i,arr);}},every:function(arr,_8a,_8b){return _79(true,arr,_8a,_8b);},some:function(arr,_8c,_8d){return _79(false,arr,_8c,_8d);},map:function(arr,_8e,_8f){var _90=_78(arr,_8f,_8e);arr=_90[0];var _91=(arguments[3]?(new arguments[3]()):[]);for(var i=0,l=arr.length;i<l;++i){_91.push(_90[2].call(_90[1],arr[i],i,arr));}return _91;},filter:function(arr,_92,_93){var _94=_78(arr,_93,_92);arr=_94[0];var _95=[];for(var i=0,l=arr.length;i<l;++i){if(_94[2].call(_94[1],arr[i],i,arr)){_95.push(arr[i]);}}return _95;}});})();}if(!dojo._hasResource["dojo._base.declare"]){dojo._hasResource["dojo._base.declare"]=true;dojo.provide("dojo._base.declare");(function(){var d=dojo,mix=d._mixin,op=Object.prototype,_96=op.toString,_97=new Function,_98=0,_99="constructor";function err(msg){throw new Error("declare: "+msg);};function _9a(_9b){var _9c=[],_9d=[{cls:0,refs:[]}],_9e={},_9f=1,l=_9b.length,i=0,j,lin,_a0,top,_a1,rec,_a2,_a3;for(;i<l;++i){_a0=_9b[i];if(!_a0){err("mixin #"+i+" is unknown. Did you use dojo.require to pull it in?");}else{if(_96.call(_a0)!="[object Function]"){err("mixin #"+i+" is not a callable constructor.");}}lin=_a0._meta?_a0._meta.bases:[_a0];top=0;for(j=lin.length-1;j>=0;--j){_a1=lin[j].prototype;if(!_a1.hasOwnProperty("declaredClass")){_a1.declaredClass="uniqName_"+(_98++);}_a2=_a1.declaredClass;if(!_9e.hasOwnProperty(_a2)){_9e[_a2]={count:0,refs:[],cls:lin[j]};++_9f;}rec=_9e[_a2];if(top&&top!==rec){rec.refs.push(top);++top.count;}top=rec;}++top.count;_9d[0].refs.push(top);}while(_9d.length){top=_9d.pop();_9c.push(top.cls);--_9f;while(_a3=top.refs,_a3.length==1){top=_a3[0];if(!top||--top.count){top=0;break;}_9c.push(top.cls);--_9f;}if(top){for(i=0,l=_a3.length;i<l;++i){top=_a3[i];if(!--top.count){_9d.push(top);}}}}if(_9f){err("can't build consistent linearization");}_a0=_9b[0];_9c[0]=_a0?_a0._meta&&_a0===_9c[_9c.length-_a0._meta.bases.length]?_a0._meta.bases.length:1:0;return _9c;};function _a4(_a5,a,f){var _a6,_a7,_a8,_a9,_aa,_ab,_ac,opf,pos,_ad=this._inherited=this._inherited||{};if(typeof _a5=="string"){_a6=_a5;_a5=a;a=f;}f=0;_a9=_a5.callee;_a6=_a6||_a9.nom;if(!_a6){err("can't deduce a name to call inherited()");}_aa=this.constructor._meta;_a8=_aa.bases;pos=_ad.p;if(_a6!=_99){if(_ad.c!==_a9){pos=0;_ab=_a8[0];_aa=_ab._meta;if(_aa.hidden[_a6]!==_a9){_a7=_aa.chains;if(_a7&&typeof _a7[_a6]=="string"){err("calling chained method with inherited: "+_a6);}do{_aa=_ab._meta;_ac=_ab.prototype;if(_aa&&(_ac[_a6]===_a9&&_ac.hasOwnProperty(_a6)||_aa.hidden[_a6]===_a9)){break;}}while(_ab=_a8[++pos]);pos=_ab?pos:-1;}}_ab=_a8[++pos];if(_ab){_ac=_ab.prototype;if(_ab._meta&&_ac.hasOwnProperty(_a6)){f=_ac[_a6];}else{opf=op[_a6];do{_ac=_ab.prototype;f=_ac[_a6];if(f&&(_ab._meta?_ac.hasOwnProperty(_a6):f!==opf)){break;}}while(_ab=_a8[++pos]);}}f=_ab&&f||op[_a6];}else{if(_ad.c!==_a9){pos=0;_aa=_a8[0]._meta;if(_aa&&_aa.ctor!==_a9){_a7=_aa.chains;if(!_a7||_a7.constructor!=="manual"){err("calling chained constructor with inherited");}while(_ab=_a8[++pos]){_aa=_ab._meta;if(_aa&&_aa.ctor===_a9){break;}}pos=_ab?pos:-1;}}while(_ab=_a8[++pos]){_aa=_ab._meta;f=_aa?_aa.ctor:_ab;if(f){break;}}f=_ab&&f;}_ad.c=f;_ad.p=pos;if(f){return a===true?f:f.apply(this,a||_a5);}};function _ae(_af,_b0){if(typeof _af=="string"){return this.inherited(_af,_b0,true);}return this.inherited(_af,true);};function _b1(cls){var _b2=this.constructor._meta.bases;for(var i=0,l=_b2.length;i<l;++i){if(_b2[i]===cls){return true;}}return this instanceof cls;};function _b3(_b4,_b5){var _b6,i=0,l=d._extraNames.length;for(_b6 in _b5){if(_b6!=_99&&_b5.hasOwnProperty(_b6)){_b4[_b6]=_b5[_b6];}}for(;i<l;++i){_b6=d._extraNames[i];if(_b6!=_99&&_b5.hasOwnProperty(_b6)){_b4[_b6]=_b5[_b6];}}};function _b7(_b8,_b9){var _ba,t,i=0,l=d._extraNames.length;for(_ba in _b9){t=_b9[_ba];if((t!==op[_ba]||!(_ba in op))&&_ba!=_99){if(_96.call(t)=="[object Function]"){t.nom=_ba;}_b8[_ba]=t;}}for(;i<l;++i){_ba=d._extraNames[i];t=_b9[_ba];if((t!==op[_ba]||!(_ba in op))&&_ba!=_99){if(_96.call(t)=="[object Function]"){t.nom=_ba;}_b8[_ba]=t;}}return _b8;};function _bb(_bc){_b7(this.prototype,_bc);return this;};function _bd(_be,_bf){return function(){var a=arguments,_c0=a,a0=a[0],f,i,m,l=_be.length,_c1;if(!(this instanceof a.callee)){return _c2(a);}if(_bf&&(a0&&a0.preamble||this.preamble)){_c1=new Array(_be.length);_c1[0]=a;for(i=0;;){a0=a[0];if(a0){f=a0.preamble;if(f){a=f.apply(this,a)||a;}}f=_be[i].prototype;f=f.hasOwnProperty("preamble")&&f.preamble;if(f){a=f.apply(this,a)||a;}if(++i==l){break;}_c1[i]=a;}}for(i=l-1;i>=0;--i){f=_be[i];m=f._meta;f=m?m.ctor:f;if(f){f.apply(this,_c1?_c1[i]:a);}}f=this.postscript;if(f){f.apply(this,_c0);}};};function _c3(_c4,_c5){return function(){var a=arguments,t=a,a0=a[0],f;if(!(this instanceof a.callee)){return _c2(a);}if(_c5){if(a0){f=a0.preamble;if(f){t=f.apply(this,t)||t;}}f=this.preamble;if(f){f.apply(this,t);}}if(_c4){_c4.apply(this,a);}f=this.postscript;if(f){f.apply(this,a);}};};function _c6(_c7){return function(){var a=arguments,i=0,f,m;if(!(this instanceof a.callee)){return _c2(a);}for(;f=_c7[i];++i){m=f._meta;f=m?m.ctor:f;if(f){f.apply(this,a);break;}}f=this.postscript;if(f){f.apply(this,a);}};};function _c8(_c9,_ca,_cb){return function(){var b,m,f,i=0,_cc=1;if(_cb){i=_ca.length-1;_cc=-1;}for(;b=_ca[i];i+=_cc){m=b._meta;f=(m?m.hidden:b.prototype)[_c9];if(f){f.apply(this,arguments);}}};};function _cd(_ce){_97.prototype=_ce.prototype;var t=new _97;_97.prototype=null;return t;};function _c2(_cf){var _d0=_cf.callee,t=_cd(_d0);_d0.apply(t,_cf);return t;};d.declare=function(_d1,_d2,_d3){if(typeof _d1!="string"){_d3=_d2;_d2=_d1;_d1="";}_d3=_d3||{};var _d4,i,t,_d5,_d6,_d7,_d8,_d9=1,_da=_d2;if(_96.call(_d2)=="[object Array]"){_d7=_9a(_d2);t=_d7[0];_d9=_d7.length-t;_d2=_d7[_d9];}else{_d7=[0];if(_d2){if(_96.call(_d2)=="[object Function]"){t=_d2._meta;_d7=_d7.concat(t?t.bases:_d2);}else{err("base class is not a callable constructor.");}}else{if(_d2!==null){err("unknown base class. Did you use dojo.require to pull it in?");}}}if(_d2){for(i=_d9-1;;--i){_d4=_cd(_d2);if(!i){break;}t=_d7[i];(t._meta?_b3:mix)(_d4,t.prototype);_d5=new Function;_d5.superclass=_d2;_d5.prototype=_d4;_d2=_d4.constructor=_d5;}}else{_d4={};}_b7(_d4,_d3);t=_d3.constructor;if(t!==op.constructor){t.nom=_99;_d4.constructor=t;}for(i=_d9-1;i;--i){t=_d7[i]._meta;if(t&&t.chains){_d8=mix(_d8||{},t.chains);}}if(_d4["-chains-"]){_d8=mix(_d8||{},_d4["-chains-"]);}t=!_d8||!_d8.hasOwnProperty(_99);_d7[0]=_d5=(_d8&&_d8.constructor==="manual")?_c6(_d7):(_d7.length==1?_c3(_d3.constructor,t):_bd(_d7,t));_d5._meta={bases:_d7,hidden:_d3,chains:_d8,parents:_da,ctor:_d3.constructor};_d5.superclass=_d2&&_d2.prototype;_d5.extend=_bb;_d5.prototype=_d4;_d4.constructor=_d5;_d4.getInherited=_ae;_d4.inherited=_a4;_d4.isInstanceOf=_b1;if(_d1){_d4.declaredClass=_d1;d.setObject(_d1,_d5);}if(_d8){for(_d6 in _d8){if(_d4[_d6]&&typeof _d8[_d6]=="string"&&_d6!=_99){t=_d4[_d6]=_c8(_d6,_d7,_d8[_d6]==="after");t.nom=_d6;}}}return _d5;};d.safeMixin=_b7;})();}if(!dojo._hasResource["dojo._base.connect"]){dojo._hasResource["dojo._base.connect"]=true;dojo.provide("dojo._base.connect");dojo._listener={getDispatcher:function(){return function(){var ap=Array.prototype,c=arguments.callee,ls=c._listeners,t=c.target;var r=t&&t.apply(this,arguments);var i,lls;lls=[].concat(ls);for(i in lls){if(!(i in ap)){lls[i].apply(this,arguments);}}return r;};},add:function(_db,_dc,_dd){_db=_db||dojo.global;var f=_db[_dc];if(!f||!f._listeners){var d=dojo._listener.getDispatcher();d.target=f;d._listeners=[];f=_db[_dc]=d;}return f._listeners.push(_dd);},remove:function(_de,_df,_e0){var f=(_de||dojo.global)[_df];if(f&&f._listeners&&_e0--){delete f._listeners[_e0];}}};dojo.connect=function(obj,_e1,_e2,_e3,_e4){var a=arguments,_e5=[],i=0;_e5.push(dojo.isString(a[0])?null:a[i++],a[i++]);var a1=a[i+1];_e5.push(dojo.isString(a1)||dojo.isFunction(a1)?a[i++]:null,a[i++]);for(var l=a.length;i<l;i++){_e5.push(a[i]);}return dojo._connect.apply(this,_e5);};dojo._connect=function(obj,_e6,_e7,_e8){var l=dojo._listener,h=l.add(obj,_e6,dojo.hitch(_e7,_e8));return [obj,_e6,h,l];};dojo.disconnect=function(_e9){if(_e9&&_e9[0]!==undefined){dojo._disconnect.apply(this,_e9);delete _e9[0];}};dojo._disconnect=function(obj,_ea,_eb,_ec){_ec.remove(obj,_ea,_eb);};dojo._topics={};dojo.subscribe=function(_ed,_ee,_ef){return [_ed,dojo._listener.add(dojo._topics,_ed,dojo.hitch(_ee,_ef))];};dojo.unsubscribe=function(_f0){if(_f0){dojo._listener.remove(dojo._topics,_f0[0],_f0[1]);}};dojo.publish=function(_f1,_f2){var f=dojo._topics[_f1];if(f){f.apply(this,_f2||[]);}};dojo.connectPublisher=function(_f3,obj,_f4){var pf=function(){dojo.publish(_f3,arguments);};return _f4?dojo.connect(obj,_f4,pf):dojo.connect(obj,pf);};}if(!dojo._hasResource["dojo._base.Deferred"]){dojo._hasResource["dojo._base.Deferred"]=true;dojo.provide("dojo._base.Deferred");(function(){var _f5=function(){};var _f6=Object.freeze||function(){};dojo.Deferred=function(_f7){var _f8,_f9,_fa,_fb,_fc;var _fd=this.promise={};function _fe(_ff){if(_f9){throw new Error("This deferred has already been resolved");}_f8=_ff;_f9=true;_100();};function _100(){var _101;while(!_101&&_fc){var _102=_fc;_fc=_fc.next;if(_101=(_102.progress==_f5)){_f9=false;}var func=(_fa?_102.error:_102.resolved);if(func){try{var _103=func(_f8);if(_103&&typeof _103.then==="function"){_103.then(dojo.hitch(_102.deferred,"resolve"),dojo.hitch(_102.deferred,"reject"));continue;}var _104=_101&&_103===undefined;_102.deferred[_104&&_fa?"reject":"resolve"](_104?_f8:_103);}catch(e){_102.deferred.reject(e);}}else{if(_fa){_102.deferred.reject(_f8);}else{_102.deferred.resolve(_f8);}}}};this.resolve=this.callback=function(_105){this.fired=0;this.results=[_105,null];_fe(_105);};this.reject=this.errback=function(_106){_fa=true;this.fired=1;_fe(_106);this.results=[null,_106];if(!_106||_106.log!==false){(dojo.config.deferredOnError||function(x){console.error(x);})(_106);}};this.progress=function(_107){var _108=_fc;while(_108){var _109=_108.progress;_109&&_109(_107);_108=_108.next;}};this.addCallbacks=function(_10a,_10b){this.then(_10a,_10b,_f5);return this;};this.then=_fd.then=function(_10c,_10d,_10e){var _10f=_10e==_f5?this:new dojo.Deferred(_fd.cancel);var _110={resolved:_10c,error:_10d,progress:_10e,deferred:_10f};if(_fc){_fb=_fb.next=_110;}else{_fc=_fb=_110;}if(_f9){_100();}return _10f.promise;};var _111=this;this.cancel=_fd.cancel=function(){if(!_f9){var _112=_f7&&_f7(_111);if(!_f9){if(!(_112 instanceof Error)){_112=new Error(_112);}_112.log=false;_111.reject(_112);}}};_f6(_fd);};dojo.extend(dojo.Deferred,{addCallback:function(_113){return this.addCallbacks(dojo.hitch.apply(dojo,arguments));},addErrback:function(_114){return this.addCallbacks(null,dojo.hitch.apply(dojo,arguments));},addBoth:function(_115){var _116=dojo.hitch.apply(dojo,arguments);return this.addCallbacks(_116,_116);},fired:-1});})();dojo.when=function(_117,_118,_119,_11a){if(_117&&typeof _117.then==="function"){return _117.then(_118,_119,_11a);}return _118(_117);};}if(!dojo._hasResource["dojo._base.json"]){dojo._hasResource["dojo._base.json"]=true;dojo.provide("dojo._base.json");dojo.fromJson=function(json){return eval("("+json+")");};dojo._escapeString=function(str){return ("\""+str.replace(/(["\\])/g,"\\$1")+"\"").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r");};dojo.toJsonIndentStr="\t";dojo.toJson=function(it,_11b,_11c){if(it===undefined){return "undefined";}var _11d=typeof it;if(_11d=="number"||_11d=="boolean"){return it+"";}if(it===null){return "null";}if(dojo.isString(it)){return dojo._escapeString(it);}var _11e=arguments.callee;var _11f;_11c=_11c||"";var _120=_11b?_11c+dojo.toJsonIndentStr:"";var tf=it.__json__||it.json;if(dojo.isFunction(tf)){_11f=tf.call(it);if(it!==_11f){return _11e(_11f,_11b,_120);}}if(it.nodeType&&it.cloneNode){throw new Error("Can't serialize DOM nodes");}var sep=_11b?" ":"";var _121=_11b?"\n":"";if(dojo.isArray(it)){var res=dojo.map(it,function(obj){var val=_11e(obj,_11b,_120);if(typeof val!="string"){val="undefined";}return _121+_120+val;});return "["+res.join(","+sep)+_121+_11c+"]";}if(_11d=="function"){return null;}var _122=[],key;for(key in it){var _123,val;if(typeof key=="number"){_123="\""+key+"\"";}else{if(typeof key=="string"){_123=dojo._escapeString(key);}else{continue;}}val=_11e(it[key],_11b,_120);if(typeof val!="string"){continue;}_122.push(_121+_120+_123+":"+sep+val);}return "{"+_122.join(","+sep)+_121+_11c+"}";};}if(!dojo._hasResource["dojo._base.Color"]){dojo._hasResource["dojo._base.Color"]=true;dojo.provide("dojo._base.Color");(function(){var d=dojo;dojo.Color=function(_124){if(_124){this.setColor(_124);}};dojo.Color.named={black:[0,0,0],silver:[192,192,192],gray:[128,128,128],white:[255,255,255],maroon:[128,0,0],red:[255,0,0],purple:[128,0,128],fuchsia:[255,0,255],green:[0,128,0],lime:[0,255,0],olive:[128,128,0],yellow:[255,255,0],navy:[0,0,128],blue:[0,0,255],teal:[0,128,128],aqua:[0,255,255],transparent:d.config.transparentColor||[255,255,255]};dojo.extend(dojo.Color,{r:255,g:255,b:255,a:1,_set:function(r,g,b,a){var t=this;t.r=r;t.g=g;t.b=b;t.a=a;},setColor:function(_125){if(d.isString(_125)){d.colorFromString(_125,this);}else{if(d.isArray(_125)){d.colorFromArray(_125,this);}else{this._set(_125.r,_125.g,_125.b,_125.a);if(!(_125 instanceof d.Color)){this.sanitize();}}}return this;},sanitize:function(){return this;},toRgb:function(){var t=this;return [t.r,t.g,t.b];},toRgba:function(){var t=this;return [t.r,t.g,t.b,t.a];},toHex:function(){var arr=d.map(["r","g","b"],function(x){var s=this[x].toString(16);return s.length<2?"0"+s:s;},this);return "#"+arr.join("");},toCss:function(_126){var t=this,rgb=t.r+", "+t.g+", "+t.b;return (_126?"rgba("+rgb+", "+t.a:"rgb("+rgb)+")";},toString:function(){return this.toCss(true);}});dojo.blendColors=function(_127,end,_128,obj){var t=obj||new d.Color();d.forEach(["r","g","b","a"],function(x){t[x]=_127[x]+(end[x]-_127[x])*_128;if(x!="a"){t[x]=Math.round(t[x]);}});return t.sanitize();};dojo.colorFromRgb=function(_129,obj){var m=_129.toLowerCase().match(/^rgba?\(([\s\.,0-9]+)\)/);return m&&dojo.colorFromArray(m[1].split(/\s*,\s*/),obj);};dojo.colorFromHex=function(_12a,obj){var t=obj||new d.Color(),bits=(_12a.length==4)?4:8,mask=(1<<bits)-1;_12a=Number("0x"+_12a.substr(1));if(isNaN(_12a)){return null;}d.forEach(["b","g","r"],function(x){var c=_12a&mask;_12a>>=bits;t[x]=bits==4?17*c:c;});t.a=1;return t;};dojo.colorFromArray=function(a,obj){var t=obj||new d.Color();t._set(Number(a[0]),Number(a[1]),Number(a[2]),Number(a[3]));if(isNaN(t.a)){t.a=1;}return t.sanitize();};dojo.colorFromString=function(str,obj){var a=d.Color.named[str];return a&&d.colorFromArray(a,obj)||d.colorFromRgb(str,obj)||d.colorFromHex(str,obj);};})();}if(!dojo._hasResource["dojo._base"]){dojo._hasResource["dojo._base"]=true;dojo.provide("dojo._base");}if(!dojo._hasResource["dojo._base.window"]){dojo._hasResource["dojo._base.window"]=true;dojo.provide("dojo._base.window");dojo.doc=window["document"]||null;dojo.body=function(){return dojo.doc.body||dojo.doc.getElementsByTagName("body")[0];};dojo.setContext=function(_12b,_12c){dojo.global=_12b;dojo.doc=_12c;};dojo.withGlobal=function(_12d,_12e,_12f,_130){var _131=dojo.global;try{dojo.global=_12d;return dojo.withDoc.call(null,_12d.document,_12e,_12f,_130);}finally{dojo.global=_131;}};dojo.withDoc=function(_132,_133,_134,_135){var _136=dojo.doc,_137=dojo._bodyLtr,oldQ=dojo.isQuirks;try{dojo.doc=_132;delete dojo._bodyLtr;dojo.isQuirks=dojo.doc.compatMode=="BackCompat";if(_134&&typeof _133=="string"){_133=_134[_133];}return _133.apply(_134,_135||[]);}finally{dojo.doc=_136;delete dojo._bodyLtr;if(_137!==undefined){dojo._bodyLtr=_137;}dojo.isQuirks=oldQ;}};}if(!dojo._hasResource["dojo._base.event"]){dojo._hasResource["dojo._base.event"]=true;dojo.provide("dojo._base.event");(function(){var del=(dojo._event_listener={add:function(node,name,fp){if(!node){return;}name=del._normalizeEventName(name);fp=del._fixCallback(name,fp);var _138=name;if(!dojo.isIE&&(name=="mouseenter"||name=="mouseleave")){var ofp=fp;name=(name=="mouseenter")?"mouseover":"mouseout";fp=function(e){if(!dojo.isDescendant(e.relatedTarget,node)){return ofp.call(this,e);}};}node.addEventListener(name,fp,false);return fp;},remove:function(node,_139,_13a){if(node){_139=del._normalizeEventName(_139);if(!dojo.isIE&&(_139=="mouseenter"||_139=="mouseleave")){_139=(_139=="mouseenter")?"mouseover":"mouseout";}node.removeEventListener(_139,_13a,false);}},_normalizeEventName:function(name){return name.slice(0,2)=="on"?name.slice(2):name;},_fixCallback:function(name,fp){return name!="keypress"?fp:function(e){return fp.call(this,del._fixEvent(e,this));};},_fixEvent:function(evt,_13b){switch(evt.type){case "keypress":del._setKeyChar(evt);break;}return evt;},_setKeyChar:function(evt){evt.keyChar=evt.charCode?String.fromCharCode(evt.charCode):"";evt.charOrCode=evt.keyChar||evt.keyCode;},_punctMap:{106:42,111:47,186:59,187:43,188:44,189:45,190:46,191:47,192:96,219:91,220:92,221:93,222:39}});dojo.fixEvent=function(evt,_13c){return del._fixEvent(evt,_13c);};dojo.stopEvent=function(evt){evt.preventDefault();evt.stopPropagation();};var _13d=dojo._listener;dojo._connect=function(obj,_13e,_13f,_140,_141){var _142=obj&&(obj.nodeType||obj.attachEvent||obj.addEventListener);var lid=_142?(_141?2:1):0,l=[dojo._listener,del,_13d][lid];var h=l.add(obj,_13e,dojo.hitch(_13f,_140));return [obj,_13e,h,lid];};dojo._disconnect=function(obj,_143,_144,_145){([dojo._listener,del,_13d][_145]).remove(obj,_143,_144);};dojo.keys={BACKSPACE:8,TAB:9,CLEAR:12,ENTER:13,SHIFT:16,CTRL:17,ALT:18,META:dojo.isSafari?91:224,PAUSE:19,CAPS_LOCK:20,ESCAPE:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT_ARROW:37,UP_ARROW:38,RIGHT_ARROW:39,DOWN_ARROW:40,INSERT:45,DELETE:46,HELP:47,LEFT_WINDOW:91,RIGHT_WINDOW:92,SELECT:93,NUMPAD_0:96,NUMPAD_1:97,NUMPAD_2:98,NUMPAD_3:99,NUMPAD_4:100,NUMPAD_5:101,NUMPAD_6:102,NUMPAD_7:103,NUMPAD_8:104,NUMPAD_9:105,NUMPAD_MULTIPLY:106,NUMPAD_PLUS:107,NUMPAD_ENTER:108,NUMPAD_MINUS:109,NUMPAD_PERIOD:110,NUMPAD_DIVIDE:111,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,F13:124,F14:125,F15:126,NUM_LOCK:144,SCROLL_LOCK:145,copyKey:dojo.isMac&&!dojo.isAIR?(dojo.isSafari?91:224):17};var _146=dojo.isMac?"metaKey":"ctrlKey";dojo.isCopyKey=function(e){return e[_146];};if(dojo.isIE){dojo.mouseButtons={LEFT:1,MIDDLE:4,RIGHT:2,isButton:function(e,_147){return e.button&_147;},isLeft:function(e){return e.button&1;},isMiddle:function(e){return e.button&4;},isRight:function(e){return e.button&2;}};}else{dojo.mouseButtons={LEFT:0,MIDDLE:1,RIGHT:2,isButton:function(e,_148){return e.button==_148;},isLeft:function(e){return e.button==0;},isMiddle:function(e){return e.button==1;},isRight:function(e){return e.button==2;}};}if(dojo.isIE){var _149=function(e,code){try{return (e.keyCode=code);}catch(e){return 0;}};var iel=dojo._listener;var _14a=(dojo._ieListenersName="_"+dojo._scopeName+"_listeners");if(!dojo.config._allow_leaks){_13d=iel=dojo._ie_listener={handlers:[],add:function(_14b,_14c,_14d){_14b=_14b||dojo.global;var f=_14b[_14c];if(!f||!f[_14a]){var d=dojo._getIeDispatcher();d.target=f&&(ieh.push(f)-1);d[_14a]=[];f=_14b[_14c]=d;}return f[_14a].push(ieh.push(_14d)-1);},remove:function(_14e,_14f,_150){var f=(_14e||dojo.global)[_14f],l=f&&f[_14a];if(f&&l&&_150--){delete ieh[l[_150]];delete l[_150];}}};var ieh=iel.handlers;}dojo.mixin(del,{add:function(node,_151,fp){if(!node){return;}_151=del._normalizeEventName(_151);if(_151=="onkeypress"){var kd=node.onkeydown;if(!kd||!kd[_14a]||!kd._stealthKeydownHandle){var h=del.add(node,"onkeydown",del._stealthKeyDown);kd=node.onkeydown;kd._stealthKeydownHandle=h;kd._stealthKeydownRefs=1;}else{kd._stealthKeydownRefs++;}}return iel.add(node,_151,del._fixCallback(fp));},remove:function(node,_152,_153){_152=del._normalizeEventName(_152);iel.remove(node,_152,_153);if(_152=="onkeypress"){var kd=node.onkeydown;if(--kd._stealthKeydownRefs<=0){iel.remove(node,"onkeydown",kd._stealthKeydownHandle);delete kd._stealthKeydownHandle;}}},_normalizeEventName:function(_154){return _154.slice(0,2)!="on"?"on"+_154:_154;},_nop:function(){},_fixEvent:function(evt,_155){if(!evt){var w=_155&&(_155.ownerDocument||_155.document||_155).parentWindow||window;evt=w.event;}if(!evt){return (evt);}evt.target=evt.srcElement;evt.currentTarget=(_155||evt.srcElement);evt.layerX=evt.offsetX;evt.layerY=evt.offsetY;var se=evt.srcElement,doc=(se&&se.ownerDocument)||document;var _156=((dojo.isIE<6)||(doc["compatMode"]=="BackCompat"))?doc.body:doc.documentElement;var _157=dojo._getIeDocumentElementOffset();evt.pageX=evt.clientX+dojo._fixIeBiDiScrollLeft(_156.scrollLeft||0)-_157.x;evt.pageY=evt.clientY+(_156.scrollTop||0)-_157.y;if(evt.type=="mouseover"){evt.relatedTarget=evt.fromElement;}if(evt.type=="mouseout"){evt.relatedTarget=evt.toElement;}evt.stopPropagation=del._stopPropagation;evt.preventDefault=del._preventDefault;return del._fixKeys(evt);},_fixKeys:function(evt){switch(evt.type){case "keypress":var c=("charCode" in evt?evt.charCode:evt.keyCode);if(c==10){c=0;evt.keyCode=13;}else{if(c==13||c==27){c=0;}else{if(c==3){c=99;}}}evt.charCode=c;del._setKeyChar(evt);break;}return evt;},_stealthKeyDown:function(evt){var kp=evt.currentTarget.onkeypress;if(!kp||!kp[_14a]){return;}var k=evt.keyCode;var _158=k!=13&&k!=32&&k!=27&&(k<48||k>90)&&(k<96||k>111)&&(k<186||k>192)&&(k<219||k>222);if(_158||evt.ctrlKey){var c=_158?0:k;if(evt.ctrlKey){if(k==3||k==13){return;}else{if(c>95&&c<106){c-=48;}else{if((!evt.shiftKey)&&(c>=65&&c<=90)){c+=32;}else{c=del._punctMap[c]||c;}}}}var faux=del._synthesizeEvent(evt,{type:"keypress",faux:true,charCode:c});kp.call(evt.currentTarget,faux);evt.cancelBubble=faux.cancelBubble;evt.returnValue=faux.returnValue;_149(evt,faux.keyCode);}},_stopPropagation:function(){this.cancelBubble=true;},_preventDefault:function(){this.bubbledKeyCode=this.keyCode;if(this.ctrlKey){_149(this,0);}this.returnValue=false;}});dojo.stopEvent=function(evt){evt=evt||window.event;del._stopPropagation.call(evt);del._preventDefault.call(evt);};}del._synthesizeEvent=function(evt,_159){var faux=dojo.mixin({},evt,_159);del._setKeyChar(faux);faux.preventDefault=function(){evt.preventDefault();};faux.stopPropagation=function(){evt.stopPropagation();};return faux;};if(dojo.isOpera){dojo.mixin(del,{_fixEvent:function(evt,_15a){switch(evt.type){case "keypress":var c=evt.which;if(c==3){c=99;}c=c<41&&!evt.shiftKey?0:c;if(evt.ctrlKey&&!evt.shiftKey&&c>=65&&c<=90){c+=32;}return del._synthesizeEvent(evt,{charCode:c});}return evt;}});}if(dojo.isWebKit){del._add=del.add;del._remove=del.remove;dojo.mixin(del,{add:function(node,_15b,fp){if(!node){return;}var _15c=del._add(node,_15b,fp);if(del._normalizeEventName(_15b)=="keypress"){_15c._stealthKeyDownHandle=del._add(node,"keydown",function(evt){var k=evt.keyCode;var _15d=k!=13&&k!=32&&(k<48||k>90)&&(k<96||k>111)&&(k<186||k>192)&&(k<219||k>222);if(_15d||evt.ctrlKey){var c=_15d?0:k;if(evt.ctrlKey){if(k==3||k==13){return;}else{if(c>95&&c<106){c-=48;}else{if(!evt.shiftKey&&c>=65&&c<=90){c+=32;}else{c=del._punctMap[c]||c;}}}}var faux=del._synthesizeEvent(evt,{type:"keypress",faux:true,charCode:c});fp.call(evt.currentTarget,faux);}});}return _15c;},remove:function(node,_15e,_15f){if(node){if(_15f._stealthKeyDownHandle){del._remove(node,"keydown",_15f._stealthKeyDownHandle);}del._remove(node,_15e,_15f);}},_fixEvent:function(evt,_160){switch(evt.type){case "keypress":if(evt.faux){return evt;}var c=evt.charCode;c=c>=32?c:0;return del._synthesizeEvent(evt,{charCode:c,faux:true});}return evt;}});}})();if(dojo.isIE){dojo._ieDispatcher=function(args,_161){var ap=Array.prototype,h=dojo._ie_listener.handlers,c=args.callee,ls=c[dojo._ieListenersName],t=h[c.target];var r=t&&t.apply(_161,args);var lls=[].concat(ls);for(var i in lls){var f=h[lls[i]];if(!(i in ap)&&f){f.apply(_161,args);}}return r;};dojo._getIeDispatcher=function(){return new Function(dojo._scopeName+"._ieDispatcher(arguments, this)");};dojo._event_listener._fixCallback=function(fp){var f=dojo._event_listener._fixEvent;return function(e){return fp.call(this,f(e,this));};};}}if(!dojo._hasResource["dojo._base.html"]){dojo._hasResource["dojo._base.html"]=true;dojo.provide("dojo._base.html");try{document.execCommand("BackgroundImageCache",false,true);}catch(e){}if(dojo.isIE||dojo.isOpera){dojo.byId=function(id,doc){if(typeof id!="string"){return id;}var _162=doc||dojo.doc,te=_162.getElementById(id);if(te&&(te.attributes.id.value==id||te.id==id)){return te;}else{var eles=_162.all[id];if(!eles||eles.nodeName){eles=[eles];}var i=0;while((te=eles[i++])){if((te.attributes&&te.attributes.id&&te.attributes.id.value==id)||te.id==id){return te;}}}};}else{dojo.byId=function(id,doc){return (typeof id=="string")?(doc||dojo.doc).getElementById(id):id;};}(function(){var d=dojo;var byId=d.byId;var _163=null,_164;d.addOnWindowUnload(function(){_163=null;});dojo._destroyElement=dojo.destroy=function(node){node=byId(node);try{var doc=node.ownerDocument;if(!_163||_164!=doc){_163=doc.createElement("div");_164=doc;}_163.appendChild(node.parentNode?node.parentNode.removeChild(node):node);_163.innerHTML="";}catch(e){}};dojo.isDescendant=function(node,_165){try{node=byId(node);_165=byId(_165);while(node){if(node==_165){return true;}node=node.parentNode;}}catch(e){}return false;};dojo.setSelectable=function(node,_166){node=byId(node);if(d.isMozilla){node.style.MozUserSelect=_166?"":"none";}else{if(d.isKhtml||d.isWebKit){node.style.KhtmlUserSelect=_166?"auto":"none";}else{if(d.isIE){var v=(node.unselectable=_166?"":"on");d.query("*",node).forEach("item.unselectable = '"+v+"'");}}}};var _167=function(node,ref){var _168=ref.parentNode;if(_168){_168.insertBefore(node,ref);}};var _169=function(node,ref){var _16a=ref.parentNode;if(_16a){if(_16a.lastChild==ref){_16a.appendChild(node);}else{_16a.insertBefore(node,ref.nextSibling);}}};dojo.place=function(node,_16b,_16c){_16b=byId(_16b);if(typeof node=="string"){node=node.charAt(0)=="<"?d._toDom(node,_16b.ownerDocument):byId(node);}if(typeof _16c=="number"){var cn=_16b.childNodes;if(!cn.length||cn.length<=_16c){_16b.appendChild(node);}else{_167(node,cn[_16c<0?0:_16c]);}}else{switch(_16c){case "before":_167(node,_16b);break;case "after":_169(node,_16b);break;case "replace":_16b.parentNode.replaceChild(node,_16b);break;case "only":d.empty(_16b);_16b.appendChild(node);break;case "first":if(_16b.firstChild){_167(node,_16b.firstChild);break;}default:_16b.appendChild(node);}}return node;};dojo.boxModel="content-box";if(d.isIE){d.boxModel=document.compatMode=="BackCompat"?"border-box":"content-box";}var gcs;if(d.isWebKit){gcs=function(node){var s;if(node.nodeType==1){var dv=node.ownerDocument.defaultView;s=dv.getComputedStyle(node,null);if(!s&&node.style){node.style.display="";s=dv.getComputedStyle(node,null);}}return s||{};};}else{if(d.isIE){gcs=function(node){return node.nodeType==1?node.currentStyle:{};};}else{gcs=function(node){return node.nodeType==1?node.ownerDocument.defaultView.getComputedStyle(node,null):{};};}}dojo.getComputedStyle=gcs;if(!d.isIE){d._toPixelValue=function(_16d,_16e){return parseFloat(_16e)||0;};}else{d._toPixelValue=function(_16f,_170){if(!_170){return 0;}if(_170=="medium"){return 4;}if(_170.slice&&_170.slice(-2)=="px"){return parseFloat(_170);}with(_16f){var _171=style.left;var _172=runtimeStyle.left;runtimeStyle.left=currentStyle.left;try{style.left=_170;_170=style.pixelLeft;}catch(e){_170=0;}style.left=_171;runtimeStyle.left=_172;}return _170;};}var px=d._toPixelValue;var astr="DXImageTransform.Microsoft.Alpha";var af=function(n,f){try{return n.filters.item(astr);}catch(e){return f?{}:null;}};dojo._getOpacity=d.isIE?function(node){try{return af(node).Opacity/100;}catch(e){return 1;}}:function(node){return gcs(node).opacity;};dojo._setOpacity=d.isIE?function(node,_173){var ov=_173*100,_174=_173==1;node.style.zoom=_174?"":1;if(!af(node)){if(_174){return _173;}node.style.filter+=" progid:"+astr+"(Opacity="+ov+")";}else{af(node,1).Opacity=ov;}af(node,1).Enabled=!_174;if(node.nodeName.toLowerCase()=="tr"){d.query("> td",node).forEach(function(i){d._setOpacity(i,_173);});}return _173;}:function(node,_175){return node.style.opacity=_175;};var _176={left:true,top:true};var _177=/margin|padding|width|height|max|min|offset/;var _178=function(node,type,_179){type=type.toLowerCase();if(d.isIE){if(_179=="auto"){if(type=="height"){return node.offsetHeight;}if(type=="width"){return node.offsetWidth;}}if(type=="fontweight"){switch(_179){case 700:return "bold";case 400:default:return "normal";}}}if(!(type in _176)){_176[type]=_177.test(type);}return _176[type]?px(node,_179):_179;};var _17a=d.isIE?"styleFloat":"cssFloat",_17b={"cssFloat":_17a,"styleFloat":_17a,"float":_17a};dojo.style=function(node,_17c,_17d){var n=byId(node),args=arguments.length,op=(_17c=="opacity");_17c=_17b[_17c]||_17c;if(args==3){return op?d._setOpacity(n,_17d):n.style[_17c]=_17d;}if(args==2&&op){return d._getOpacity(n);}var s=gcs(n);if(args==2&&typeof _17c!="string"){for(var x in _17c){d.style(node,x,_17c[x]);}return s;}return (args==1)?s:_178(n,_17c,s[_17c]||n.style[_17c]);};dojo._getPadExtents=function(n,_17e){var s=_17e||gcs(n),l=px(n,s.paddingLeft),t=px(n,s.paddingTop);return {l:l,t:t,w:l+px(n,s.paddingRight),h:t+px(n,s.paddingBottom)};};dojo._getBorderExtents=function(n,_17f){var ne="none",s=_17f||gcs(n),bl=(s.borderLeftStyle!=ne?px(n,s.borderLeftWidth):0),bt=(s.borderTopStyle!=ne?px(n,s.borderTopWidth):0);return {l:bl,t:bt,w:bl+(s.borderRightStyle!=ne?px(n,s.borderRightWidth):0),h:bt+(s.borderBottomStyle!=ne?px(n,s.borderBottomWidth):0)};};dojo._getPadBorderExtents=function(n,_180){var s=_180||gcs(n),p=d._getPadExtents(n,s),b=d._getBorderExtents(n,s);return {l:p.l+b.l,t:p.t+b.t,w:p.w+b.w,h:p.h+b.h};};dojo._getMarginExtents=function(n,_181){var s=_181||gcs(n),l=px(n,s.marginLeft),t=px(n,s.marginTop),r=px(n,s.marginRight),b=px(n,s.marginBottom);if(d.isWebKit&&(s.position!="absolute")){r=l;}return {l:l,t:t,w:l+r,h:t+b};};dojo._getMarginBox=function(node,_182){var s=_182||gcs(node),me=d._getMarginExtents(node,s);var l=node.offsetLeft-me.l,t=node.offsetTop-me.t,p=node.parentNode;if(d.isMoz){var sl=parseFloat(s.left),st=parseFloat(s.top);if(!isNaN(sl)&&!isNaN(st)){l=sl,t=st;}else{if(p&&p.style){var pcs=gcs(p);if(pcs.overflow!="visible"){var be=d._getBorderExtents(p,pcs);l+=be.l,t+=be.t;}}}}else{if(d.isOpera||(d.isIE>7&&!d.isQuirks)){if(p){be=d._getBorderExtents(p);l-=be.l;t-=be.t;}}}return {l:l,t:t,w:node.offsetWidth+me.w,h:node.offsetHeight+me.h};};dojo._getContentBox=function(node,_183){var s=_183||gcs(node),pe=d._getPadExtents(node,s),be=d._getBorderExtents(node,s),w=node.clientWidth,h;if(!w){w=node.offsetWidth,h=node.offsetHeight;}else{h=node.clientHeight,be.w=be.h=0;}if(d.isOpera){pe.l+=be.l;pe.t+=be.t;}return {l:pe.l,t:pe.t,w:w-pe.w-be.w,h:h-pe.h-be.h};};dojo._getBorderBox=function(node,_184){var s=_184||gcs(node),pe=d._getPadExtents(node,s),cb=d._getContentBox(node,s);return {l:cb.l-pe.l,t:cb.t-pe.t,w:cb.w+pe.w,h:cb.h+pe.h};};dojo._setBox=function(node,l,t,w,h,u){u=u||"px";var s=node.style;if(!isNaN(l)){s.left=l+u;}if(!isNaN(t)){s.top=t+u;}if(w>=0){s.width=w+u;}if(h>=0){s.height=h+u;}};dojo._isButtonTag=function(node){return node.tagName=="BUTTON"||node.tagName=="INPUT"&&(node.getAttribute("type")||"").toUpperCase()=="BUTTON";};dojo._usesBorderBox=function(node){var n=node.tagName;return d.boxModel=="border-box"||n=="TABLE"||d._isButtonTag(node);};dojo._setContentSize=function(node,_185,_186,_187){if(d._usesBorderBox(node)){var pb=d._getPadBorderExtents(node,_187);if(_185>=0){_185+=pb.w;}if(_186>=0){_186+=pb.h;}}d._setBox(node,NaN,NaN,_185,_186);};dojo._setMarginBox=function(node,_188,_189,_18a,_18b,_18c){var s=_18c||gcs(node),bb=d._usesBorderBox(node),pb=bb?_18d:d._getPadBorderExtents(node,s);if(d.isWebKit){if(d._isButtonTag(node)){var ns=node.style;if(_18a>=0&&!ns.width){ns.width="4px";}if(_18b>=0&&!ns.height){ns.height="4px";}}}var mb=d._getMarginExtents(node,s);if(_18a>=0){_18a=Math.max(_18a-pb.w-mb.w,0);}if(_18b>=0){_18b=Math.max(_18b-pb.h-mb.h,0);}d._setBox(node,_188,_189,_18a,_18b);};var _18d={l:0,t:0,w:0,h:0};dojo.marginBox=function(node,box){var n=byId(node),s=gcs(n),b=box;return !b?d._getMarginBox(n,s):d._setMarginBox(n,b.l,b.t,b.w,b.h,s);};dojo.contentBox=function(node,box){var n=byId(node),s=gcs(n),b=box;return !b?d._getContentBox(n,s):d._setContentSize(n,b.w,b.h,s);};var _18e=function(node,prop){if(!(node=(node||0).parentNode)){return 0;}var val,_18f=0,_190=d.body();while(node&&node.style){if(gcs(node).position=="fixed"){return 0;}val=node[prop];if(val){_18f+=val-0;if(node==_190){break;}}node=node.parentNode;}return _18f;};dojo._docScroll=function(){var n=d.global;return "pageXOffset" in n?{x:n.pageXOffset,y:n.pageYOffset}:(n=d.doc.documentElement,n.clientHeight?{x:d._fixIeBiDiScrollLeft(n.scrollLeft),y:n.scrollTop}:(n=d.body(),{x:n.scrollLeft||0,y:n.scrollTop||0}));};dojo._isBodyLtr=function(){return "_bodyLtr" in d?d._bodyLtr:d._bodyLtr=(d.body().dir||d.doc.documentElement.dir||"ltr").toLowerCase()=="ltr";};dojo._getIeDocumentElementOffset=function(){var de=d.doc.documentElement;if(d.isIE<8){var r=de.getBoundingClientRect();var l=r.left,t=r.top;if(d.isIE<7){l+=de.clientLeft;t+=de.clientTop;}return {x:l<0?0:l,y:t<0?0:t};}else{return {x:0,y:0};}};dojo._fixIeBiDiScrollLeft=function(_191){var dd=d.doc;if(d.isIE<8&&!d._isBodyLtr()){var de=d.isQuirks?dd.body:dd.documentElement;return _191+de.clientWidth-de.scrollWidth;}return _191;};dojo._abs=dojo.position=function(node,_192){var db=d.body(),dh=db.parentNode,ret;node=byId(node);if(node["getBoundingClientRect"]){ret=node.getBoundingClientRect();ret={x:ret.left,y:ret.top,w:ret.right-ret.left,h:ret.bottom-ret.top};if(d.isIE){var _193=d._getIeDocumentElementOffset();ret.x-=_193.x+(d.isQuirks?db.clientLeft+db.offsetLeft:0);ret.y-=_193.y+(d.isQuirks?db.clientTop+db.offsetTop:0);}else{if(d.isFF==3){var cs=gcs(dh);ret.x-=px(dh,cs.marginLeft)+px(dh,cs.borderLeftWidth);ret.y-=px(dh,cs.marginTop)+px(dh,cs.borderTopWidth);}}}else{ret={x:0,y:0,w:node.offsetWidth,h:node.offsetHeight};if(node["offsetParent"]){ret.x-=_18e(node,"scrollLeft");ret.y-=_18e(node,"scrollTop");var _194=node;do{var n=_194.offsetLeft,t=_194.offsetTop;ret.x+=isNaN(n)?0:n;ret.y+=isNaN(t)?0:t;cs=gcs(_194);if(_194!=node){if(d.isMoz){ret.x+=2*px(_194,cs.borderLeftWidth);ret.y+=2*px(_194,cs.borderTopWidth);}else{ret.x+=px(_194,cs.borderLeftWidth);ret.y+=px(_194,cs.borderTopWidth);}}if(d.isMoz&&cs.position=="static"){var _195=_194.parentNode;while(_195!=_194.offsetParent){var pcs=gcs(_195);if(pcs.position=="static"){ret.x+=px(_194,pcs.borderLeftWidth);ret.y+=px(_194,pcs.borderTopWidth);}_195=_195.parentNode;}}_194=_194.offsetParent;}while((_194!=dh)&&_194);}else{if(node.x&&node.y){ret.x+=isNaN(node.x)?0:node.x;ret.y+=isNaN(node.y)?0:node.y;}}}if(_192){var _196=d._docScroll();ret.x+=_196.x;ret.y+=_196.y;}return ret;};dojo.coords=function(node,_197){var n=byId(node),s=gcs(n),mb=d._getMarginBox(n,s);var abs=d.position(n,_197);mb.x=abs.x;mb.y=abs.y;return mb;};var _198={"class":"className","for":"htmlFor",tabindex:"tabIndex",readonly:"readOnly",colspan:"colSpan",frameborder:"frameBorder",rowspan:"rowSpan",valuetype:"valueType"},_199={classname:"class",htmlfor:"for",tabindex:"tabIndex",readonly:"readOnly"},_19a={innerHTML:1,className:1,htmlFor:d.isIE,value:1};var _19b=function(name){return _199[name.toLowerCase()]||name;};var _19c=function(node,name){var attr=node.getAttributeNode&&node.getAttributeNode(name);return attr&&attr.specified;};dojo.hasAttr=function(node,name){var lc=name.toLowerCase();return _19a[_198[lc]||name]||_19c(byId(node),_199[lc]||name);};var _19d={},_19e=0,_19f=dojo._scopeName+"attrid",_1a0={col:1,colgroup:1,table:1,tbody:1,tfoot:1,thead:1,tr:1,title:1};dojo.attr=function(node,name,_1a1){node=byId(node);var args=arguments.length,prop;if(args==2&&typeof name!="string"){for(var x in name){d.attr(node,x,name[x]);}return node;}var lc=name.toLowerCase(),_1a2=_198[lc]||name,_1a3=_19a[_1a2],_1a4=_199[lc]||name;if(args==3){do{if(_1a2=="style"&&typeof _1a1!="string"){d.style(node,_1a1);break;}if(_1a2=="innerHTML"){if(d.isIE&&node.tagName.toLowerCase() in _1a0){d.empty(node);node.appendChild(d._toDom(_1a1,node.ownerDocument));}else{node[_1a2]=_1a1;}break;}if(d.isFunction(_1a1)){var _1a5=d.attr(node,_19f);if(!_1a5){_1a5=_19e++;d.attr(node,_19f,_1a5);}if(!_19d[_1a5]){_19d[_1a5]={};}var h=_19d[_1a5][_1a2];if(h){d.disconnect(h);}else{try{delete node[_1a2];}catch(e){}}_19d[_1a5][_1a2]=d.connect(node,_1a2,_1a1);break;}if(_1a3||typeof _1a1=="boolean"){node[_1a2]=_1a1;break;}node.setAttribute(_1a4,_1a1);}while(false);return node;}_1a1=node[_1a2];if(_1a3&&typeof _1a1!="undefined"){return _1a1;}if(_1a2!="href"&&(typeof _1a1=="boolean"||d.isFunction(_1a1))){return _1a1;}return _19c(node,_1a4)?node.getAttribute(_1a4):null;};dojo.removeAttr=function(node,name){byId(node).removeAttribute(_19b(name));};dojo.getNodeProp=function(node,name){node=byId(node);var lc=name.toLowerCase(),_1a6=_198[lc]||name;if((_1a6 in node)&&_1a6!="href"){return node[_1a6];}var _1a7=_199[lc]||name;return _19c(node,_1a7)?node.getAttribute(_1a7):null;};dojo.create=function(tag,_1a8,_1a9,pos){var doc=d.doc;if(_1a9){_1a9=byId(_1a9);doc=_1a9.ownerDocument;}if(typeof tag=="string"){tag=doc.createElement(tag);}if(_1a8){d.attr(tag,_1a8);}if(_1a9){d.place(tag,_1a9,pos);}return tag;};d.empty=d.isIE?function(node){node=byId(node);for(var c;c=node.lastChild;){d.destroy(c);}}:function(node){byId(node).innerHTML="";};var _1aa={option:["select"],tbody:["table"],thead:["table"],tfoot:["table"],tr:["table","tbody"],td:["table","tbody","tr"],th:["table","thead","tr"],legend:["fieldset"],caption:["table"],colgroup:["table"],col:["table","colgroup"],li:["ul"]},_1ab=/<\s*([\w\:]+)/,_1ac={},_1ad=0,_1ae="__"+d._scopeName+"ToDomId";for(var _1af in _1aa){var tw=_1aa[_1af];tw.pre=_1af=="option"?"<select multiple=\"multiple\">":"<"+tw.join("><")+">";tw.post="</"+tw.reverse().join("></")+">";}d._toDom=function(frag,doc){doc=doc||d.doc;var _1b0=doc[_1ae];if(!_1b0){doc[_1ae]=_1b0=++_1ad+"";_1ac[_1b0]=doc.createElement("div");}frag+="";var _1b1=frag.match(_1ab),tag=_1b1?_1b1[1].toLowerCase():"",_1b2=_1ac[_1b0],wrap,i,fc,df;if(_1b1&&_1aa[tag]){wrap=_1aa[tag];_1b2.innerHTML=wrap.pre+frag+wrap.post;for(i=wrap.length;i;--i){_1b2=_1b2.firstChild;}}else{_1b2.innerHTML=frag;}if(_1b2.childNodes.length==1){return _1b2.removeChild(_1b2.firstChild);}df=doc.createDocumentFragment();while(fc=_1b2.firstChild){df.appendChild(fc);}return df;};var _1b3="className";dojo.hasClass=function(node,_1b4){return ((" "+byId(node)[_1b3]+" ").indexOf(" "+_1b4+" ")>=0);};var _1b5=/\s+/,a1=[""],_1b6=function(s){if(typeof s=="string"||s instanceof String){if(s.indexOf(" ")<0){a1[0]=s;return a1;}else{return s.split(_1b5);}}return s||"";};dojo.addClass=function(node,_1b7){node=byId(node);_1b7=_1b6(_1b7);var cls=node[_1b3],_1b8;cls=cls?" "+cls+" ":" ";_1b8=cls.length;for(var i=0,len=_1b7.length,c;i<len;++i){c=_1b7[i];if(c&&cls.indexOf(" "+c+" ")<0){cls+=c+" ";}}if(_1b8<cls.length){node[_1b3]=cls.substr(1,cls.length-2);}};dojo.removeClass=function(node,_1b9){node=byId(node);var cls;if(_1b9!==undefined){_1b9=_1b6(_1b9);cls=" "+node[_1b3]+" ";for(var i=0,len=_1b9.length;i<len;++i){cls=cls.replace(" "+_1b9[i]+" "," ");}cls=d.trim(cls);}else{cls="";}if(node[_1b3]!=cls){node[_1b3]=cls;}};dojo.toggleClass=function(node,_1ba,_1bb){if(_1bb===undefined){_1bb=!d.hasClass(node,_1ba);}d[_1bb?"addClass":"removeClass"](node,_1ba);};})();}if(!dojo._hasResource["dojo._base.NodeList"]){dojo._hasResource["dojo._base.NodeList"]=true;dojo.provide("dojo._base.NodeList");(function(){var d=dojo;var ap=Array.prototype,aps=ap.slice,apc=ap.concat;var tnl=function(a,_1bc,_1bd){if(!a.sort){a=aps.call(a,0);}var ctor=_1bd||this._NodeListCtor||d._NodeListCtor;a.constructor=ctor;dojo._mixin(a,ctor.prototype);a._NodeListCtor=ctor;return _1bc?a._stash(_1bc):a;};var _1be=function(f,a,o){a=[0].concat(aps.call(a,0));o=o||d.global;return function(node){a[0]=node;return f.apply(o,a);};};var _1bf=function(f,o){return function(){this.forEach(_1be(f,arguments,o));return this;};};var _1c0=function(f,o){return function(){return this.map(_1be(f,arguments,o));};};var _1c1=function(f,o){return function(){return this.filter(_1be(f,arguments,o));};};var _1c2=function(f,g,o){return function(){var a=arguments,body=_1be(f,a,o);if(g.call(o||d.global,a)){return this.map(body);}this.forEach(body);return this;};};var _1c3=function(a){return a.length==1&&(typeof a[0]=="string");};var _1c4=function(node){var p=node.parentNode;if(p){p.removeChild(node);}};dojo.NodeList=function(){return tnl(Array.apply(null,arguments));};d._NodeListCtor=d.NodeList;var nl=d.NodeList,nlp=nl.prototype;nl._wrap=nlp._wrap=tnl;nl._adaptAsMap=_1c0;nl._adaptAsForEach=_1bf;nl._adaptAsFilter=_1c1;nl._adaptWithCondition=_1c2;d.forEach(["slice","splice"],function(name){var f=ap[name];nlp[name]=function(){return this._wrap(f.apply(this,arguments),name=="slice"?this:null);};});d.forEach(["indexOf","lastIndexOf","every","some"],function(name){var f=d[name];nlp[name]=function(){return f.apply(d,[this].concat(aps.call(arguments,0)));};});d.forEach(["attr","style"],function(name){nlp[name]=_1c2(d[name],_1c3);});d.forEach(["connect","addClass","removeClass","toggleClass","empty","removeAttr"],function(name){nlp[name]=_1bf(d[name]);});dojo.extend(dojo.NodeList,{_normalize:function(_1c5,_1c6){var _1c7=_1c5.parse===true?true:false;if(typeof _1c5.template=="string"){var _1c8=_1c5.templateFunc||(dojo.string&&dojo.string.substitute);_1c5=_1c8?_1c8(_1c5.template,_1c5):_1c5;}var type=(typeof _1c5);if(type=="string"||type=="number"){_1c5=dojo._toDom(_1c5,(_1c6&&_1c6.ownerDocument));if(_1c5.nodeType==11){_1c5=dojo._toArray(_1c5.childNodes);}else{_1c5=[_1c5];}}else{if(!dojo.isArrayLike(_1c5)){_1c5=[_1c5];}else{if(!dojo.isArray(_1c5)){_1c5=dojo._toArray(_1c5);}}}if(_1c7){_1c5._runParse=true;}return _1c5;},_cloneNode:function(node){return node.cloneNode(true);},_place:function(ary,_1c9,_1ca,_1cb){if(_1c9.nodeType!=1&&_1ca=="only"){return;}var _1cc=_1c9,_1cd;var _1ce=ary.length;for(var i=_1ce-1;i>=0;i--){var node=(_1cb?this._cloneNode(ary[i]):ary[i]);if(ary._runParse&&dojo.parser&&dojo.parser.parse){if(!_1cd){_1cd=_1cc.ownerDocument.createElement("div");}_1cd.appendChild(node);dojo.parser.parse(_1cd);node=_1cd.firstChild;while(_1cd.firstChild){_1cd.removeChild(_1cd.firstChild);}}if(i==_1ce-1){dojo.place(node,_1cc,_1ca);}else{_1cc.parentNode.insertBefore(node,_1cc);}_1cc=node;}},_stash:function(_1cf){this._parent=_1cf;return this;},end:function(){if(this._parent){return this._parent;}else{return new this._NodeListCtor();}},concat:function(item){var t=d.isArray(this)?this:aps.call(this,0),m=d.map(arguments,function(a){return a&&!d.isArray(a)&&(typeof NodeList!="undefined"&&a.constructor===NodeList||a.constructor===this._NodeListCtor)?aps.call(a,0):a;});return this._wrap(apc.apply(t,m),this);},map:function(func,obj){return this._wrap(d.map(this,func,obj),this);},forEach:function(_1d0,_1d1){d.forEach(this,_1d0,_1d1);return this;},coords:_1c0(d.coords),position:_1c0(d.position),place:function(_1d2,_1d3){var item=d.query(_1d2)[0];return this.forEach(function(node){d.place(node,item,_1d3);});},orphan:function(_1d4){return (_1d4?d._filterQueryResult(this,_1d4):this).forEach(_1c4);},adopt:function(_1d5,_1d6){return d.query(_1d5).place(this[0],_1d6)._stash(this);},query:function(_1d7){if(!_1d7){return this;}var ret=this.map(function(node){return d.query(_1d7,node).filter(function(_1d8){return _1d8!==undefined;});});return this._wrap(apc.apply([],ret),this);},filter:function(_1d9){var a=arguments,_1da=this,_1db=0;if(typeof _1d9=="string"){_1da=d._filterQueryResult(this,a[0]);if(a.length==1){return _1da._stash(this);}_1db=1;}return this._wrap(d.filter(_1da,a[_1db],a[_1db+1]),this);},addContent:function(_1dc,_1dd){_1dc=this._normalize(_1dc,this[0]);for(var i=0,node;node=this[i];i++){this._place(_1dc,node,_1dd,i>0);}return this;},instantiate:function(_1de,_1df){var c=d.isFunction(_1de)?_1de:d.getObject(_1de);_1df=_1df||{};return this.forEach(function(node){new c(_1df,node);});},at:function(){var t=new this._NodeListCtor();d.forEach(arguments,function(i){if(i<0){i=this.length+i;}if(this[i]){t.push(this[i]);}},this);return t._stash(this);}});nl.events=["blur","focus","change","click","error","keydown","keypress","keyup","load","mousedown","mouseenter","mouseleave","mousemove","mouseout","mouseover","mouseup","submit"];d.forEach(nl.events,function(evt){var _1e0="on"+evt;nlp[_1e0]=function(a,b){return this.connect(_1e0,a,b);};});})();}if(!dojo._hasResource["dojo._base.query"]){dojo._hasResource["dojo._base.query"]=true;if(typeof dojo!="undefined"){dojo.provide("dojo._base.query");}(function(d){var trim=d.trim;var each=d.forEach;var qlc=d._NodeListCtor=d.NodeList;var _1e1=function(){return d.doc;};var _1e2=((d.isWebKit||d.isMozilla)&&((_1e1().compatMode)=="BackCompat"));var _1e3=!!_1e1().firstChild["children"]?"children":"childNodes";var _1e4=">~+";var _1e5=false;var _1e6=function(){return true;};var _1e7=function(_1e8){if(_1e4.indexOf(_1e8.slice(-1))>=0){_1e8+=" * ";}else{_1e8+=" ";}var ts=function(s,e){return trim(_1e8.slice(s,e));};var _1e9=[];var _1ea=-1,_1eb=-1,_1ec=-1,_1ed=-1,_1ee=-1,inId=-1,_1ef=-1,lc="",cc="",_1f0;var x=0,ql=_1e8.length,_1f1=null,_1f2=null;var _1f3=function(){if(_1ef>=0){var tv=(_1ef==x)?null:ts(_1ef,x);_1f1[(_1e4.indexOf(tv)<0)?"tag":"oper"]=tv;_1ef=-1;}};var _1f4=function(){if(inId>=0){_1f1.id=ts(inId,x).replace(/\\/g,"");inId=-1;}};var _1f5=function(){if(_1ee>=0){_1f1.classes.push(ts(_1ee+1,x).replace(/\\/g,""));_1ee=-1;}};var _1f6=function(){_1f4();_1f3();_1f5();};var _1f7=function(){_1f6();if(_1ed>=0){_1f1.pseudos.push({name:ts(_1ed+1,x)});}_1f1.loops=(_1f1.pseudos.length||_1f1.attrs.length||_1f1.classes.length);_1f1.oquery=_1f1.query=ts(_1f0,x);_1f1.otag=_1f1.tag=(_1f1["oper"])?null:(_1f1.tag||"*");if(_1f1.tag){_1f1.tag=_1f1.tag.toUpperCase();}if(_1e9.length&&(_1e9[_1e9.length-1].oper)){_1f1.infixOper=_1e9.pop();_1f1.query=_1f1.infixOper.query+" "+_1f1.query;}_1e9.push(_1f1);_1f1=null;};for(;lc=cc,cc=_1e8.charAt(x),x<ql;x++){if(lc=="\\"){continue;}if(!_1f1){_1f0=x;_1f1={query:null,pseudos:[],attrs:[],classes:[],tag:null,oper:null,id:null,getTag:function(){return (_1e5)?this.otag:this.tag;}};_1ef=x;}if(_1ea>=0){if(cc=="]"){if(!_1f2.attr){_1f2.attr=ts(_1ea+1,x);}else{_1f2.matchFor=ts((_1ec||_1ea+1),x);}var cmf=_1f2.matchFor;if(cmf){if((cmf.charAt(0)=="\"")||(cmf.charAt(0)=="'")){_1f2.matchFor=cmf.slice(1,-1);}}_1f1.attrs.push(_1f2);_1f2=null;_1ea=_1ec=-1;}else{if(cc=="="){var _1f8=("|~^$*".indexOf(lc)>=0)?lc:"";_1f2.type=_1f8+cc;_1f2.attr=ts(_1ea+1,x-_1f8.length);_1ec=x+1;}}}else{if(_1eb>=0){if(cc==")"){if(_1ed>=0){_1f2.value=ts(_1eb+1,x);}_1ed=_1eb=-1;}}else{if(cc=="#"){_1f6();inId=x+1;}else{if(cc=="."){_1f6();_1ee=x;}else{if(cc==":"){_1f6();_1ed=x;}else{if(cc=="["){_1f6();_1ea=x;_1f2={};}else{if(cc=="("){if(_1ed>=0){_1f2={name:ts(_1ed+1,x),value:null};_1f1.pseudos.push(_1f2);}_1eb=x;}else{if((cc==" ")&&(lc!=cc)){_1f7();}}}}}}}}}return _1e9;};var _1f9=function(_1fa,_1fb){if(!_1fa){return _1fb;}if(!_1fb){return _1fa;}return function(){return _1fa.apply(window,arguments)&&_1fb.apply(window,arguments);};};var _1fc=function(i,arr){var r=arr||[];if(i){r.push(i);}return r;};var _1fd=function(n){return (1==n.nodeType);};var _1fe="";var _1ff=function(elem,attr){if(!elem){return _1fe;}if(attr=="class"){return elem.className||_1fe;}if(attr=="for"){return elem.htmlFor||_1fe;}if(attr=="style"){return elem.style.cssText||_1fe;}return (_1e5?elem.getAttribute(attr):elem.getAttribute(attr,2))||_1fe;};var _200={"*=":function(attr,_201){return function(elem){return (_1ff(elem,attr).indexOf(_201)>=0);};},"^=":function(attr,_202){return function(elem){return (_1ff(elem,attr).indexOf(_202)==0);};},"$=":function(attr,_203){var tval=" "+_203;return function(elem){var ea=" "+_1ff(elem,attr);return (ea.lastIndexOf(_203)==(ea.length-_203.length));};},"~=":function(attr,_204){var tval=" "+_204+" ";return function(elem){var ea=" "+_1ff(elem,attr)+" ";return (ea.indexOf(tval)>=0);};},"|=":function(attr,_205){var _206=" "+_205+"-";return function(elem){var ea=" "+_1ff(elem,attr);return ((ea==_205)||(ea.indexOf(_206)==0));};},"=":function(attr,_207){return function(elem){return (_1ff(elem,attr)==_207);};}};var _208=(typeof _1e1().firstChild.nextElementSibling=="undefined");var _209=!_208?"nextElementSibling":"nextSibling";var _20a=!_208?"previousElementSibling":"previousSibling";var _20b=(_208?_1fd:_1e6);var _20c=function(node){while(node=node[_20a]){if(_20b(node)){return false;}}return true;};var _20d=function(node){while(node=node[_209]){if(_20b(node)){return false;}}return true;};var _20e=function(node){var root=node.parentNode;var i=0,tret=root[_1e3],ci=(node["_i"]||-1),cl=(root["_l"]||-1);if(!tret){return -1;}var l=tret.length;if(cl==l&&ci>=0&&cl>=0){return ci;}root["_l"]=l;ci=-1;for(var te=root["firstElementChild"]||root["firstChild"];te;te=te[_209]){if(_20b(te)){te["_i"]=++i;if(node===te){ci=i;}}}return ci;};var _20f=function(elem){return !((_20e(elem))%2);};var _210=function(elem){return ((_20e(elem))%2);};var _211={"checked":function(name,_212){return function(elem){return !!("checked" in elem?elem.checked:elem.selected);};},"first-child":function(){return _20c;},"last-child":function(){return _20d;},"only-child":function(name,_213){return function(node){if(!_20c(node)){return false;}if(!_20d(node)){return false;}return true;};},"empty":function(name,_214){return function(elem){var cn=elem.childNodes;var cnl=elem.childNodes.length;for(var x=cnl-1;x>=0;x--){var nt=cn[x].nodeType;if((nt===1)||(nt==3)){return false;}}return true;};},"contains":function(name,_215){var cz=_215.charAt(0);if(cz=="\""||cz=="'"){_215=_215.slice(1,-1);}return function(elem){return (elem.innerHTML.indexOf(_215)>=0);};},"not":function(name,_216){var p=_1e7(_216)[0];var _217={el:1};if(p.tag!="*"){_217.tag=1;}if(!p.classes.length){_217.classes=1;}var ntf=_218(p,_217);return function(elem){return (!ntf(elem));};},"nth-child":function(name,_219){var pi=parseInt;if(_219=="odd"){return _210;}else{if(_219=="even"){return _20f;}}if(_219.indexOf("n")!=-1){var _21a=_219.split("n",2);var pred=_21a[0]?((_21a[0]=="-")?-1:pi(_21a[0])):1;var idx=_21a[1]?pi(_21a[1]):0;var lb=0,ub=-1;if(pred>0){if(idx<0){idx=(idx%pred)&&(pred+(idx%pred));}else{if(idx>0){if(idx>=pred){lb=idx-idx%pred;}idx=idx%pred;}}}else{if(pred<0){pred*=-1;if(idx>0){ub=idx;idx=idx%pred;}}}if(pred>0){return function(elem){var i=_20e(elem);return (i>=lb)&&(ub<0||i<=ub)&&((i%pred)==idx);};}else{_219=idx;}}var _21b=pi(_219);return function(elem){return (_20e(elem)==_21b);};}};var _21c=(d.isIE)?function(cond){var clc=cond.toLowerCase();if(clc=="class"){cond="className";}return function(elem){return (_1e5?elem.getAttribute(cond):elem[cond]||elem[clc]);};}:function(cond){return function(elem){return (elem&&elem.getAttribute&&elem.hasAttribute(cond));};};var _218=function(_21d,_21e){if(!_21d){return _1e6;}_21e=_21e||{};var ff=null;if(!("el" in _21e)){ff=_1f9(ff,_1fd);}if(!("tag" in _21e)){if(_21d.tag!="*"){ff=_1f9(ff,function(elem){return (elem&&(elem.tagName==_21d.getTag()));});}}if(!("classes" in _21e)){each(_21d.classes,function(_21f,idx,arr){var re=new RegExp("(?:^|\\s)"+_21f+"(?:\\s|$)");ff=_1f9(ff,function(elem){return re.test(elem.className);});ff.count=idx;});}if(!("pseudos" in _21e)){each(_21d.pseudos,function(_220){var pn=_220.name;if(_211[pn]){ff=_1f9(ff,_211[pn](pn,_220.value));}});}if(!("attrs" in _21e)){each(_21d.attrs,function(attr){var _221;var a=attr.attr;if(attr.type&&_200[attr.type]){_221=_200[attr.type](a,attr.matchFor);}else{if(a.length){_221=_21c(a);}}if(_221){ff=_1f9(ff,_221);}});}if(!("id" in _21e)){if(_21d.id){ff=_1f9(ff,function(elem){return (!!elem&&(elem.id==_21d.id));});}}if(!ff){if(!("default" in _21e)){ff=_1e6;}}return ff;};var _222=function(_223){return function(node,ret,bag){while(node=node[_209]){if(_208&&(!_1fd(node))){continue;}if((!bag||_224(node,bag))&&_223(node)){ret.push(node);}break;}return ret;};};var _225=function(_226){return function(root,ret,bag){var te=root[_209];while(te){if(_20b(te)){if(bag&&!_224(te,bag)){break;}if(_226(te)){ret.push(te);}}te=te[_209];}return ret;};};var _227=function(_228){_228=_228||_1e6;return function(root,ret,bag){var te,x=0,tret=root[_1e3];while(te=tret[x++]){if(_20b(te)&&(!bag||_224(te,bag))&&(_228(te,x))){ret.push(te);}}return ret;};};var _229=function(node,root){var pn=node.parentNode;while(pn){if(pn==root){break;}pn=pn.parentNode;}return !!pn;};var _22a={};var _22b=function(_22c){var _22d=_22a[_22c.query];if(_22d){return _22d;}var io=_22c.infixOper;var oper=(io?io.oper:"");var _22e=_218(_22c,{el:1});var qt=_22c.tag;var _22f=("*"==qt);var ecs=_1e1()["getElementsByClassName"];if(!oper){if(_22c.id){_22e=(!_22c.loops&&_22f)?_1e6:_218(_22c,{el:1,id:1});_22d=function(root,arr){var te=d.byId(_22c.id,(root.ownerDocument||root));if(!te||!_22e(te)){return;}if(9==root.nodeType){return _1fc(te,arr);}else{if(_229(te,root)){return _1fc(te,arr);}}};}else{if(ecs&&/\{\s*\[native code\]\s*\}/.test(String(ecs))&&_22c.classes.length&&!_1e2){_22e=_218(_22c,{el:1,classes:1,id:1});var _230=_22c.classes.join(" ");_22d=function(root,arr,bag){var ret=_1fc(0,arr),te,x=0;var tret=root.getElementsByClassName(_230);while((te=tret[x++])){if(_22e(te,root)&&_224(te,bag)){ret.push(te);}}return ret;};}else{if(!_22f&&!_22c.loops){_22d=function(root,arr,bag){var ret=_1fc(0,arr),te,x=0;var tret=root.getElementsByTagName(_22c.getTag());while((te=tret[x++])){if(_224(te,bag)){ret.push(te);}}return ret;};}else{_22e=_218(_22c,{el:1,tag:1,id:1});_22d=function(root,arr,bag){var ret=_1fc(0,arr),te,x=0;var tret=root.getElementsByTagName(_22c.getTag());while((te=tret[x++])){if(_22e(te,root)&&_224(te,bag)){ret.push(te);}}return ret;};}}}}else{var _231={el:1};if(_22f){_231.tag=1;}_22e=_218(_22c,_231);if("+"==oper){_22d=_222(_22e);}else{if("~"==oper){_22d=_225(_22e);}else{if(">"==oper){_22d=_227(_22e);}}}}return _22a[_22c.query]=_22d;};var _232=function(root,_233){var _234=_1fc(root),qp,x,te,qpl=_233.length,bag,ret;for(var i=0;i<qpl;i++){ret=[];qp=_233[i];x=_234.length-1;if(x>0){bag={};ret.nozip=true;}var gef=_22b(qp);for(var j=0;(te=_234[j]);j++){gef(te,ret,bag);}if(!ret.length){break;}_234=ret;}return ret;};var _235={},_236={};var _237=function(_238){var _239=_1e7(trim(_238));if(_239.length==1){var tef=_22b(_239[0]);return function(root){var r=tef(root,new qlc());if(r){r.nozip=true;}return r;};}return function(root){return _232(root,_239);};};var nua=navigator.userAgent;var wk="WebKit/";var _23a=(d.isWebKit&&(nua.indexOf(wk)>0)&&(parseFloat(nua.split(wk)[1])>528));var _23b=d.isIE?"commentStrip":"nozip";var qsa="querySelectorAll";var _23c=(!!_1e1()[qsa]&&(!d.isSafari||(d.isSafari>3.1)||_23a));var _23d=/n\+\d|([^ ])?([>~+])([^ =])?/g;var _23e=function(_23f,pre,ch,post){return ch?(pre?pre+" ":"")+ch+(post?" "+post:""):_23f;};var _240=function(_241,_242){_241=_241.replace(_23d,_23e);if(_23c){var _243=_236[_241];if(_243&&!_242){return _243;}}var _244=_235[_241];if(_244){return _244;}var qcz=_241.charAt(0);var _245=(-1==_241.indexOf(" "));if((_241.indexOf("#")>=0)&&(_245)){_242=true;}var _246=(_23c&&(!_242)&&(_1e4.indexOf(qcz)==-1)&&(!d.isIE||(_241.indexOf(":")==-1))&&(!(_1e2&&(_241.indexOf(".")>=0)))&&(_241.indexOf(":contains")==-1)&&(_241.indexOf(":checked")==-1)&&(_241.indexOf("|=")==-1));if(_246){var tq=(_1e4.indexOf(_241.charAt(_241.length-1))>=0)?(_241+" *"):_241;return _236[_241]=function(root){try{if(!((9==root.nodeType)||_245)){throw "";}var r=root[qsa](tq);r[_23b]=true;return r;}catch(e){return _240(_241,true)(root);}};}else{var _247=_241.split(/\s*,\s*/);return _235[_241]=((_247.length<2)?_237(_241):function(root){var _248=0,ret=[],tp;while((tp=_247[_248++])){ret=ret.concat(_237(tp)(root));}return ret;});}};var _249=0;var _24a=d.isIE?function(node){if(_1e5){return (node.getAttribute("_uid")||node.setAttribute("_uid",++_249)||_249);}else{return node.uniqueID;}}:function(node){return (node._uid||(node._uid=++_249));};var _224=function(node,bag){if(!bag){return 1;}var id=_24a(node);if(!bag[id]){return bag[id]=1;}return 0;};var _24b="_zipIdx";var _24c=function(arr){if(arr&&arr.nozip){return (qlc._wrap)?qlc._wrap(arr):arr;}var ret=new qlc();if(!arr||!arr.length){return ret;}if(arr[0]){ret.push(arr[0]);}if(arr.length<2){return ret;}_249++;if(d.isIE&&_1e5){var _24d=_249+"";arr[0].setAttribute(_24b,_24d);for(var x=1,te;te=arr[x];x++){if(arr[x].getAttribute(_24b)!=_24d){ret.push(te);}te.setAttribute(_24b,_24d);}}else{if(d.isIE&&arr.commentStrip){try{for(var x=1,te;te=arr[x];x++){if(_1fd(te)){ret.push(te);}}}catch(e){}}else{if(arr[0]){arr[0][_24b]=_249;}for(var x=1,te;te=arr[x];x++){if(arr[x][_24b]!=_249){ret.push(te);}te[_24b]=_249;}}}return ret;};d.query=function(_24e,root){qlc=d._NodeListCtor;if(!_24e){return new qlc();}if(_24e.constructor==qlc){return _24e;}if(typeof _24e!="string"){return new qlc(_24e);}if(typeof root=="string"){root=d.byId(root);if(!root){return new qlc();}}root=root||_1e1();var od=root.ownerDocument||root.documentElement;_1e5=(root.contentType&&root.contentType=="application/xml")||(d.isOpera&&(root.doctype||od.toString()=="[object XMLDocument]"))||(!!od)&&(d.isIE?od.xml:(root.xmlVersion||od.xmlVersion));var r=_240(_24e)(root);if(r&&r.nozip&&!qlc._wrap){return r;}return _24c(r);};d.query.pseudos=_211;d._filterQueryResult=function(_24f,_250){var _251=new d._NodeListCtor();var _252=_218(_1e7(_250)[0]);for(var x=0,te;te=_24f[x];x++){if(_252(te)){_251.push(te);}}return _251;};})(this["queryPortability"]||this["acme"]||dojo);}if(!dojo._hasResource["dojo._base.xhr"]){dojo._hasResource["dojo._base.xhr"]=true;dojo.provide("dojo._base.xhr");(function(){var _253=dojo,cfg=_253.config;function _254(obj,name,_255){if(_255===null){return;}var val=obj[name];if(typeof val=="string"){obj[name]=[val,_255];}else{if(_253.isArray(val)){val.push(_255);}else{obj[name]=_255;}}};dojo.fieldToObject=function(_256){var ret=null;var item=_253.byId(_256);if(item){var _257=item.name;var type=(item.type||"").toLowerCase();if(_257&&type&&!item.disabled){if(type=="radio"||type=="checkbox"){if(item.checked){ret=item.value;}}else{if(item.multiple){ret=[];_253.query("option",item).forEach(function(opt){if(opt.selected){ret.push(opt.value);}});}else{ret=item.value;}}}}return ret;};dojo.formToObject=function(_258){var ret={};var _259="file|submit|image|reset|button|";_253.forEach(dojo.byId(_258).elements,function(item){var _25a=item.name;var type=(item.type||"").toLowerCase();if(_25a&&type&&_259.indexOf(type)==-1&&!item.disabled){_254(ret,_25a,_253.fieldToObject(item));if(type=="image"){ret[_25a+".x"]=ret[_25a+".y"]=ret[_25a].x=ret[_25a].y=0;}}});return ret;};dojo.objectToQuery=function(map){var enc=encodeURIComponent;var _25b=[];var _25c={};for(var name in map){var _25d=map[name];if(_25d!=_25c[name]){var _25e=enc(name)+"=";if(_253.isArray(_25d)){for(var i=0;i<_25d.length;i++){_25b.push(_25e+enc(_25d[i]));}}else{_25b.push(_25e+enc(_25d));}}}return _25b.join("&");};dojo.formToQuery=function(_25f){return _253.objectToQuery(_253.formToObject(_25f));};dojo.formToJson=function(_260,_261){return _253.toJson(_253.formToObject(_260),_261);};dojo.queryToObject=function(str){var ret={};var qp=str.split("&");var dec=decodeURIComponent;_253.forEach(qp,function(item){if(item.length){var _262=item.split("=");var name=dec(_262.shift());var val=dec(_262.join("="));if(typeof ret[name]=="string"){ret[name]=[ret[name]];}if(_253.isArray(ret[name])){ret[name].push(val);}else{ret[name]=val;}}});return ret;};dojo._blockAsync=false;var _263=_253._contentHandlers=dojo.contentHandlers={text:function(xhr){return xhr.responseText;},json:function(xhr){return _253.fromJson(xhr.responseText||null);},"json-comment-filtered":function(xhr){if(!dojo.config.useCommentedJson){console.warn("Consider using the standard mimetype:application/json."+" json-commenting can introduce security issues. To"+" decrease the chances of hijacking, use the standard the 'json' handler and"+" prefix your json with: {}&&\n"+"Use djConfig.useCommentedJson=true to turn off this message.");}var _264=xhr.responseText;var _265=_264.indexOf("/*");var _266=_264.lastIndexOf("*/");if(_265==-1||_266==-1){throw new Error("JSON was not comment filtered");}return _253.fromJson(_264.substring(_265+2,_266));},javascript:function(xhr){return _253.eval(xhr.responseText);},xml:function(xhr){var _267=xhr.responseXML;if(_253.isIE&&(!_267||!_267.documentElement)){var ms=function(n){return "MSXML"+n+".DOMDocument";};var dp=["Microsoft.XMLDOM",ms(6),ms(4),ms(3),ms(2)];_253.some(dp,function(p){try{var dom=new ActiveXObject(p);dom.async=false;dom.loadXML(xhr.responseText);_267=dom;}catch(e){return false;}return true;});}return _267;},"json-comment-optional":function(xhr){if(xhr.responseText&&/^[^{\[]*\/\*/.test(xhr.responseText)){return _263["json-comment-filtered"](xhr);}else{return _263["json"](xhr);}}};dojo._ioSetArgs=function(args,_268,_269,_26a){var _26b={args:args,url:args.url};var _26c=null;if(args.form){var form=_253.byId(args.form);var _26d=form.getAttributeNode("action");_26b.url=_26b.url||(_26d?_26d.value:null);_26c=_253.formToObject(form);}var _26e=[{}];if(_26c){_26e.push(_26c);}if(args.content){_26e.push(args.content);}if(args.preventCache){_26e.push({"dojo.preventCache":new Date().valueOf()});}_26b.query=_253.objectToQuery(_253.mixin.apply(null,_26e));_26b.handleAs=args.handleAs||"text";var d=new _253.Deferred(_268);d.addCallbacks(_269,function(_26f){return _26a(_26f,d);});var ld=args.load;if(ld&&_253.isFunction(ld)){d.addCallback(function(_270){return ld.call(args,_270,_26b);});}var err=args.error;if(err&&_253.isFunction(err)){d.addErrback(function(_271){return err.call(args,_271,_26b);});}var _272=args.handle;if(_272&&_253.isFunction(_272)){d.addBoth(function(_273){return _272.call(args,_273,_26b);});}if(cfg.ioPublish&&_253.publish&&_26b.args.ioPublish!==false){d.addCallbacks(function(res){_253.publish("/dojo/io/load",[d,res]);return res;},function(res){_253.publish("/dojo/io/error",[d,res]);return res;});d.addBoth(function(res){_253.publish("/dojo/io/done",[d,res]);return res;});}d.ioArgs=_26b;return d;};var _274=function(dfd){dfd.canceled=true;var xhr=dfd.ioArgs.xhr;var _275=typeof xhr.abort;if(_275=="function"||_275=="object"||_275=="unknown"){xhr.abort();}var err=dfd.ioArgs.error;if(!err){err=new Error("xhr cancelled");err.dojoType="cancel";}return err;};var _276=function(dfd){var ret=_263[dfd.ioArgs.handleAs](dfd.ioArgs.xhr);return ret===undefined?null:ret;};var _277=function(_278,dfd){if(!dfd.ioArgs.args.failOk){console.error(_278);}return _278;};var _279=null;var _27a=[];var _27b=0;var _27c=function(dfd){if(_27b<=0){_27b=0;if(cfg.ioPublish&&_253.publish&&(!dfd||dfd&&dfd.ioArgs.args.ioPublish!==false)){_253.publish("/dojo/io/stop");}}};var _27d=function(){var now=(new Date()).getTime();if(!_253._blockAsync){for(var i=0,tif;i<_27a.length&&(tif=_27a[i]);i++){var dfd=tif.dfd;var func=function(){if(!dfd||dfd.canceled||!tif.validCheck(dfd)){_27a.splice(i--,1);_27b-=1;}else{if(tif.ioCheck(dfd)){_27a.splice(i--,1);tif.resHandle(dfd);_27b-=1;}else{if(dfd.startTime){if(dfd.startTime+(dfd.ioArgs.args.timeout||0)<now){_27a.splice(i--,1);var err=new Error("timeout exceeded");err.dojoType="timeout";dfd.errback(err);dfd.cancel();_27b-=1;}}}}};if(dojo.config.debugAtAllCosts){func.call(this);}else{try{func.call(this);}catch(e){dfd.errback(e);}}}}_27c(dfd);if(!_27a.length){clearInterval(_279);_279=null;return;}};dojo._ioCancelAll=function(){try{_253.forEach(_27a,function(i){try{i.dfd.cancel();}catch(e){}});}catch(e){}};if(_253.isIE){_253.addOnWindowUnload(_253._ioCancelAll);}_253._ioNotifyStart=function(dfd){if(cfg.ioPublish&&_253.publish&&dfd.ioArgs.args.ioPublish!==false){if(!_27b){_253.publish("/dojo/io/start");}_27b+=1;_253.publish("/dojo/io/send",[dfd]);}};_253._ioWatch=function(dfd,_27e,_27f,_280){var args=dfd.ioArgs.args;if(args.timeout){dfd.startTime=(new Date()).getTime();}_27a.push({dfd:dfd,validCheck:_27e,ioCheck:_27f,resHandle:_280});if(!_279){_279=setInterval(_27d,50);}if(args.sync){_27d();}};var _281="application/x-www-form-urlencoded";var _282=function(dfd){return dfd.ioArgs.xhr.readyState;};var _283=function(dfd){return 4==dfd.ioArgs.xhr.readyState;};var _284=function(dfd){var xhr=dfd.ioArgs.xhr;if(_253._isDocumentOk(xhr)){dfd.callback(dfd);}else{var err=new Error("Unable to load "+dfd.ioArgs.url+" status:"+xhr.status);err.status=xhr.status;err.responseText=xhr.responseText;dfd.errback(err);}};dojo._ioAddQueryToUrl=function(_285){if(_285.query.length){_285.url+=(_285.url.indexOf("?")==-1?"?":"&")+_285.query;_285.query=null;}};dojo.xhr=function(_286,args,_287){var dfd=_253._ioSetArgs(args,_274,_276,_277);var _288=dfd.ioArgs;var xhr=_288.xhr=_253._xhrObj(_288.args);if(!xhr){dfd.cancel();return dfd;}if("postData" in args){_288.query=args.postData;}else{if("putData" in args){_288.query=args.putData;}else{if("rawBody" in args){_288.query=args.rawBody;}else{if((arguments.length>2&&!_287)||"POST|PUT".indexOf(_286.toUpperCase())==-1){_253._ioAddQueryToUrl(_288);}}}}xhr.open(_286,_288.url,args.sync!==true,args.user||undefined,args.password||undefined);if(args.headers){for(var hdr in args.headers){if(hdr.toLowerCase()==="content-type"&&!args.contentType){args.contentType=args.headers[hdr];}else{if(args.headers[hdr]){xhr.setRequestHeader(hdr,args.headers[hdr]);}}}}xhr.setRequestHeader("Content-Type",args.contentType||_281);if(!args.headers||!("X-Requested-With" in args.headers)){xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");}_253._ioNotifyStart(dfd);if(dojo.config.debugAtAllCosts){xhr.send(_288.query);}else{try{xhr.send(_288.query);}catch(e){_288.error=e;dfd.cancel();}}_253._ioWatch(dfd,_282,_283,_284);xhr=null;return dfd;};dojo.xhrGet=function(args){return _253.xhr("GET",args);};dojo.rawXhrPost=dojo.xhrPost=function(args){return _253.xhr("POST",args,true);};dojo.rawXhrPut=dojo.xhrPut=function(args){return _253.xhr("PUT",args,true);};dojo.xhrDelete=function(args){return _253.xhr("DELETE",args);};})();}if(!dojo._hasResource["dojo._base.fx"]){dojo._hasResource["dojo._base.fx"]=true;dojo.provide("dojo._base.fx");(function(){var d=dojo;var _289=d._mixin;dojo._Line=function(_28a,end){this.start=_28a;this.end=end;};dojo._Line.prototype.getValue=function(n){return ((this.end-this.start)*n)+this.start;};dojo.Animation=function(args){_289(this,args);if(d.isArray(this.curve)){this.curve=new d._Line(this.curve[0],this.curve[1]);}};d._Animation=d.Animation;d.extend(dojo.Animation,{duration:350,repeat:0,rate:20,_percent:0,_startRepeatCount:0,_getStep:function(){var _28b=this._percent,_28c=this.easing;return _28c?_28c(_28b):_28b;},_fire:function(evt,args){var a=args||[];if(this[evt]){if(d.config.debugAtAllCosts){this[evt].apply(this,a);}else{try{this[evt].apply(this,a);}catch(e){console.error("exception in animation handler for:",evt);console.error(e);}}}return this;},play:function(_28d,_28e){var _28f=this;if(_28f._delayTimer){_28f._clearTimer();}if(_28e){_28f._stopTimer();_28f._active=_28f._paused=false;_28f._percent=0;}else{if(_28f._active&&!_28f._paused){return _28f;}}_28f._fire("beforeBegin",[_28f.node]);var de=_28d||_28f.delay,_290=dojo.hitch(_28f,"_play",_28e);if(de>0){_28f._delayTimer=setTimeout(_290,de);return _28f;}_290();return _28f;},_play:function(_291){var _292=this;if(_292._delayTimer){_292._clearTimer();}_292._startTime=new Date().valueOf();if(_292._paused){_292._startTime-=_292.duration*_292._percent;}_292._active=true;_292._paused=false;var _293=_292.curve.getValue(_292._getStep());if(!_292._percent){if(!_292._startRepeatCount){_292._startRepeatCount=_292.repeat;}_292._fire("onBegin",[_293]);}_292._fire("onPlay",[_293]);_292._cycle();return _292;},pause:function(){var _294=this;if(_294._delayTimer){_294._clearTimer();}_294._stopTimer();if(!_294._active){return _294;}_294._paused=true;_294._fire("onPause",[_294.curve.getValue(_294._getStep())]);return _294;},gotoPercent:function(_295,_296){var _297=this;_297._stopTimer();_297._active=_297._paused=true;_297._percent=_295;if(_296){_297.play();}return _297;},stop:function(_298){var _299=this;if(_299._delayTimer){_299._clearTimer();}if(!_299._timer){return _299;}_299._stopTimer();if(_298){_299._percent=1;}_299._fire("onStop",[_299.curve.getValue(_299._getStep())]);_299._active=_299._paused=false;return _299;},status:function(){if(this._active){return this._paused?"paused":"playing";}return "stopped";},_cycle:function(){var _29a=this;if(_29a._active){var curr=new Date().valueOf();var step=(curr-_29a._startTime)/(_29a.duration);if(step>=1){step=1;}_29a._percent=step;if(_29a.easing){step=_29a.easing(step);}_29a._fire("onAnimate",[_29a.curve.getValue(step)]);if(_29a._percent<1){_29a._startTimer();}else{_29a._active=false;if(_29a.repeat>0){_29a.repeat--;_29a.play(null,true);}else{if(_29a.repeat==-1){_29a.play(null,true);}else{if(_29a._startRepeatCount){_29a.repeat=_29a._startRepeatCount;_29a._startRepeatCount=0;}}}_29a._percent=0;_29a._fire("onEnd",[_29a.node]);!_29a.repeat&&_29a._stopTimer();}}return _29a;},_clearTimer:function(){clearTimeout(this._delayTimer);delete this._delayTimer;}});var ctr=0,_29b=null,_29c={run:function(){}};d.extend(d.Animation,{_startTimer:function(){if(!this._timer){this._timer=d.connect(_29c,"run",this,"_cycle");ctr++;}if(!_29b){_29b=setInterval(d.hitch(_29c,"run"),this.rate);}},_stopTimer:function(){if(this._timer){d.disconnect(this._timer);this._timer=null;ctr--;}if(ctr<=0){clearInterval(_29b);_29b=null;ctr=0;}}});var _29d=d.isIE?function(node){var ns=node.style;if(!ns.width.length&&d.style(node,"width")=="auto"){ns.width="auto";}}:function(){};dojo._fade=function(args){args.node=d.byId(args.node);var _29e=_289({properties:{}},args),_29f=(_29e.properties.opacity={});_29f.start=!("start" in _29e)?function(){return +d.style(_29e.node,"opacity")||0;}:_29e.start;_29f.end=_29e.end;var anim=d.animateProperty(_29e);d.connect(anim,"beforeBegin",d.partial(_29d,_29e.node));return anim;};dojo.fadeIn=function(args){return d._fade(_289({end:1},args));};dojo.fadeOut=function(args){return d._fade(_289({end:0},args));};dojo._defaultEasing=function(n){return 0.5+((Math.sin((n+1.5)*Math.PI))/2);};var _2a0=function(_2a1){this._properties=_2a1;for(var p in _2a1){var prop=_2a1[p];if(prop.start instanceof d.Color){prop.tempColor=new d.Color();}}};_2a0.prototype.getValue=function(r){var ret={};for(var p in this._properties){var prop=this._properties[p],_2a2=prop.start;if(_2a2 instanceof d.Color){ret[p]=d.blendColors(_2a2,prop.end,r,prop.tempColor).toCss();}else{if(!d.isArray(_2a2)){ret[p]=((prop.end-_2a2)*r)+_2a2+(p!="opacity"?prop.units||"px":0);}}}return ret;};dojo.animateProperty=function(args){var n=args.node=d.byId(args.node);if(!args.easing){args.easing=d._defaultEasing;}var anim=new d.Animation(args);d.connect(anim,"beforeBegin",anim,function(){var pm={};for(var p in this.properties){if(p=="width"||p=="height"){this.node.display="block";}var prop=this.properties[p];if(d.isFunction(prop)){prop=prop(n);}prop=pm[p]=_289({},(d.isObject(prop)?prop:{end:prop}));if(d.isFunction(prop.start)){prop.start=prop.start(n);}if(d.isFunction(prop.end)){prop.end=prop.end(n);}var _2a3=(p.toLowerCase().indexOf("color")>=0);function _2a4(node,p){var v={height:node.offsetHeight,width:node.offsetWidth}[p];if(v!==undefined){return v;}v=d.style(node,p);return (p=="opacity")?+v:(_2a3?v:parseFloat(v));};if(!("end" in prop)){prop.end=_2a4(n,p);}else{if(!("start" in prop)){prop.start=_2a4(n,p);}}if(_2a3){prop.start=new d.Color(prop.start);prop.end=new d.Color(prop.end);}else{prop.start=(p=="opacity")?+prop.start:parseFloat(prop.start);}}this.curve=new _2a0(pm);});d.connect(anim,"onAnimate",d.hitch(d,"style",anim.node));return anim;};dojo.anim=function(node,_2a5,_2a6,_2a7,_2a8,_2a9){return d.animateProperty({node:node,duration:_2a6||d.Animation.prototype.duration,properties:_2a5,easing:_2a7,onEnd:_2a8}).play(_2a9||0);};})();}if(!dojo._hasResource["dojo._base.browser"]){dojo._hasResource["dojo._base.browser"]=true;dojo.provide("dojo._base.browser");dojo.forEach(dojo.config.require,function(i){dojo["require"](i);});}if(dojo.isBrowser&&(document.readyState==="complete"||dojo.config.afterOnLoad)){window.setTimeout(dojo._loadInit,100);}})();

/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo.i18n"]){
dojo._hasResource["dojo.i18n"]=true;
dojo.provide("dojo.i18n");
dojo.i18n.getLocalization=function(_1,_2,_3){
_3=dojo.i18n.normalizeLocale(_3);
var _4=_3.split("-");
var _5=[_1,"nls",_2].join(".");
var _6=dojo._loadedModules[_5];
if(_6){
var _7;
for(var i=_4.length;i>0;i--){
var _8=_4.slice(0,i).join("_");
if(_6[_8]){
_7=_6[_8];
break;
}
}
if(!_7){
_7=_6.ROOT;
}
if(_7){
var _9=function(){
};
_9.prototype=_7;
return new _9();
}
}
throw new Error("Bundle not found: "+_2+" in "+_1+" , locale="+_3);
};
dojo.i18n.normalizeLocale=function(_a){
var _b=_a?_a.toLowerCase():dojo.locale;
if(_b=="root"){
_b="ROOT";
}
return _b;
};
dojo.i18n._requireLocalization=function(_c,_d,_e,_f){
var _10=dojo.i18n.normalizeLocale(_e);
var _11=[_c,"nls",_d].join(".");
var _12="";
if(_f){
var _13=_f.split(",");
for(var i=0;i<_13.length;i++){
if(_10["indexOf"](_13[i])==0){
if(_13[i].length>_12.length){
_12=_13[i];
}
}
}
if(!_12){
_12="ROOT";
}
}
var _14=_f?_12:_10;
var _15=dojo._loadedModules[_11];
var _16=null;
if(_15){
if(dojo.config.localizationComplete&&_15._built){
return;
}
var _17=_14.replace(/-/g,"_");
var _18=_11+"."+_17;
_16=dojo._loadedModules[_18];
}
if(!_16){
_15=dojo["provide"](_11);
var _19=dojo._getModuleSymbols(_c);
var _1a=_19.concat("nls").join("/");
var _1b;
dojo.i18n._searchLocalePath(_14,_f,function(loc){
var _1c=loc.replace(/-/g,"_");
var _1d=_11+"."+_1c;
var _1e=false;
if(!dojo._loadedModules[_1d]){
dojo["provide"](_1d);
var _1f=[_1a];
if(loc!="ROOT"){
_1f.push(loc);
}
_1f.push(_d);
var _20=_1f.join("/")+".js";
_1e=dojo._loadPath(_20,null,function(_21){
var _22=function(){
};
_22.prototype=_1b;
_15[_1c]=new _22();
for(var j in _21){
_15[_1c][j]=_21[j];
}
});
}else{
_1e=true;
}
if(_1e&&_15[_1c]){
_1b=_15[_1c];
}else{
_15[_1c]=_1b;
}
if(_f){
return true;
}
});
}
if(_f&&_10!=_12){
_15[_10.replace(/-/g,"_")]=_15[_12.replace(/-/g,"_")];
}
};
(function(){
var _23=dojo.config.extraLocale;
if(_23){
if(!_23 instanceof Array){
_23=[_23];
}
var req=dojo.i18n._requireLocalization;
dojo.i18n._requireLocalization=function(m,b,_24,_25){
req(m,b,_24,_25);
if(_24){
return;
}
for(var i=0;i<_23.length;i++){
req(m,b,_23[i],_25);
}
};
}
})();
dojo.i18n._searchLocalePath=function(_26,_27,_28){
_26=dojo.i18n.normalizeLocale(_26);
var _29=_26.split("-");
var _2a=[];
for(var i=_29.length;i>0;i--){
_2a.push(_29.slice(0,i).join("-"));
}
_2a.push(false);
if(_27){
_2a.reverse();
}
for(var j=_2a.length-1;j>=0;j--){
var loc=_2a[j]||"ROOT";
var _2b=_28(loc);
if(_2b){
break;
}
}
};
dojo.i18n._preloadLocalizations=function(_2c,_2d){
function _2e(_2f){
_2f=dojo.i18n.normalizeLocale(_2f);
dojo.i18n._searchLocalePath(_2f,true,function(loc){
for(var i=0;i<_2d.length;i++){
if(_2d[i]==loc){
dojo["require"](_2c+"_"+loc);
return true;
}
}
return false;
});
};
_2e();
var _30=dojo.config.extraLocale||[];
for(var i=0;i<_30.length;i++){
_2e(_30[i]);
}
};
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo._firebug.firebug"]){
dojo._hasResource["dojo._firebug.firebug"]=true;
dojo.provide("dojo._firebug.firebug");
dojo.deprecated=function(_1,_2,_3){
var _4="DEPRECATED: "+_1;
if(_2){
_4+=" "+_2;
}
if(_3){
_4+=" -- will be removed in version: "+_3;
}
console.warn(_4);
};
dojo.experimental=function(_5,_6){
var _7="EXPERIMENTAL: "+_5+" -- APIs subject to change without notice.";
if(_6){
_7+=" "+_6;
}
console.warn(_7);
};
(function(){
var _8=(/Trident/.test(window.navigator.userAgent));
if(_8){
var _9=["log","info","debug","warn","error"];
for(var i=0;i<_9.length;i++){
var m=_9[i];
var n="_"+_9[i];
console[n]=console[m];
console[m]=(function(){
var _a=n;
return function(){
console[_a](Array.prototype.slice.call(arguments).join(" "));
};
})();
}
try{
console.clear();
}
catch(e){
}
}
if(!dojo.isFF&&(!dojo.isChrome||dojo.isChrome<3)&&(!dojo.isSafari||dojo.isSafari<4)&&!_8&&!window.firebug&&(typeof console!="undefined"&&!console.firebug)&&!dojo.config.useCustomLogger&&!dojo.isAIR){
try{
if(window!=window.parent){
if(window.parent["console"]){
window.console=window.parent.console;
}
return;
}
}
catch(e){
}
var _b=document;
var _c=window;
var _d=0;
var _e=null;
var _f=null;
var _10=null;
var _11=null;
var _12=null;
var _13=null;
var _14=false;
var _15=[];
var _16=[];
var _17={};
var _18={};
var _19=null;
var _1a;
var _1b;
var _1c=false;
var _1d=null;
var _1e=document.createElement("div");
var _1f;
var _20;
window.console={_connects:[],log:function(){
_21(arguments,"");
},debug:function(){
_21(arguments,"debug");
},info:function(){
_21(arguments,"info");
},warn:function(){
_21(arguments,"warning");
},error:function(){
_21(arguments,"error");
},assert:function(_22,_23){
if(!_22){
var _24=[];
for(var i=1;i<arguments.length;++i){
_24.push(arguments[i]);
}
_21(_24.length?_24:["Assertion Failure"],"error");
throw _23?_23:"Assertion Failure";
}
},dir:function(obj){
var str=_25(obj);
str=str.replace(/\n/g,"<br />");
str=str.replace(/\t/g,"&nbsp;&nbsp;&nbsp;&nbsp;");
_26([str],"dir");
},dirxml:function(_27){
var _28=[];
_29(_27,_28);
_26(_28,"dirxml");
},group:function(){
_26(arguments,"group",_2a);
},groupEnd:function(){
_26(arguments,"",_2b);
},time:function(_2c){
_17[_2c]=new Date().getTime();
},timeEnd:function(_2d){
if(_2d in _17){
var _2e=(new Date()).getTime()-_17[_2d];
_21([_2d+":",_2e+"ms"]);
delete _17[_2d];
}
},count:function(_2f){
if(!_18[_2f]){
_18[_2f]=0;
}
_18[_2f]++;
_21([_2f+": "+_18[_2f]]);
},trace:function(_30){
var _31=_30||3;
var f=console.trace.caller;
for(var i=0;i<_31;i++){
var _32=f.toString();
var _33=[];
for(var a=0;a<f.arguments.length;a++){
_33.push(f.arguments[a]);
}
if(f.arguments.length){
}else{
}
f=f.caller;
}
},profile:function(){
this.warn(["profile() not supported."]);
},profileEnd:function(){
},clear:function(){
if(_f){
while(_f.childNodes.length){
dojo.destroy(_f.firstChild);
}
}
dojo.forEach(this._connects,dojo.disconnect);
},open:function(){
_34(true);
},close:function(){
if(_14){
_34();
}
},_restoreBorder:function(){
if(_1f){
_1f.style.border=_20;
}
},openDomInspector:function(){
_1c=true;
_f.style.display="none";
_19.style.display="block";
_10.style.display="none";
document.body.style.cursor="pointer";
_1a=dojo.connect(document,"mousemove",function(evt){
if(!_1c){
return;
}
if(!_1d){
_1d=setTimeout(function(){
_1d=null;
},50);
}else{
return;
}
var _35=evt.target;
if(_35&&(_1f!==_35)){
var _36=true;
console._restoreBorder();
var _37=[];
_29(_35,_37);
_19.innerHTML=_37.join("");
_1f=_35;
_20=_1f.style.border;
_1f.style.border="#0000FF 1px solid";
}
});
setTimeout(function(){
_1b=dojo.connect(document,"click",function(evt){
document.body.style.cursor="";
_1c=!_1c;
dojo.disconnect(_1b);
});
},30);
},_closeDomInspector:function(){
document.body.style.cursor="";
dojo.disconnect(_1a);
dojo.disconnect(_1b);
_1c=false;
console._restoreBorder();
},openConsole:function(){
_f.style.display="block";
_19.style.display="none";
_10.style.display="none";
console._closeDomInspector();
},openObjectInspector:function(){
_f.style.display="none";
_19.style.display="none";
_10.style.display="block";
console._closeDomInspector();
},recss:function(){
var i,a,s;
a=document.getElementsByTagName("link");
for(i=0;i<a.length;i++){
s=a[i];
if(s.rel.toLowerCase().indexOf("stylesheet")>=0&&s.href){
var h=s.href.replace(/(&|%5C?)forceReload=\d+/,"");
s.href=h+(h.indexOf("?")>=0?"&":"?")+"forceReload="+new Date().valueOf();
}
}
}};
function _34(_38){
_14=_38||!_14;
if(_e){
_e.style.display=_14?"block":"none";
}
};
function _39(){
_34(true);
if(_12){
_12.focus();
}
};
function _3a(x,y,w,h){
var win=window.open("","_firebug","status=0,menubar=0,resizable=1,top="+y+",left="+x+",width="+w+",height="+h+",scrollbars=1,addressbar=0");
if(!win){
var msg="Firebug Lite could not open a pop-up window, most likely because of a blocker.\n"+"Either enable pop-ups for this domain, or change the djConfig to popup=false.";
alert(msg);
}
_3b(win);
var _3c=win.document;
var _3d="<html style=\"height:100%;\"><head><title>Firebug Lite</title></head>\n"+"<body bgColor=\"#ccc\" style=\"height:97%;\" onresize=\"opener.onFirebugResize()\">\n"+"<div id=\"fb\"></div>"+"</body></html>";
_3c.write(_3d);
_3c.close();
return win;
};
function _3b(wn){
var d=new Date();
d.setTime(d.getTime()+(60*24*60*60*1000));
d=d.toUTCString();
var dc=wn.document,_3e;
if(wn.innerWidth){
_3e=function(){
return {w:wn.innerWidth,h:wn.innerHeight};
};
}else{
if(dc.documentElement&&dc.documentElement.clientWidth){
_3e=function(){
return {w:dc.documentElement.clientWidth,h:dc.documentElement.clientHeight};
};
}else{
if(dc.body){
_3e=function(){
return {w:dc.body.clientWidth,h:dc.body.clientHeight};
};
}
}
}
window.onFirebugResize=function(){
_4c(_3e().h);
clearInterval(wn._firebugWin_resize);
wn._firebugWin_resize=setTimeout(function(){
var x=wn.screenLeft,y=wn.screenTop,w=wn.outerWidth||wn.document.body.offsetWidth,h=wn.outerHeight||wn.document.body.offsetHeight;
document.cookie="_firebugPosition="+[x,y,w,h].join(",")+"; expires="+d+"; path=/";
},5000);
};
};
function _3f(){
if(_e){
return;
}
if(dojo.config.popup){
var _40="100%";
var _41=document.cookie.match(/(?:^|; )_firebugPosition=([^;]*)/);
var p=_41?_41[1].split(","):[2,2,320,480];
_c=_3a(p[0],p[1],p[2],p[3]);
_b=_c.document;
dojo.config.debugContainerId="fb";
_c.console=window.console;
_c.dojo=window.dojo;
}else{
_b=document;
_40=(dojo.config.debugHeight||300)+"px";
}
var _42=_b.createElement("link");
_42.href=dojo.moduleUrl("dojo._firebug","firebug.css");
_42.rel="stylesheet";
_42.type="text/css";
var _43=_b.getElementsByTagName("head");
if(_43){
_43=_43[0];
}
if(!_43){
_43=_b.getElementsByTagName("html")[0];
}
if(dojo.isIE){
window.setTimeout(function(){
_43.appendChild(_42);
},0);
}else{
_43.appendChild(_42);
}
if(dojo.config.debugContainerId){
_e=_b.getElementById(dojo.config.debugContainerId);
}
if(!_e){
_e=_b.createElement("div");
_b.body.appendChild(_e);
}
_e.className+=" firebug";
_e.style.height=_40;
_e.style.display=(_14?"block":"none");
var _44=function(_45,_46,_47,_48){
return "<li class=\""+_48+"\"><a href=\"javascript:void(0);\" onclick=\"console."+_47+"(); return false;\" title=\""+_46+"\">"+_45+"</a></li>";
};
_e.innerHTML="<div id=\"firebugToolbar\">"+"  <ul id=\"fireBugTabs\" class=\"tabs\">"+_44("Clear","Remove All Console Logs","clear","")+_44("ReCSS","Refresh CSS without reloading page","recss","")+_44("Console","Show Console Logs","openConsole","gap")+_44("DOM","Show DOM Inspector","openDomInspector","")+_44("Object","Show Object Inspector","openObjectInspector","")+((dojo.config.popup)?"":_44("Close","Close the console","close","gap"))+"\t</ul>"+"</div>"+"<input type=\"text\" id=\"firebugCommandLine\" />"+"<div id=\"firebugLog\"></div>"+"<div id=\"objectLog\" style=\"display:none;\">Click on an object in the Log display</div>"+"<div id=\"domInspect\" style=\"display:none;\">Hover over HTML elements in the main page. Click to hold selection.</div>";
_13=_b.getElementById("firebugToolbar");
_12=_b.getElementById("firebugCommandLine");
_49(_12,"keydown",_4a);
_49(_b,dojo.isIE||dojo.isSafari?"keydown":"keypress",_4b);
_f=_b.getElementById("firebugLog");
_10=_b.getElementById("objectLog");
_19=_b.getElementById("domInspect");
_11=_b.getElementById("fireBugTabs");
_4c();
_4d();
};
dojo.addOnLoad(_3f);
function _4e(){
_b=null;
if(_c.console){
_c.console.clear();
}
_c=null;
_e=null;
_f=null;
_10=null;
_19=null;
_12=null;
_15=[];
_16=[];
_17={};
};
function _4f(){
var _50=_12.value;
_12.value="";
_26([">  ",_50],"command");
var _51;
try{
_51=eval(_50);
}
catch(e){
}
};
function _4c(h){
var _52=25;
var _53=h?h-(_52+_12.offsetHeight+25+(h*0.01))+"px":(_e.offsetHeight-_52-_12.offsetHeight)+"px";
_f.style.top=_52+"px";
_f.style.height=_53;
_10.style.height=_53;
_10.style.top=_52+"px";
_19.style.height=_53;
_19.style.top=_52+"px";
_12.style.bottom=0;
dojo.addOnWindowUnload(_4e);
};
function _26(_54,_55,_56){
if(_f){
_57(_54,_55,_56);
}else{
_15.push([_54,_55,_56]);
}
};
function _4d(){
var _58=_15;
_15=[];
for(var i=0;i<_58.length;++i){
_57(_58[i][0],_58[i][1],_58[i][2]);
}
};
function _57(_59,_5a,_5b){
var _5c=_f.scrollTop+_f.offsetHeight>=_f.scrollHeight;
_5b=_5b||_5d;
_5b(_59,_5a);
if(_5c){
_f.scrollTop=_f.scrollHeight-_f.offsetHeight;
}
};
function _5e(row){
var _5f=_16.length?_16[_16.length-1]:_f;
_5f.appendChild(row);
};
function _5d(_60,_61){
var row=_f.ownerDocument.createElement("div");
row.className="logRow"+(_61?" logRow-"+_61:"");
row.innerHTML=_60.join("");
_5e(row);
};
function _2a(_62,_63){
_21(_62,_63);
var _64=_f.ownerDocument.createElement("div");
_64.className="logGroupBox";
_5e(_64);
_16.push(_64);
};
function _2b(){
_16.pop();
};
function _21(_65,_66){
var _67=[];
var _68=_65[0];
var _69=0;
if(typeof (_68)!="string"){
_68="";
_69=-1;
}
var _6a=_6b(_68);
for(var i=0;i<_6a.length;++i){
var _6c=_6a[i];
if(_6c&&typeof _6c=="object"){
_6c.appender(_65[++_69],_67);
}else{
_6d(_6c,_67);
}
}
var ids=[];
var obs=[];
for(i=_69+1;i<_65.length;++i){
_6d(" ",_67);
var _6e=_65[i];
if(_6e===undefined||_6e===null){
_6f(_6e,_67);
}else{
if(typeof (_6e)=="string"){
_6d(_6e,_67);
}else{
if(_6e instanceof Date){
_6d(_6e.toString(),_67);
}else{
if(_6e.nodeType==9){
_6d("[ XmlDoc ]",_67);
}else{
var id="_a"+_d++;
ids.push(id);
obs.push(_6e);
var str="<a id=\""+id+"\" href=\"javascript:void(0);\">"+_70(_6e)+"</a>";
_71(str,_67);
}
}
}
}
}
_26(_67,_66);
for(i=0;i<ids.length;i++){
var btn=_b.getElementById(ids[i]);
if(!btn){
continue;
}
btn.obj=obs[i];
_c.console._connects.push(dojo.connect(btn,"onclick",function(){
console.openObjectInspector();
try{
_25(this.obj);
}
catch(e){
this.obj=e;
}
_10.innerHTML="<pre>"+_25(this.obj)+"</pre>";
}));
}
};
function _6b(_72){
var _73=[];
var reg=/((^%|[^\\]%)(\d+)?(\.)([a-zA-Z]))|((^%|[^\\]%)([a-zA-Z]))/;
var _74={s:_6d,d:_75,i:_75,f:_76};
for(var m=reg.exec(_72);m;m=reg.exec(_72)){
var _77=m[8]?m[8]:m[5];
var _78=_77 in _74?_74[_77]:_79;
var _7a=m[3]?parseInt(m[3]):(m[4]=="."?-1:0);
_73.push(_72.substr(0,m[0][0]=="%"?m.index:m.index+1));
_73.push({appender:_78,precision:_7a});
_72=_72.substr(m.index+m[0].length);
}
_73.push(_72);
return _73;
};
function _7b(_7c){
function _7d(ch){
switch(ch){
case "<":
return "&lt;";
case ">":
return "&gt;";
case "&":
return "&amp;";
case "'":
return "&#39;";
case "\"":
return "&quot;";
}
return "?";
};
return String(_7c).replace(/[<>&"']/g,_7d);
};
function _7e(_7f){
try{
return _7f+"";
}
catch(e){
return null;
}
};
function _71(_80,_81){
_81.push(_7e(_80));
};
function _6d(_82,_83){
_83.push(_7b(_7e(_82)));
};
function _6f(_84,_85){
_85.push("<span class=\"objectBox-null\">",_7b(_7e(_84)),"</span>");
};
function _86(_87,_88){
_88.push("<span class=\"objectBox-string\">&quot;",_7b(_7e(_87)),"&quot;</span>");
};
function _75(_89,_8a){
_8a.push("<span class=\"objectBox-number\">",_7b(_7e(_89)),"</span>");
};
function _76(_8b,_8c){
_8c.push("<span class=\"objectBox-number\">",_7b(_7e(_8b)),"</span>");
};
function _8d(_8e,_8f){
_8f.push("<span class=\"objectBox-function\">",_70(_8e),"</span>");
};
function _79(_90,_91){
try{
if(_90===undefined){
_6f("undefined",_91);
}else{
if(_90===null){
_6f("null",_91);
}else{
if(typeof _90=="string"){
_86(_90,_91);
}else{
if(typeof _90=="number"){
_75(_90,_91);
}else{
if(typeof _90=="function"){
_8d(_90,_91);
}else{
if(_90.nodeType==1){
_92(_90,_91);
}else{
if(typeof _90=="object"){
_93(_90,_91);
}else{
_6d(_90,_91);
}
}
}
}
}
}
}
}
catch(e){
}
};
function _93(_94,_95){
var _96=_7e(_94);
var _97=/\[object (.*?)\]/;
var m=_97.exec(_96);
_95.push("<span class=\"objectBox-object\">",m?m[1]:_96,"</span>");
};
function _92(_98,_99){
_99.push("<span class=\"objectBox-selector\">");
_99.push("<span class=\"selectorTag\">",_7b(_98.nodeName.toLowerCase()),"</span>");
if(_98.id){
_99.push("<span class=\"selectorId\">#",_7b(_98.id),"</span>");
}
if(_98.className){
_99.push("<span class=\"selectorClass\">.",_7b(_98.className),"</span>");
}
_99.push("</span>");
};
function _29(_9a,_9b){
if(_9a.nodeType==1){
_9b.push("<div class=\"objectBox-element\">","&lt;<span class=\"nodeTag\">",_9a.nodeName.toLowerCase(),"</span>");
for(var i=0;i<_9a.attributes.length;++i){
var _9c=_9a.attributes[i];
if(!_9c.specified){
continue;
}
_9b.push("&nbsp;<span class=\"nodeName\">",_9c.nodeName.toLowerCase(),"</span>=&quot;<span class=\"nodeValue\">",_7b(_9c.nodeValue),"</span>&quot;");
}
if(_9a.firstChild){
_9b.push("&gt;</div><div class=\"nodeChildren\">");
for(var _9d=_9a.firstChild;_9d;_9d=_9d.nextSibling){
_29(_9d,_9b);
}
_9b.push("</div><div class=\"objectBox-element\">&lt;/<span class=\"nodeTag\">",_9a.nodeName.toLowerCase(),"&gt;</span></div>");
}else{
_9b.push("/&gt;</div>");
}
}else{
if(_9a.nodeType==3){
_9b.push("<div class=\"nodeText\">",_7b(_9a.nodeValue),"</div>");
}
}
};
function _49(_9e,_9f,_a0){
if(document.all){
_9e.attachEvent("on"+_9f,_a0);
}else{
_9e.addEventListener(_9f,_a0,false);
}
};
function _a1(_a2,_a3,_a4){
if(document.all){
_a2.detachEvent("on"+_a3,_a4);
}else{
_a2.removeEventListener(_a3,_a4,false);
}
};
function _a5(_a6){
if(document.all){
_a6.cancelBubble=true;
}else{
_a6.stopPropagation();
}
};
function _a7(msg,_a8,_a9){
var _aa=_a8.lastIndexOf("/");
var _ab=_aa==-1?_a8:_a8.substr(_aa+1);
var _ac=["<span class=\"errorMessage\">",msg,"</span>","<div class=\"objectBox-sourceLink\">",_ab," (line ",_a9,")</div>"];
_26(_ac,"error");
};
var _ad=new Date().getTime();
function _4b(_ae){
var _af=(new Date()).getTime();
if(_af>_ad+200){
_ae=dojo.fixEvent(_ae);
var _b0=dojo.keys;
var ekc=_ae.keyCode;
_ad=_af;
if(ekc==_b0.F12){
_34();
}else{
if((ekc==_b0.NUMPAD_ENTER||ekc==76)&&_ae.shiftKey&&(_ae.metaKey||_ae.ctrlKey)){
_39();
}else{
return;
}
}
_a5(_ae);
}
};
function _4a(e){
var dk=dojo.keys;
if(e.keyCode==13&&_12.value){
_b1(_12.value);
_4f();
}else{
if(e.keyCode==27){
_12.value="";
}else{
if(e.keyCode==dk.UP_ARROW||e.charCode==dk.UP_ARROW){
_b2("older");
}else{
if(e.keyCode==dk.DOWN_ARROW||e.charCode==dk.DOWN_ARROW){
_b2("newer");
}else{
if(e.keyCode==dk.HOME||e.charCode==dk.HOME){
_b3=1;
_b2("older");
}else{
if(e.keyCode==dk.END||e.charCode==dk.END){
_b3=999999;
_b2("newer");
}
}
}
}
}
}
};
var _b3=-1;
var _b4=null;
function _b1(_b5){
var _b6=_b7("firebug_history");
_b6=(_b6)?dojo.fromJson(_b6):[];
var pos=dojo.indexOf(_b6,_b5);
if(pos!=-1){
_b6.splice(pos,1);
}
_b6.push(_b5);
_b7("firebug_history",dojo.toJson(_b6),30);
while(_b6.length&&!_b7("firebug_history")){
_b6.shift();
_b7("firebug_history",dojo.toJson(_b6),30);
}
_b4=null;
_b3=-1;
};
function _b2(_b8){
var _b9=_b7("firebug_history");
_b9=(_b9)?dojo.fromJson(_b9):[];
if(!_b9.length){
return;
}
if(_b4===null){
_b4=_12.value;
}
if(_b3==-1){
_b3=_b9.length;
}
if(_b8=="older"){
--_b3;
if(_b3<0){
_b3=0;
}
}else{
if(_b8=="newer"){
++_b3;
if(_b3>_b9.length){
_b3=_b9.length;
}
}
}
if(_b3==_b9.length){
_12.value=_b4;
_b4=null;
}else{
_12.value=_b9[_b3];
}
};
function _b7(_ba,_bb){
var c=document.cookie;
if(arguments.length==1){
var _bc=c.match(new RegExp("(?:^|; )"+_ba+"=([^;]*)"));
return _bc?decodeURIComponent(_bc[1]):undefined;
}else{
var d=new Date();
d.setMonth(d.getMonth()+1);
document.cookie=_ba+"="+encodeURIComponent(_bb)+((d.toUtcString)?"; expires="+d.toUTCString():"");
}
};
function _bd(it){
return it&&it instanceof Array||typeof it=="array";
};
function _be(o){
var cnt=0;
for(var nm in o){
cnt++;
}
return cnt;
};
function _25(o,i,txt,_bf){
var ind=" \t";
txt=txt||"";
i=i||ind;
_bf=_bf||[];
var _c0;
if(o&&o.nodeType==1){
var _c1=[];
_29(o,_c1);
return _c1.join("");
}
var br=",\n",cnt=0,_c2=_be(o);
if(o instanceof Date){
return i+o.toString()+br;
}
looking:
for(var nm in o){
cnt++;
if(cnt==_c2){
br="\n";
}
if(o[nm]===window||o[nm]===document){
continue;
}else{
if(o[nm]===null){
txt+=i+nm+" : NULL"+br;
}else{
if(o[nm]&&o[nm].nodeType){
if(o[nm].nodeType==1){
}else{
if(o[nm].nodeType==3){
txt+=i+nm+" : [ TextNode "+o[nm].data+" ]"+br;
}
}
}else{
if(typeof o[nm]=="object"&&(o[nm] instanceof String||o[nm] instanceof Number||o[nm] instanceof Boolean)){
txt+=i+nm+" : "+o[nm]+","+br;
}else{
if(o[nm] instanceof Date){
txt+=i+nm+" : "+o[nm].toString()+br;
}else{
if(typeof (o[nm])=="object"&&o[nm]){
for(var j=0,_c3;_c3=_bf[j];j++){
if(o[nm]===_c3){
txt+=i+nm+" : RECURSION"+br;
continue looking;
}
}
_bf.push(o[nm]);
_c0=(_bd(o[nm]))?["[","]"]:["{","}"];
txt+=i+nm+" : "+_c0[0]+"\n";
txt+=_25(o[nm],i+ind,"",_bf);
txt+=i+_c0[1]+br;
}else{
if(typeof o[nm]=="undefined"){
txt+=i+nm+" : undefined"+br;
}else{
if(nm=="toString"&&typeof o[nm]=="function"){
var _c4=o[nm]();
if(typeof _c4=="string"&&_c4.match(/function ?(.*?)\(/)){
_c4=_7b(_70(o[nm]));
}
txt+=i+nm+" : "+_c4+br;
}else{
txt+=i+nm+" : "+_7b(_70(o[nm]))+br;
}
}
}
}
}
}
}
}
}
return txt;
};
function _70(obj){
var _c5=(obj instanceof Error);
if(obj.nodeType==1){
return _7b("< "+obj.tagName.toLowerCase()+" id=\""+obj.id+"\" />");
}
if(obj.nodeType==3){
return _7b("[TextNode: \""+obj.nodeValue+"\"]");
}
var nm=(obj&&(obj.id||obj.name||obj.ObjectID||obj.widgetId));
if(!_c5&&nm){
return "{"+nm+"}";
}
var _c6=2;
var _c7=4;
var cnt=0;
if(_c5){
nm="[ Error: "+(obj.message||obj.description||obj)+" ]";
}else{
if(_bd(obj)){
nm="["+obj.slice(0,_c7).join(",");
if(obj.length>_c7){
nm+=" ... ("+obj.length+" items)";
}
nm+="]";
}else{
if(typeof obj=="function"){
nm=obj+"";
var reg=/function\s*([^\(]*)(\([^\)]*\))[^\{]*\{/;
var m=reg.exec(nm);
if(m){
if(!m[1]){
m[1]="function";
}
nm=m[1]+m[2];
}else{
nm="function()";
}
}else{
if(typeof obj!="object"||typeof obj=="string"){
nm=obj+"";
}else{
nm="{";
for(var i in obj){
cnt++;
if(cnt>_c6){
break;
}
nm+=i+":"+_7b(obj[i])+"  ";
}
nm+="}";
}
}
}
}
return nm;
};
_49(document,dojo.isIE||dojo.isSafari?"keydown":"keypress",_4b);
if((document.documentElement.getAttribute("debug")=="true")||(dojo.config.isDebug)){
_34(true);
}
dojo.addOnWindowUnload(function(){
_a1(document,dojo.isIE||dojo.isSafari?"keydown":"keypress",_4b);
window.onFirebugResize=null;
window.console=null;
});
}
})();
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo._base._loader.loader_xd"]){
dojo._hasResource["dojo._base._loader.loader_xd"]=true;
dojo.provide("dojo._base._loader.loader_xd");
dojo._xdReset=function(){
dojo._isXDomain=dojo.config.useXDomain||false;
dojo._xdClearInterval();
dojo._xdInFlight={};
dojo._xdOrderedReqs=[];
dojo._xdDepMap={};
dojo._xdContents=[];
dojo._xdDefList=[];
};
dojo._xdClearInterval=function(){
if(dojo._xdTimer){
clearInterval(dojo._xdTimer);
dojo._xdTimer=0;
}
};
dojo._xdReset();
dojo._xdCreateResource=function(_1,_2,_3){
var _4=_1.replace(/(\/\*([\s\S]*?)\*\/|\/\/(.*)$)/mg,"");
var _5=[];
var _6=/dojo.(require|requireIf|provide|requireAfterIf|platformRequire|requireLocalization)\s*\(([\w\W]*?)\)/mg;
var _7;
while((_7=_6.exec(_4))!=null){
if(_7[1]=="requireLocalization"){
eval(_7[0]);
}else{
_5.push("\""+_7[1]+"\", "+_7[2]);
}
}
var _8=[];
_8.push(dojo._scopeName+"._xdResourceLoaded(function("+dojo._scopePrefixArgs+"){\n");
var _9=dojo._xdExtractLoadInits(_1);
if(_9){
_1=_9[0];
for(var i=1;i<_9.length;i++){
_8.push(_9[i]+";\n");
}
}
_8.push("return {");
if(_5.length>0){
_8.push("depends: [");
for(i=0;i<_5.length;i++){
if(i>0){
_8.push(",\n");
}
_8.push("["+_5[i]+"]");
}
_8.push("],");
}
_8.push("\ndefineResource: function("+dojo._scopePrefixArgs+"){");
if(!dojo.config["debugAtAllCosts"]||_2=="dojo._base._loader.loader_debug"){
_8.push(_1);
}
_8.push("\n}, resourceName: '"+_2+"', resourcePath: '"+_3+"'};});");
return _8.join("");
};
dojo._xdExtractLoadInits=function(_a){
var _b=/dojo.loadInit\s*\(/g;
_b.lastIndex=0;
var _c=/[\(\)]/g;
_c.lastIndex=0;
var _d=[];
var _e;
while((_e=_b.exec(_a))){
_c.lastIndex=_b.lastIndex;
var _f=1;
var _10;
while((_10=_c.exec(_a))){
if(_10[0]==")"){
_f-=1;
}else{
_f+=1;
}
if(_f==0){
break;
}
}
if(_f!=0){
throw "unmatched paren around character "+_c.lastIndex+" in: "+_a;
}
var _11=_b.lastIndex-_e[0].length;
_d.push(_a.substring(_11,_c.lastIndex));
var _12=_c.lastIndex-_11;
_a=_a.substring(0,_11)+_a.substring(_c.lastIndex,_a.length);
_b.lastIndex=_c.lastIndex-_12;
_b.lastIndex=_c.lastIndex;
}
if(_d.length>0){
_d.unshift(_a);
}
return (_d.length?_d:null);
};
dojo._xdIsXDomainPath=function(_13){
var _14=_13.indexOf(":");
var _15=_13.indexOf("/");
if(_14>0&&_14<_15){
return true;
}else{
var url=dojo.baseUrl;
_14=url.indexOf(":");
_15=url.indexOf("/");
if(_14>0&&_14<_15&&(!location.host||url.indexOf("http://"+location.host)!=0)){
return true;
}
}
return false;
};
dojo._loadPath=function(_16,_17,cb){
var _18=dojo._xdIsXDomainPath(_16);
dojo._isXDomain|=_18;
var uri=((_16.charAt(0)=="/"||_16.match(/^\w+:/))?"":dojo.baseUrl)+_16;
try{
return ((!_17||dojo._isXDomain)?dojo._loadUri(uri,cb,_18,_17):dojo._loadUriAndCheck(uri,_17,cb));
}
catch(e){
console.error(e);
return false;
}
};
dojo._xdCharSet="utf-8";
dojo._loadUri=function(uri,cb,_19,_1a){
if(dojo._loadedUrls[uri]){
return 1;
}
if(dojo._isXDomain&&_1a&&_1a!="dojo.i18n"){
dojo._xdOrderedReqs.push(_1a);
if(_19||uri.indexOf("/nls/")==-1){
dojo._xdInFlight[_1a]=true;
dojo._inFlightCount++;
}
if(!dojo._xdTimer){
if(dojo.isAIR){
dojo._xdTimer=setInterval(function(){
dojo._xdWatchInFlight();
},100);
}else{
dojo._xdTimer=setInterval(dojo._scopeName+"._xdWatchInFlight();",100);
}
}
dojo._xdStartTime=(new Date()).getTime();
}
if(_19){
var _1b=uri.lastIndexOf(".");
if(_1b<=0){
_1b=uri.length-1;
}
var _1c=uri.substring(0,_1b)+".xd";
if(_1b!=uri.length-1){
_1c+=uri.substring(_1b,uri.length);
}
if(dojo.isAIR){
_1c=_1c.replace("app:/","/");
}
var _1d=document.createElement("script");
_1d.type="text/javascript";
if(dojo._xdCharSet){
_1d.charset=dojo._xdCharSet;
}
_1d.src=_1c;
if(!dojo.headElement){
dojo._headElement=document.getElementsByTagName("head")[0];
if(!dojo._headElement){
dojo._headElement=document.getElementsByTagName("html")[0];
}
}
dojo._headElement.appendChild(_1d);
}else{
var _1e=dojo._getText(uri,null,true);
if(_1e==null){
return 0;
}
if(dojo._isXDomain&&uri.indexOf("/nls/")==-1&&_1a!="dojo.i18n"){
var res=dojo._xdCreateResource(_1e,_1a,uri);
dojo.eval(res);
}else{
if(cb){
_1e="("+_1e+")";
}else{
_1e=dojo._scopePrefix+_1e+dojo._scopeSuffix;
}
var _1f=dojo["eval"](_1e+"\r\n//@ sourceURL="+uri);
if(cb){
cb(_1f);
}
}
}
dojo._loadedUrls[uri]=true;
dojo._loadedUrls.push(uri);
return true;
};
dojo._xdResourceLoaded=function(res){
res=res.apply(dojo.global,dojo._scopeArgs);
var _20=res.depends;
var _21=null;
var _22=null;
var _23=[];
if(_20&&_20.length>0){
var dep=null;
var _24=0;
var _25=false;
for(var i=0;i<_20.length;i++){
dep=_20[i];
if(dep[0]=="provide"){
_23.push(dep[1]);
}else{
if(!_21){
_21=[];
}
if(!_22){
_22=[];
}
var _26=dojo._xdUnpackDependency(dep);
if(_26.requires){
_21=_21.concat(_26.requires);
}
if(_26.requiresAfter){
_22=_22.concat(_26.requiresAfter);
}
}
var _27=dep[0];
var _28=_27.split(".");
if(_28.length==2){
dojo[_28[0]][_28[1]].apply(dojo[_28[0]],dep.slice(1));
}else{
dojo[_27].apply(dojo,dep.slice(1));
}
}
if(_23.length==1&&_23[0]=="dojo._base._loader.loader_debug"){
res.defineResource(dojo);
}else{
var _29=dojo._xdContents.push({content:res.defineResource,resourceName:res["resourceName"],resourcePath:res["resourcePath"],isDefined:false})-1;
for(i=0;i<_23.length;i++){
dojo._xdDepMap[_23[i]]={requires:_21,requiresAfter:_22,contentIndex:_29};
}
}
for(i=0;i<_23.length;i++){
dojo._xdInFlight[_23[i]]=false;
}
}
};
dojo._xdLoadFlattenedBundle=function(_2a,_2b,_2c,_2d){
_2c=_2c||"root";
var _2e=dojo.i18n.normalizeLocale(_2c).replace("-","_");
var _2f=[_2a,"nls",_2b].join(".");
var _30=dojo["provide"](_2f);
_30[_2e]=_2d;
var _31=[_2a,_2e,_2b].join(".");
var _32=dojo._xdBundleMap[_31];
if(_32){
for(var _33 in _32){
_30[_33]=_2d;
}
}
};
dojo._xdInitExtraLocales=function(){
var _34=dojo.config.extraLocale;
if(_34){
if(!_34 instanceof Array){
_34=[_34];
}
dojo._xdReqLoc=dojo.xdRequireLocalization;
dojo.xdRequireLocalization=function(m,b,_35,_36){
dojo._xdReqLoc(m,b,_35,_36);
if(_35){
return;
}
for(var i=0;i<_34.length;i++){
dojo._xdReqLoc(m,b,_34[i],_36);
}
};
}
};
dojo._xdBundleMap={};
dojo.xdRequireLocalization=function(_37,_38,_39,_3a){
if(dojo._xdInitExtraLocales){
dojo._xdInitExtraLocales();
dojo._xdInitExtraLocales=null;
dojo.xdRequireLocalization.apply(dojo,arguments);
return;
}
var _3b=_3a.split(",");
var _3c=dojo.i18n.normalizeLocale(_39);
var _3d="";
for(var i=0;i<_3b.length;i++){
if(_3c.indexOf(_3b[i])==0){
if(_3b[i].length>_3d.length){
_3d=_3b[i];
}
}
}
var _3e=_3d.replace("-","_");
var _3f=dojo.getObject([_37,"nls",_38].join("."));
if(!_3f||!_3f[_3e]){
var _40=[_37,(_3e||"root"),_38].join(".");
var _41=dojo._xdBundleMap[_40];
if(!_41){
_41=dojo._xdBundleMap[_40]={};
}
_41[_3c.replace("-","_")]=true;
dojo.require(_37+".nls"+(_3d?"."+_3d:"")+"."+_38);
}
};
dojo._xdRealRequireLocalization=dojo.requireLocalization;
dojo.requireLocalization=function(_42,_43,_44,_45){
var _46=dojo.moduleUrl(_42).toString();
if(dojo._xdIsXDomainPath(_46)){
return dojo.xdRequireLocalization.apply(dojo,arguments);
}else{
return dojo._xdRealRequireLocalization.apply(dojo,arguments);
}
};
dojo._xdUnpackDependency=function(dep){
var _47=null;
var _48=null;
switch(dep[0]){
case "requireIf":
case "requireAfterIf":
if(dep[1]===true){
_47=[{name:dep[2],content:null}];
}
break;
case "platformRequire":
var _49=dep[1];
var _4a=_49["common"]||[];
_47=(_49[dojo.hostenv.name_])?_4a.concat(_49[dojo.hostenv.name_]||[]):_4a.concat(_49["default"]||[]);
if(_47){
for(var i=0;i<_47.length;i++){
if(_47[i] instanceof Array){
_47[i]={name:_47[i][0],content:null};
}else{
_47[i]={name:_47[i],content:null};
}
}
}
break;
case "require":
_47=[{name:dep[1],content:null}];
break;
case "i18n._preloadLocalizations":
dojo.i18n._preloadLocalizations.apply(dojo.i18n._preloadLocalizations,dep.slice(1));
break;
}
if(dep[0]=="requireAfterIf"||dep[0]=="requireIf"){
_48=_47;
_47=null;
}
return {requires:_47,requiresAfter:_48};
};
dojo._xdWalkReqs=function(){
var _4b=null;
var req;
for(var i=0;i<dojo._xdOrderedReqs.length;i++){
req=dojo._xdOrderedReqs[i];
if(dojo._xdDepMap[req]){
_4b=[req];
_4b[req]=true;
dojo._xdEvalReqs(_4b);
}
}
};
dojo._xdEvalReqs=function(_4c){
while(_4c.length>0){
var req=_4c[_4c.length-1];
var res=dojo._xdDepMap[req];
var i,_4d,_4e;
if(res){
_4d=res.requires;
if(_4d&&_4d.length>0){
for(i=0;i<_4d.length;i++){
_4e=_4d[i].name;
if(_4e&&!_4c[_4e]){
_4c.push(_4e);
_4c[_4e]=true;
dojo._xdEvalReqs(_4c);
}
}
}
var _4f=dojo._xdContents[res.contentIndex];
if(!_4f.isDefined){
var _50=_4f.content;
_50["resourceName"]=_4f["resourceName"];
_50["resourcePath"]=_4f["resourcePath"];
dojo._xdDefList.push(_50);
_4f.isDefined=true;
}
dojo._xdDepMap[req]=null;
_4d=res.requiresAfter;
if(_4d&&_4d.length>0){
for(i=0;i<_4d.length;i++){
_4e=_4d[i].name;
if(_4e&&!_4c[_4e]){
_4c.push(_4e);
_4c[_4e]=true;
dojo._xdEvalReqs(_4c);
}
}
}
}
_4c.pop();
}
};
dojo._xdWatchInFlight=function(){
var _51="";
var _52=(dojo.config.xdWaitSeconds||15)*1000;
var _53=(dojo._xdStartTime+_52)<(new Date()).getTime();
for(var _54 in dojo._xdInFlight){
if(dojo._xdInFlight[_54]===true){
if(_53){
_51+=_54+" ";
}else{
return;
}
}
}
dojo._xdClearInterval();
if(_53){
throw "Could not load cross-domain resources: "+_51;
}
dojo._xdWalkReqs();
var _55=dojo._xdDefList.length;
for(var i=0;i<_55;i++){
var _56=dojo._xdDefList[i];
if(dojo.config["debugAtAllCosts"]&&_56["resourceName"]){
if(!dojo["_xdDebugQueue"]){
dojo._xdDebugQueue=[];
}
dojo._xdDebugQueue.push({resourceName:_56.resourceName,resourcePath:_56.resourcePath});
}else{
_56.apply(dojo.global,dojo._scopeArgs);
}
}
for(i=0;i<dojo._xdContents.length;i++){
var _57=dojo._xdContents[i];
if(_57.content&&!_57.isDefined){
_57.content.apply(dojo.global,dojo._scopeArgs);
}
}
dojo._xdReset();
if(dojo["_xdDebugQueue"]&&dojo._xdDebugQueue.length>0){
dojo._xdDebugFileLoaded();
}else{
dojo._xdNotifyLoaded();
}
};
dojo._xdNotifyLoaded=function(){
for(var _58 in dojo._xdInFlight){
if(typeof dojo._xdInFlight[_58]=="boolean"){
return;
}
}
dojo._inFlightCount=0;
if(dojo._initFired&&!dojo._loadNotifying){
dojo._callLoaded();
}
};
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo._base._loader.loader_debug"]){
dojo._hasResource["dojo._base._loader.loader_debug"]=true;
dojo.provide("dojo._base._loader.loader_debug");
dojo.nonDebugProvide=dojo.provide;
dojo.provide=function(_1){
var _2=dojo["_xdDebugQueue"];
if(_2&&_2.length>0&&_1==_2["currentResourceName"]){
if(dojo.isAIR){
window.setTimeout(function(){
dojo._xdDebugFileLoaded(_1);
},1);
}else{
window.setTimeout(dojo._scopeName+"._xdDebugFileLoaded('"+_1+"')",1);
}
}
return dojo.nonDebugProvide.apply(dojo,arguments);
};
dojo._xdDebugFileLoaded=function(_3){
if(!dojo._xdDebugScopeChecked){
if(dojo._scopeName!="dojo"){
window.dojo=window[dojo.config.scopeMap[0][1]];
window.dijit=window[dojo.config.scopeMap[1][1]];
window.dojox=window[dojo.config.scopeMap[2][1]];
}
dojo._xdDebugScopeChecked=true;
}
var _4=dojo._xdDebugQueue;
if(_3&&_3==_4.currentResourceName){
_4.shift();
}
if(_4.length==0){
dojo._xdWatchInFlight();
}
if(_4.length==0){
_4.currentResourceName=null;
for(var _5 in dojo._xdInFlight){
if(dojo._xdInFlight[_5]===true){
return;
}
}
dojo._xdNotifyLoaded();
}else{
if(_3==_4.currentResourceName){
_4.currentResourceName=_4[0].resourceName;
var _6=document.createElement("script");
_6.type="text/javascript";
_6.src=_4[0].resourcePath;
document.getElementsByTagName("head")[0].appendChild(_6);
}
}
};
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo.date.stamp"]){
dojo._hasResource["dojo.date.stamp"]=true;
dojo.provide("dojo.date.stamp");
dojo.date.stamp.fromISOString=function(_1,_2){
if(!dojo.date.stamp._isoRegExp){
dojo.date.stamp._isoRegExp=/^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+-](\d{2}):(\d{2}))|Z)?)?$/;
}
var _3=dojo.date.stamp._isoRegExp.exec(_1),_4=null;
if(_3){
_3.shift();
if(_3[1]){
_3[1]--;
}
if(_3[6]){
_3[6]*=1000;
}
if(_2){
_2=new Date(_2);
dojo.forEach(dojo.map(["FullYear","Month","Date","Hours","Minutes","Seconds","Milliseconds"],function(_5){
return _2["get"+_5]();
}),function(_6,_7){
_3[_7]=_3[_7]||_6;
});
}
_4=new Date(_3[0]||1970,_3[1]||0,_3[2]||1,_3[3]||0,_3[4]||0,_3[5]||0,_3[6]||0);
if(_3[0]<100){
_4.setFullYear(_3[0]||1970);
}
var _8=0,_9=_3[7]&&_3[7].charAt(0);
if(_9!="Z"){
_8=((_3[8]||0)*60)+(Number(_3[9])||0);
if(_9!="-"){
_8*=-1;
}
}
if(_9){
_8-=_4.getTimezoneOffset();
}
if(_8){
_4.setTime(_4.getTime()+_8*60000);
}
}
return _4;
};
dojo.date.stamp.toISOString=function(_a,_b){
var _c=function(n){
return (n<10)?"0"+n:n;
};
_b=_b||{};
var _d=[],_e=_b.zulu?"getUTC":"get",_f="";
if(_b.selector!="time"){
var _10=_a[_e+"FullYear"]();
_f=["0000".substr((_10+"").length)+_10,_c(_a[_e+"Month"]()+1),_c(_a[_e+"Date"]())].join("-");
}
_d.push(_f);
if(_b.selector!="date"){
var _11=[_c(_a[_e+"Hours"]()),_c(_a[_e+"Minutes"]()),_c(_a[_e+"Seconds"]())].join(":");
var _12=_a[_e+"Milliseconds"]();
if(_b.milliseconds){
_11+="."+(_12<100?"0":"")+_c(_12);
}
if(_b.zulu){
_11+="Z";
}else{
if(_b.selector!="time"){
var _13=_a.getTimezoneOffset();
var _14=Math.abs(_13);
_11+=(_13>0?"-":"+")+_c(Math.floor(_14/60))+":"+_c(_14%60);
}
}
_d.push(_11);
}
return _d.join("T");
};
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo.dnd.common"]){
dojo._hasResource["dojo.dnd.common"]=true;
dojo.provide("dojo.dnd.common");
dojo.dnd.getCopyKeyState=dojo.isCopyKey;
dojo.dnd._uniqueId=0;
dojo.dnd.getUniqueId=function(){
var id;
do{
id=dojo._scopeName+"Unique"+(++dojo.dnd._uniqueId);
}while(dojo.byId(id));
return id;
};
dojo.dnd._empty={};
dojo.dnd.isFormElement=function(e){
var t=e.target;
if(t.nodeType==3){
t=t.parentNode;
}
return " button textarea input select option ".indexOf(" "+t.tagName.toLowerCase()+" ")>=0;
};
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo.dnd.autoscroll"]){
dojo._hasResource["dojo.dnd.autoscroll"]=true;
dojo.provide("dojo.dnd.autoscroll");
dojo.dnd.getViewport=function(){
var d=dojo.doc,dd=d.documentElement,w=window,b=dojo.body();
if(dojo.isMozilla){
return {w:dd.clientWidth,h:w.innerHeight};
}else{
if(!dojo.isOpera&&w.innerWidth){
return {w:w.innerWidth,h:w.innerHeight};
}else{
if(!dojo.isOpera&&dd&&dd.clientWidth){
return {w:dd.clientWidth,h:dd.clientHeight};
}else{
if(b.clientWidth){
return {w:b.clientWidth,h:b.clientHeight};
}
}
}
}
return null;
};
dojo.dnd.V_TRIGGER_AUTOSCROLL=32;
dojo.dnd.H_TRIGGER_AUTOSCROLL=32;
dojo.dnd.V_AUTOSCROLL_VALUE=16;
dojo.dnd.H_AUTOSCROLL_VALUE=16;
dojo.dnd.autoScroll=function(e){
var v=dojo.dnd.getViewport(),dx=0,dy=0;
if(e.clientX<dojo.dnd.H_TRIGGER_AUTOSCROLL){
dx=-dojo.dnd.H_AUTOSCROLL_VALUE;
}else{
if(e.clientX>v.w-dojo.dnd.H_TRIGGER_AUTOSCROLL){
dx=dojo.dnd.H_AUTOSCROLL_VALUE;
}
}
if(e.clientY<dojo.dnd.V_TRIGGER_AUTOSCROLL){
dy=-dojo.dnd.V_AUTOSCROLL_VALUE;
}else{
if(e.clientY>v.h-dojo.dnd.V_TRIGGER_AUTOSCROLL){
dy=dojo.dnd.V_AUTOSCROLL_VALUE;
}
}
window.scrollBy(dx,dy);
};
dojo.dnd._validNodes={"div":1,"p":1,"td":1};
dojo.dnd._validOverflow={"auto":1,"scroll":1};
dojo.dnd.autoScrollNodes=function(e){
for(var n=e.target;n;){
if(n.nodeType==1&&(n.tagName.toLowerCase() in dojo.dnd._validNodes)){
var s=dojo.getComputedStyle(n);
if(s.overflow.toLowerCase() in dojo.dnd._validOverflow){
var b=dojo._getContentBox(n,s),t=dojo.position(n,true);
var w=Math.min(dojo.dnd.H_TRIGGER_AUTOSCROLL,b.w/2),h=Math.min(dojo.dnd.V_TRIGGER_AUTOSCROLL,b.h/2),rx=e.pageX-t.x,ry=e.pageY-t.y,dx=0,dy=0;
if(dojo.isWebKit||dojo.isOpera){
rx+=dojo.body().scrollLeft,ry+=dojo.body().scrollTop;
}
if(rx>0&&rx<b.w){
if(rx<w){
dx=-w;
}else{
if(rx>b.w-w){
dx=w;
}
}
}
if(ry>0&&ry<b.h){
if(ry<h){
dy=-h;
}else{
if(ry>b.h-h){
dy=h;
}
}
}
var _1=n.scrollLeft,_2=n.scrollTop;
n.scrollLeft=n.scrollLeft+dx;
n.scrollTop=n.scrollTop+dy;
if(_1!=n.scrollLeft||_2!=n.scrollTop){
return;
}
}
}
try{
n=n.parentNode;
}
catch(x){
n=null;
}
}
dojo.dnd.autoScroll(e);
};
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo.dnd.Mover"]){
dojo._hasResource["dojo.dnd.Mover"]=true;
dojo.provide("dojo.dnd.Mover");
dojo.require("dojo.dnd.common");
dojo.require("dojo.dnd.autoscroll");
dojo.declare("dojo.dnd.Mover",null,{constructor:function(_1,e,_2){
this.node=dojo.byId(_1);
this.marginBox={l:e.pageX,t:e.pageY};
this.mouseButton=e.button;
var h=this.host=_2,d=_1.ownerDocument,_3=dojo.connect(d,"onmousemove",this,"onFirstMove");
this.events=[dojo.connect(d,"onmousemove",this,"onMouseMove"),dojo.connect(d,"onmouseup",this,"onMouseUp"),dojo.connect(d,"ondragstart",dojo.stopEvent),dojo.connect(d.body,"onselectstart",dojo.stopEvent),_3];
if(h&&h.onMoveStart){
h.onMoveStart(this);
}
},onMouseMove:function(e){
dojo.dnd.autoScroll(e);
var m=this.marginBox;
this.host.onMove(this,{l:m.l+e.pageX,t:m.t+e.pageY},e);
dojo.stopEvent(e);
},onMouseUp:function(e){
if(dojo.isWebKit&&dojo.isMac&&this.mouseButton==2?e.button==0:this.mouseButton==e.button){
this.destroy();
}
dojo.stopEvent(e);
},onFirstMove:function(e){
var s=this.node.style,l,t,h=this.host;
switch(s.position){
case "relative":
case "absolute":
l=Math.round(parseFloat(s.left))||0;
t=Math.round(parseFloat(s.top))||0;
break;
default:
s.position="absolute";
var m=dojo.marginBox(this.node);
var b=dojo.doc.body;
var bs=dojo.getComputedStyle(b);
var bm=dojo._getMarginBox(b,bs);
var bc=dojo._getContentBox(b,bs);
l=m.l-(bc.l-bm.l);
t=m.t-(bc.t-bm.t);
break;
}
this.marginBox.l=l-this.marginBox.l;
this.marginBox.t=t-this.marginBox.t;
if(h&&h.onFirstMove){
h.onFirstMove(this,e);
}
dojo.disconnect(this.events.pop());
},destroy:function(){
dojo.forEach(this.events,dojo.disconnect);
var h=this.host;
if(h&&h.onMoveStop){
h.onMoveStop(this);
}
this.events=this.node=this.host=null;
}});
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo.dnd.Moveable"]){
dojo._hasResource["dojo.dnd.Moveable"]=true;
dojo.provide("dojo.dnd.Moveable");
dojo.require("dojo.dnd.Mover");
dojo.declare("dojo.dnd.Moveable",null,{handle:"",delay:0,skip:false,constructor:function(_1,_2){
this.node=dojo.byId(_1);
if(!_2){
_2={};
}
this.handle=_2.handle?dojo.byId(_2.handle):null;
if(!this.handle){
this.handle=this.node;
}
this.delay=_2.delay>0?_2.delay:0;
this.skip=_2.skip;
this.mover=_2.mover?_2.mover:dojo.dnd.Mover;
this.events=[dojo.connect(this.handle,"onmousedown",this,"onMouseDown"),dojo.connect(this.handle,"ondragstart",this,"onSelectStart"),dojo.connect(this.handle,"onselectstart",this,"onSelectStart")];
},markupFactory:function(_3,_4){
return new dojo.dnd.Moveable(_4,_3);
},destroy:function(){
dojo.forEach(this.events,dojo.disconnect);
this.events=this.node=this.handle=null;
},onMouseDown:function(e){
if(this.skip&&dojo.dnd.isFormElement(e)){
return;
}
if(this.delay){
this.events.push(dojo.connect(this.handle,"onmousemove",this,"onMouseMove"),dojo.connect(this.handle,"onmouseup",this,"onMouseUp"));
this._lastX=e.pageX;
this._lastY=e.pageY;
}else{
this.onDragDetected(e);
}
dojo.stopEvent(e);
},onMouseMove:function(e){
if(Math.abs(e.pageX-this._lastX)>this.delay||Math.abs(e.pageY-this._lastY)>this.delay){
this.onMouseUp(e);
this.onDragDetected(e);
}
dojo.stopEvent(e);
},onMouseUp:function(e){
for(var i=0;i<2;++i){
dojo.disconnect(this.events.pop());
}
dojo.stopEvent(e);
},onSelectStart:function(e){
if(!this.skip||!dojo.dnd.isFormElement(e)){
dojo.stopEvent(e);
}
},onDragDetected:function(e){
new this.mover(this.node,e,this);
},onMoveStart:function(_5){
dojo.publish("/dnd/move/start",[_5]);
dojo.addClass(dojo.body(),"dojoMove");
dojo.addClass(this.node,"dojoMoveItem");
},onMoveStop:function(_6){
dojo.publish("/dnd/move/stop",[_6]);
dojo.removeClass(dojo.body(),"dojoMove");
dojo.removeClass(this.node,"dojoMoveItem");
},onFirstMove:function(_7,e){
},onMove:function(_8,_9,e){
this.onMoving(_8,_9);
var s=_8.node.style;
s.left=_9.l+"px";
s.top=_9.t+"px";
this.onMoved(_8,_9);
},onMoving:function(_a,_b){
},onMoved:function(_c,_d){
}});
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo.fx.Toggler"]){
dojo._hasResource["dojo.fx.Toggler"]=true;
dojo.provide("dojo.fx.Toggler");
dojo.declare("dojo.fx.Toggler",null,{node:null,showFunc:dojo.fadeIn,hideFunc:dojo.fadeOut,showDuration:200,hideDuration:200,constructor:function(_1){
var _2=this;
dojo.mixin(_2,_1);
_2.node=_1.node;
_2._showArgs=dojo.mixin({},_1);
_2._showArgs.node=_2.node;
_2._showArgs.duration=_2.showDuration;
_2.showAnim=_2.showFunc(_2._showArgs);
_2._hideArgs=dojo.mixin({},_1);
_2._hideArgs.node=_2.node;
_2._hideArgs.duration=_2.hideDuration;
_2.hideAnim=_2.hideFunc(_2._hideArgs);
dojo.connect(_2.showAnim,"beforeBegin",dojo.hitch(_2.hideAnim,"stop",true));
dojo.connect(_2.hideAnim,"beforeBegin",dojo.hitch(_2.showAnim,"stop",true));
},show:function(_3){
return this.showAnim.play(_3||0);
},hide:function(_4){
return this.hideAnim.play(_4||0);
}});
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo.window"]){
dojo._hasResource["dojo.window"]=true;
dojo.provide("dojo.window");
dojo.window.getBox=function(){
var _1=(dojo.doc.compatMode=="BackCompat")?dojo.body():dojo.doc.documentElement;
var _2=dojo._docScroll();
return {w:_1.clientWidth,h:_1.clientHeight,l:_2.x,t:_2.y};
};
dojo.window.get=function(_3){
if(dojo.isIE&&window!==document.parentWindow){
_3.parentWindow.execScript("document._parentWindow = window;","Javascript");
var _4=_3._parentWindow;
_3._parentWindow=null;
return _4;
}
return _3.parentWindow||_3.defaultView;
};
dojo.window.scrollIntoView=function(_5,_6){
try{
_5=dojo.byId(_5);
var _7=_5.ownerDocument||dojo.doc,_8=_7.body||dojo.body(),_9=_7.documentElement||_8.parentNode,_a=dojo.isIE,_b=dojo.isWebKit;
if((!(dojo.isMoz||_a||_b||dojo.isOpera)||_5==_8||_5==_9)&&(typeof _5.scrollIntoView!="undefined")){
_5.scrollIntoView(false);
return;
}
var _c=_7.compatMode=="BackCompat",_d=_c?_8:_9,_e=_b?_8:_d,_f=_d.clientWidth,_10=_d.clientHeight,rtl=!dojo._isBodyLtr(),_11=_6||dojo.position(_5),el=_5.parentNode,_12=function(el){
return ((_a<=6||(_a&&_c))?false:(dojo.style(el,"position").toLowerCase()=="fixed"));
};
if(_12(_5)){
return;
}
while(el){
if(el==_8){
el=_e;
}
var _13=dojo.position(el),_14=_12(el);
if(el==_e){
_13.w=_f;
_13.h=_10;
if(_e==_9&&_a&&rtl){
_13.x+=_e.offsetWidth-_13.w;
}
if(_13.x<0||!_a){
_13.x=0;
}
if(_13.y<0||!_a){
_13.y=0;
}
}else{
var pb=dojo._getPadBorderExtents(el);
_13.w-=pb.w;
_13.h-=pb.h;
_13.x+=pb.l;
_13.y+=pb.t;
}
if(el!=_e){
var _15=el.clientWidth,_16=_13.w-_15;
if(_15>0&&_16>0){
_13.w=_15;
if(_a&&rtl){
_13.x+=_16;
}
}
_15=el.clientHeight;
_16=_13.h-_15;
if(_15>0&&_16>0){
_13.h=_15;
}
}
if(_14){
if(_13.y<0){
_13.h+=_13.y;
_13.y=0;
}
if(_13.x<0){
_13.w+=_13.x;
_13.x=0;
}
if(_13.y+_13.h>_10){
_13.h=_10-_13.y;
}
if(_13.x+_13.w>_f){
_13.w=_f-_13.x;
}
}
var l=_11.x-_13.x,t=_11.y-Math.max(_13.y,0),r=l+_11.w-_13.w,bot=t+_11.h-_13.h;
if(r*l>0){
var s=Math[l<0?"max":"min"](l,r);
_11.x+=el.scrollLeft;
el.scrollLeft+=(_a>=8&&!_c&&rtl)?-s:s;
_11.x-=el.scrollLeft;
}
if(bot*t>0){
_11.y+=el.scrollTop;
el.scrollTop+=Math[t<0?"max":"min"](t,bot);
_11.y-=el.scrollTop;
}
el=(el!=_e)&&!_14&&el.parentNode;
}
}
catch(error){
console.error("scrollIntoView: "+error);
_5.scrollIntoView(false);
}
};
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit._base.manager"]){
dojo._hasResource["dijit._base.manager"]=true;
dojo.provide("dijit._base.manager");
dojo.declare("dijit.WidgetSet",null,{constructor:function(){
this._hash={};
this.length=0;
},add:function(_1){
if(this._hash[_1.id]){
throw new Error("Tried to register widget with id=="+_1.id+" but that id is already registered");
}
this._hash[_1.id]=_1;
this.length++;
},remove:function(id){
if(this._hash[id]){
delete this._hash[id];
this.length--;
}
},forEach:function(_2,_3){
_3=_3||dojo.global;
var i=0,id;
for(id in this._hash){
_2.call(_3,this._hash[id],i++,this._hash);
}
return this;
},filter:function(_4,_5){
_5=_5||dojo.global;
var _6=new dijit.WidgetSet(),i=0,id;
for(id in this._hash){
var w=this._hash[id];
if(_4.call(_5,w,i++,this._hash)){
_6.add(w);
}
}
return _6;
},byId:function(id){
return this._hash[id];
},byClass:function(_7){
var _8=new dijit.WidgetSet(),id,_9;
for(id in this._hash){
_9=this._hash[id];
if(_9.declaredClass==_7){
_8.add(_9);
}
}
return _8;
},toArray:function(){
var ar=[];
for(var id in this._hash){
ar.push(this._hash[id]);
}
return ar;
},map:function(_a,_b){
return dojo.map(this.toArray(),_a,_b);
},every:function(_c,_d){
_d=_d||dojo.global;
var x=0,i;
for(i in this._hash){
if(!_c.call(_d,this._hash[i],x++,this._hash)){
return false;
}
}
return true;
},some:function(_e,_f){
_f=_f||dojo.global;
var x=0,i;
for(i in this._hash){
if(_e.call(_f,this._hash[i],x++,this._hash)){
return true;
}
}
return false;
}});
(function(){
dijit.registry=new dijit.WidgetSet();
var _10=dijit.registry._hash,_11=dojo.attr,_12=dojo.hasAttr,_13=dojo.style;
dijit.byId=function(id){
return typeof id=="string"?_10[id]:id;
};
var _14={};
dijit.getUniqueId=function(_15){
var id;
do{
id=_15+"_"+(_15 in _14?++_14[_15]:_14[_15]=0);
}while(_10[id]);
return dijit._scopeName=="dijit"?id:dijit._scopeName+"_"+id;
};
dijit.findWidgets=function(_16){
var _17=[];
function _18(_19){
for(var _1a=_19.firstChild;_1a;_1a=_1a.nextSibling){
if(_1a.nodeType==1){
var _1b=_1a.getAttribute("widgetId");
if(_1b){
_17.push(_10[_1b]);
}else{
_18(_1a);
}
}
}
};
_18(_16);
return _17;
};
dijit._destroyAll=function(){
dijit._curFocus=null;
dijit._prevFocus=null;
dijit._activeStack=[];
dojo.forEach(dijit.findWidgets(dojo.body()),function(_1c){
if(!_1c._destroyed){
if(_1c.destroyRecursive){
_1c.destroyRecursive();
}else{
if(_1c.destroy){
_1c.destroy();
}
}
}
});
};
if(dojo.isIE){
dojo.addOnWindowUnload(function(){
dijit._destroyAll();
});
}
dijit.byNode=function(_1d){
return _10[_1d.getAttribute("widgetId")];
};
dijit.getEnclosingWidget=function(_1e){
while(_1e){
var id=_1e.getAttribute&&_1e.getAttribute("widgetId");
if(id){
return _10[id];
}
_1e=_1e.parentNode;
}
return null;
};
var _1f=(dijit._isElementShown=function(_20){
var s=_13(_20);
return (s.visibility!="hidden")&&(s.visibility!="collapsed")&&(s.display!="none")&&(_11(_20,"type")!="hidden");
});
dijit.hasDefaultTabStop=function(_21){
switch(_21.nodeName.toLowerCase()){
case "a":
return _12(_21,"href");
case "area":
case "button":
case "input":
case "object":
case "select":
case "textarea":
return true;
case "iframe":
if(dojo.isMoz){
try{
return _21.contentDocument.designMode=="on";
}
catch(err){
return false;
}
}else{
if(dojo.isWebKit){
var doc=_21.contentDocument,_22=doc&&doc.body;
return _22&&_22.contentEditable=="true";
}else{
try{
doc=_21.contentWindow.document;
_22=doc&&doc.body;
return _22&&_22.firstChild&&_22.firstChild.contentEditable=="true";
}
catch(e){
return false;
}
}
}
default:
return _21.contentEditable=="true";
}
};
var _23=(dijit.isTabNavigable=function(_24){
if(_11(_24,"disabled")){
return false;
}else{
if(_12(_24,"tabIndex")){
return _11(_24,"tabIndex")>=0;
}else{
return dijit.hasDefaultTabStop(_24);
}
}
});
dijit._getTabNavigable=function(_25){
var _26,_27,_28,_29,_2a,_2b;
var _2c=function(_2d){
dojo.query("> *",_2d).forEach(function(_2e){
if((dojo.isIE&&_2e.scopeName!=="HTML")||!_1f(_2e)){
return;
}
if(_23(_2e)){
var _2f=_11(_2e,"tabIndex");
if(!_12(_2e,"tabIndex")||_2f==0){
if(!_26){
_26=_2e;
}
_27=_2e;
}else{
if(_2f>0){
if(!_28||_2f<_29){
_29=_2f;
_28=_2e;
}
if(!_2a||_2f>=_2b){
_2b=_2f;
_2a=_2e;
}
}
}
}
if(_2e.nodeName.toUpperCase()!="SELECT"){
_2c(_2e);
}
});
};
if(_1f(_25)){
_2c(_25);
}
return {first:_26,last:_27,lowest:_28,highest:_2a};
};
dijit.getFirstInTabbingOrder=function(_30){
var _31=dijit._getTabNavigable(dojo.byId(_30));
return _31.lowest?_31.lowest:_31.first;
};
dijit.getLastInTabbingOrder=function(_32){
var _33=dijit._getTabNavigable(dojo.byId(_32));
return _33.last?_33.last:_33.highest;
};
dijit.defaultDuration=dojo.config["defaultDuration"]||200;
})();
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo.AdapterRegistry"]){
dojo._hasResource["dojo.AdapterRegistry"]=true;
dojo.provide("dojo.AdapterRegistry");
dojo.AdapterRegistry=function(_1){
this.pairs=[];
this.returnWrappers=_1||false;
};
dojo.extend(dojo.AdapterRegistry,{register:function(_2,_3,_4,_5,_6){
this.pairs[((_6)?"unshift":"push")]([_2,_3,_4,_5]);
},match:function(){
for(var i=0;i<this.pairs.length;i++){
var _7=this.pairs[i];
if(_7[1].apply(this,arguments)){
if((_7[3])||(this.returnWrappers)){
return _7[2];
}else{
return _7[2].apply(this,arguments);
}
}
}
throw new Error("No match found");
},unregister:function(_8){
for(var i=0;i<this.pairs.length;i++){
var _9=this.pairs[i];
if(_9[0]==_8){
this.pairs.splice(i,1);
return true;
}
}
return false;
}});
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit._base.focus"]){
dojo._hasResource["dijit._base.focus"]=true;
dojo.provide("dijit._base.focus");
dojo.require("dojo.window");
dojo.require("dijit._base.manager");
dojo.mixin(dijit,{_curFocus:null,_prevFocus:null,isCollapsed:function(){
return dijit.getBookmark().isCollapsed;
},getBookmark:function(){
var bm,rg,tg,_1=dojo.doc.selection,cf=dijit._curFocus;
if(dojo.global.getSelection){
_1=dojo.global.getSelection();
if(_1){
if(_1.isCollapsed){
tg=cf?cf.tagName:"";
if(tg){
tg=tg.toLowerCase();
if(tg=="textarea"||(tg=="input"&&(!cf.type||cf.type.toLowerCase()=="text"))){
_1={start:cf.selectionStart,end:cf.selectionEnd,node:cf,pRange:true};
return {isCollapsed:(_1.end<=_1.start),mark:_1};
}
}
bm={isCollapsed:true};
}else{
rg=_1.getRangeAt(0);
bm={isCollapsed:false,mark:rg.cloneRange()};
}
}
}else{
if(_1){
tg=cf?cf.tagName:"";
tg=tg.toLowerCase();
if(cf&&tg&&(tg=="button"||tg=="textarea"||tg=="input")){
if(_1.type&&_1.type.toLowerCase()=="none"){
return {isCollapsed:true,mark:null};
}else{
rg=_1.createRange();
return {isCollapsed:rg.text&&rg.text.length?false:true,mark:{range:rg,pRange:true}};
}
}
bm={};
try{
rg=_1.createRange();
bm.isCollapsed=!(_1.type=="Text"?rg.htmlText.length:rg.length);
}
catch(e){
bm.isCollapsed=true;
return bm;
}
if(_1.type.toUpperCase()=="CONTROL"){
if(rg.length){
bm.mark=[];
var i=0,_2=rg.length;
while(i<_2){
bm.mark.push(rg.item(i++));
}
}else{
bm.isCollapsed=true;
bm.mark=null;
}
}else{
bm.mark=rg.getBookmark();
}
}else{
console.warn("No idea how to store the current selection for this browser!");
}
}
return bm;
},moveToBookmark:function(_3){
var _4=dojo.doc,_5=_3.mark;
if(_5){
if(dojo.global.getSelection){
var _6=dojo.global.getSelection();
if(_6&&_6.removeAllRanges){
if(_5.pRange){
var r=_5;
var n=r.node;
n.selectionStart=r.start;
n.selectionEnd=r.end;
}else{
_6.removeAllRanges();
_6.addRange(_5);
}
}else{
console.warn("No idea how to restore selection for this browser!");
}
}else{
if(_4.selection&&_5){
var rg;
if(_5.pRange){
rg=_5.range;
}else{
if(dojo.isArray(_5)){
rg=_4.body.createControlRange();
dojo.forEach(_5,function(n){
rg.addElement(n);
});
}else{
rg=_4.body.createTextRange();
rg.moveToBookmark(_5);
}
}
rg.select();
}
}
}
},getFocus:function(_7,_8){
var _9=!dijit._curFocus||(_7&&dojo.isDescendant(dijit._curFocus,_7.domNode))?dijit._prevFocus:dijit._curFocus;
return {node:_9,bookmark:(_9==dijit._curFocus)&&dojo.withGlobal(_8||dojo.global,dijit.getBookmark),openedForWindow:_8};
},focus:function(_a){
if(!_a){
return;
}
var _b="node" in _a?_a.node:_a,_c=_a.bookmark,_d=_a.openedForWindow,_e=_c?_c.isCollapsed:false;
if(_b){
var _f=(_b.tagName.toLowerCase()=="iframe")?_b.contentWindow:_b;
if(_f&&_f.focus){
try{
_f.focus();
}
catch(e){
}
}
dijit._onFocusNode(_b);
}
if(_c&&dojo.withGlobal(_d||dojo.global,dijit.isCollapsed)&&!_e){
if(_d){
_d.focus();
}
try{
dojo.withGlobal(_d||dojo.global,dijit.moveToBookmark,null,[_c]);
}
catch(e2){
}
}
},_activeStack:[],registerIframe:function(_10){
return dijit.registerWin(_10.contentWindow,_10);
},unregisterIframe:function(_11){
dijit.unregisterWin(_11);
},registerWin:function(_12,_13){
var _14=function(evt){
dijit._justMouseDowned=true;
setTimeout(function(){
dijit._justMouseDowned=false;
},0);
if(dojo.isIE&&evt&&evt.srcElement&&evt.srcElement.parentNode==null){
return;
}
dijit._onTouchNode(_13||evt.target||evt.srcElement,"mouse");
};
var doc=dojo.isIE?_12.document.documentElement:_12.document;
if(doc){
if(dojo.isIE){
doc.attachEvent("onmousedown",_14);
var _15=function(evt){
if(evt.srcElement.tagName.toLowerCase()!="#document"&&dijit.isTabNavigable(evt.srcElement)){
dijit._onFocusNode(_13||evt.srcElement);
}else{
dijit._onTouchNode(_13||evt.srcElement);
}
};
doc.attachEvent("onactivate",_15);
var _16=function(evt){
dijit._onBlurNode(_13||evt.srcElement);
};
doc.attachEvent("ondeactivate",_16);
return function(){
doc.detachEvent("onmousedown",_14);
doc.detachEvent("onactivate",_15);
doc.detachEvent("ondeactivate",_16);
doc=null;
};
}else{
doc.addEventListener("mousedown",_14,true);
var _17=function(evt){
dijit._onFocusNode(_13||evt.target);
};
doc.addEventListener("focus",_17,true);
var _18=function(evt){
dijit._onBlurNode(_13||evt.target);
};
doc.addEventListener("blur",_18,true);
return function(){
doc.removeEventListener("mousedown",_14,true);
doc.removeEventListener("focus",_17,true);
doc.removeEventListener("blur",_18,true);
doc=null;
};
}
}
},unregisterWin:function(_19){
_19&&_19();
},_onBlurNode:function(_1a){
dijit._prevFocus=dijit._curFocus;
dijit._curFocus=null;
if(dijit._justMouseDowned){
return;
}
if(dijit._clearActiveWidgetsTimer){
clearTimeout(dijit._clearActiveWidgetsTimer);
}
dijit._clearActiveWidgetsTimer=setTimeout(function(){
delete dijit._clearActiveWidgetsTimer;
dijit._setStack([]);
dijit._prevFocus=null;
},100);
},_onTouchNode:function(_1b,by){
if(dijit._clearActiveWidgetsTimer){
clearTimeout(dijit._clearActiveWidgetsTimer);
delete dijit._clearActiveWidgetsTimer;
}
var _1c=[];
try{
while(_1b){
var _1d=dojo.attr(_1b,"dijitPopupParent");
if(_1d){
_1b=dijit.byId(_1d).domNode;
}else{
if(_1b.tagName&&_1b.tagName.toLowerCase()=="body"){
if(_1b===dojo.body()){
break;
}
_1b=dojo.window.get(_1b.ownerDocument).frameElement;
}else{
var id=_1b.getAttribute&&_1b.getAttribute("widgetId"),_1e=id&&dijit.byId(id);
if(_1e&&!(by=="mouse"&&_1e.get("disabled"))){
_1c.unshift(id);
}
_1b=_1b.parentNode;
}
}
}
}
catch(e){
}
dijit._setStack(_1c,by);
},_onFocusNode:function(_1f){
if(!_1f){
return;
}
if(_1f.nodeType==9){
return;
}
dijit._onTouchNode(_1f);
if(_1f==dijit._curFocus){
return;
}
if(dijit._curFocus){
dijit._prevFocus=dijit._curFocus;
}
dijit._curFocus=_1f;
dojo.publish("focusNode",[_1f]);
},_setStack:function(_20,by){
var _21=dijit._activeStack;
dijit._activeStack=_20;
for(var _22=0;_22<Math.min(_21.length,_20.length);_22++){
if(_21[_22]!=_20[_22]){
break;
}
}
var _23;
for(var i=_21.length-1;i>=_22;i--){
_23=dijit.byId(_21[i]);
if(_23){
_23._focused=false;
_23._hasBeenBlurred=true;
if(_23._onBlur){
_23._onBlur(by);
}
dojo.publish("widgetBlur",[_23,by]);
}
}
for(i=_22;i<_20.length;i++){
_23=dijit.byId(_20[i]);
if(_23){
_23._focused=true;
if(_23._onFocus){
_23._onFocus(by);
}
dojo.publish("widgetFocus",[_23,by]);
}
}
}});
dojo.addOnLoad(function(){
var _24=dijit.registerWin(window);
if(dojo.isIE){
dojo.addOnWindowUnload(function(){
dijit.unregisterWin(_24);
_24=null;
});
}
});
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit._base.place"]){
dojo._hasResource["dijit._base.place"]=true;
dojo.provide("dijit._base.place");
dojo.require("dojo.window");
dojo.require("dojo.AdapterRegistry");
dijit.getViewport=function(){
return dojo.window.getBox();
};
dijit.placeOnScreen=function(_1,_2,_3,_4){
var _5=dojo.map(_3,function(_6){
var c={corner:_6,pos:{x:_2.x,y:_2.y}};
if(_4){
c.pos.x+=_6.charAt(1)=="L"?_4.x:-_4.x;
c.pos.y+=_6.charAt(0)=="T"?_4.y:-_4.y;
}
return c;
});
return dijit._place(_1,_5);
};
dijit._place=function(_7,_8,_9){
var _a=dojo.window.getBox();
if(!_7.parentNode||String(_7.parentNode.tagName).toLowerCase()!="body"){
dojo.body().appendChild(_7);
}
var _b=null;
dojo.some(_8,function(_c){
var _d=_c.corner;
var _e=_c.pos;
if(_9){
_9(_7,_c.aroundCorner,_d);
}
var _f=_7.style;
var _10=_f.display;
var _11=_f.visibility;
_f.visibility="hidden";
_f.display="";
var mb=dojo.marginBox(_7);
_f.display=_10;
_f.visibility=_11;
var _12=Math.max(_a.l,_d.charAt(1)=="L"?_e.x:(_e.x-mb.w)),_13=Math.max(_a.t,_d.charAt(0)=="T"?_e.y:(_e.y-mb.h)),_14=Math.min(_a.l+_a.w,_d.charAt(1)=="L"?(_12+mb.w):_e.x),_15=Math.min(_a.t+_a.h,_d.charAt(0)=="T"?(_13+mb.h):_e.y),_16=_14-_12,_17=_15-_13,_18=(mb.w-_16)+(mb.h-_17);
if(_b==null||_18<_b.overflow){
_b={corner:_d,aroundCorner:_c.aroundCorner,x:_12,y:_13,w:_16,h:_17,overflow:_18};
}
return !_18;
});
_7.style.left=_b.x+"px";
_7.style.top=_b.y+"px";
if(_b.overflow&&_9){
_9(_7,_b.aroundCorner,_b.corner);
}
return _b;
};
dijit.placeOnScreenAroundNode=function(_19,_1a,_1b,_1c){
_1a=dojo.byId(_1a);
var _1d=_1a.style.display;
_1a.style.display="";
var _1e=dojo.position(_1a,true);
_1a.style.display=_1d;
return dijit._placeOnScreenAroundRect(_19,_1e.x,_1e.y,_1e.w,_1e.h,_1b,_1c);
};
dijit.placeOnScreenAroundRectangle=function(_1f,_20,_21,_22){
return dijit._placeOnScreenAroundRect(_1f,_20.x,_20.y,_20.width,_20.height,_21,_22);
};
dijit._placeOnScreenAroundRect=function(_23,x,y,_24,_25,_26,_27){
var _28=[];
for(var _29 in _26){
_28.push({aroundCorner:_29,corner:_26[_29],pos:{x:x+(_29.charAt(1)=="L"?0:_24),y:y+(_29.charAt(0)=="T"?0:_25)}});
}
return dijit._place(_23,_28,_27);
};
dijit.placementRegistry=new dojo.AdapterRegistry();
dijit.placementRegistry.register("node",function(n,x){
return typeof x=="object"&&typeof x.offsetWidth!="undefined"&&typeof x.offsetHeight!="undefined";
},dijit.placeOnScreenAroundNode);
dijit.placementRegistry.register("rect",function(n,x){
return typeof x=="object"&&"x" in x&&"y" in x&&"width" in x&&"height" in x;
},dijit.placeOnScreenAroundRectangle);
dijit.placeOnScreenAroundElement=function(_2a,_2b,_2c,_2d){
return dijit.placementRegistry.match.apply(dijit.placementRegistry,arguments);
};
dijit.getPopupAroundAlignment=function(_2e,_2f){
var _30={};
dojo.forEach(_2e,function(pos){
switch(pos){
case "after":
_30[_2f?"BR":"BL"]=_2f?"BL":"BR";
break;
case "before":
_30[_2f?"BL":"BR"]=_2f?"BR":"BL";
break;
case "below":
_30[_2f?"BL":"BR"]=_2f?"TL":"TR";
_30[_2f?"BR":"BL"]=_2f?"TR":"TL";
break;
case "above":
default:
_30[_2f?"TL":"TR"]=_2f?"BL":"BR";
_30[_2f?"TR":"TL"]=_2f?"BR":"BL";
break;
}
});
return _30;
};
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit._base.window"]){
dojo._hasResource["dijit._base.window"]=true;
dojo.provide("dijit._base.window");
dojo.require("dojo.window");
dijit.getDocumentWindow=function(_1){
return dojo.window.get(_1);
};
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo.uacss"]){
dojo._hasResource["dojo.uacss"]=true;
dojo.provide("dojo.uacss");
(function(){
var d=dojo,_1=d.doc.documentElement,ie=d.isIE,_2=d.isOpera,_3=Math.floor,ff=d.isFF,_4=d.boxModel.replace(/-/,""),_5={dj_ie:ie,dj_ie6:_3(ie)==6,dj_ie7:_3(ie)==7,dj_ie8:_3(ie)==8,dj_quirks:d.isQuirks,dj_iequirks:ie&&d.isQuirks,dj_opera:_2,dj_khtml:d.isKhtml,dj_webkit:d.isWebKit,dj_safari:d.isSafari,dj_chrome:d.isChrome,dj_gecko:d.isMozilla,dj_ff3:_3(ff)==3};
_5["dj_"+_4]=true;
var _6="";
for(var _7 in _5){
if(_5[_7]){
_6+=_7+" ";
}
}
_1.className=d.trim(_1.className+" "+_6);
dojo._loaders.unshift(function(){
if(!dojo._isBodyLtr()){
var _8="dj_rtl dijitRtl "+_6.replace(/ /g,"-rtl ");
_1.className=d.trim(_1.className+" "+_8);
}
});
})();
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit._base.popup"]){
dojo._hasResource["dijit._base.popup"]=true;
dojo.provide("dijit._base.popup");
dojo.require("dijit._base.focus");
dojo.require("dijit._base.place");
dojo.require("dijit._base.window");
dijit.popup={_stack:[],_beginZIndex:1000,_idGen:1,moveOffScreen:function(_1){
var _2=_1.parentNode;
if(!_2||!dojo.hasClass(_2,"dijitPopup")){
_2=dojo.create("div",{"class":"dijitPopup",style:{visibility:"hidden",top:"-9999px"}},dojo.body());
dijit.setWaiRole(_2,"presentation");
_2.appendChild(_1);
}
var s=_1.style;
s.display="";
s.visibility="";
s.position="";
s.top="0px";
dojo.style(_2,{visibility:"hidden",top:"-9999px"});
},getTopPopup:function(){
var _3=this._stack;
for(var pi=_3.length-1;pi>0&&_3[pi].parent===_3[pi-1].widget;pi--){
}
return _3[pi];
},open:function(_4){
var _5=this._stack,_6=_4.popup,_7=_4.orient||((_4.parent?_4.parent.isLeftToRight():dojo._isBodyLtr())?{"BL":"TL","BR":"TR","TL":"BL","TR":"BR"}:{"BR":"TR","BL":"TL","TR":"BR","TL":"BL"}),_8=_4.around,id=(_4.around&&_4.around.id)?(_4.around.id+"_dropdown"):("popup_"+this._idGen++);
var _9=_6.domNode.parentNode;
if(!_9||!dojo.hasClass(_9,"dijitPopup")){
this.moveOffScreen(_6.domNode);
_9=_6.domNode.parentNode;
}
dojo.attr(_9,{id:id,style:{zIndex:this._beginZIndex+_5.length},"class":"dijitPopup "+(_6.baseClass||_6["class"]||"").split(" ")[0]+"Popup",dijitPopupParent:_4.parent?_4.parent.id:""});
if(dojo.isIE||dojo.isMoz){
var _a=_9.childNodes[1];
if(!_a){
_a=new dijit.BackgroundIframe(_9);
}
}
var _b=_8?dijit.placeOnScreenAroundElement(_9,_8,_7,_6.orient?dojo.hitch(_6,"orient"):null):dijit.placeOnScreen(_9,_4,_7=="R"?["TR","BR","TL","BL"]:["TL","BL","TR","BR"],_4.padding);
_9.style.visibility="visible";
_6.domNode.style.visibility="visible";
var _c=[];
_c.push(dojo.connect(_9,"onkeypress",this,function(_d){
if(_d.charOrCode==dojo.keys.ESCAPE&&_4.onCancel){
dojo.stopEvent(_d);
_4.onCancel();
}else{
if(_d.charOrCode===dojo.keys.TAB){
dojo.stopEvent(_d);
var _e=this.getTopPopup();
if(_e&&_e.onCancel){
_e.onCancel();
}
}
}
}));
if(_6.onCancel){
_c.push(dojo.connect(_6,"onCancel",_4.onCancel));
}
_c.push(dojo.connect(_6,_6.onExecute?"onExecute":"onChange",this,function(){
var _f=this.getTopPopup();
if(_f&&_f.onExecute){
_f.onExecute();
}
}));
_5.push({wrapper:_9,iframe:_a,widget:_6,parent:_4.parent,onExecute:_4.onExecute,onCancel:_4.onCancel,onClose:_4.onClose,handlers:_c});
if(_6.onOpen){
_6.onOpen(_b);
}
return _b;
},close:function(_10){
var _11=this._stack;
while(dojo.some(_11,function(_12){
return _12.widget==_10;
})){
var top=_11.pop(),_13=top.wrapper,_14=top.iframe,_15=top.widget,_16=top.onClose;
if(_15.onClose){
_15.onClose();
}
dojo.forEach(top.handlers,dojo.disconnect);
if(_15&&_15.domNode){
this.moveOffScreen(_15.domNode);
}else{
dojo.destroy(_13);
}
if(_16){
_16();
}
}
}};
dijit._frames=new function(){
var _17=[];
this.pop=function(){
var _18;
if(_17.length){
_18=_17.pop();
_18.style.display="";
}else{
if(dojo.isIE){
var _19=dojo.config["dojoBlankHtmlUrl"]||(dojo.moduleUrl("dojo","resources/blank.html")+"")||"javascript:\"\"";
var _1a="<iframe src='"+_19+"'"+" style='position: absolute; left: 0px; top: 0px;"+"z-index: -1; filter:Alpha(Opacity=\"0\");'>";
_18=dojo.doc.createElement(_1a);
}else{
_18=dojo.create("iframe");
_18.src="javascript:\"\"";
_18.className="dijitBackgroundIframe";
dojo.style(_18,"opacity",0.1);
}
_18.tabIndex=-1;
dijit.setWaiRole(_18,"presentation");
}
return _18;
};
this.push=function(_1b){
_1b.style.display="none";
_17.push(_1b);
};
}();
dijit.BackgroundIframe=function(_1c){
if(!_1c.id){
throw new Error("no id");
}
if(dojo.isIE||dojo.isMoz){
var _1d=dijit._frames.pop();
_1c.appendChild(_1d);
if(dojo.isIE<7){
this.resize(_1c);
this._conn=dojo.connect(_1c,"onresize",this,function(){
this.resize(_1c);
});
}else{
dojo.style(_1d,{width:"100%",height:"100%"});
}
this.iframe=_1d;
}
};
dojo.extend(dijit.BackgroundIframe,{resize:function(_1e){
if(this.iframe&&dojo.isIE<7){
dojo.style(this.iframe,{width:_1e.offsetWidth+"px",height:_1e.offsetHeight+"px"});
}
},destroy:function(){
if(this._conn){
dojo.disconnect(this._conn);
this._conn=null;
}
if(this.iframe){
dijit._frames.push(this.iframe);
delete this.iframe;
}
}});
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit._base.scroll"]){
dojo._hasResource["dijit._base.scroll"]=true;
dojo.provide("dijit._base.scroll");
dojo.require("dojo.window");
dijit.scrollIntoView=function(_1,_2){
dojo.window.scrollIntoView(_1,_2);
};
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit._base.sniff"]){
dojo._hasResource["dijit._base.sniff"]=true;
dojo.provide("dijit._base.sniff");
dojo.require("dojo.uacss");
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit._base.typematic"]){
dojo._hasResource["dijit._base.typematic"]=true;
dojo.provide("dijit._base.typematic");
dijit.typematic={_fireEventAndReload:function(){
this._timer=null;
this._callback(++this._count,this._node,this._evt);
this._currentTimeout=Math.max(this._currentTimeout<0?this._initialDelay:(this._subsequentDelay>1?this._subsequentDelay:Math.round(this._currentTimeout*this._subsequentDelay)),this._minDelay);
this._timer=setTimeout(dojo.hitch(this,"_fireEventAndReload"),this._currentTimeout);
},trigger:function(_1,_2,_3,_4,_5,_6,_7,_8){
if(_5!=this._obj){
this.stop();
this._initialDelay=_7||500;
this._subsequentDelay=_6||0.9;
this._minDelay=_8||10;
this._obj=_5;
this._evt=_1;
this._node=_3;
this._currentTimeout=-1;
this._count=-1;
this._callback=dojo.hitch(_2,_4);
this._fireEventAndReload();
this._evt=dojo.mixin({faux:true},_1);
}
},stop:function(){
if(this._timer){
clearTimeout(this._timer);
this._timer=null;
}
if(this._obj){
this._callback(-1,this._node,this._evt);
this._obj=null;
}
},addKeyListener:function(_9,_a,_b,_c,_d,_e,_f){
if(_a.keyCode){
_a.charOrCode=_a.keyCode;
dojo.deprecated("keyCode attribute parameter for dijit.typematic.addKeyListener is deprecated. Use charOrCode instead.","","2.0");
}else{
if(_a.charCode){
_a.charOrCode=String.fromCharCode(_a.charCode);
dojo.deprecated("charCode attribute parameter for dijit.typematic.addKeyListener is deprecated. Use charOrCode instead.","","2.0");
}
}
return [dojo.connect(_9,"onkeypress",this,function(evt){
if(evt.charOrCode==_a.charOrCode&&(_a.ctrlKey===undefined||_a.ctrlKey==evt.ctrlKey)&&(_a.altKey===undefined||_a.altKey==evt.altKey)&&(_a.metaKey===undefined||_a.metaKey==(evt.metaKey||false))&&(_a.shiftKey===undefined||_a.shiftKey==evt.shiftKey)){
dojo.stopEvent(evt);
dijit.typematic.trigger(evt,_b,_9,_c,_a,_d,_e,_f);
}else{
if(dijit.typematic._obj==_a){
dijit.typematic.stop();
}
}
}),dojo.connect(_9,"onkeyup",this,function(evt){
if(dijit.typematic._obj==_a){
dijit.typematic.stop();
}
})];
},addMouseListener:function(_10,_11,_12,_13,_14,_15){
var dc=dojo.connect;
return [dc(_10,"mousedown",this,function(evt){
dojo.stopEvent(evt);
dijit.typematic.trigger(evt,_11,_10,_12,_10,_13,_14,_15);
}),dc(_10,"mouseup",this,function(evt){
dojo.stopEvent(evt);
dijit.typematic.stop();
}),dc(_10,"mouseout",this,function(evt){
dojo.stopEvent(evt);
dijit.typematic.stop();
}),dc(_10,"mousemove",this,function(evt){
evt.preventDefault();
}),dc(_10,"dblclick",this,function(evt){
dojo.stopEvent(evt);
if(dojo.isIE){
dijit.typematic.trigger(evt,_11,_10,_12,_10,_13,_14,_15);
setTimeout(dojo.hitch(this,dijit.typematic.stop),50);
}
})];
},addListener:function(_16,_17,_18,_19,_1a,_1b,_1c,_1d){
return this.addKeyListener(_17,_18,_19,_1a,_1b,_1c,_1d).concat(this.addMouseListener(_16,_19,_1a,_1b,_1c,_1d));
}};
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit._base.wai"]){
dojo._hasResource["dijit._base.wai"]=true;
dojo.provide("dijit._base.wai");
dijit.wai={onload:function(){
var _1=dojo.create("div",{id:"a11yTestNode",style:{cssText:"border: 1px solid;"+"border-color:red green;"+"position: absolute;"+"height: 5px;"+"top: -999px;"+"background-image: url(\""+(dojo.config.blankGif||dojo.moduleUrl("dojo","resources/blank.gif"))+"\");"}},dojo.body());
var cs=dojo.getComputedStyle(_1);
if(cs){
var _2=cs.backgroundImage;
var _3=(cs.borderTopColor==cs.borderRightColor)||(_2!=null&&(_2=="none"||_2=="url(invalid-url:)"));
dojo[_3?"addClass":"removeClass"](dojo.body(),"dijit_a11y");
if(dojo.isIE){
_1.outerHTML="";
}else{
dojo.body().removeChild(_1);
}
}
}};
if(dojo.isIE||dojo.isMoz){
dojo._loaders.unshift(dijit.wai.onload);
}
dojo.mixin(dijit,{_XhtmlRoles:/banner|contentinfo|definition|main|navigation|search|note|secondary|seealso/,hasWaiRole:function(_4,_5){
var _6=this.getWaiRole(_4);
return _5?(_6.indexOf(_5)>-1):(_6.length>0);
},getWaiRole:function(_7){
return dojo.trim((dojo.attr(_7,"role")||"").replace(this._XhtmlRoles,"").replace("wairole:",""));
},setWaiRole:function(_8,_9){
var _a=dojo.attr(_8,"role")||"";
if(!this._XhtmlRoles.test(_a)){
dojo.attr(_8,"role",_9);
}else{
if((" "+_a+" ").indexOf(" "+_9+" ")<0){
var _b=dojo.trim(_a.replace(this._XhtmlRoles,""));
var _c=dojo.trim(_a.replace(_b,""));
dojo.attr(_8,"role",_c+(_c?" ":"")+_9);
}
}
},removeWaiRole:function(_d,_e){
var _f=dojo.attr(_d,"role");
if(!_f){
return;
}
if(_e){
var t=dojo.trim((" "+_f+" ").replace(" "+_e+" "," "));
dojo.attr(_d,"role",t);
}else{
_d.removeAttribute("role");
}
},hasWaiState:function(_10,_11){
return _10.hasAttribute?_10.hasAttribute("aria-"+_11):!!_10.getAttribute("aria-"+_11);
},getWaiState:function(_12,_13){
return _12.getAttribute("aria-"+_13)||"";
},setWaiState:function(_14,_15,_16){
_14.setAttribute("aria-"+_15,_16);
},removeWaiState:function(_17,_18){
_17.removeAttribute("aria-"+_18);
}});
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit._base"]){
dojo._hasResource["dijit._base"]=true;
dojo.provide("dijit._base");
dojo.require("dijit._base.focus");
dojo.require("dijit._base.manager");
dojo.require("dijit._base.place");
dojo.require("dijit._base.popup");
dojo.require("dijit._base.scroll");
dojo.require("dijit._base.sniff");
dojo.require("dijit._base.typematic");
dojo.require("dijit._base.wai");
dojo.require("dijit._base.window");
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit._Widget"]){
dojo._hasResource["dijit._Widget"]=true;
dojo.provide("dijit._Widget");
dojo.require("dijit._base");
dojo.connect(dojo,"_connect",function(_1,_2){
if(_1&&dojo.isFunction(_1._onConnect)){
_1._onConnect(_2);
}
});
dijit._connectOnUseEventHandler=function(_3){
};
dijit._lastKeyDownNode=null;
if(dojo.isIE){
(function(){
var _4=function(_5){
dijit._lastKeyDownNode=_5.srcElement;
};
dojo.doc.attachEvent("onkeydown",_4);
dojo.addOnWindowUnload(function(){
dojo.doc.detachEvent("onkeydown",_4);
});
})();
}else{
dojo.doc.addEventListener("keydown",function(_6){
dijit._lastKeyDownNode=_6.target;
},true);
}
(function(){
var _7={},_8=function(_9){
var dc=_9.declaredClass;
if(!_7[dc]){
var r=[],_a,_b=_9.constructor.prototype;
for(var _c in _b){
if(dojo.isFunction(_b[_c])&&(_a=_c.match(/^_set([a-zA-Z]*)Attr$/))&&_a[1]){
r.push(_a[1].charAt(0).toLowerCase()+_a[1].substr(1));
}
}
_7[dc]=r;
}
return _7[dc]||[];
};
dojo.declare("dijit._Widget",null,{id:"",lang:"",dir:"","class":"",style:"",title:"",tooltip:"",baseClass:"",srcNodeRef:null,domNode:null,containerNode:null,attributeMap:{id:"",dir:"",lang:"","class":"",style:"",title:""},_deferredConnects:{onClick:"",onDblClick:"",onKeyDown:"",onKeyPress:"",onKeyUp:"",onMouseMove:"",onMouseDown:"",onMouseOut:"",onMouseOver:"",onMouseLeave:"",onMouseEnter:"",onMouseUp:""},onClick:dijit._connectOnUseEventHandler,onDblClick:dijit._connectOnUseEventHandler,onKeyDown:dijit._connectOnUseEventHandler,onKeyPress:dijit._connectOnUseEventHandler,onKeyUp:dijit._connectOnUseEventHandler,onMouseDown:dijit._connectOnUseEventHandler,onMouseMove:dijit._connectOnUseEventHandler,onMouseOut:dijit._connectOnUseEventHandler,onMouseOver:dijit._connectOnUseEventHandler,onMouseLeave:dijit._connectOnUseEventHandler,onMouseEnter:dijit._connectOnUseEventHandler,onMouseUp:dijit._connectOnUseEventHandler,_blankGif:(dojo.config.blankGif||dojo.moduleUrl("dojo","resources/blank.gif")).toString(),postscript:function(_d,_e){
this.create(_d,_e);
},create:function(_f,_10){
this.srcNodeRef=dojo.byId(_10);
this._connects=[];
this._subscribes=[];
this._deferredConnects=dojo.clone(this._deferredConnects);
for(var _11 in this.attributeMap){
delete this._deferredConnects[_11];
}
for(_11 in this._deferredConnects){
if(this[_11]!==dijit._connectOnUseEventHandler){
delete this._deferredConnects[_11];
}
}
if(this.srcNodeRef&&(typeof this.srcNodeRef.id=="string")){
this.id=this.srcNodeRef.id;
}
if(_f){
this.params=_f;
dojo.mixin(this,_f);
}
this.postMixInProperties();
if(!this.id){
this.id=dijit.getUniqueId(this.declaredClass.replace(/\./g,"_"));
}
dijit.registry.add(this);
this.buildRendering();
if(this.domNode){
this._applyAttributes();
var _12=this.srcNodeRef;
if(_12&&_12.parentNode){
_12.parentNode.replaceChild(this.domNode,_12);
}
for(_11 in this.params){
this._onConnect(_11);
}
}
if(this.domNode){
this.domNode.setAttribute("widgetId",this.id);
}
this.postCreate();
if(this.srcNodeRef&&!this.srcNodeRef.parentNode){
delete this.srcNodeRef;
}
this._created=true;
},_applyAttributes:function(){
var _13=function(_14,_15){
if((_15.params&&_14 in _15.params)||_15[_14]){
_15.set(_14,_15[_14]);
}
};
for(var _16 in this.attributeMap){
_13(_16,this);
}
dojo.forEach(_8(this),function(a){
if(!(a in this.attributeMap)){
_13(a,this);
}
},this);
},postMixInProperties:function(){
},buildRendering:function(){
this.domNode=this.srcNodeRef||dojo.create("div");
},postCreate:function(){
if(this.baseClass){
var _17=this.baseClass.split(" ");
if(!this.isLeftToRight()){
_17=_17.concat(dojo.map(_17,function(_18){
return _18+"Rtl";
}));
}
dojo.addClass(this.domNode,_17);
}
},startup:function(){
this._started=true;
},destroyRecursive:function(_19){
this._beingDestroyed=true;
this.destroyDescendants(_19);
this.destroy(_19);
},destroy:function(_1a){
this._beingDestroyed=true;
this.uninitialize();
var d=dojo,dfe=d.forEach,dun=d.unsubscribe;
dfe(this._connects,function(_1b){
dfe(_1b,d.disconnect);
});
dfe(this._subscribes,function(_1c){
dun(_1c);
});
dfe(this._supportingWidgets||[],function(w){
if(w.destroyRecursive){
w.destroyRecursive();
}else{
if(w.destroy){
w.destroy();
}
}
});
this.destroyRendering(_1a);
dijit.registry.remove(this.id);
this._destroyed=true;
},destroyRendering:function(_1d){
if(this.bgIframe){
this.bgIframe.destroy(_1d);
delete this.bgIframe;
}
if(this.domNode){
if(_1d){
dojo.removeAttr(this.domNode,"widgetId");
}else{
dojo.destroy(this.domNode);
}
delete this.domNode;
}
if(this.srcNodeRef){
if(!_1d){
dojo.destroy(this.srcNodeRef);
}
delete this.srcNodeRef;
}
},destroyDescendants:function(_1e){
dojo.forEach(this.getChildren(),function(_1f){
if(_1f.destroyRecursive){
_1f.destroyRecursive(_1e);
}
});
},uninitialize:function(){
return false;
},onFocus:function(){
},onBlur:function(){
},_onFocus:function(e){
this.onFocus();
},_onBlur:function(){
this.onBlur();
},_onConnect:function(_20){
if(_20 in this._deferredConnects){
var _21=this[this._deferredConnects[_20]||"domNode"];
this.connect(_21,_20.toLowerCase(),_20);
delete this._deferredConnects[_20];
}
},_setClassAttr:function(_22){
var _23=this[this.attributeMap["class"]||"domNode"];
dojo.removeClass(_23,this["class"]);
this["class"]=_22;
dojo.addClass(_23,_22);
},_setStyleAttr:function(_24){
var _25=this[this.attributeMap.style||"domNode"];
if(dojo.isObject(_24)){
dojo.style(_25,_24);
}else{
if(_25.style.cssText){
_25.style.cssText+="; "+_24;
}else{
_25.style.cssText=_24;
}
}
this.style=_24;
},setAttribute:function(_26,_27){
dojo.deprecated(this.declaredClass+"::setAttribute(attr, value) is deprecated. Use set() instead.","","2.0");
this.set(_26,_27);
},_attrToDom:function(_28,_29){
var _2a=this.attributeMap[_28];
dojo.forEach(dojo.isArray(_2a)?_2a:[_2a],function(_2b){
var _2c=this[_2b.node||_2b||"domNode"];
var _2d=_2b.type||"attribute";
switch(_2d){
case "attribute":
if(dojo.isFunction(_29)){
_29=dojo.hitch(this,_29);
}
var _2e=_2b.attribute?_2b.attribute:(/^on[A-Z][a-zA-Z]*$/.test(_28)?_28.toLowerCase():_28);
dojo.attr(_2c,_2e,_29);
break;
case "innerText":
_2c.innerHTML="";
_2c.appendChild(dojo.doc.createTextNode(_29));
break;
case "innerHTML":
_2c.innerHTML=_29;
break;
case "class":
dojo.removeClass(_2c,this[_28]);
dojo.addClass(_2c,_29);
break;
}
},this);
this[_28]=_29;
},attr:function(_2f,_30){
if(dojo.config.isDebug){
var _31=arguments.callee._ach||(arguments.callee._ach={}),_32=(arguments.callee.caller||"unknown caller").toString();
if(!_31[_32]){
dojo.deprecated(this.declaredClass+"::attr() is deprecated. Use get() or set() instead, called from "+_32,"","2.0");
_31[_32]=true;
}
}
var _33=arguments.length;
if(_33>=2||typeof _2f==="object"){
return this.set.apply(this,arguments);
}else{
return this.get(_2f);
}
},get:function(_34){
var _35=this._getAttrNames(_34);
return this[_35.g]?this[_35.g]():this[_34];
},set:function(_36,_37){
if(typeof _36==="object"){
for(var x in _36){
this.set(x,_36[x]);
}
return this;
}
var _38=this._getAttrNames(_36);
if(this[_38.s]){
var _39=this[_38.s].apply(this,Array.prototype.slice.call(arguments,1));
}else{
if(_36 in this.attributeMap){
this._attrToDom(_36,_37);
}
var _3a=this[_36];
this[_36]=_37;
}
return _39||this;
},_attrPairNames:{},_getAttrNames:function(_3b){
var apn=this._attrPairNames;
if(apn[_3b]){
return apn[_3b];
}
var uc=_3b.charAt(0).toUpperCase()+_3b.substr(1);
return (apn[_3b]={n:_3b+"Node",s:"_set"+uc+"Attr",g:"_get"+uc+"Attr"});
},toString:function(){
return "[Widget "+this.declaredClass+", "+(this.id||"NO ID")+"]";
},getDescendants:function(){
return this.containerNode?dojo.query("[widgetId]",this.containerNode).map(dijit.byNode):[];
},getChildren:function(){
return this.containerNode?dijit.findWidgets(this.containerNode):[];
},nodesWithKeyClick:["input","button"],connect:function(obj,_3c,_3d){
var d=dojo,dc=d._connect,_3e=[];
if(_3c=="ondijitclick"){
if(dojo.indexOf(this.nodesWithKeyClick,obj.nodeName.toLowerCase())==-1){
var m=d.hitch(this,_3d);
_3e.push(dc(obj,"onkeydown",this,function(e){
if((e.keyCode==d.keys.ENTER||e.keyCode==d.keys.SPACE)&&!e.ctrlKey&&!e.shiftKey&&!e.altKey&&!e.metaKey){
dijit._lastKeyDownNode=e.target;
e.preventDefault();
}
}),dc(obj,"onkeyup",this,function(e){
if((e.keyCode==d.keys.ENTER||e.keyCode==d.keys.SPACE)&&e.target===dijit._lastKeyDownNode&&!e.ctrlKey&&!e.shiftKey&&!e.altKey&&!e.metaKey){
dijit._lastKeyDownNode=null;
return m(e);
}
}));
}
_3c="onclick";
}
_3e.push(dc(obj,_3c,this,_3d));
this._connects.push(_3e);
return _3e;
},disconnect:function(_3f){
for(var i=0;i<this._connects.length;i++){
if(this._connects[i]==_3f){
dojo.forEach(_3f,dojo.disconnect);
this._connects.splice(i,1);
return;
}
}
},subscribe:function(_40,_41){
var d=dojo,_42=d.subscribe(_40,this,_41);
this._subscribes.push(_42);
return _42;
},unsubscribe:function(_43){
for(var i=0;i<this._subscribes.length;i++){
if(this._subscribes[i]==_43){
dojo.unsubscribe(_43);
this._subscribes.splice(i,1);
return;
}
}
},isLeftToRight:function(){
return this.dir?(this.dir=="ltr"):dojo._isBodyLtr();
},isFocusable:function(){
return this.focus&&(dojo.style(this.domNode,"display")!="none");
},placeAt:function(_44,_45){
if(_44.declaredClass&&_44.addChild){
_44.addChild(this,_45);
}else{
dojo.place(this.domNode,_44,_45);
}
return this;
},_onShow:function(){
this.onShow();
},onShow:function(){
},onHide:function(){
},onClose:function(){
return true;
}});
})();
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo.string"]){
dojo._hasResource["dojo.string"]=true;
dojo.provide("dojo.string");
dojo.string.rep=function(_1,_2){
if(_2<=0||!_1){
return "";
}
var _3=[];
for(;;){
if(_2&1){
_3.push(_1);
}
if(!(_2>>=1)){
break;
}
_1+=_1;
}
return _3.join("");
};
dojo.string.pad=function(_4,_5,ch,_6){
if(!ch){
ch="0";
}
var _7=String(_4),_8=dojo.string.rep(ch,Math.ceil((_5-_7.length)/ch.length));
return _6?_7+_8:_8+_7;
};
dojo.string.substitute=function(_9,_a,_b,_c){
_c=_c||dojo.global;
_b=_b?dojo.hitch(_c,_b):function(v){
return v;
};
return _9.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,function(_d,_e,_f){
var _10=dojo.getObject(_e,false,_a);
if(_f){
_10=dojo.getObject(_f,false,_c).call(_c,_10,_e);
}
return _b(_10,_e).toString();
});
};
dojo.string.trim=String.prototype.trim?dojo.trim:function(str){
str=str.replace(/^\s+/,"");
for(var i=str.length-1;i>=0;i--){
if(/\S/.test(str.charAt(i))){
str=str.substring(0,i+1);
break;
}
}
return str;
};
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo.parser"]){
dojo._hasResource["dojo.parser"]=true;
dojo.provide("dojo.parser");
dojo.require("dojo.date.stamp");
new Date("X");
dojo.parser=new function(){
var d=dojo;
this._attrName=d._scopeName+"Type";
this._query="["+this._attrName+"]";
function _1(_2){
if(d.isString(_2)){
return "string";
}
if(typeof _2=="number"){
return "number";
}
if(typeof _2=="boolean"){
return "boolean";
}
if(d.isFunction(_2)){
return "function";
}
if(d.isArray(_2)){
return "array";
}
if(_2 instanceof Date){
return "date";
}
if(_2 instanceof d._Url){
return "url";
}
return "object";
};
function _3(_4,_5){
switch(_5){
case "string":
return _4;
case "number":
return _4.length?Number(_4):NaN;
case "boolean":
return typeof _4=="boolean"?_4:!(_4.toLowerCase()=="false");
case "function":
if(d.isFunction(_4)){
_4=_4.toString();
_4=d.trim(_4.substring(_4.indexOf("{")+1,_4.length-1));
}
try{
if(_4===""||_4.search(/[^\w\.]+/i)!=-1){
return new Function(_4);
}else{
return d.getObject(_4,false)||new Function(_4);
}
}
catch(e){
return new Function();
}
case "array":
return _4?_4.split(/\s*,\s*/):[];
case "date":
switch(_4){
case "":
return new Date("");
case "now":
return new Date();
default:
return d.date.stamp.fromISOString(_4);
}
case "url":
return d.baseUrl+_4;
default:
return d.fromJson(_4);
}
};
var _6={};
dojo.connect(dojo,"extend",function(){
_6={};
});
function _7(_8){
if(!_6[_8]){
var _9=d.getObject(_8);
if(!_9){
return null;
}
var _a=_9.prototype;
var _b={},_c={};
for(var _d in _a){
if(_d.charAt(0)=="_"){
continue;
}
if(_d in _c){
continue;
}
var _e=_a[_d];
_b[_d]=_1(_e);
}
_6[_8]={cls:_9,params:_b};
}
return _6[_8];
};
this._functionFromScript=function(_f){
var _10="";
var _11="";
var _12=_f.getAttribute("args");
if(_12){
d.forEach(_12.split(/\s*,\s*/),function(_13,idx){
_10+="var "+_13+" = arguments["+idx+"]; ";
});
}
var _14=_f.getAttribute("with");
if(_14&&_14.length){
d.forEach(_14.split(/\s*,\s*/),function(_15){
_10+="with("+_15+"){";
_11+="}";
});
}
return new Function(_10+_f.innerHTML+_11);
};
this.instantiate=function(_16,_17,_18){
var _19=[],dp=dojo.parser;
_17=_17||{};
_18=_18||{};
d.forEach(_16,function(obj){
if(!obj){
return;
}
var _1a,_1b,_1c,_1d,_1e;
if(obj.node){
_1a=obj.node;
_1b=obj.type;
_1c=obj.clsInfo||(_1b&&_7(_1b));
_1d=_1c&&_1c.cls;
_1e=obj.scripts;
}else{
_1a=obj;
_1b=dp._attrName in _17?_17[dp._attrName]:_1a.getAttribute(dp._attrName);
_1c=_1b&&_7(_1b);
_1d=_1c&&_1c.cls;
_1e=(_1d&&(_1d._noScript||_1d.prototype._noScript)?[]:d.query("> script[type^='dojo/']",_1a));
}
if(!_1c){
throw new Error("Could not load class '"+_1b);
}
var _1f={},_20=_1a.attributes;
if(_18.defaults){
dojo.mixin(_1f,_18.defaults);
}
if(obj.inherited){
dojo.mixin(_1f,obj.inherited);
}
for(var _21 in _1c.params){
var _22=_21 in _17?{value:_17[_21],specified:true}:_20.getNamedItem(_21);
if(!_22||(!_22.specified&&(!dojo.isIE||_21.toLowerCase()!="value"))){
continue;
}
var _23=_22.value;
switch(_21){
case "class":
_23="className" in _17?_17.className:_1a.className;
break;
case "style":
_23="style" in _17?_17.style:(_1a.style&&_1a.style.cssText);
}
var _24=_1c.params[_21];
if(typeof _23=="string"){
_1f[_21]=_3(_23,_24);
}else{
_1f[_21]=_23;
}
}
var _25=[],_26=[];
d.forEach(_1e,function(_27){
_1a.removeChild(_27);
var _28=_27.getAttribute("event"),_1b=_27.getAttribute("type"),nf=d.parser._functionFromScript(_27);
if(_28){
if(_1b=="dojo/connect"){
_25.push({event:_28,func:nf});
}else{
_1f[_28]=nf;
}
}else{
_26.push(nf);
}
});
var _29=_1d.markupFactory||_1d.prototype&&_1d.prototype.markupFactory;
var _2a=_29?_29(_1f,_1a,_1d):new _1d(_1f,_1a);
_19.push(_2a);
var _2b=_1a.getAttribute("jsId");
if(_2b){
d.setObject(_2b,_2a);
}
d.forEach(_25,function(_2c){
d.connect(_2a,_2c.event,null,_2c.func);
});
d.forEach(_26,function(_2d){
_2d.call(_2a);
});
});
if(!_17._started){
d.forEach(_19,function(_2e){
if(!_18.noStart&&_2e&&_2e.startup&&!_2e._started&&(!_2e.getParent||!_2e.getParent())){
_2e.startup();
}
});
}
return _19;
};
this.parse=function(_2f,_30){
var _31;
if(!_30&&_2f&&_2f.rootNode){
_30=_2f;
_31=_30.rootNode;
}else{
_31=_2f;
}
var _32=this._attrName;
function _33(_34,_35){
var _36=dojo.clone(_34.inherited);
dojo.forEach(["dir","lang"],function(_37){
var val=_34.node.getAttribute(_37);
if(val){
_36[_37]=val;
}
});
var _38=_34.scripts;
var _39=!_34.clsInfo||!_34.clsInfo.cls.prototype.stopParser;
for(var _3a=_34.node.firstChild;_3a;_3a=_3a.nextSibling){
if(_3a.nodeType==1){
var _3b=_39&&_3a.getAttribute(_32);
if(_3b){
var _3c={"type":_3b,clsInfo:_7(_3b),node:_3a,scripts:[],inherited:_36};
_35.push(_3c);
_33(_3c,_35);
}else{
if(_38&&_3a.nodeName.toLowerCase()=="script"){
_3b=_3a.getAttribute("type");
if(_3b&&/^dojo\//i.test(_3b)){
_38.push(_3a);
}
}else{
if(_39){
_33({node:_3a,inherited:_36},_35);
}
}
}
}
}
};
var _3d=[];
_33({node:_31?dojo.byId(_31):dojo.body(),inherited:(_30&&_30.inherited)||{dir:dojo._isBodyLtr()?"ltr":"rtl"}},_3d);
return this.instantiate(_3d,null,_30);
};
}();
(function(){
var _3e=function(){
if(dojo.config.parseOnLoad){
dojo.parser.parse();
}
};
if(dojo.exists("dijit.wai.onload")&&(dijit.wai.onload===dojo._loaders[0])){
dojo._loaders.splice(1,0,_3e);
}else{
dojo._loaders.unshift(_3e);
}
})();
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo.cache"]){
dojo._hasResource["dojo.cache"]=true;
dojo.provide("dojo.cache");
(function(){
var _1={};
dojo.cache=function(_2,_3,_4){
if(typeof _2=="string"){
var _5=dojo.moduleUrl(_2,_3);
}else{
_5=_2;
_4=_3;
}
var _6=_5.toString();
var _7=_4;
if(_4!=undefined&&!dojo.isString(_4)){
_7=("value" in _4?_4.value:undefined);
}
var _8=_4&&_4.sanitize?true:false;
if(typeof _7=="string"){
_7=_1[_6]=_8?dojo.cache._sanitize(_7):_7;
}else{
if(_7===null){
delete _1[_6];
}else{
if(!(_6 in _1)){
_7=dojo._getText(_6);
_1[_6]=_8?dojo.cache._sanitize(_7):_7;
}
_7=_1[_6];
}
}
return _7;
};
dojo.cache._sanitize=function(_9){
if(_9){
_9=_9.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,"");
var _a=_9.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(_a){
_9=_a[1];
}
}else{
_9="";
}
return _9;
};
})();
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit._Templated"]){
dojo._hasResource["dijit._Templated"]=true;
dojo.provide("dijit._Templated");
dojo.require("dijit._Widget");
dojo.require("dojo.string");
dojo.require("dojo.parser");
dojo.require("dojo.cache");
dojo.declare("dijit._Templated",null,{templateString:null,templatePath:null,widgetsInTemplate:false,_skipNodeCache:false,_earlyTemplatedStartup:false,constructor:function(){
this._attachPoints=[];
},_stringRepl:function(_1){
var _2=this.declaredClass,_3=this;
return dojo.string.substitute(_1,this,function(_4,_5){
if(_5.charAt(0)=="!"){
_4=dojo.getObject(_5.substr(1),false,_3);
}
if(typeof _4=="undefined"){
throw new Error(_2+" template:"+_5);
}
if(_4==null){
return "";
}
return _5.charAt(0)=="!"?_4:_4.toString().replace(/"/g,"&quot;");
},this);
},buildRendering:function(){
var _6=dijit._Templated.getCachedTemplate(this.templatePath,this.templateString,this._skipNodeCache);
var _7;
if(dojo.isString(_6)){
_7=dojo._toDom(this._stringRepl(_6));
if(_7.nodeType!=1){
throw new Error("Invalid template: "+_6);
}
}else{
_7=_6.cloneNode(true);
}
this.domNode=_7;
this._attachTemplateNodes(_7);
if(this.widgetsInTemplate){
var _8=dojo.parser,_9,_a;
if(_8._query!="[dojoType]"){
_9=_8._query;
_a=_8._attrName;
_8._query="[dojoType]";
_8._attrName="dojoType";
}
var cw=(this._startupWidgets=dojo.parser.parse(_7,{noStart:!this._earlyTemplatedStartup,inherited:{dir:this.dir,lang:this.lang}}));
if(_9){
_8._query=_9;
_8._attrName=_a;
}
this._supportingWidgets=dijit.findWidgets(_7);
this._attachTemplateNodes(cw,function(n,p){
return n[p];
});
}
this._fillContent(this.srcNodeRef);
},_fillContent:function(_b){
var _c=this.containerNode;
if(_b&&_c){
while(_b.hasChildNodes()){
_c.appendChild(_b.firstChild);
}
}
},_attachTemplateNodes:function(_d,_e){
_e=_e||function(n,p){
return n.getAttribute(p);
};
var _f=dojo.isArray(_d)?_d:(_d.all||_d.getElementsByTagName("*"));
var x=dojo.isArray(_d)?0:-1;
for(;x<_f.length;x++){
var _10=(x==-1)?_d:_f[x];
if(this.widgetsInTemplate&&_e(_10,"dojoType")){
continue;
}
var _11=_e(_10,"dojoAttachPoint");
if(_11){
var _12,_13=_11.split(/\s*,\s*/);
while((_12=_13.shift())){
if(dojo.isArray(this[_12])){
this[_12].push(_10);
}else{
this[_12]=_10;
}
this._attachPoints.push(_12);
}
}
var _14=_e(_10,"dojoAttachEvent");
if(_14){
var _15,_16=_14.split(/\s*,\s*/);
var _17=dojo.trim;
while((_15=_16.shift())){
if(_15){
var _18=null;
if(_15.indexOf(":")!=-1){
var _19=_15.split(":");
_15=_17(_19[0]);
_18=_17(_19[1]);
}else{
_15=_17(_15);
}
if(!_18){
_18=_15;
}
this.connect(_10,_15,_18);
}
}
}
var _1a=_e(_10,"waiRole");
if(_1a){
dijit.setWaiRole(_10,_1a);
}
var _1b=_e(_10,"waiState");
if(_1b){
dojo.forEach(_1b.split(/\s*,\s*/),function(_1c){
if(_1c.indexOf("-")!=-1){
var _1d=_1c.split("-");
dijit.setWaiState(_10,_1d[0],_1d[1]);
}
});
}
}
},startup:function(){
dojo.forEach(this._startupWidgets,function(w){
if(w&&!w._started&&w.startup){
w.startup();
}
});
this.inherited(arguments);
},destroyRendering:function(){
dojo.forEach(this._attachPoints,function(_1e){
delete this[_1e];
},this);
this._attachPoints=[];
this.inherited(arguments);
}});
dijit._Templated._templateCache={};
dijit._Templated.getCachedTemplate=function(_1f,_20,_21){
var _22=dijit._Templated._templateCache;
var key=_20||_1f;
var _23=_22[key];
if(_23){
try{
if(!_23.ownerDocument||_23.ownerDocument==dojo.doc){
return _23;
}
}
catch(e){
}
dojo.destroy(_23);
}
if(!_20){
_20=dojo.cache(_1f,{sanitize:true});
}
_20=dojo.string.trim(_20);
if(_21||_20.match(/\$\{([^\}]+)\}/g)){
return (_22[key]=_20);
}else{
var _24=dojo._toDom(_20);
if(_24.nodeType!=1){
throw new Error("Invalid template: "+_20);
}
return (_22[key]=_24);
}
};
if(dojo.isIE){
dojo.addOnWindowUnload(function(){
var _25=dijit._Templated._templateCache;
for(var key in _25){
var _26=_25[key];
if(typeof _26=="object"){
dojo.destroy(_26);
}
delete _25[key];
}
});
}
dojo.extend(dijit._Widget,{dojoAttachEvent:"",dojoAttachPoint:"",waiRole:"",waiState:""});
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit._Container"]){
dojo._hasResource["dijit._Container"]=true;
dojo.provide("dijit._Container");
dojo.declare("dijit._Container",null,{isContainer:true,buildRendering:function(){
this.inherited(arguments);
if(!this.containerNode){
this.containerNode=this.domNode;
}
},addChild:function(_1,_2){
var _3=this.containerNode;
if(_2&&typeof _2=="number"){
var _4=this.getChildren();
if(_4&&_4.length>=_2){
_3=_4[_2-1].domNode;
_2="after";
}
}
dojo.place(_1.domNode,_3,_2);
if(this._started&&!_1._started){
_1.startup();
}
},removeChild:function(_5){
if(typeof _5=="number"&&_5>0){
_5=this.getChildren()[_5];
}
if(_5){
var _6=_5.domNode;
if(_6&&_6.parentNode){
_6.parentNode.removeChild(_6);
}
}
},hasChildren:function(){
return this.getChildren().length>0;
},destroyDescendants:function(_7){
dojo.forEach(this.getChildren(),function(_8){
_8.destroyRecursive(_7);
});
},_getSiblingOfChild:function(_9,_a){
var _b=_9.domNode,_c=(_a>0?"nextSibling":"previousSibling");
do{
_b=_b[_c];
}while(_b&&(_b.nodeType!=1||!dijit.byNode(_b)));
return _b&&dijit.byNode(_b);
},getIndexOfChild:function(_d){
return dojo.indexOf(this.getChildren(),_d);
},startup:function(){
if(this._started){
return;
}
dojo.forEach(this.getChildren(),function(_e){
_e.startup();
});
this.inherited(arguments);
}});
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit._Contained"]){
dojo._hasResource["dijit._Contained"]=true;
dojo.provide("dijit._Contained");
dojo.declare("dijit._Contained",null,{getParent:function(){
var _1=dijit.getEnclosingWidget(this.domNode.parentNode);
return _1&&_1.isContainer?_1:null;
},_getSibling:function(_2){
var _3=this.domNode;
do{
_3=_3[_2+"Sibling"];
}while(_3&&_3.nodeType!=1);
return _3&&dijit.byNode(_3);
},getPreviousSibling:function(){
return this._getSibling("previous");
},getNextSibling:function(){
return this._getSibling("next");
},getIndexInParent:function(){
var p=this.getParent();
if(!p||!p.getIndexOfChild){
return -1;
}
return p.getIndexOfChild(this);
}});
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit.layout._LayoutWidget"]){
dojo._hasResource["dijit.layout._LayoutWidget"]=true;
dojo.provide("dijit.layout._LayoutWidget");
dojo.require("dijit._Widget");
dojo.require("dijit._Container");
dojo.require("dijit._Contained");
dojo.declare("dijit.layout._LayoutWidget",[dijit._Widget,dijit._Container,dijit._Contained],{baseClass:"dijitLayoutContainer",isLayoutContainer:true,postCreate:function(){
dojo.addClass(this.domNode,"dijitContainer");
this.inherited(arguments);
},startup:function(){
if(this._started){
return;
}
this.inherited(arguments);
var _1=this.getParent&&this.getParent();
if(!(_1&&_1.isLayoutContainer)){
this.resize();
this.connect(dojo.isIE?this.domNode:dojo.global,"onresize",function(){
this.resize();
});
}
},resize:function(_2,_3){
var _4=this.domNode;
if(_2){
dojo.marginBox(_4,_2);
if(_2.t){
_4.style.top=_2.t+"px";
}
if(_2.l){
_4.style.left=_2.l+"px";
}
}
var mb=_3||{};
dojo.mixin(mb,_2||{});
if(!("h" in mb)||!("w" in mb)){
mb=dojo.mixin(dojo.marginBox(_4),mb);
}
var cs=dojo.getComputedStyle(_4);
var me=dojo._getMarginExtents(_4,cs);
var be=dojo._getBorderExtents(_4,cs);
var bb=(this._borderBox={w:mb.w-(me.w+be.w),h:mb.h-(me.h+be.h)});
var pe=dojo._getPadExtents(_4,cs);
this._contentBox={l:dojo._toPixelValue(_4,cs.paddingLeft),t:dojo._toPixelValue(_4,cs.paddingTop),w:bb.w-pe.w,h:bb.h-pe.h};
this.layout();
},layout:function(){
},_setupChild:function(_5){
dojo.addClass(_5.domNode,this.baseClass+"-child");
if(_5.baseClass){
dojo.addClass(_5.domNode,this.baseClass+"-"+_5.baseClass);
}
},addChild:function(_6,_7){
this.inherited(arguments);
if(this._started){
this._setupChild(_6);
}
},removeChild:function(_8){
dojo.removeClass(_8.domNode,this.baseClass+"-child");
if(_8.baseClass){
dojo.removeClass(_8.domNode,this.baseClass+"-"+_8.baseClass);
}
this.inherited(arguments);
}});
dijit.layout.marginBox2contentBox=function(_9,mb){
var cs=dojo.getComputedStyle(_9);
var me=dojo._getMarginExtents(_9,cs);
var pb=dojo._getPadBorderExtents(_9,cs);
return {l:dojo._toPixelValue(_9,cs.paddingLeft),t:dojo._toPixelValue(_9,cs.paddingTop),w:mb.w-(me.w+pb.w),h:mb.h-(me.h+pb.h)};
};
(function(){
var _a=function(_b){
return _b.substring(0,1).toUpperCase()+_b.substring(1);
};
var _c=function(_d,_e){
_d.resize?_d.resize(_e):dojo.marginBox(_d.domNode,_e);
dojo.mixin(_d,dojo.marginBox(_d.domNode));
dojo.mixin(_d,_e);
};
dijit.layout.layoutChildren=function(_f,dim,_10){
dim=dojo.mixin({},dim);
dojo.addClass(_f,"dijitLayoutContainer");
_10=dojo.filter(_10,function(_11){
return _11.layoutAlign!="client";
}).concat(dojo.filter(_10,function(_12){
return _12.layoutAlign=="client";
}));
dojo.forEach(_10,function(_13){
var elm=_13.domNode,pos=_13.layoutAlign;
var _14=elm.style;
_14.left=dim.l+"px";
_14.top=dim.t+"px";
_14.bottom=_14.right="auto";
dojo.addClass(elm,"dijitAlign"+_a(pos));
if(pos=="top"||pos=="bottom"){
_c(_13,{w:dim.w});
dim.h-=_13.h;
if(pos=="top"){
dim.t+=_13.h;
}else{
_14.top=dim.t+dim.h+"px";
}
}else{
if(pos=="left"||pos=="right"){
_c(_13,{h:dim.h});
dim.w-=_13.w;
if(pos=="left"){
dim.l+=_13.w;
}else{
_14.left=dim.l+dim.w+"px";
}
}else{
if(pos=="client"){
_c(_13,dim);
}
}
}
});
};
})();
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo.html"]){
dojo._hasResource["dojo.html"]=true;
dojo.provide("dojo.html");
dojo.require("dojo.parser");
(function(){
var _1=0,d=dojo;
dojo.html._secureForInnerHtml=function(_2){
return _2.replace(/(?:\s*<!DOCTYPE\s[^>]+>|<title[^>]*>[\s\S]*?<\/title>)/ig,"");
};
dojo.html._emptyNode=dojo.empty;
dojo.html._setNodeContent=function(_3,_4){
d.empty(_3);
if(_4){
if(typeof _4=="string"){
_4=d._toDom(_4,_3.ownerDocument);
}
if(!_4.nodeType&&d.isArrayLike(_4)){
for(var _5=_4.length,i=0;i<_4.length;i=_5==_4.length?i+1:0){
d.place(_4[i],_3,"last");
}
}else{
d.place(_4,_3,"last");
}
}
return _3;
};
dojo.declare("dojo.html._ContentSetter",null,{node:"",content:"",id:"",cleanContent:false,extractContent:false,parseContent:false,constructor:function(_6,_7){
dojo.mixin(this,_6||{});
_7=this.node=dojo.byId(this.node||_7);
if(!this.id){
this.id=["Setter",(_7)?_7.id||_7.tagName:"",_1++].join("_");
}
},set:function(_8,_9){
if(undefined!==_8){
this.content=_8;
}
if(_9){
this._mixin(_9);
}
this.onBegin();
this.setContent();
this.onEnd();
return this.node;
},setContent:function(){
var _a=this.node;
if(!_a){
throw new Error(this.declaredClass+": setContent given no node");
}
try{
_a=dojo.html._setNodeContent(_a,this.content);
}
catch(e){
var _b=this.onContentError(e);
try{
_a.innerHTML=_b;
}
catch(e){
console.error("Fatal "+this.declaredClass+".setContent could not change content due to "+e.message,e);
}
}
this.node=_a;
},empty:function(){
if(this.parseResults&&this.parseResults.length){
dojo.forEach(this.parseResults,function(w){
if(w.destroy){
w.destroy();
}
});
delete this.parseResults;
}
dojo.html._emptyNode(this.node);
},onBegin:function(){
var _c=this.content;
if(dojo.isString(_c)){
if(this.cleanContent){
_c=dojo.html._secureForInnerHtml(_c);
}
if(this.extractContent){
var _d=_c.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(_d){
_c=_d[1];
}
}
}
this.empty();
this.content=_c;
return this.node;
},onEnd:function(){
if(this.parseContent){
this._parse();
}
return this.node;
},tearDown:function(){
delete this.parseResults;
delete this.node;
delete this.content;
},onContentError:function(_e){
return "Error occured setting content: "+_e;
},_mixin:function(_f){
var _10={},key;
for(key in _f){
if(key in _10){
continue;
}
this[key]=_f[key];
}
},_parse:function(){
var _11=this.node;
try{
this.parseResults=dojo.parser.parse({rootNode:_11,dir:this.dir,lang:this.lang});
}
catch(e){
this._onError("Content",e,"Error parsing in _ContentSetter#"+this.id);
}
},_onError:function(_12,err,_13){
var _14=this["on"+_12+"Error"].call(this,err);
if(_13){
console.error(_13,err);
}else{
if(_14){
dojo.html._setNodeContent(this.node,_14,true);
}
}
}});
dojo.html.set=function(_15,_16,_17){
if(undefined==_16){
console.warn("dojo.html.set: no cont argument provided, using empty string");
_16="";
}
if(!_17){
return dojo.html._setNodeContent(_15,_16,true);
}else{
var op=new dojo.html._ContentSetter(dojo.mixin(_17,{content:_16,node:_15}));
return op.set();
}
};
})();
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit.layout.ContentPane"]){
dojo._hasResource["dijit.layout.ContentPane"]=true;
dojo.provide("dijit.layout.ContentPane");
dojo.require("dijit._Widget");
dojo.require("dijit._Contained");
dojo.require("dijit.layout._LayoutWidget");
dojo.require("dojo.parser");
dojo.require("dojo.string");
dojo.require("dojo.html");
dojo.requireLocalization("dijit","loading",null,"ROOT,ar,ca,cs,da,de,el,es,fi,fr,he,hu,it,ja,ko,nb,nl,pl,pt,pt-pt,ro,ru,sk,sl,sv,th,tr,zh,zh-tw");
dojo.declare("dijit.layout.ContentPane",dijit._Widget,{href:"",extractContent:false,parseOnLoad:true,preventCache:false,preload:false,refreshOnShow:false,loadingMessage:"<span class='dijitContentPaneLoading'>${loadingState}</span>",errorMessage:"<span class='dijitContentPaneError'>${errorState}</span>",isLoaded:false,baseClass:"dijitContentPane",doLayout:true,ioArgs:{},isContainer:true,isLayoutContainer:true,onLoadDeferred:null,attributeMap:dojo.delegate(dijit._Widget.prototype.attributeMap,{title:[]}),postMixInProperties:function(){
this.inherited(arguments);
var _1=dojo.i18n.getLocalization("dijit","loading",this.lang);
this.loadingMessage=dojo.string.substitute(this.loadingMessage,_1);
this.errorMessage=dojo.string.substitute(this.errorMessage,_1);
if(!this.href&&this.srcNodeRef&&this.srcNodeRef.innerHTML){
this.isLoaded=true;
}
},buildRendering:function(){
this.inherited(arguments);
if(!this.containerNode){
this.containerNode=this.domNode;
}
},postCreate:function(){
this.domNode.title="";
if(!dojo.attr(this.domNode,"role")){
dijit.setWaiRole(this.domNode,"group");
}
dojo.addClass(this.domNode,this.baseClass);
},startup:function(){
if(this._started){
return;
}
var _2=dijit._Contained.prototype.getParent.call(this);
this._childOfLayoutWidget=_2&&_2.isLayoutContainer;
this._needLayout=!this._childOfLayoutWidget;
if(this.isLoaded){
dojo.forEach(this.getChildren(),function(_3){
_3.startup();
});
}
if(this._isShown()||this.preload){
this._onShow();
}
this.inherited(arguments);
},_checkIfSingleChild:function(){
var _4=dojo.query("> *",this.containerNode).filter(function(_5){
return _5.tagName!=="SCRIPT";
}),_6=_4.filter(function(_7){
return dojo.hasAttr(_7,"dojoType")||dojo.hasAttr(_7,"widgetId");
}),_8=dojo.filter(_6.map(dijit.byNode),function(_9){
return _9&&_9.domNode&&_9.resize;
});
if(_4.length==_6.length&&_8.length==1){
this._singleChild=_8[0];
}else{
delete this._singleChild;
}
dojo.toggleClass(this.containerNode,this.baseClass+"SingleChild",!!this._singleChild);
},setHref:function(_a){
dojo.deprecated("dijit.layout.ContentPane.setHref() is deprecated. Use set('href', ...) instead.","","2.0");
return this.set("href",_a);
},_setHrefAttr:function(_b){
this.cancel();
this.onLoadDeferred=new dojo.Deferred(dojo.hitch(this,"cancel"));
this.href=_b;
if(this._created&&(this.preload||this._isShown())){
this._load();
}else{
this._hrefChanged=true;
}
return this.onLoadDeferred;
},setContent:function(_c){
dojo.deprecated("dijit.layout.ContentPane.setContent() is deprecated.  Use set('content', ...) instead.","","2.0");
this.set("content",_c);
},_setContentAttr:function(_d){
this.href="";
this.cancel();
this.onLoadDeferred=new dojo.Deferred(dojo.hitch(this,"cancel"));
this._setContent(_d||"");
this._isDownloaded=false;
return this.onLoadDeferred;
},_getContentAttr:function(){
return this.containerNode.innerHTML;
},cancel:function(){
if(this._xhrDfd&&(this._xhrDfd.fired==-1)){
this._xhrDfd.cancel();
}
delete this._xhrDfd;
this.onLoadDeferred=null;
},uninitialize:function(){
if(this._beingDestroyed){
this.cancel();
}
this.inherited(arguments);
},destroyRecursive:function(_e){
if(this._beingDestroyed){
return;
}
this.inherited(arguments);
},resize:function(_f,_10){
if(!this._wasShown){
this._onShow();
}
this._resizeCalled=true;
if(_f){
dojo.marginBox(this.domNode,_f);
}
var cn=this.containerNode;
if(cn===this.domNode){
var mb=_10||{};
dojo.mixin(mb,_f||{});
if(!("h" in mb)||!("w" in mb)){
mb=dojo.mixin(dojo.marginBox(cn),mb);
}
this._contentBox=dijit.layout.marginBox2contentBox(cn,mb);
}else{
this._contentBox=dojo.contentBox(cn);
}
this._layoutChildren();
},_isShown:function(){
if(this._childOfLayoutWidget){
if(this._resizeCalled&&"open" in this){
return this.open;
}
return this._resizeCalled;
}else{
if("open" in this){
return this.open;
}else{
var _11=this.domNode;
return (_11.style.display!="none")&&(_11.style.visibility!="hidden")&&!dojo.hasClass(_11,"dijitHidden");
}
}
},_onShow:function(){
if(this.href){
if(!this._xhrDfd&&(!this.isLoaded||this._hrefChanged||this.refreshOnShow)){
this.refresh();
}
}else{
if(!this._childOfLayoutWidget&&this._needLayout){
this._layoutChildren();
}
}
this.inherited(arguments);
this._wasShown=true;
},refresh:function(){
this.cancel();
this.onLoadDeferred=new dojo.Deferred(dojo.hitch(this,"cancel"));
this._load();
return this.onLoadDeferred;
},_load:function(){
this._setContent(this.onDownloadStart(),true);
var _12=this;
var _13={preventCache:(this.preventCache||this.refreshOnShow),url:this.href,handleAs:"text"};
if(dojo.isObject(this.ioArgs)){
dojo.mixin(_13,this.ioArgs);
}
var _14=(this._xhrDfd=(this.ioMethod||dojo.xhrGet)(_13));
_14.addCallback(function(_15){
try{
_12._isDownloaded=true;
_12._setContent(_15,false);
_12.onDownloadEnd();
}
catch(err){
_12._onError("Content",err);
}
delete _12._xhrDfd;
return _15;
});
_14.addErrback(function(err){
if(!_14.canceled){
_12._onError("Download",err);
}
delete _12._xhrDfd;
return err;
});
delete this._hrefChanged;
},_onLoadHandler:function(_16){
this.isLoaded=true;
try{
this.onLoadDeferred.callback(_16);
this.onLoad(_16);
}
catch(e){
console.error("Error "+this.widgetId+" running custom onLoad code: "+e.message);
}
},_onUnloadHandler:function(){
this.isLoaded=false;
try{
this.onUnload();
}
catch(e){
console.error("Error "+this.widgetId+" running custom onUnload code: "+e.message);
}
},destroyDescendants:function(){
if(this.isLoaded){
this._onUnloadHandler();
}
var _17=this._contentSetter;
dojo.forEach(this.getChildren(),function(_18){
if(_18.destroyRecursive){
_18.destroyRecursive();
}
});
if(_17){
dojo.forEach(_17.parseResults,function(_19){
if(_19.destroyRecursive&&_19.domNode&&_19.domNode.parentNode==dojo.body()){
_19.destroyRecursive();
}
});
delete _17.parseResults;
}
dojo.html._emptyNode(this.containerNode);
delete this._singleChild;
},_setContent:function(_1a,_1b){
this.destroyDescendants();
var _1c=this._contentSetter;
if(!(_1c&&_1c instanceof dojo.html._ContentSetter)){
_1c=this._contentSetter=new dojo.html._ContentSetter({node:this.containerNode,_onError:dojo.hitch(this,this._onError),onContentError:dojo.hitch(this,function(e){
var _1d=this.onContentError(e);
try{
this.containerNode.innerHTML=_1d;
}
catch(e){
console.error("Fatal "+this.id+" could not change content due to "+e.message,e);
}
})});
}
var _1e=dojo.mixin({cleanContent:this.cleanContent,extractContent:this.extractContent,parseContent:this.parseOnLoad,dir:this.dir,lang:this.lang},this._contentSetterParams||{});
dojo.mixin(_1c,_1e);
_1c.set((dojo.isObject(_1a)&&_1a.domNode)?_1a.domNode:_1a);
delete this._contentSetterParams;
if(!_1b){
dojo.forEach(this.getChildren(),function(_1f){
if(!this.parseOnLoad||_1f.getParent){
_1f.startup();
}
},this);
this._scheduleLayout();
this._onLoadHandler(_1a);
}
},_onError:function(_20,err,_21){
this.onLoadDeferred.errback(err);
var _22=this["on"+_20+"Error"].call(this,err);
if(_21){
console.error(_21,err);
}else{
if(_22){
this._setContent(_22,true);
}
}
},_scheduleLayout:function(){
if(this._isShown()){
this._layoutChildren();
}else{
this._needLayout=true;
}
},_layoutChildren:function(){
if(this.doLayout){
this._checkIfSingleChild();
}
if(this._singleChild&&this._singleChild.resize){
var cb=this._contentBox||dojo.contentBox(this.containerNode);
this._singleChild.resize({w:cb.w,h:cb.h});
}else{
dojo.forEach(this.getChildren(),function(_23){
if(_23.resize){
_23.resize();
}
});
}
delete this._needLayout;
},onLoad:function(_24){
},onUnload:function(){
},onDownloadStart:function(){
return this.loadingMessage;
},onContentError:function(_25){
},onDownloadError:function(_26){
return this.errorMessage;
},onDownloadEnd:function(){
}});
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit.form._FormMixin"]){
dojo._hasResource["dijit.form._FormMixin"]=true;
dojo.provide("dijit.form._FormMixin");
dojo.require("dojo.window");
dojo.declare("dijit.form._FormMixin",null,{reset:function(){
dojo.forEach(this.getDescendants(),function(_1){
if(_1.reset){
_1.reset();
}
});
},validate:function(){
var _2=false;
return dojo.every(dojo.map(this.getDescendants(),function(_3){
_3._hasBeenBlurred=true;
var _4=_3.disabled||!_3.validate||_3.validate();
if(!_4&&!_2){
dojo.window.scrollIntoView(_3.containerNode||_3.domNode);
_3.focus();
_2=true;
}
return _4;
}),function(_5){
return _5;
});
},setValues:function(_6){
dojo.deprecated(this.declaredClass+"::setValues() is deprecated. Use set('value', val) instead.","","2.0");
return this.set("value",_6);
},_setValueAttr:function(_7){
var _8={};
dojo.forEach(this.getDescendants(),function(_9){
if(!_9.name){
return;
}
var _a=_8[_9.name]||(_8[_9.name]=[]);
_a.push(_9);
});
for(var _b in _8){
if(!_8.hasOwnProperty(_b)){
continue;
}
var _c=_8[_b],_d=dojo.getObject(_b,false,_7);
if(_d===undefined){
continue;
}
if(!dojo.isArray(_d)){
_d=[_d];
}
if(typeof _c[0].checked=="boolean"){
dojo.forEach(_c,function(w,i){
w.set("value",dojo.indexOf(_d,w.value)!=-1);
});
}else{
if(_c[0].multiple){
_c[0].set("value",_d);
}else{
dojo.forEach(_c,function(w,i){
w.set("value",_d[i]);
});
}
}
}
},getValues:function(){
dojo.deprecated(this.declaredClass+"::getValues() is deprecated. Use get('value') instead.","","2.0");
return this.get("value");
},_getValueAttr:function(){
var _e={};
dojo.forEach(this.getDescendants(),function(_f){
var _10=_f.name;
if(!_10||_f.disabled){
return;
}
var _11=_f.get("value");
if(typeof _f.checked=="boolean"){
if(/Radio/.test(_f.declaredClass)){
if(_11!==false){
dojo.setObject(_10,_11,_e);
}else{
_11=dojo.getObject(_10,false,_e);
if(_11===undefined){
dojo.setObject(_10,null,_e);
}
}
}else{
var ary=dojo.getObject(_10,false,_e);
if(!ary){
ary=[];
dojo.setObject(_10,ary,_e);
}
if(_11!==false){
ary.push(_11);
}
}
}else{
var _12=dojo.getObject(_10,false,_e);
if(typeof _12!="undefined"){
if(dojo.isArray(_12)){
_12.push(_11);
}else{
dojo.setObject(_10,[_12,_11],_e);
}
}else{
dojo.setObject(_10,_11,_e);
}
}
});
return _e;
},isValid:function(){
this._invalidWidgets=dojo.filter(this.getDescendants(),function(_13){
return !_13.disabled&&_13.isValid&&!_13.isValid();
});
return !this._invalidWidgets.length;
},onValidStateChange:function(_14){
},_widgetChange:function(_15){
var _16=this._lastValidState;
if(!_15||this._lastValidState===undefined){
_16=this.isValid();
if(this._lastValidState===undefined){
this._lastValidState=_16;
}
}else{
if(_15.isValid){
this._invalidWidgets=dojo.filter(this._invalidWidgets||[],function(w){
return (w!=_15);
},this);
if(!_15.isValid()&&!_15.get("disabled")){
this._invalidWidgets.push(_15);
}
_16=(this._invalidWidgets.length===0);
}
}
if(_16!==this._lastValidState){
this._lastValidState=_16;
this.onValidStateChange(_16);
}
},connectChildren:function(){
dojo.forEach(this._changeConnections,dojo.hitch(this,"disconnect"));
var _17=this;
var _18=(this._changeConnections=[]);
dojo.forEach(dojo.filter(this.getDescendants(),function(_19){
return _19.validate;
}),function(_1a){
_18.push(_17.connect(_1a,"validate",dojo.hitch(_17,"_widgetChange",_1a)));
_18.push(_17.connect(_1a,"_setDisabledAttr",dojo.hitch(_17,"_widgetChange",_1a)));
});
this._widgetChange(null);
},startup:function(){
this.inherited(arguments);
this._changeConnections=[];
this.connectChildren();
}});
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit._DialogMixin"]){
dojo._hasResource["dijit._DialogMixin"]=true;
dojo.provide("dijit._DialogMixin");
dojo.require("dijit._Widget");
dojo.declare("dijit._DialogMixin",null,{attributeMap:dijit._Widget.prototype.attributeMap,execute:function(_1){
},onCancel:function(){
},onExecute:function(){
},_onSubmit:function(){
this.onExecute();
this.execute(this.get("value"));
},_getFocusItems:function(_2){
var _3=dijit._getTabNavigable(dojo.byId(_2));
this._firstFocusItem=_3.lowest||_3.first||_2;
this._lastFocusItem=_3.last||_3.highest||this._firstFocusItem;
if(dojo.isMoz&&this._firstFocusItem.tagName.toLowerCase()=="input"&&dojo.getNodeProp(this._firstFocusItem,"type").toLowerCase()=="file"){
dojo.attr(_2,"tabIndex","0");
this._firstFocusItem=_2;
}
}});
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo.dnd.move"]){
dojo._hasResource["dojo.dnd.move"]=true;
dojo.provide("dojo.dnd.move");
dojo.require("dojo.dnd.Mover");
dojo.require("dojo.dnd.Moveable");
dojo.declare("dojo.dnd.move.constrainedMoveable",dojo.dnd.Moveable,{constraints:function(){
},within:false,markupFactory:function(_1,_2){
return new dojo.dnd.move.constrainedMoveable(_2,_1);
},constructor:function(_3,_4){
if(!_4){
_4={};
}
this.constraints=_4.constraints;
this.within=_4.within;
},onFirstMove:function(_5){
var c=this.constraintBox=this.constraints.call(this,_5);
c.r=c.l+c.w;
c.b=c.t+c.h;
if(this.within){
var mb=dojo.marginBox(_5.node);
c.r-=mb.w;
c.b-=mb.h;
}
},onMove:function(_6,_7){
var c=this.constraintBox,s=_6.node.style;
s.left=(_7.l<c.l?c.l:c.r<_7.l?c.r:_7.l)+"px";
s.top=(_7.t<c.t?c.t:c.b<_7.t?c.b:_7.t)+"px";
}});
dojo.declare("dojo.dnd.move.boxConstrainedMoveable",dojo.dnd.move.constrainedMoveable,{box:{},markupFactory:function(_8,_9){
return new dojo.dnd.move.boxConstrainedMoveable(_9,_8);
},constructor:function(_a,_b){
var _c=_b&&_b.box;
this.constraints=function(){
return _c;
};
}});
dojo.declare("dojo.dnd.move.parentConstrainedMoveable",dojo.dnd.move.constrainedMoveable,{area:"content",markupFactory:function(_d,_e){
return new dojo.dnd.move.parentConstrainedMoveable(_e,_d);
},constructor:function(_f,_10){
var _11=_10&&_10.area;
this.constraints=function(){
var n=this.node.parentNode,s=dojo.getComputedStyle(n),mb=dojo._getMarginBox(n,s);
if(_11=="margin"){
return mb;
}
var t=dojo._getMarginExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
if(_11=="border"){
return mb;
}
t=dojo._getBorderExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
if(_11=="padding"){
return mb;
}
t=dojo._getPadExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
return mb;
};
}});
dojo.dnd.move.constrainedMover=function(fun,_12){
dojo.deprecated("dojo.dnd.move.constrainedMover, use dojo.dnd.move.constrainedMoveable instead");
var _13=function(_14,e,_15){
dojo.dnd.Mover.call(this,_14,e,_15);
};
dojo.extend(_13,dojo.dnd.Mover.prototype);
dojo.extend(_13,{onMouseMove:function(e){
dojo.dnd.autoScroll(e);
var m=this.marginBox,c=this.constraintBox,l=m.l+e.pageX,t=m.t+e.pageY;
l=l<c.l?c.l:c.r<l?c.r:l;
t=t<c.t?c.t:c.b<t?c.b:t;
this.host.onMove(this,{l:l,t:t});
},onFirstMove:function(){
dojo.dnd.Mover.prototype.onFirstMove.call(this);
var c=this.constraintBox=fun.call(this);
c.r=c.l+c.w;
c.b=c.t+c.h;
if(_12){
var mb=dojo.marginBox(this.node);
c.r-=mb.w;
c.b-=mb.h;
}
}});
return _13;
};
dojo.dnd.move.boxConstrainedMover=function(box,_16){
dojo.deprecated("dojo.dnd.move.boxConstrainedMover, use dojo.dnd.move.boxConstrainedMoveable instead");
return dojo.dnd.move.constrainedMover(function(){
return box;
},_16);
};
dojo.dnd.move.parentConstrainedMover=function(_17,_18){
dojo.deprecated("dojo.dnd.move.parentConstrainedMover, use dojo.dnd.move.parentConstrainedMoveable instead");
var fun=function(){
var n=this.node.parentNode,s=dojo.getComputedStyle(n),mb=dojo._getMarginBox(n,s);
if(_17=="margin"){
return mb;
}
var t=dojo._getMarginExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
if(_17=="border"){
return mb;
}
t=dojo._getBorderExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
if(_17=="padding"){
return mb;
}
t=dojo._getPadExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
return mb;
};
return dojo.dnd.move.constrainedMover(fun,_18);
};
dojo.dnd.constrainedMover=dojo.dnd.move.constrainedMover;
dojo.dnd.boxConstrainedMover=dojo.dnd.move.boxConstrainedMover;
dojo.dnd.parentConstrainedMover=dojo.dnd.move.parentConstrainedMover;
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo.dnd.TimedMoveable"]){
dojo._hasResource["dojo.dnd.TimedMoveable"]=true;
dojo.provide("dojo.dnd.TimedMoveable");
dojo.require("dojo.dnd.Moveable");
(function(){
var _1=dojo.dnd.Moveable.prototype.onMove;
dojo.declare("dojo.dnd.TimedMoveable",dojo.dnd.Moveable,{timeout:40,constructor:function(_2,_3){
if(!_3){
_3={};
}
if(_3.timeout&&typeof _3.timeout=="number"&&_3.timeout>=0){
this.timeout=_3.timeout;
}
},markupFactory:function(_4,_5){
return new dojo.dnd.TimedMoveable(_5,_4);
},onMoveStop:function(_6){
if(_6._timer){
clearTimeout(_6._timer);
_1.call(this,_6,_6._leftTop);
}
dojo.dnd.Moveable.prototype.onMoveStop.apply(this,arguments);
},onMove:function(_7,_8){
_7._leftTop=_8;
if(!_7._timer){
var _9=this;
_7._timer=setTimeout(function(){
_7._timer=null;
_1.call(_9,_7,_7._leftTop);
},this.timeout);
}
}});
})();
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo.fx"]){
dojo._hasResource["dojo.fx"]=true;
dojo.provide("dojo.fx");
dojo.require("dojo.fx.Toggler");
(function(){
var d=dojo,_1={_fire:function(_2,_3){
if(this[_2]){
this[_2].apply(this,_3||[]);
}
return this;
}};
var _4=function(_5){
this._index=-1;
this._animations=_5||[];
this._current=this._onAnimateCtx=this._onEndCtx=null;
this.duration=0;
d.forEach(this._animations,function(a){
this.duration+=a.duration;
if(a.delay){
this.duration+=a.delay;
}
},this);
};
d.extend(_4,{_onAnimate:function(){
this._fire("onAnimate",arguments);
},_onEnd:function(){
d.disconnect(this._onAnimateCtx);
d.disconnect(this._onEndCtx);
this._onAnimateCtx=this._onEndCtx=null;
if(this._index+1==this._animations.length){
this._fire("onEnd");
}else{
this._current=this._animations[++this._index];
this._onAnimateCtx=d.connect(this._current,"onAnimate",this,"_onAnimate");
this._onEndCtx=d.connect(this._current,"onEnd",this,"_onEnd");
this._current.play(0,true);
}
},play:function(_6,_7){
if(!this._current){
this._current=this._animations[this._index=0];
}
if(!_7&&this._current.status()=="playing"){
return this;
}
var _8=d.connect(this._current,"beforeBegin",this,function(){
this._fire("beforeBegin");
}),_9=d.connect(this._current,"onBegin",this,function(_a){
this._fire("onBegin",arguments);
}),_b=d.connect(this._current,"onPlay",this,function(_c){
this._fire("onPlay",arguments);
d.disconnect(_8);
d.disconnect(_9);
d.disconnect(_b);
});
if(this._onAnimateCtx){
d.disconnect(this._onAnimateCtx);
}
this._onAnimateCtx=d.connect(this._current,"onAnimate",this,"_onAnimate");
if(this._onEndCtx){
d.disconnect(this._onEndCtx);
}
this._onEndCtx=d.connect(this._current,"onEnd",this,"_onEnd");
this._current.play.apply(this._current,arguments);
return this;
},pause:function(){
if(this._current){
var e=d.connect(this._current,"onPause",this,function(_d){
this._fire("onPause",arguments);
d.disconnect(e);
});
this._current.pause();
}
return this;
},gotoPercent:function(_e,_f){
this.pause();
var _10=this.duration*_e;
this._current=null;
d.some(this._animations,function(a){
if(a.duration<=_10){
this._current=a;
return true;
}
_10-=a.duration;
return false;
});
if(this._current){
this._current.gotoPercent(_10/this._current.duration,_f);
}
return this;
},stop:function(_11){
if(this._current){
if(_11){
for(;this._index+1<this._animations.length;++this._index){
this._animations[this._index].stop(true);
}
this._current=this._animations[this._index];
}
var e=d.connect(this._current,"onStop",this,function(arg){
this._fire("onStop",arguments);
d.disconnect(e);
});
this._current.stop();
}
return this;
},status:function(){
return this._current?this._current.status():"stopped";
},destroy:function(){
if(this._onAnimateCtx){
d.disconnect(this._onAnimateCtx);
}
if(this._onEndCtx){
d.disconnect(this._onEndCtx);
}
}});
d.extend(_4,_1);
dojo.fx.chain=function(_12){
return new _4(_12);
};
var _13=function(_14){
this._animations=_14||[];
this._connects=[];
this._finished=0;
this.duration=0;
d.forEach(_14,function(a){
var _15=a.duration;
if(a.delay){
_15+=a.delay;
}
if(this.duration<_15){
this.duration=_15;
}
this._connects.push(d.connect(a,"onEnd",this,"_onEnd"));
},this);
this._pseudoAnimation=new d.Animation({curve:[0,1],duration:this.duration});
var _16=this;
d.forEach(["beforeBegin","onBegin","onPlay","onAnimate","onPause","onStop","onEnd"],function(evt){
_16._connects.push(d.connect(_16._pseudoAnimation,evt,function(){
_16._fire(evt,arguments);
}));
});
};
d.extend(_13,{_doAction:function(_17,_18){
d.forEach(this._animations,function(a){
a[_17].apply(a,_18);
});
return this;
},_onEnd:function(){
if(++this._finished>this._animations.length){
this._fire("onEnd");
}
},_call:function(_19,_1a){
var t=this._pseudoAnimation;
t[_19].apply(t,_1a);
},play:function(_1b,_1c){
this._finished=0;
this._doAction("play",arguments);
this._call("play",arguments);
return this;
},pause:function(){
this._doAction("pause",arguments);
this._call("pause",arguments);
return this;
},gotoPercent:function(_1d,_1e){
var ms=this.duration*_1d;
d.forEach(this._animations,function(a){
a.gotoPercent(a.duration<ms?1:(ms/a.duration),_1e);
});
this._call("gotoPercent",arguments);
return this;
},stop:function(_1f){
this._doAction("stop",arguments);
this._call("stop",arguments);
return this;
},status:function(){
return this._pseudoAnimation.status();
},destroy:function(){
d.forEach(this._connects,dojo.disconnect);
}});
d.extend(_13,_1);
dojo.fx.combine=function(_20){
return new _13(_20);
};
dojo.fx.wipeIn=function(_21){
var _22=_21.node=d.byId(_21.node),s=_22.style,o;
var _23=d.animateProperty(d.mixin({properties:{height:{start:function(){
o=s.overflow;
s.overflow="hidden";
if(s.visibility=="hidden"||s.display=="none"){
s.height="1px";
s.display="";
s.visibility="";
return 1;
}else{
var _24=d.style(_22,"height");
return Math.max(_24,1);
}
},end:function(){
return _22.scrollHeight;
}}}},_21));
d.connect(_23,"onEnd",function(){
s.height="auto";
s.overflow=o;
});
return _23;
};
dojo.fx.wipeOut=function(_25){
var _26=_25.node=d.byId(_25.node),s=_26.style,o;
var _27=d.animateProperty(d.mixin({properties:{height:{end:1}}},_25));
d.connect(_27,"beforeBegin",function(){
o=s.overflow;
s.overflow="hidden";
s.display="";
});
d.connect(_27,"onEnd",function(){
s.overflow=o;
s.height="auto";
s.display="none";
});
return _27;
};
dojo.fx.slideTo=function(_28){
var _29=_28.node=d.byId(_28.node),top=null,_2a=null;
var _2b=(function(n){
return function(){
var cs=d.getComputedStyle(n);
var pos=cs.position;
top=(pos=="absolute"?n.offsetTop:parseInt(cs.top)||0);
_2a=(pos=="absolute"?n.offsetLeft:parseInt(cs.left)||0);
if(pos!="absolute"&&pos!="relative"){
var ret=d.position(n,true);
top=ret.y;
_2a=ret.x;
n.style.position="absolute";
n.style.top=top+"px";
n.style.left=_2a+"px";
}
};
})(_29);
_2b();
var _2c=d.animateProperty(d.mixin({properties:{top:_28.top||0,left:_28.left||0}},_28));
d.connect(_2c,"beforeBegin",_2c,_2b);
return _2c;
};
})();
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit._CssStateMixin"]){
dojo._hasResource["dijit._CssStateMixin"]=true;
dojo.provide("dijit._CssStateMixin");
dojo.declare("dijit._CssStateMixin",[],{cssStateNodes:{},postCreate:function(){
this.inherited(arguments);
dojo.forEach(["onmouseenter","onmouseleave","onmousedown"],function(e){
this.connect(this.domNode,e,"_cssMouseEvent");
},this);
this.connect(this,"set",function(_1,_2){
if(arguments.length>=2&&{disabled:true,readOnly:true,checked:true,selected:true}[_1]){
this._setStateClass();
}
});
dojo.forEach(["_onFocus","_onBlur"],function(ap){
this.connect(this,ap,"_setStateClass");
},this);
for(var ap in this.cssStateNodes){
this._trackMouseState(this[ap],this.cssStateNodes[ap]);
}
this._setStateClass();
},_cssMouseEvent:function(_3){
if(!this.disabled){
switch(_3.type){
case "mouseenter":
case "mouseover":
this._hovering=true;
this._active=this._mouseDown;
break;
case "mouseleave":
case "mouseout":
this._hovering=false;
this._active=false;
break;
case "mousedown":
this._active=true;
this._mouseDown=true;
var _4=this.connect(dojo.body(),"onmouseup",function(){
this._active=false;
this._mouseDown=false;
this._setStateClass();
this.disconnect(_4);
});
break;
}
this._setStateClass();
}
},_setStateClass:function(){
var _5=this.baseClass.split(" ");
function _6(_7){
_5=_5.concat(dojo.map(_5,function(c){
return c+_7;
}),"dijit"+_7);
};
if(!this.isLeftToRight()){
_6("Rtl");
}
if(this.checked){
_6("Checked");
}
if(this.state){
_6(this.state);
}
if(this.selected){
_6("Selected");
}
if(this.disabled){
_6("Disabled");
}else{
if(this.readOnly){
_6("ReadOnly");
}else{
if(this._active){
_6("Active");
}else{
if(this._hovering){
_6("Hover");
}
}
}
}
if(this._focused){
_6("Focused");
}
var tn=this.stateNode||this.domNode,_8={};
dojo.forEach(tn.className.split(" "),function(c){
_8[c]=true;
});
if("_stateClasses" in this){
dojo.forEach(this._stateClasses,function(c){
delete _8[c];
});
}
dojo.forEach(_5,function(c){
_8[c]=true;
});
var _9=[];
for(var c in _8){
_9.push(c);
}
tn.className=_9.join(" ");
this._stateClasses=_5;
},_trackMouseState:function(_a,_b){
var _c=false,_d=false,_e=false;
var _f=this,cn=dojo.hitch(this,"connect",_a);
function _10(){
var _11=("disabled" in _f&&_f.disabled)||("readonly" in _f&&_f.readonly);
dojo.toggleClass(_a,_b+"Hover",_c&&!_d&&!_11);
dojo.toggleClass(_a,_b+"Active",_d&&!_11);
dojo.toggleClass(_a,_b+"Focused",_e&&!_11);
};
cn("onmouseenter",function(){
_c=true;
_10();
});
cn("onmouseleave",function(){
_c=false;
_d=false;
_10();
});
cn("onmousedown",function(){
_d=true;
_10();
});
cn("onmouseup",function(){
_d=false;
_10();
});
cn("onfocus",function(){
_e=true;
_10();
});
cn("onblur",function(){
_e=false;
_10();
});
this.connect(this,"set",function(_12,_13){
if(_12=="disabled"||_12=="readOnly"){
_10();
}
});
}});
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit.DialogUnderlay"]){
dojo._hasResource["dijit.DialogUnderlay"]=true;
dojo.provide("dijit.DialogUnderlay");
dojo.require("dojo.window");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.declare("dijit.DialogUnderlay",[dijit._Widget,dijit._Templated],{templateString:"<div class='dijitDialogUnderlayWrapper'><div class='dijitDialogUnderlay' dojoAttachPoint='node'></div></div>",dialogId:"","class":"",attributeMap:{id:"domNode"},_setDialogIdAttr:function(id){
dojo.attr(this.node,"id",id+"_underlay");
},_setClassAttr:function(_1){
this.node.className="dijitDialogUnderlay "+_1;
},postCreate:function(){
dojo.body().appendChild(this.domNode);
},layout:function(){
var is=this.node.style,os=this.domNode.style;
os.display="none";
var _2=dojo.window.getBox();
os.top=_2.t+"px";
os.left=_2.l+"px";
is.width=_2.w+"px";
is.height=_2.h+"px";
os.display="block";
},show:function(){
this.domNode.style.display="block";
this.layout();
this.bgIframe=new dijit.BackgroundIframe(this.domNode);
},hide:function(){
this.bgIframe.destroy();
this.domNode.style.display="none";
},uninitialize:function(){
if(this.bgIframe){
this.bgIframe.destroy();
}
this.inherited(arguments);
}});
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit.TooltipDialog"]){
dojo._hasResource["dijit.TooltipDialog"]=true;
dojo.provide("dijit.TooltipDialog");
dojo.require("dijit.layout.ContentPane");
dojo.require("dijit._Templated");
dojo.require("dijit.form._FormMixin");
dojo.require("dijit._DialogMixin");
dojo.declare("dijit.TooltipDialog",[dijit.layout.ContentPane,dijit._Templated,dijit.form._FormMixin,dijit._DialogMixin],{title:"",doLayout:false,autofocus:true,baseClass:"dijitTooltipDialog",_firstFocusItem:null,_lastFocusItem:null,templateString:dojo.cache("dijit","templates/TooltipDialog.html","<div waiRole=\"presentation\">\n\t<div class=\"dijitTooltipContainer\" waiRole=\"presentation\">\n\t\t<div class =\"dijitTooltipContents dijitTooltipFocusNode\" dojoAttachPoint=\"containerNode\" tabindex=\"-1\" waiRole=\"dialog\"></div>\n\t</div>\n\t<div class=\"dijitTooltipConnector\" waiRole=\"presentation\"></div>\n</div>\n"),postCreate:function(){
this.inherited(arguments);
this.connect(this.containerNode,"onkeypress","_onKey");
this.containerNode.title=this.title;
},orient:function(_1,_2,_3){
var c=this._currentOrientClass;
if(c){
dojo.removeClass(this.domNode,c);
}
c="dijitTooltipAB"+(_3.charAt(1)=="L"?"Left":"Right")+" dijitTooltip"+(_3.charAt(0)=="T"?"Below":"Above");
dojo.addClass(this.domNode,c);
this._currentOrientClass=c;
},onOpen:function(_4){
this.orient(this.domNode,_4.aroundCorner,_4.corner);
this._onShow();
if(this.autofocus){
this._getFocusItems(this.containerNode);
dijit.focus(this._firstFocusItem);
}
},onClose:function(){
this.onHide();
},_onKey:function(_5){
var _6=_5.target;
var dk=dojo.keys;
if(_5.charOrCode===dk.TAB){
this._getFocusItems(this.containerNode);
}
var _7=(this._firstFocusItem==this._lastFocusItem);
if(_5.charOrCode==dk.ESCAPE){
setTimeout(dojo.hitch(this,"onCancel"),0);
dojo.stopEvent(_5);
}else{
if(_6==this._firstFocusItem&&_5.shiftKey&&_5.charOrCode===dk.TAB){
if(!_7){
dijit.focus(this._lastFocusItem);
}
dojo.stopEvent(_5);
}else{
if(_6==this._lastFocusItem&&_5.charOrCode===dk.TAB&&!_5.shiftKey){
if(!_7){
dijit.focus(this._firstFocusItem);
}
dojo.stopEvent(_5);
}else{
if(_5.charOrCode===dk.TAB){
_5.stopPropagation();
}
}
}
}
}});
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo.regexp"]){
dojo._hasResource["dojo.regexp"]=true;
dojo.provide("dojo.regexp");
dojo.regexp.escapeString=function(_1,_2){
return _1.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g,function(ch){
if(_2&&_2.indexOf(ch)!=-1){
return ch;
}
return "\\"+ch;
});
};
dojo.regexp.buildGroupRE=function(_3,re,_4){
if(!(_3 instanceof Array)){
return re(_3);
}
var b=[];
for(var i=0;i<_3.length;i++){
b.push(re(_3[i]));
}
return dojo.regexp.group(b.join("|"),_4);
};
dojo.regexp.group=function(_5,_6){
return "("+(_6?"?:":"")+_5+")";
};
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit.form._FormWidget"]){
dojo._hasResource["dijit.form._FormWidget"]=true;
dojo.provide("dijit.form._FormWidget");
dojo.require("dojo.window");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dijit._CssStateMixin");
dojo.declare("dijit.form._FormWidget",[dijit._Widget,dijit._Templated,dijit._CssStateMixin],{name:"",alt:"",value:"",type:"text",tabIndex:"0",disabled:false,intermediateChanges:false,scrollOnFocus:true,attributeMap:dojo.delegate(dijit._Widget.prototype.attributeMap,{value:"focusNode",id:"focusNode",tabIndex:"focusNode",alt:"focusNode",title:"focusNode"}),postMixInProperties:function(){
this.nameAttrSetting=this.name?("name=\""+this.name.replace(/'/g,"&quot;")+"\""):"";
this.inherited(arguments);
},postCreate:function(){
this.inherited(arguments);
this.connect(this.domNode,"onmousedown","_onMouseDown");
},_setDisabledAttr:function(_1){
this.disabled=_1;
dojo.attr(this.focusNode,"disabled",_1);
if(this.valueNode){
dojo.attr(this.valueNode,"disabled",_1);
}
dijit.setWaiState(this.focusNode,"disabled",_1);
if(_1){
this._hovering=false;
this._active=false;
var _2="tabIndex" in this.attributeMap?this.attributeMap.tabIndex:"focusNode";
dojo.forEach(dojo.isArray(_2)?_2:[_2],function(_3){
var _4=this[_3];
if(dojo.isWebKit||dijit.hasDefaultTabStop(_4)){
_4.setAttribute("tabIndex","-1");
}else{
_4.removeAttribute("tabIndex");
}
},this);
}else{
this.focusNode.setAttribute("tabIndex",this.tabIndex);
}
},setDisabled:function(_5){
dojo.deprecated("setDisabled("+_5+") is deprecated. Use set('disabled',"+_5+") instead.","","2.0");
this.set("disabled",_5);
},_onFocus:function(e){
if(this.scrollOnFocus){
dojo.window.scrollIntoView(this.domNode);
}
this.inherited(arguments);
},isFocusable:function(){
return !this.disabled&&!this.readOnly&&this.focusNode&&(dojo.style(this.domNode,"display")!="none");
},focus:function(){
dijit.focus(this.focusNode);
},compare:function(_6,_7){
if(typeof _6=="number"&&typeof _7=="number"){
return (isNaN(_6)&&isNaN(_7))?0:_6-_7;
}else{
if(_6>_7){
return 1;
}else{
if(_6<_7){
return -1;
}else{
return 0;
}
}
}
},onChange:function(_8){
},_onChangeActive:false,_handleOnChange:function(_9,_a){
this._lastValue=_9;
if(this._lastValueReported==undefined&&(_a===null||!this._onChangeActive)){
this._resetValue=this._lastValueReported=_9;
}
if((this.intermediateChanges||_a||_a===undefined)&&((typeof _9!=typeof this._lastValueReported)||this.compare(_9,this._lastValueReported)!=0)){
this._lastValueReported=_9;
if(this._onChangeActive){
if(this._onChangeHandle){
clearTimeout(this._onChangeHandle);
}
this._onChangeHandle=setTimeout(dojo.hitch(this,function(){
this._onChangeHandle=null;
this.onChange(_9);
}),0);
}
}
},create:function(){
this.inherited(arguments);
this._onChangeActive=true;
},destroy:function(){
if(this._onChangeHandle){
clearTimeout(this._onChangeHandle);
this.onChange(this._lastValueReported);
}
this.inherited(arguments);
},setValue:function(_b){
dojo.deprecated("dijit.form._FormWidget:setValue("+_b+") is deprecated.  Use set('value',"+_b+") instead.","","2.0");
this.set("value",_b);
},getValue:function(){
dojo.deprecated(this.declaredClass+"::getValue() is deprecated. Use get('value') instead.","","2.0");
return this.get("value");
},_onMouseDown:function(e){
if(!e.ctrlKey&&this.isFocusable()){
var _c=this.connect(dojo.body(),"onmouseup",function(){
if(this.isFocusable()){
this.focus();
}
this.disconnect(_c);
});
}
}});
dojo.declare("dijit.form._FormValueWidget",dijit.form._FormWidget,{readOnly:false,attributeMap:dojo.delegate(dijit.form._FormWidget.prototype.attributeMap,{value:"",readOnly:"focusNode"}),_setReadOnlyAttr:function(_d){
this.readOnly=_d;
dojo.attr(this.focusNode,"readOnly",_d);
dijit.setWaiState(this.focusNode,"readonly",_d);
},postCreate:function(){
this.inherited(arguments);
if(dojo.isIE){
this.connect(this.focusNode||this.domNode,"onkeydown",this._onKeyDown);
}
if(this._resetValue===undefined){
this._resetValue=this.value;
}
},_setValueAttr:function(_e,_f){
this.value=_e;
this._handleOnChange(_e,_f);
},_getValueAttr:function(){
return this._lastValue;
},undo:function(){
this._setValueAttr(this._lastValueReported,false);
},reset:function(){
this._hasBeenBlurred=false;
this._setValueAttr(this._resetValue,true);
},_onKeyDown:function(e){
if(e.keyCode==dojo.keys.ESCAPE&&!(e.ctrlKey||e.altKey||e.metaKey)){
var te;
if(dojo.isIE){
e.preventDefault();
te=document.createEventObject();
te.keyCode=dojo.keys.ESCAPE;
te.shiftKey=e.shiftKey;
e.srcElement.fireEvent("onkeypress",te);
}
}
},_layoutHackIE7:function(){
if(dojo.isIE==7){
var _10=this.domNode;
var _11=_10.parentNode;
var _12=_10.firstChild||_10;
var _13=_12.style.filter;
var _14=this;
while(_11&&_11.clientHeight==0){
(function ping(){
var _15=_14.connect(_11,"onscroll",function(e){
_14.disconnect(_15);
_12.style.filter=(new Date()).getMilliseconds();
setTimeout(function(){
_12.style.filter=_13;
},0);
});
})();
_11=_11.parentNode;
}
}
}});
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit._HasDropDown"]){
dojo._hasResource["dijit._HasDropDown"]=true;
dojo.provide("dijit._HasDropDown");
dojo.require("dijit._base.place");
dojo.require("dijit._Widget");
dojo.declare("dijit._HasDropDown",null,{_buttonNode:null,_arrowWrapperNode:null,_popupStateNode:null,_aroundNode:null,dropDown:null,autoWidth:true,forceWidth:false,maxHeight:0,dropDownPosition:["below","above"],_stopClickEvents:true,_onDropDownMouseDown:function(e){
if(this.disabled||this.readOnly){
return;
}
this._docHandler=this.connect(dojo.doc,"onmouseup","_onDropDownMouseUp");
this.toggleDropDown();
},_onDropDownMouseUp:function(e){
if(e&&this._docHandler){
this.disconnect(this._docHandler);
}
var _1=this.dropDown,_2=false;
if(e&&this._opened){
var c=dojo.position(this._buttonNode,true);
if(!(e.pageX>=c.x&&e.pageX<=c.x+c.w)||!(e.pageY>=c.y&&e.pageY<=c.y+c.h)){
var t=e.target;
while(t&&!_2){
if(dojo.hasClass(t,"dijitPopup")){
_2=true;
}else{
t=t.parentNode;
}
}
if(_2){
t=e.target;
if(_1.onItemClick){
var _3;
while(t&&!(_3=dijit.byNode(t))){
t=t.parentNode;
}
if(_3&&_3.onClick&&_3.getParent){
_3.getParent().onItemClick(_3,e);
}
}
return;
}
}
}
if(this._opened&&_1.focus){
window.setTimeout(dojo.hitch(_1,"focus"),1);
}
},_onDropDownClick:function(e){
if(this._stopClickEvents){
dojo.stopEvent(e);
}
},_setupDropdown:function(){
this._buttonNode=this._buttonNode||this.focusNode||this.domNode;
this._popupStateNode=this._popupStateNode||this.focusNode||this._buttonNode;
this._aroundNode=this._aroundNode||this.domNode;
this.connect(this._buttonNode,"onmousedown","_onDropDownMouseDown");
this.connect(this._buttonNode,"onclick","_onDropDownClick");
this.connect(this._buttonNode,"onkeydown","_onDropDownKeydown");
this.connect(this._buttonNode,"onkeyup","_onKey");
if(this._setStateClass){
this.connect(this,"openDropDown","_setStateClass");
this.connect(this,"closeDropDown","_setStateClass");
}
var _4={"after":this.isLeftToRight()?"Right":"Left","before":this.isLeftToRight()?"Left":"Right","above":"Up","below":"Down","left":"Left","right":"Right"}[this.dropDownPosition[0]]||this.dropDownPosition[0]||"Down";
dojo.addClass(this._arrowWrapperNode||this._buttonNode,"dijit"+_4+"ArrowButton");
},postCreate:function(){
this._setupDropdown();
this.inherited(arguments);
},destroyDescendants:function(){
if(this.dropDown){
if(!this.dropDown._destroyed){
this.dropDown.destroyRecursive();
}
delete this.dropDown;
}
this.inherited(arguments);
},_onDropDownKeydown:function(e){
if(e.keyCode==dojo.keys.DOWN_ARROW||e.keyCode==dojo.keys.ENTER||e.keyCode==dojo.keys.SPACE){
e.preventDefault();
}
},_onKey:function(e){
if(this.disabled||this.readOnly){
return;
}
var d=this.dropDown;
if(d&&this._opened&&d.handleKey){
if(d.handleKey(e)===false){
return;
}
}
if(d&&this._opened&&e.keyCode==dojo.keys.ESCAPE){
this.toggleDropDown();
}else{
if(d&&!this._opened&&(e.keyCode==dojo.keys.DOWN_ARROW||e.keyCode==dojo.keys.ENTER||e.keyCode==dojo.keys.SPACE)){
this.toggleDropDown();
if(d.focus){
setTimeout(dojo.hitch(d,"focus"),1);
}
}
}
},_onBlur:function(){
this.closeDropDown();
this.inherited(arguments);
},isLoaded:function(){
return true;
},loadDropDown:function(_5){
_5();
},toggleDropDown:function(){
if(this.disabled||this.readOnly){
return;
}
this.focus();
var _6=this.dropDown;
if(!_6){
return;
}
if(!this._opened){
if(!this.isLoaded()){
this.loadDropDown(dojo.hitch(this,"openDropDown"));
return;
}else{
this.openDropDown();
}
}else{
this.closeDropDown();
}
},openDropDown:function(){
var _7=this.dropDown;
var _8=_7.domNode;
var _9=this;
if(!this._preparedNode){
dijit.popup.moveOffScreen(_8);
this._preparedNode=true;
if(_8.style.width){
this._explicitDDWidth=true;
}
if(_8.style.height){
this._explicitDDHeight=true;
}
}
if(this.maxHeight||this.forceWidth||this.autoWidth){
var _a={display:"",visibility:"hidden"};
if(!this._explicitDDWidth){
_a.width="";
}
if(!this._explicitDDHeight){
_a.height="";
}
dojo.style(_8,_a);
var mb=dojo.marginBox(_8);
var _b=(this.maxHeight&&mb.h>this.maxHeight);
dojo.style(_8,{overflowX:"hidden",overflowY:_b?"auto":"hidden"});
if(_b){
mb.h=this.maxHeight;
if("w" in mb){
mb.w+=16;
}
}else{
delete mb.h;
}
delete mb.t;
delete mb.l;
if(this.forceWidth){
mb.w=this.domNode.offsetWidth;
}else{
if(this.autoWidth){
mb.w=Math.max(mb.w,this.domNode.offsetWidth);
}else{
delete mb.w;
}
}
if(dojo.isFunction(_7.resize)){
_7.resize(mb);
}else{
dojo.marginBox(_8,mb);
}
}
var _c=dijit.popup.open({parent:this,popup:_7,around:this._aroundNode,orient:dijit.getPopupAroundAlignment((this.dropDownPosition&&this.dropDownPosition.length)?this.dropDownPosition:["below"],this.isLeftToRight()),onExecute:function(){
_9.closeDropDown(true);
},onCancel:function(){
_9.closeDropDown(true);
},onClose:function(){
dojo.attr(_9._popupStateNode,"popupActive",false);
dojo.removeClass(_9._popupStateNode,"dijitHasDropDownOpen");
_9._opened=false;
_9.state="";
}});
dojo.attr(this._popupStateNode,"popupActive","true");
dojo.addClass(_9._popupStateNode,"dijitHasDropDownOpen");
this._opened=true;
this.state="Opened";
return _c;
},closeDropDown:function(_d){
if(this._opened){
if(_d){
this.focus();
}
dijit.popup.close(this.dropDown);
this._opened=false;
this.state="";
}
}});
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit.form.Button"]){
dojo._hasResource["dijit.form.Button"]=true;
dojo.provide("dijit.form.Button");
dojo.require("dijit.form._FormWidget");
dojo.require("dijit._Container");
dojo.require("dijit._HasDropDown");
dojo.declare("dijit.form.Button",dijit.form._FormWidget,{label:"",showLabel:true,iconClass:"",type:"button",baseClass:"dijitButton",templateString:dojo.cache("dijit.form","templates/Button.html","<span class=\"dijit dijitReset dijitInline\"\n\t><span class=\"dijitReset dijitInline dijitButtonNode\"\n\t\tdojoAttachEvent=\"ondijitclick:_onButtonClick\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdojoAttachPoint=\"titleNode,focusNode\"\n\t\t\twaiRole=\"button\" waiState=\"labelledby-${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\" dojoAttachPoint=\"iconNode\"></span\n\t\t\t><span class=\"dijitReset dijitToggleButtonIconChar\">&#x25CF;</span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t\tdojoAttachPoint=\"containerNode\"\n\t\t\t></span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\"\n\t\tdojoAttachPoint=\"valueNode\"\n/></span>\n"),attributeMap:dojo.delegate(dijit.form._FormWidget.prototype.attributeMap,{value:"valueNode",iconClass:{node:"iconNode",type:"class"}}),_onClick:function(e){
if(this.disabled){
return false;
}
this._clicked();
return this.onClick(e);
},_onButtonClick:function(e){
if(this._onClick(e)===false){
e.preventDefault();
}else{
if(this.type=="submit"&&!(this.valueNode||this.focusNode).form){
for(var _1=this.domNode;_1.parentNode;_1=_1.parentNode){
var _2=dijit.byNode(_1);
if(_2&&typeof _2._onSubmit=="function"){
_2._onSubmit(e);
break;
}
}
}else{
if(this.valueNode){
this.valueNode.click();
e.preventDefault();
}
}
}
},_fillContent:function(_3){
if(_3&&(!this.params||!("label" in this.params))){
this.set("label",_3.innerHTML);
}
},postCreate:function(){
dojo.setSelectable(this.focusNode,false);
this.inherited(arguments);
},_setShowLabelAttr:function(_4){
if(this.containerNode){
dojo.toggleClass(this.containerNode,"dijitDisplayNone",!_4);
}
this.showLabel=_4;
},onClick:function(e){
return true;
},_clicked:function(e){
},setLabel:function(_5){
dojo.deprecated("dijit.form.Button.setLabel() is deprecated.  Use set('label', ...) instead.","","2.0");
this.set("label",_5);
},_setLabelAttr:function(_6){
this.containerNode.innerHTML=this.label=_6;
if(this.showLabel==false&&!this.params.title){
this.titleNode.title=dojo.trim(this.containerNode.innerText||this.containerNode.textContent||"");
}
}});
dojo.declare("dijit.form.DropDownButton",[dijit.form.Button,dijit._Container,dijit._HasDropDown],{baseClass:"dijitDropDownButton",templateString:dojo.cache("dijit.form","templates/DropDownButton.html","<span class=\"dijit dijitReset dijitInline\"\n\t><span class='dijitReset dijitInline dijitButtonNode'\n\t\tdojoAttachEvent=\"ondijitclick:_onButtonClick\" dojoAttachPoint=\"_buttonNode\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdojoAttachPoint=\"focusNode,titleNode,_arrowWrapperNode\"\n\t\t\twaiRole=\"button\" waiState=\"haspopup-true,labelledby-${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\"\n\t\t\t\tdojoAttachPoint=\"iconNode\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tdojoAttachPoint=\"containerNode,_popupStateNode\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonInner\"></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonChar\">&#9660;</span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\"\n\t\tdojoAttachPoint=\"valueNode\"\n/></span>\n"),_fillContent:function(){
if(this.srcNodeRef){
var _7=dojo.query("*",this.srcNodeRef);
dijit.form.DropDownButton.superclass._fillContent.call(this,_7[0]);
this.dropDownContainer=this.srcNodeRef;
}
},startup:function(){
if(this._started){
return;
}
if(!this.dropDown){
var _8=dojo.query("[widgetId]",this.dropDownContainer)[0];
this.dropDown=dijit.byNode(_8);
delete this.dropDownContainer;
}
dijit.popup.moveOffScreen(this.dropDown.domNode);
this.inherited(arguments);
},isLoaded:function(){
var _9=this.dropDown;
return (!_9.href||_9.isLoaded);
},loadDropDown:function(){
var _a=this.dropDown;
if(!_a){
return;
}
if(!this.isLoaded()){
var _b=dojo.connect(_a,"onLoad",this,function(){
dojo.disconnect(_b);
this.openDropDown();
});
_a.refresh();
}else{
this.openDropDown();
}
},isFocusable:function(){
return this.inherited(arguments)&&!this._mouseDown;
}});
dojo.declare("dijit.form.ComboButton",dijit.form.DropDownButton,{templateString:dojo.cache("dijit.form","templates/ComboButton.html","<table class=\"dijit dijitReset dijitInline dijitLeft\"\n\tcellspacing='0' cellpadding='0' waiRole=\"presentation\"\n\t><tbody waiRole=\"presentation\"><tr waiRole=\"presentation\"\n\t\t><td class=\"dijitReset dijitStretch dijitButtonNode\" dojoAttachPoint=\"buttonNode\" dojoAttachEvent=\"ondijitclick:_onButtonClick,onkeypress:_onButtonKeyPress\"\n\t\t><div id=\"${id}_button\" class=\"dijitReset dijitButtonContents\"\n\t\t\tdojoAttachPoint=\"titleNode\"\n\t\t\twaiRole=\"button\" waiState=\"labelledby-${id}_label\"\n\t\t\t><div class=\"dijitReset dijitInline dijitIcon\" dojoAttachPoint=\"iconNode\" waiRole=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitInline dijitButtonText\" id=\"${id}_label\" dojoAttachPoint=\"containerNode\" waiRole=\"presentation\"></div\n\t\t></div\n\t\t></td\n\t\t><td id=\"${id}_arrow\" class='dijitReset dijitRight dijitButtonNode dijitArrowButton'\n\t\t\tdojoAttachPoint=\"_popupStateNode,focusNode,_buttonNode\"\n\t\t\tdojoAttachEvent=\"onkeypress:_onArrowKeyPress\"\n\t\t\ttitle=\"${optionsTitle}\"\n\t\t\twaiRole=\"button\" waiState=\"haspopup-true\"\n\t\t\t><div class=\"dijitReset dijitArrowButtonInner\" waiRole=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitArrowButtonChar\" waiRole=\"presentation\">&#9660;</div\n\t\t></td\n\t\t><td style=\"display:none !important;\"\n\t\t\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" dojoAttachPoint=\"valueNode\"\n\t\t/></td></tr></tbody\n></table>\n"),attributeMap:dojo.mixin(dojo.clone(dijit.form.Button.prototype.attributeMap),{id:"",tabIndex:["focusNode","titleNode"],title:"titleNode"}),optionsTitle:"",baseClass:"dijitComboButton",cssStateNodes:{"buttonNode":"dijitButtonNode","titleNode":"dijitButtonContents","_popupStateNode":"dijitDownArrowButton"},_focusedNode:null,_onButtonKeyPress:function(_c){
if(_c.charOrCode==dojo.keys[this.isLeftToRight()?"RIGHT_ARROW":"LEFT_ARROW"]){
dijit.focus(this._popupStateNode);
dojo.stopEvent(_c);
}
},_onArrowKeyPress:function(_d){
if(_d.charOrCode==dojo.keys[this.isLeftToRight()?"LEFT_ARROW":"RIGHT_ARROW"]){
dijit.focus(this.titleNode);
dojo.stopEvent(_d);
}
},focus:function(_e){
dijit.focus(_e=="start"?this.titleNode:this._popupStateNode);
}});
dojo.declare("dijit.form.ToggleButton",dijit.form.Button,{baseClass:"dijitToggleButton",checked:false,attributeMap:dojo.mixin(dojo.clone(dijit.form.Button.prototype.attributeMap),{checked:"focusNode"}),_clicked:function(_f){
this.set("checked",!this.checked);
},_setCheckedAttr:function(_10,_11){
this.checked=_10;
dojo.attr(this.focusNode||this.domNode,"checked",_10);
dijit.setWaiState(this.focusNode||this.domNode,"pressed",_10);
this._handleOnChange(_10,_11);
},setChecked:function(_12){
dojo.deprecated("setChecked("+_12+") is deprecated. Use set('checked',"+_12+") instead.","","2.0");
this.set("checked",_12);
},reset:function(){
this._hasBeenBlurred=false;
this.set("checked",this.params.checked||false);
}});
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit.form.ToggleButton"]){
dojo._hasResource["dijit.form.ToggleButton"]=true;
dojo.provide("dijit.form.ToggleButton");
dojo.require("dijit.form.Button");
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo.cookie"]){
dojo._hasResource["dojo.cookie"]=true;
dojo.provide("dojo.cookie");
dojo.require("dojo.regexp");
dojo.cookie=function(_1,_2,_3){
var c=document.cookie;
if(arguments.length==1){
var _4=c.match(new RegExp("(?:^|; )"+dojo.regexp.escapeString(_1)+"=([^;]*)"));
return _4?decodeURIComponent(_4[1]):undefined;
}else{
_3=_3||{};
var _5=_3.expires;
if(typeof _5=="number"){
var d=new Date();
d.setTime(d.getTime()+_5*24*60*60*1000);
_5=_3.expires=d;
}
if(_5&&_5.toUTCString){
_3.expires=_5.toUTCString();
}
_2=encodeURIComponent(_2);
var _6=_1+"="+_2,_7;
for(_7 in _3){
_6+="; "+_7;
var _8=_3[_7];
if(_8!==true){
_6+="="+_8;
}
}
document.cookie=_6;
}
};
dojo.cookie.isSupported=function(){
if(!("cookieEnabled" in navigator)){
this("__djCookieTest__","CookiesAllowed");
navigator.cookieEnabled=this("__djCookieTest__")=="CookiesAllowed";
if(navigator.cookieEnabled){
this("__djCookieTest__","",{expires:-1});
}
}
return navigator.cookieEnabled;
};
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit.layout.StackController"]){
dojo._hasResource["dijit.layout.StackController"]=true;
dojo.provide("dijit.layout.StackController");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dijit._Container");
dojo.require("dijit.form.ToggleButton");
dojo.requireLocalization("dijit","common",null,"ROOT,ar,ca,cs,da,de,el,es,fi,fr,he,hu,it,ja,ko,nb,nl,pl,pt,pt-pt,ro,ru,sk,sl,sv,th,tr,zh,zh-tw");
dojo.declare("dijit.layout.StackController",[dijit._Widget,dijit._Templated,dijit._Container],{templateString:"<span wairole='tablist' dojoAttachEvent='onkeypress' class='dijitStackController'></span>",containerId:"",buttonWidget:"dijit.layout._StackButton",postCreate:function(){
dijit.setWaiRole(this.domNode,"tablist");
this.pane2button={};
this.pane2handles={};
this.subscribe(this.containerId+"-startup","onStartup");
this.subscribe(this.containerId+"-addChild","onAddChild");
this.subscribe(this.containerId+"-removeChild","onRemoveChild");
this.subscribe(this.containerId+"-selectChild","onSelectChild");
this.subscribe(this.containerId+"-containerKeyPress","onContainerKeyPress");
},onStartup:function(_1){
dojo.forEach(_1.children,this.onAddChild,this);
if(_1.selected){
this.onSelectChild(_1.selected);
}
},destroy:function(){
for(var _2 in this.pane2button){
this.onRemoveChild(dijit.byId(_2));
}
this.inherited(arguments);
},onAddChild:function(_3,_4){
var _5=dojo.getObject(this.buttonWidget);
var _6=new _5({id:this.id+"_"+_3.id,label:_3.title,dir:_3.dir,lang:_3.lang,showLabel:_3.showTitle,iconClass:_3.iconClass,closeButton:_3.closable,title:_3.tooltip});
dijit.setWaiState(_6.focusNode,"selected","false");
this.pane2handles[_3.id]=[this.connect(_3,"set",function(_7,_8){
var _9={title:"label",showTitle:"showLabel",iconClass:"iconClass",closable:"closeButton",tooltip:"title"}[_7];
if(_9){
_6.set(_9,_8);
}
}),this.connect(_6,"onClick",dojo.hitch(this,"onButtonClick",_3)),this.connect(_6,"onClickCloseButton",dojo.hitch(this,"onCloseButtonClick",_3))];
this.addChild(_6,_4);
this.pane2button[_3.id]=_6;
_3.controlButton=_6;
if(!this._currentChild){
_6.focusNode.setAttribute("tabIndex","0");
dijit.setWaiState(_6.focusNode,"selected","true");
this._currentChild=_3;
}
if(!this.isLeftToRight()&&dojo.isIE&&this._rectifyRtlTabList){
this._rectifyRtlTabList();
}
},onRemoveChild:function(_a){
if(this._currentChild===_a){
this._currentChild=null;
}
dojo.forEach(this.pane2handles[_a.id],this.disconnect,this);
delete this.pane2handles[_a.id];
var _b=this.pane2button[_a.id];
if(_b){
this.removeChild(_b);
delete this.pane2button[_a.id];
_b.destroy();
}
delete _a.controlButton;
},onSelectChild:function(_c){
if(!_c){
return;
}
if(this._currentChild){
var _d=this.pane2button[this._currentChild.id];
_d.set("checked",false);
dijit.setWaiState(_d.focusNode,"selected","false");
_d.focusNode.setAttribute("tabIndex","-1");
}
var _e=this.pane2button[_c.id];
_e.set("checked",true);
dijit.setWaiState(_e.focusNode,"selected","true");
this._currentChild=_c;
_e.focusNode.setAttribute("tabIndex","0");
var _f=dijit.byId(this.containerId);
dijit.setWaiState(_f.containerNode,"labelledby",_e.id);
},onButtonClick:function(_10){
var _11=dijit.byId(this.containerId);
_11.selectChild(_10);
},onCloseButtonClick:function(_12){
var _13=dijit.byId(this.containerId);
_13.closeChild(_12);
if(this._currentChild){
var b=this.pane2button[this._currentChild.id];
if(b){
dijit.focus(b.focusNode||b.domNode);
}
}
},adjacent:function(_14){
if(!this.isLeftToRight()&&(!this.tabPosition||/top|bottom/.test(this.tabPosition))){
_14=!_14;
}
var _15=this.getChildren();
var _16=dojo.indexOf(_15,this.pane2button[this._currentChild.id]);
var _17=_14?1:_15.length-1;
return _15[(_16+_17)%_15.length];
},onkeypress:function(e){
if(this.disabled||e.altKey){
return;
}
var _18=null;
if(e.ctrlKey||!e._djpage){
var k=dojo.keys;
switch(e.charOrCode){
case k.LEFT_ARROW:
case k.UP_ARROW:
if(!e._djpage){
_18=false;
}
break;
case k.PAGE_UP:
if(e.ctrlKey){
_18=false;
}
break;
case k.RIGHT_ARROW:
case k.DOWN_ARROW:
if(!e._djpage){
_18=true;
}
break;
case k.PAGE_DOWN:
if(e.ctrlKey){
_18=true;
}
break;
case k.DELETE:
if(this._currentChild.closable){
this.onCloseButtonClick(this._currentChild);
}
dojo.stopEvent(e);
break;
default:
if(e.ctrlKey){
if(e.charOrCode===k.TAB){
this.adjacent(!e.shiftKey).onClick();
dojo.stopEvent(e);
}else{
if(e.charOrCode=="w"){
if(this._currentChild.closable){
this.onCloseButtonClick(this._currentChild);
}
dojo.stopEvent(e);
}
}
}
}
if(_18!==null){
this.adjacent(_18).onClick();
dojo.stopEvent(e);
}
}
},onContainerKeyPress:function(_19){
_19.e._djpage=_19.page;
this.onkeypress(_19.e);
}});
dojo.declare("dijit.layout._StackButton",dijit.form.ToggleButton,{tabIndex:"-1",postCreate:function(evt){
dijit.setWaiRole((this.focusNode||this.domNode),"tab");
this.inherited(arguments);
},onClick:function(evt){
dijit.focus(this.focusNode);
},onClickCloseButton:function(evt){
evt.stopPropagation();
}});
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit.layout.StackContainer"]){
dojo._hasResource["dijit.layout.StackContainer"]=true;
dojo.provide("dijit.layout.StackContainer");
dojo.require("dijit._Templated");
dojo.require("dijit.layout._LayoutWidget");
dojo.requireLocalization("dijit","common",null,"ROOT,ar,ca,cs,da,de,el,es,fi,fr,he,hu,it,ja,ko,nb,nl,pl,pt,pt-pt,ro,ru,sk,sl,sv,th,tr,zh,zh-tw");
dojo.require("dojo.cookie");
dojo.declare("dijit.layout.StackContainer",dijit.layout._LayoutWidget,{doLayout:true,persist:false,baseClass:"dijitStackContainer",postCreate:function(){
this.inherited(arguments);
dojo.addClass(this.domNode,"dijitLayoutContainer");
dijit.setWaiRole(this.containerNode,"tabpanel");
this.connect(this.domNode,"onkeypress",this._onKeyPress);
},startup:function(){
if(this._started){
return;
}
var _1=this.getChildren();
dojo.forEach(_1,this._setupChild,this);
if(this.persist){
this.selectedChildWidget=dijit.byId(dojo.cookie(this.id+"_selectedChild"));
}else{
dojo.some(_1,function(_2){
if(_2.selected){
this.selectedChildWidget=_2;
}
return _2.selected;
},this);
}
var _3=this.selectedChildWidget;
if(!_3&&_1[0]){
_3=this.selectedChildWidget=_1[0];
_3.selected=true;
}
dojo.publish(this.id+"-startup",[{children:_1,selected:_3}]);
this.inherited(arguments);
},resize:function(){
var _4=this.selectedChildWidget;
if(_4&&!this._hasBeenShown){
this._hasBeenShown=true;
this._showChild(_4);
}
this.inherited(arguments);
},_setupChild:function(_5){
this.inherited(arguments);
dojo.removeClass(_5.domNode,"dijitVisible");
dojo.addClass(_5.domNode,"dijitHidden");
_5.domNode.title="";
},addChild:function(_6,_7){
this.inherited(arguments);
if(this._started){
dojo.publish(this.id+"-addChild",[_6,_7]);
this.layout();
if(!this.selectedChildWidget){
this.selectChild(_6);
}
}
},removeChild:function(_8){
this.inherited(arguments);
if(this._started){
dojo.publish(this.id+"-removeChild",[_8]);
}
if(this._beingDestroyed){
return;
}
if(this.selectedChildWidget===_8){
this.selectedChildWidget=undefined;
if(this._started){
var _9=this.getChildren();
if(_9.length){
this.selectChild(_9[0]);
}
}
}
if(this._started){
this.layout();
}
},selectChild:function(_a,_b){
_a=dijit.byId(_a);
if(this.selectedChildWidget!=_a){
this._transition(_a,this.selectedChildWidget,_b);
this.selectedChildWidget=_a;
dojo.publish(this.id+"-selectChild",[_a]);
if(this.persist){
dojo.cookie(this.id+"_selectedChild",this.selectedChildWidget.id);
}
}
},_transition:function(_c,_d){
if(_d){
this._hideChild(_d);
}
this._showChild(_c);
if(_c.resize){
if(this.doLayout){
_c.resize(this._containerContentBox||this._contentBox);
}else{
_c.resize();
}
}
},_adjacent:function(_e){
var _f=this.getChildren();
var _10=dojo.indexOf(_f,this.selectedChildWidget);
_10+=_e?1:_f.length-1;
return _f[_10%_f.length];
},forward:function(){
this.selectChild(this._adjacent(true),true);
},back:function(){
this.selectChild(this._adjacent(false),true);
},_onKeyPress:function(e){
dojo.publish(this.id+"-containerKeyPress",[{e:e,page:this}]);
},layout:function(){
if(this.doLayout&&this.selectedChildWidget&&this.selectedChildWidget.resize){
this.selectedChildWidget.resize(this._containerContentBox||this._contentBox);
}
},_showChild:function(_11){
var _12=this.getChildren();
_11.isFirstChild=(_11==_12[0]);
_11.isLastChild=(_11==_12[_12.length-1]);
_11.selected=true;
dojo.removeClass(_11.domNode,"dijitHidden");
dojo.addClass(_11.domNode,"dijitVisible");
_11._onShow();
},_hideChild:function(_13){
_13.selected=false;
dojo.removeClass(_13.domNode,"dijitVisible");
dojo.addClass(_13.domNode,"dijitHidden");
_13.onHide();
},closeChild:function(_14){
var _15=_14.onClose(this,_14);
if(_15){
this.removeChild(_14);
_14.destroyRecursive();
}
},destroyDescendants:function(_16){
dojo.forEach(this.getChildren(),function(_17){
this.removeChild(_17);
_17.destroyRecursive(_16);
},this);
}});
dojo.require("dijit.layout.StackController");
dojo.extend(dijit._Widget,{selected:false,closable:false,iconClass:"",showTitle:true});
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit.MenuItem"]){
dojo._hasResource["dijit.MenuItem"]=true;
dojo.provide("dijit.MenuItem");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dijit._Contained");
dojo.require("dijit._CssStateMixin");
dojo.declare("dijit.MenuItem",[dijit._Widget,dijit._Templated,dijit._Contained,dijit._CssStateMixin],{templateString:dojo.cache("dijit","templates/MenuItem.html","<tr class=\"dijitReset dijitMenuItem\" dojoAttachPoint=\"focusNode\" waiRole=\"menuitem\" tabIndex=\"-1\"\n\t\tdojoAttachEvent=\"onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" waiRole=\"presentation\">\n\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitMenuItemIcon\" dojoAttachPoint=\"iconNode\"/>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" dojoAttachPoint=\"containerNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" dojoAttachPoint=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" waiRole=\"presentation\">\n\t\t<div dojoAttachPoint=\"arrowWrapper\" style=\"visibility: hidden\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitMenuExpand\"/>\n\t\t\t<span class=\"dijitMenuExpandA11y\">+</span>\n\t\t</div>\n\t</td>\n</tr>\n"),attributeMap:dojo.delegate(dijit._Widget.prototype.attributeMap,{label:{node:"containerNode",type:"innerHTML"},iconClass:{node:"iconNode",type:"class"}}),baseClass:"dijitMenuItem",label:"",iconClass:"",accelKey:"",disabled:false,_fillContent:function(_1){
if(_1&&!("label" in this.params)){
this.set("label",_1.innerHTML);
}
},postCreate:function(){
this.inherited(arguments);
dojo.setSelectable(this.domNode,false);
var _2=this.id+"_text";
dojo.attr(this.containerNode,"id",_2);
if(this.accelKeyNode){
dojo.attr(this.accelKeyNode,"id",this.id+"_accel");
_2+=" "+this.id+"_accel";
}
dijit.setWaiState(this.domNode,"labelledby",_2);
},_onHover:function(){
this.getParent().onItemHover(this);
},_onUnhover:function(){
this.getParent().onItemUnhover(this);
this._hovering=false;
this._setStateClass();
},_onClick:function(_3){
this.getParent().onItemClick(this,_3);
dojo.stopEvent(_3);
},onClick:function(_4){
},focus:function(){
try{
if(dojo.isIE==8){
this.containerNode.focus();
}
dijit.focus(this.focusNode);
}
catch(e){
}
},_onFocus:function(){
this._setSelected(true);
this.getParent()._onItemFocus(this);
this.inherited(arguments);
},_setSelected:function(_5){
dojo.toggleClass(this.domNode,"dijitMenuItemSelected",_5);
},setLabel:function(_6){
dojo.deprecated("dijit.MenuItem.setLabel() is deprecated.  Use set('label', ...) instead.","","2.0");
this.set("label",_6);
},setDisabled:function(_7){
dojo.deprecated("dijit.Menu.setDisabled() is deprecated.  Use set('disabled', bool) instead.","","2.0");
this.set("disabled",_7);
},_setDisabledAttr:function(_8){
this.disabled=_8;
dijit.setWaiState(this.focusNode,"disabled",_8?"true":"false");
},_setAccelKeyAttr:function(_9){
this.accelKey=_9;
this.accelKeyNode.style.display=_9?"":"none";
this.accelKeyNode.innerHTML=_9;
dojo.attr(this.containerNode,"colSpan",_9?"1":"2");
}});
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit._KeyNavContainer"]){
dojo._hasResource["dijit._KeyNavContainer"]=true;
dojo.provide("dijit._KeyNavContainer");
dojo.require("dijit._Container");
dojo.declare("dijit._KeyNavContainer",dijit._Container,{tabIndex:"0",_keyNavCodes:{},connectKeyNavHandlers:function(_1,_2){
var _3=(this._keyNavCodes={});
var _4=dojo.hitch(this,this.focusPrev);
var _5=dojo.hitch(this,this.focusNext);
dojo.forEach(_1,function(_6){
_3[_6]=_4;
});
dojo.forEach(_2,function(_7){
_3[_7]=_5;
});
this.connect(this.domNode,"onkeypress","_onContainerKeypress");
this.connect(this.domNode,"onfocus","_onContainerFocus");
},startupKeyNavChildren:function(){
dojo.forEach(this.getChildren(),dojo.hitch(this,"_startupChild"));
},addChild:function(_8,_9){
dijit._KeyNavContainer.superclass.addChild.apply(this,arguments);
this._startupChild(_8);
},focus:function(){
this.focusFirstChild();
},focusFirstChild:function(){
var _a=this._getFirstFocusableChild();
if(_a){
this.focusChild(_a);
}
},focusNext:function(){
var _b=this._getNextFocusableChild(this.focusedChild,1);
this.focusChild(_b);
},focusPrev:function(){
var _c=this._getNextFocusableChild(this.focusedChild,-1);
this.focusChild(_c,true);
},focusChild:function(_d,_e){
if(this.focusedChild&&_d!==this.focusedChild){
this._onChildBlur(this.focusedChild);
}
_d.focus(_e?"end":"start");
this.focusedChild=_d;
},_startupChild:function(_f){
_f.set("tabIndex","-1");
this.connect(_f,"_onFocus",function(){
_f.set("tabIndex",this.tabIndex);
});
this.connect(_f,"_onBlur",function(){
_f.set("tabIndex","-1");
});
},_onContainerFocus:function(evt){
if(evt.target!==this.domNode){
return;
}
this.focusFirstChild();
dojo.attr(this.domNode,"tabIndex","-1");
},_onBlur:function(evt){
if(this.tabIndex){
dojo.attr(this.domNode,"tabIndex",this.tabIndex);
}
this.inherited(arguments);
},_onContainerKeypress:function(evt){
if(evt.ctrlKey||evt.altKey){
return;
}
var _10=this._keyNavCodes[evt.charOrCode];
if(_10){
_10();
dojo.stopEvent(evt);
}
},_onChildBlur:function(_11){
},_getFirstFocusableChild:function(){
return this._getNextFocusableChild(null,1);
},_getNextFocusableChild:function(_12,dir){
if(_12){
_12=this._getSiblingOfChild(_12,dir);
}
var _13=this.getChildren();
for(var i=0;i<_13.length;i++){
if(!_12){
_12=_13[(dir>0)?0:(_13.length-1)];
}
if(_12.isFocusable()){
return _12;
}
_12=this._getSiblingOfChild(_12,dir);
}
return null;
}});
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit.PopupMenuItem"]){
dojo._hasResource["dijit.PopupMenuItem"]=true;
dojo.provide("dijit.PopupMenuItem");
dojo.require("dijit.MenuItem");
dojo.declare("dijit.PopupMenuItem",dijit.MenuItem,{_fillContent:function(){
if(this.srcNodeRef){
var _1=dojo.query("*",this.srcNodeRef);
dijit.PopupMenuItem.superclass._fillContent.call(this,_1[0]);
this.dropDownContainer=this.srcNodeRef;
}
},startup:function(){
if(this._started){
return;
}
this.inherited(arguments);
if(!this.popup){
var _2=dojo.query("[widgetId]",this.dropDownContainer)[0];
this.popup=dijit.byNode(_2);
}
dojo.body().appendChild(this.popup.domNode);
this.popup.startup();
this.popup.domNode.style.display="none";
if(this.arrowWrapper){
dojo.style(this.arrowWrapper,"visibility","");
}
dijit.setWaiState(this.focusNode,"haspopup","true");
},destroyDescendants:function(){
if(this.popup){
if(!this.popup._destroyed){
this.popup.destroyRecursive();
}
delete this.popup;
}
this.inherited(arguments);
}});
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit.CheckedMenuItem"]){
dojo._hasResource["dijit.CheckedMenuItem"]=true;
dojo.provide("dijit.CheckedMenuItem");
dojo.require("dijit.MenuItem");
dojo.declare("dijit.CheckedMenuItem",dijit.MenuItem,{templateString:dojo.cache("dijit","templates/CheckedMenuItem.html","<tr class=\"dijitReset dijitMenuItem\" dojoAttachPoint=\"focusNode\" waiRole=\"menuitemcheckbox\" tabIndex=\"-1\"\n\t\tdojoAttachEvent=\"onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" waiRole=\"presentation\">\n\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitMenuItemIcon dijitCheckedMenuItemIcon\" dojoAttachPoint=\"iconNode\"/>\n\t\t<span class=\"dijitCheckedMenuItemIconChar\">&#10003;</span>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" dojoAttachPoint=\"containerNode,labelNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" dojoAttachPoint=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" waiRole=\"presentation\">&nbsp;</td>\n</tr>\n"),checked:false,_setCheckedAttr:function(_1){
dojo.toggleClass(this.domNode,"dijitCheckedMenuItemChecked",_1);
dijit.setWaiState(this.domNode,"checked",_1);
this.checked=_1;
},onChange:function(_2){
},_onClick:function(e){
if(!this.disabled){
this.set("checked",!this.checked);
this.onChange(this.checked);
}
this.inherited(arguments);
}});
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit.MenuSeparator"]){
dojo._hasResource["dijit.MenuSeparator"]=true;
dojo.provide("dijit.MenuSeparator");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dijit._Contained");
dojo.declare("dijit.MenuSeparator",[dijit._Widget,dijit._Templated,dijit._Contained],{templateString:dojo.cache("dijit","templates/MenuSeparator.html","<tr class=\"dijitMenuSeparator\">\n\t<td class=\"dijitMenuSeparatorIconCell\">\n\t\t<div class=\"dijitMenuSeparatorTop\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n\t<td colspan=\"3\" class=\"dijitMenuSeparatorLabelCell\">\n\t\t<div class=\"dijitMenuSeparatorTop dijitMenuSeparatorLabel\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n</tr>\n"),postCreate:function(){
dojo.setSelectable(this.domNode,false);
},isFocusable:function(){
return false;
}});
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit.Menu"]){
dojo._hasResource["dijit.Menu"]=true;
dojo.provide("dijit.Menu");
dojo.require("dojo.window");
dojo.require("dijit._Widget");
dojo.require("dijit._KeyNavContainer");
dojo.require("dijit._Templated");
dojo.declare("dijit._MenuBase",[dijit._Widget,dijit._Templated,dijit._KeyNavContainer],{parentMenu:null,popupDelay:500,startup:function(){
if(this._started){
return;
}
dojo.forEach(this.getChildren(),function(_1){
_1.startup();
});
this.startupKeyNavChildren();
this.inherited(arguments);
},onExecute:function(){
},onCancel:function(_2){
},_moveToPopup:function(_3){
if(this.focusedChild&&this.focusedChild.popup&&!this.focusedChild.disabled){
this.focusedChild._onClick(_3);
}else{
var _4=this._getTopMenu();
if(_4&&_4._isMenuBar){
_4.focusNext();
}
}
},_onPopupHover:function(_5){
if(this.currentPopup&&this.currentPopup._pendingClose_timer){
var _6=this.currentPopup.parentMenu;
if(_6.focusedChild){
_6.focusedChild._setSelected(false);
}
_6.focusedChild=this.currentPopup.from_item;
_6.focusedChild._setSelected(true);
this._stopPendingCloseTimer(this.currentPopup);
}
},onItemHover:function(_7){
if(this.isActive){
this.focusChild(_7);
if(this.focusedChild.popup&&!this.focusedChild.disabled&&!this.hover_timer){
this.hover_timer=setTimeout(dojo.hitch(this,"_openPopup"),this.popupDelay);
}
}
if(this.focusedChild){
this.focusChild(_7);
}
this._hoveredChild=_7;
},_onChildBlur:function(_8){
this._stopPopupTimer();
_8._setSelected(false);
var _9=_8.popup;
if(_9){
this._stopPendingCloseTimer(_9);
_9._pendingClose_timer=setTimeout(function(){
_9._pendingClose_timer=null;
if(_9.parentMenu){
_9.parentMenu.currentPopup=null;
}
dijit.popup.close(_9);
},this.popupDelay);
}
},onItemUnhover:function(_a){
if(this.isActive){
this._stopPopupTimer();
}
if(this._hoveredChild==_a){
this._hoveredChild=null;
}
},_stopPopupTimer:function(){
if(this.hover_timer){
clearTimeout(this.hover_timer);
this.hover_timer=null;
}
},_stopPendingCloseTimer:function(_b){
if(_b._pendingClose_timer){
clearTimeout(_b._pendingClose_timer);
_b._pendingClose_timer=null;
}
},_stopFocusTimer:function(){
if(this._focus_timer){
clearTimeout(this._focus_timer);
this._focus_timer=null;
}
},_getTopMenu:function(){
for(var _c=this;_c.parentMenu;_c=_c.parentMenu){
}
return _c;
},onItemClick:function(_d,_e){
if(typeof this.isShowingNow=="undefined"){
this._markActive();
}
this.focusChild(_d);
if(_d.disabled){
return false;
}
if(_d.popup){
this._openPopup();
}else{
this.onExecute();
_d.onClick(_e);
}
},_openPopup:function(){
this._stopPopupTimer();
var _f=this.focusedChild;
if(!_f){
return;
}
var _10=_f.popup;
if(_10.isShowingNow){
return;
}
if(this.currentPopup){
this._stopPendingCloseTimer(this.currentPopup);
dijit.popup.close(this.currentPopup);
}
_10.parentMenu=this;
_10.from_item=_f;
var _11=this;
dijit.popup.open({parent:this,popup:_10,around:_f.domNode,orient:this._orient||(this.isLeftToRight()?{"TR":"TL","TL":"TR","BR":"BL","BL":"BR"}:{"TL":"TR","TR":"TL","BL":"BR","BR":"BL"}),onCancel:function(){
_11.focusChild(_f);
_11._cleanUp();
_f._setSelected(true);
_11.focusedChild=_f;
},onExecute:dojo.hitch(this,"_cleanUp")});
this.currentPopup=_10;
_10.connect(_10.domNode,"onmouseenter",dojo.hitch(_11,"_onPopupHover"));
if(_10.focus){
_10._focus_timer=setTimeout(dojo.hitch(_10,function(){
this._focus_timer=null;
this.focus();
}),0);
}
},_markActive:function(){
this.isActive=true;
dojo.addClass(this.domNode,"dijitMenuActive");
dojo.removeClass(this.domNode,"dijitMenuPassive");
},onOpen:function(e){
this.isShowingNow=true;
this._markActive();
},_markInactive:function(){
this.isActive=false;
dojo.removeClass(this.domNode,"dijitMenuActive");
dojo.addClass(this.domNode,"dijitMenuPassive");
},onClose:function(){
this._stopFocusTimer();
this._markInactive();
this.isShowingNow=false;
this.parentMenu=null;
},_closeChild:function(){
this._stopPopupTimer();
if(this.focusedChild){
this.focusedChild._setSelected(false);
this.focusedChild._onUnhover();
this.focusedChild=null;
}
if(this.currentPopup){
dijit.popup.close(this.currentPopup);
this.currentPopup=null;
}
},_onItemFocus:function(_12){
if(this._hoveredChild&&this._hoveredChild!=_12){
this._hoveredChild._onUnhover();
}
},_onBlur:function(){
this._cleanUp();
this.inherited(arguments);
},_cleanUp:function(){
this._closeChild();
if(typeof this.isShowingNow=="undefined"){
this._markInactive();
}
}});
dojo.declare("dijit.Menu",dijit._MenuBase,{constructor:function(){
this._bindings=[];
},templateString:dojo.cache("dijit","templates/Menu.html","<table class=\"dijit dijitMenu dijitMenuPassive dijitReset dijitMenuTable\" waiRole=\"menu\" tabIndex=\"${tabIndex}\" dojoAttachEvent=\"onkeypress:_onKeyPress\" cellspacing=0>\n\t<tbody class=\"dijitReset\" dojoAttachPoint=\"containerNode\"></tbody>\n</table>\n"),baseClass:"dijitMenu",targetNodeIds:[],contextMenuForWindow:false,leftClickToOpen:false,refocus:true,postCreate:function(){
if(this.contextMenuForWindow){
this.bindDomNode(dojo.body());
}else{
dojo.forEach(this.targetNodeIds,this.bindDomNode,this);
}
var k=dojo.keys,l=this.isLeftToRight();
this._openSubMenuKey=l?k.RIGHT_ARROW:k.LEFT_ARROW;
this._closeSubMenuKey=l?k.LEFT_ARROW:k.RIGHT_ARROW;
this.connectKeyNavHandlers([k.UP_ARROW],[k.DOWN_ARROW]);
},_onKeyPress:function(evt){
if(evt.ctrlKey||evt.altKey){
return;
}
switch(evt.charOrCode){
case this._openSubMenuKey:
this._moveToPopup(evt);
dojo.stopEvent(evt);
break;
case this._closeSubMenuKey:
if(this.parentMenu){
if(this.parentMenu._isMenuBar){
this.parentMenu.focusPrev();
}else{
this.onCancel(false);
}
}else{
dojo.stopEvent(evt);
}
break;
}
},_iframeContentWindow:function(_13){
var win=dojo.window.get(this._iframeContentDocument(_13))||this._iframeContentDocument(_13)["__parent__"]||(_13.name&&dojo.doc.frames[_13.name])||null;
return win;
},_iframeContentDocument:function(_14){
var doc=_14.contentDocument||(_14.contentWindow&&_14.contentWindow.document)||(_14.name&&dojo.doc.frames[_14.name]&&dojo.doc.frames[_14.name].document)||null;
return doc;
},bindDomNode:function(_15){
_15=dojo.byId(_15);
var cn;
if(_15.tagName.toLowerCase()=="iframe"){
var _16=_15,win=this._iframeContentWindow(_16);
cn=dojo.withGlobal(win,dojo.body);
}else{
cn=(_15==dojo.body()?dojo.doc.documentElement:_15);
}
var _17={node:_15,iframe:_16};
dojo.attr(_15,"_dijitMenu"+this.id,this._bindings.push(_17));
var _18=dojo.hitch(this,function(cn){
return [dojo.connect(cn,this.leftClickToOpen?"onclick":"oncontextmenu",this,function(evt){
dojo.stopEvent(evt);
this._scheduleOpen(evt.target,_16,{x:evt.pageX,y:evt.pageY});
}),dojo.connect(cn,"onkeydown",this,function(evt){
if(evt.shiftKey&&evt.keyCode==dojo.keys.F10){
dojo.stopEvent(evt);
this._scheduleOpen(evt.target,_16);
}
})];
});
_17.connects=cn?_18(cn):[];
if(_16){
_17.onloadHandler=dojo.hitch(this,function(){
var win=this._iframeContentWindow(_16);
cn=dojo.withGlobal(win,dojo.body);
_17.connects=_18(cn);
});
if(_16.addEventListener){
_16.addEventListener("load",_17.onloadHandler,false);
}else{
_16.attachEvent("onload",_17.onloadHandler);
}
}
},unBindDomNode:function(_19){
var _1a;
try{
_1a=dojo.byId(_19);
}
catch(e){
return;
}
var _1b="_dijitMenu"+this.id;
if(_1a&&dojo.hasAttr(_1a,_1b)){
var bid=dojo.attr(_1a,_1b)-1,b=this._bindings[bid];
dojo.forEach(b.connects,dojo.disconnect);
var _1c=b.iframe;
if(_1c){
if(_1c.removeEventListener){
_1c.removeEventListener("load",b.onloadHandler,false);
}else{
_1c.detachEvent("onload",b.onloadHandler);
}
}
dojo.removeAttr(_1a,_1b);
delete this._bindings[bid];
}
},_scheduleOpen:function(_1d,_1e,_1f){
if(!this._openTimer){
this._openTimer=setTimeout(dojo.hitch(this,function(){
delete this._openTimer;
this._openMyself({target:_1d,iframe:_1e,coords:_1f});
}),1);
}
},_openMyself:function(_20){
var _21=_20.target,_22=_20.iframe,_23=_20.coords;
if(_23){
if(_22){
var od=_21.ownerDocument,ifc=dojo.position(_22,true),win=this._iframeContentWindow(_22),_24=dojo.withGlobal(win,"_docScroll",dojo);
var cs=dojo.getComputedStyle(_22),tp=dojo._toPixelValue,_25=(dojo.isIE&&dojo.isQuirks?0:tp(_22,cs.paddingLeft))+(dojo.isIE&&dojo.isQuirks?tp(_22,cs.borderLeftWidth):0),top=(dojo.isIE&&dojo.isQuirks?0:tp(_22,cs.paddingTop))+(dojo.isIE&&dojo.isQuirks?tp(_22,cs.borderTopWidth):0);
_23.x+=ifc.x+_25-_24.x;
_23.y+=ifc.y+top-_24.y;
}
}else{
_23=dojo.position(_21,true);
_23.x+=10;
_23.y+=10;
}
var _26=this;
var _27=dijit.getFocus(this);
function _28(){
if(_26.refocus){
dijit.focus(_27);
}
dijit.popup.close(_26);
};
dijit.popup.open({popup:this,x:_23.x,y:_23.y,onExecute:_28,onCancel:_28,orient:this.isLeftToRight()?"L":"R"});
this.focus();
this._onBlur=function(){
this.inherited("_onBlur",arguments);
dijit.popup.close(this);
};
},uninitialize:function(){
dojo.forEach(this._bindings,function(b){
if(b){
this.unBindDomNode(b.node);
}
},this);
this.inherited(arguments);
}});
dojo.require("dijit.MenuItem");
dojo.require("dijit.PopupMenuItem");
dojo.require("dijit.CheckedMenuItem");
dojo.require("dijit.MenuSeparator");
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit.layout.TabController"]){
dojo._hasResource["dijit.layout.TabController"]=true;
dojo.provide("dijit.layout.TabController");
dojo.require("dijit.layout.StackController");
dojo.require("dijit.Menu");
dojo.require("dijit.MenuItem");
dojo.requireLocalization("dijit","common",null,"ROOT,ar,ca,cs,da,de,el,es,fi,fr,he,hu,it,ja,ko,nb,nl,pl,pt,pt-pt,ro,ru,sk,sl,sv,th,tr,zh,zh-tw");
dojo.declare("dijit.layout.TabController",dijit.layout.StackController,{templateString:"<div wairole='tablist' dojoAttachEvent='onkeypress:onkeypress'></div>",tabPosition:"top",buttonWidget:"dijit.layout._TabButton",_rectifyRtlTabList:function(){
if(0>=this.tabPosition.indexOf("-h")){
return;
}
if(!this.pane2button){
return;
}
var _1=0;
for(var _2 in this.pane2button){
var ow=this.pane2button[_2].innerDiv.scrollWidth;
_1=Math.max(_1,ow);
}
for(_2 in this.pane2button){
this.pane2button[_2].innerDiv.style.width=_1+"px";
}
}});
dojo.declare("dijit.layout._TabButton",dijit.layout._StackButton,{baseClass:"dijitTab",cssStateNodes:{closeNode:"dijitTabCloseButton"},templateString:dojo.cache("dijit.layout","templates/_TabButton.html","<div waiRole=\"presentation\" dojoAttachPoint=\"titleNode\" dojoAttachEvent='onclick:onClick'>\n    <div waiRole=\"presentation\" class='dijitTabInnerDiv' dojoAttachPoint='innerDiv'>\n        <div waiRole=\"presentation\" class='dijitTabContent' dojoAttachPoint='tabContent'>\n        \t<div waiRole=\"presentation\" dojoAttachPoint='focusNode'>\n\t\t        <img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon\" dojoAttachPoint='iconNode' />\n\t\t        <span dojoAttachPoint='containerNode' class='tabLabel'></span>\n\t\t        <span class=\"dijitInline dijitTabCloseButton dijitTabCloseIcon\" dojoAttachPoint='closeNode'\n\t\t        \t\tdojoAttachEvent='onclick: onClickCloseButton' waiRole=\"presentation\">\n\t\t            <span dojoAttachPoint='closeText' class='dijitTabCloseText'>x</span\n\t\t        ></span>\n\t\t\t</div>\n        </div>\n    </div>\n</div>\n"),scrollOnFocus:false,postMixInProperties:function(){
if(!this.iconClass){
this.iconClass="dijitTabButtonIcon";
}
},postCreate:function(){
this.inherited(arguments);
dojo.setSelectable(this.containerNode,false);
if(this.iconNode.className=="dijitTabButtonIcon"){
dojo.style(this.iconNode,"width","1px");
}
},startup:function(){
this.inherited(arguments);
var n=this.domNode;
setTimeout(function(){
n.className=n.className;
},1);
},_setCloseButtonAttr:function(_3){
this.closeButton=_3;
dojo.toggleClass(this.innerDiv,"dijitClosable",_3);
this.closeNode.style.display=_3?"":"none";
if(_3){
var _4=dojo.i18n.getLocalization("dijit","common");
if(this.closeNode){
dojo.attr(this.closeNode,"title",_4.itemClose);
}
var _4=dojo.i18n.getLocalization("dijit","common");
this._closeMenu=new dijit.Menu({id:this.id+"_Menu",dir:this.dir,lang:this.lang,targetNodeIds:[this.domNode]});
this._closeMenu.addChild(new dijit.MenuItem({label:_4.itemClose,dir:this.dir,lang:this.lang,onClick:dojo.hitch(this,"onClickCloseButton")}));
}else{
if(this._closeMenu){
this._closeMenu.destroyRecursive();
delete this._closeMenu;
}
}
},_setLabelAttr:function(_5){
this.inherited(arguments);
if(this.showLabel==false&&!this.params.title){
this.iconNode.alt=dojo.trim(this.containerNode.innerText||this.containerNode.textContent||"");
}
},destroy:function(){
if(this._closeMenu){
this._closeMenu.destroyRecursive();
delete this._closeMenu;
}
this.inherited(arguments);
}});
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit.layout._TabContainerBase"]){
dojo._hasResource["dijit.layout._TabContainerBase"]=true;
dojo.provide("dijit.layout._TabContainerBase");
dojo.require("dijit.layout.StackContainer");
dojo.require("dijit._Templated");
dojo.declare("dijit.layout._TabContainerBase",[dijit.layout.StackContainer,dijit._Templated],{tabPosition:"top",baseClass:"dijitTabContainer",tabStrip:false,nested:false,templateString:dojo.cache("dijit.layout","templates/TabContainer.html","<div class=\"dijitTabContainer\">\n\t<div class=\"dijitTabListWrapper\" dojoAttachPoint=\"tablistNode\"></div>\n\t<div dojoAttachPoint=\"tablistSpacer\" class=\"dijitTabSpacer ${baseClass}-spacer\"></div>\n\t<div class=\"dijitTabPaneWrapper ${baseClass}-container\" dojoAttachPoint=\"containerNode\"></div>\n</div>\n"),postMixInProperties:function(){
this.baseClass+=this.tabPosition.charAt(0).toUpperCase()+this.tabPosition.substr(1).replace(/-.*/,"");
this.srcNodeRef&&dojo.style(this.srcNodeRef,"visibility","hidden");
this.inherited(arguments);
},postCreate:function(){
this.inherited(arguments);
this.tablist=this._makeController(this.tablistNode);
if(!this.doLayout){
dojo.addClass(this.domNode,"dijitTabContainerNoLayout");
}
if(this.nested){
dojo.addClass(this.domNode,"dijitTabContainerNested");
dojo.addClass(this.tablist.containerNode,"dijitTabContainerTabListNested");
dojo.addClass(this.tablistSpacer,"dijitTabContainerSpacerNested");
dojo.addClass(this.containerNode,"dijitTabPaneWrapperNested");
}else{
dojo.addClass(this.domNode,"tabStrip-"+(this.tabStrip?"enabled":"disabled"));
}
},_setupChild:function(_1){
dojo.addClass(_1.domNode,"dijitTabPane");
this.inherited(arguments);
},startup:function(){
if(this._started){
return;
}
this.tablist.startup();
this.inherited(arguments);
},layout:function(){
if(!this._contentBox||typeof (this._contentBox.l)=="undefined"){
return;
}
var sc=this.selectedChildWidget;
if(this.doLayout){
var _2=this.tabPosition.replace(/-h/,"");
this.tablist.layoutAlign=_2;
var _3=[this.tablist,{domNode:this.tablistSpacer,layoutAlign:_2},{domNode:this.containerNode,layoutAlign:"client"}];
dijit.layout.layoutChildren(this.domNode,this._contentBox,_3);
this._containerContentBox=dijit.layout.marginBox2contentBox(this.containerNode,_3[2]);
if(sc&&sc.resize){
sc.resize(this._containerContentBox);
}
}else{
if(this.tablist.resize){
this.tablist.resize({w:dojo.contentBox(this.domNode).w});
}
if(sc&&sc.resize){
sc.resize();
}
}
},destroy:function(){
if(this.tablist){
this.tablist.destroy();
}
this.inherited(arguments);
}});
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit.layout.ScrollingTabController"]){
dojo._hasResource["dijit.layout.ScrollingTabController"]=true;
dojo.provide("dijit.layout.ScrollingTabController");
dojo.require("dijit.layout.TabController");
dojo.require("dijit.Menu");
dojo.declare("dijit.layout.ScrollingTabController",dijit.layout.TabController,{templateString:dojo.cache("dijit.layout","templates/ScrollingTabController.html","<div class=\"dijitTabListContainer-${tabPosition}\" style=\"visibility:hidden\">\n\t<div dojoType=\"dijit.layout._ScrollingTabControllerButton\"\n\t\t\tclass=\"tabStripButton-${tabPosition}\"\n\t\t\tid=\"${id}_menuBtn\" iconClass=\"dijitTabStripMenuIcon\"\n\t\t\tdojoAttachPoint=\"_menuBtn\" showLabel=false>&#9660;</div>\n\t<div dojoType=\"dijit.layout._ScrollingTabControllerButton\"\n\t\t\tclass=\"tabStripButton-${tabPosition}\"\n\t\t\tid=\"${id}_leftBtn\" iconClass=\"dijitTabStripSlideLeftIcon\"\n\t\t\tdojoAttachPoint=\"_leftBtn\" dojoAttachEvent=\"onClick: doSlideLeft\" showLabel=false>&#9664;</div>\n\t<div dojoType=\"dijit.layout._ScrollingTabControllerButton\"\n\t\t\tclass=\"tabStripButton-${tabPosition}\"\n\t\t\tid=\"${id}_rightBtn\" iconClass=\"dijitTabStripSlideRightIcon\"\n\t\t\tdojoAttachPoint=\"_rightBtn\" dojoAttachEvent=\"onClick: doSlideRight\" showLabel=false>&#9654;</div>\n\t<div class='dijitTabListWrapper' dojoAttachPoint='tablistWrapper'>\n\t\t<div wairole='tablist' dojoAttachEvent='onkeypress:onkeypress'\n\t\t\t\tdojoAttachPoint='containerNode' class='nowrapTabStrip'></div>\n\t</div>\n</div>\n"),useMenu:true,useSlider:true,tabStripClass:"",widgetsInTemplate:true,_minScroll:5,attributeMap:dojo.delegate(dijit._Widget.prototype.attributeMap,{"class":"containerNode"}),postCreate:function(){
this.inherited(arguments);
var n=this.domNode;
this.scrollNode=this.tablistWrapper;
this._initButtons();
if(!this.tabStripClass){
this.tabStripClass="dijitTabContainer"+this.tabPosition.charAt(0).toUpperCase()+this.tabPosition.substr(1).replace(/-.*/,"")+"None";
dojo.addClass(n,"tabStrip-disabled");
}
dojo.addClass(this.tablistWrapper,this.tabStripClass);
},onStartup:function(){
this.inherited(arguments);
dojo.style(this.domNode,"visibility","visible");
this._postStartup=true;
},onAddChild:function(_1,_2){
this.inherited(arguments);
var _3;
if(this.useMenu){
var _4=this.containerId;
_3=new dijit.MenuItem({id:_1.id+"_stcMi",label:_1.title,dir:_1.dir,lang:_1.lang,onClick:dojo.hitch(this,function(){
var _5=dijit.byId(_4);
_5.selectChild(_1);
})});
this._menuChildren[_1.id]=_3;
this._menu.addChild(_3,_2);
}
this.pane2handles[_1.id].push(this.connect(this.pane2button[_1.id],"set",function(_6,_7){
if(this._postStartup){
if(_6=="label"){
if(_3){
_3.set(_6,_7);
}
if(this._dim){
this.resize(this._dim);
}
}
}
}));
dojo.style(this.containerNode,"width",(dojo.style(this.containerNode,"width")+200)+"px");
},onRemoveChild:function(_8,_9){
var _a=this.pane2button[_8.id];
if(this._selectedTab===_a.domNode){
this._selectedTab=null;
}
if(this.useMenu&&_8&&_8.id&&this._menuChildren[_8.id]){
this._menu.removeChild(this._menuChildren[_8.id]);
this._menuChildren[_8.id].destroy();
delete this._menuChildren[_8.id];
}
this.inherited(arguments);
},_initButtons:function(){
this._menuChildren={};
this._btnWidth=0;
this._buttons=dojo.query("> .tabStripButton",this.domNode).filter(function(_b){
if((this.useMenu&&_b==this._menuBtn.domNode)||(this.useSlider&&(_b==this._rightBtn.domNode||_b==this._leftBtn.domNode))){
this._btnWidth+=dojo.marginBox(_b).w;
return true;
}else{
dojo.style(_b,"display","none");
return false;
}
},this);
if(this.useMenu){
this._menu=new dijit.Menu({id:this.id+"_menu",dir:this.dir,lang:this.lang,targetNodeIds:[this._menuBtn.domNode],leftClickToOpen:true,refocus:false});
this._supportingWidgets.push(this._menu);
}
},_getTabsWidth:function(){
var _c=this.getChildren();
if(_c.length){
var _d=_c[this.isLeftToRight()?0:_c.length-1].domNode,_e=_c[this.isLeftToRight()?_c.length-1:0].domNode;
return _e.offsetLeft+dojo.style(_e,"width")-_d.offsetLeft;
}else{
return 0;
}
},_enableBtn:function(_f){
var _10=this._getTabsWidth();
_f=_f||dojo.style(this.scrollNode,"width");
return _10>0&&_f<_10;
},resize:function(dim){
if(this.domNode.offsetWidth==0){
return;
}
this._dim=dim;
this.scrollNode.style.height="auto";
this._contentBox=dijit.layout.marginBox2contentBox(this.domNode,{h:0,w:dim.w});
this._contentBox.h=this.scrollNode.offsetHeight;
dojo.contentBox(this.domNode,this._contentBox);
var _11=this._enableBtn(this._contentBox.w);
this._buttons.style("display",_11?"":"none");
this._leftBtn.layoutAlign="left";
this._rightBtn.layoutAlign="right";
this._menuBtn.layoutAlign=this.isLeftToRight()?"right":"left";
dijit.layout.layoutChildren(this.domNode,this._contentBox,[this._menuBtn,this._leftBtn,this._rightBtn,{domNode:this.scrollNode,layoutAlign:"client"}]);
if(this._selectedTab){
if(this._anim&&this._anim.status()=="playing"){
this._anim.stop();
}
var w=this.scrollNode,sl=this._convertToScrollLeft(this._getScrollForSelectedTab());
w.scrollLeft=sl;
}
this._setButtonClass(this._getScroll());
this._postResize=true;
},_getScroll:function(){
var sl=(this.isLeftToRight()||dojo.isIE<8||(dojo.isIE&&dojo.isQuirks)||dojo.isWebKit)?this.scrollNode.scrollLeft:dojo.style(this.containerNode,"width")-dojo.style(this.scrollNode,"width")+(dojo.isIE==8?-1:1)*this.scrollNode.scrollLeft;
return sl;
},_convertToScrollLeft:function(val){
if(this.isLeftToRight()||dojo.isIE<8||(dojo.isIE&&dojo.isQuirks)||dojo.isWebKit){
return val;
}else{
var _12=dojo.style(this.containerNode,"width")-dojo.style(this.scrollNode,"width");
return (dojo.isIE==8?-1:1)*(val-_12);
}
},onSelectChild:function(_13){
var tab=this.pane2button[_13.id];
if(!tab||!_13){
return;
}
var _14=tab.domNode;
if(this._postResize&&_14!=this._selectedTab){
this._selectedTab=_14;
var sl=this._getScroll();
if(sl>_14.offsetLeft||sl+dojo.style(this.scrollNode,"width")<_14.offsetLeft+dojo.style(_14,"width")){
this.createSmoothScroll().play();
}
}
this.inherited(arguments);
},_getScrollBounds:function(){
var _15=this.getChildren(),_16=dojo.style(this.scrollNode,"width"),_17=dojo.style(this.containerNode,"width"),_18=_17-_16,_19=this._getTabsWidth();
if(_15.length&&_19>_16){
return {min:this.isLeftToRight()?0:_15[_15.length-1].domNode.offsetLeft,max:this.isLeftToRight()?(_15[_15.length-1].domNode.offsetLeft+dojo.style(_15[_15.length-1].domNode,"width"))-_16:_18};
}else{
var _1a=this.isLeftToRight()?0:_18;
return {min:_1a,max:_1a};
}
},_getScrollForSelectedTab:function(){
var w=this.scrollNode,n=this._selectedTab,_1b=dojo.style(this.scrollNode,"width"),_1c=this._getScrollBounds();
var pos=(n.offsetLeft+dojo.style(n,"width")/2)-_1b/2;
pos=Math.min(Math.max(pos,_1c.min),_1c.max);
return pos;
},createSmoothScroll:function(x){
if(arguments.length>0){
var _1d=this._getScrollBounds();
x=Math.min(Math.max(x,_1d.min),_1d.max);
}else{
x=this._getScrollForSelectedTab();
}
if(this._anim&&this._anim.status()=="playing"){
this._anim.stop();
}
var _1e=this,w=this.scrollNode,_1f=new dojo._Animation({beforeBegin:function(){
if(this.curve){
delete this.curve;
}
var _20=w.scrollLeft,_21=_1e._convertToScrollLeft(x);
_1f.curve=new dojo._Line(_20,_21);
},onAnimate:function(val){
w.scrollLeft=val;
}});
this._anim=_1f;
this._setButtonClass(x);
return _1f;
},_getBtnNode:function(e){
var n=e.target;
while(n&&!dojo.hasClass(n,"tabStripButton")){
n=n.parentNode;
}
return n;
},doSlideRight:function(e){
this.doSlide(1,this._getBtnNode(e));
},doSlideLeft:function(e){
this.doSlide(-1,this._getBtnNode(e));
},doSlide:function(_22,_23){
if(_23&&dojo.hasClass(_23,"dijitTabDisabled")){
return;
}
var _24=dojo.style(this.scrollNode,"width");
var d=(_24*0.75)*_22;
var to=this._getScroll()+d;
this._setButtonClass(to);
this.createSmoothScroll(to).play();
},_setButtonClass:function(_25){
var _26=this._getScrollBounds();
this._leftBtn.set("disabled",_25<=_26.min);
this._rightBtn.set("disabled",_25>=_26.max);
}});
dojo.declare("dijit.layout._ScrollingTabControllerButton",dijit.form.Button,{baseClass:"dijitTab tabStripButton",templateString:dojo.cache("dijit.layout","templates/_ScrollingTabControllerButton.html","<div dojoAttachEvent=\"onclick:_onButtonClick\">\n\t<div waiRole=\"presentation\" class=\"dijitTabInnerDiv\" dojoattachpoint=\"innerDiv,focusNode\">\n\t\t<div waiRole=\"presentation\" class=\"dijitTabContent dijitButtonContents\" dojoattachpoint=\"tabContent\">\n\t\t\t<img waiRole=\"presentation\" alt=\"\" src=\"${_blankGif}\" class=\"dijitTabStripIcon\" dojoAttachPoint=\"iconNode\"/>\n\t\t\t<span dojoAttachPoint=\"containerNode,titleNode\" class=\"dijitButtonText\"></span>\n\t\t</div>\n\t</div>\n</div>\n"),tabIndex:"-1"});
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit.form.TextBox"]){
dojo._hasResource["dijit.form.TextBox"]=true;
dojo.provide("dijit.form.TextBox");
dojo.require("dijit.form._FormWidget");
dojo.declare("dijit.form.TextBox",dijit.form._FormValueWidget,{trim:false,uppercase:false,lowercase:false,propercase:false,maxLength:"",selectOnClick:false,placeHolder:"",templateString:dojo.cache("dijit.form","templates/TextBox.html","<div class=\"dijit dijitReset dijitInline dijitLeft\" id=\"widget_${id}\" waiRole=\"presentation\"\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class=\"dijitReset dijitInputInner\" dojoAttachPoint='textbox,focusNode' autocomplete=\"off\"\n\t\t\t${!nameAttrSetting} type='${type}'\n\t/></div\n></div>\n"),_singleNodeTemplate:"<input class=\"dijit dijitReset dijitLeft dijitInputField\" dojoAttachPoint=\"textbox,focusNode\" autocomplete=\"off\" type=\"${type}\" ${!nameAttrSetting} />",_buttonInputDisabled:dojo.isIE?"disabled":"",baseClass:"dijitTextBox",attributeMap:dojo.delegate(dijit.form._FormValueWidget.prototype.attributeMap,{maxLength:"focusNode"}),postMixInProperties:function(){
var _1=this.type.toLowerCase();
if(this.templateString.toLowerCase()=="input"||((_1=="hidden"||_1=="file")&&this.templateString==dijit.form.TextBox.prototype.templateString)){
this.templateString=this._singleNodeTemplate;
}
this.inherited(arguments);
},_setPlaceHolderAttr:function(v){
this.placeHolder=v;
if(!this._phspan){
this._attachPoints.push("_phspan");
this._phspan=dojo.create("span",{className:"dijitPlaceHolder dijitInputField"},this.textbox,"after");
}
this._phspan.innerHTML="";
this._phspan.appendChild(document.createTextNode(v));
this._updatePlaceHolder();
},_updatePlaceHolder:function(){
if(this._phspan){
this._phspan.style.display=(this.placeHolder&&!this._focused&&!this.textbox.value)?"":"none";
}
},_getValueAttr:function(){
return this.parse(this.get("displayedValue"),this.constraints);
},_setValueAttr:function(_2,_3,_4){
var _5;
if(_2!==undefined){
_5=this.filter(_2);
if(typeof _4!="string"){
if(_5!==null&&((typeof _5!="number")||!isNaN(_5))){
_4=this.filter(this.format(_5,this.constraints));
}else{
_4="";
}
}
}
if(_4!=null&&_4!=undefined&&((typeof _4)!="number"||!isNaN(_4))&&this.textbox.value!=_4){
this.textbox.value=_4;
}
this._updatePlaceHolder();
this.inherited(arguments,[_5,_3]);
},displayedValue:"",getDisplayedValue:function(){
dojo.deprecated(this.declaredClass+"::getDisplayedValue() is deprecated. Use set('displayedValue') instead.","","2.0");
return this.get("displayedValue");
},_getDisplayedValueAttr:function(){
return this.filter(this.textbox.value);
},setDisplayedValue:function(_6){
dojo.deprecated(this.declaredClass+"::setDisplayedValue() is deprecated. Use set('displayedValue', ...) instead.","","2.0");
this.set("displayedValue",_6);
},_setDisplayedValueAttr:function(_7){
if(_7===null||_7===undefined){
_7="";
}else{
if(typeof _7!="string"){
_7=String(_7);
}
}
this.textbox.value=_7;
this._setValueAttr(this.get("value"),undefined,_7);
},format:function(_8,_9){
return ((_8==null||_8==undefined)?"":(_8.toString?_8.toString():_8));
},parse:function(_a,_b){
return _a;
},_refreshState:function(){
},_onInput:function(e){
if(e&&e.type&&/key/i.test(e.type)&&e.keyCode){
switch(e.keyCode){
case dojo.keys.SHIFT:
case dojo.keys.ALT:
case dojo.keys.CTRL:
case dojo.keys.TAB:
return;
}
}
if(this.intermediateChanges){
var _c=this;
setTimeout(function(){
_c._handleOnChange(_c.get("value"),false);
},0);
}
this._refreshState();
},postCreate:function(){
if(dojo.isIE){
var s=dojo.getComputedStyle(this.domNode);
if(s){
var ff=s.fontFamily;
if(ff){
var _d=this.domNode.getElementsByTagName("INPUT");
if(_d){
for(var i=0;i<_d.length;i++){
_d[i].style.fontFamily=ff;
}
}
}
}
}
this.textbox.setAttribute("value",this.textbox.value);
this.inherited(arguments);
if(dojo.isMoz||dojo.isOpera){
this.connect(this.textbox,"oninput",this._onInput);
}else{
this.connect(this.textbox,"onkeydown",this._onInput);
this.connect(this.textbox,"onkeyup",this._onInput);
this.connect(this.textbox,"onpaste",this._onInput);
this.connect(this.textbox,"oncut",this._onInput);
}
},_blankValue:"",filter:function(_e){
if(_e===null){
return this._blankValue;
}
if(typeof _e!="string"){
return _e;
}
if(this.trim){
_e=dojo.trim(_e);
}
if(this.uppercase){
_e=_e.toUpperCase();
}
if(this.lowercase){
_e=_e.toLowerCase();
}
if(this.propercase){
_e=_e.replace(/[^\s]+/g,function(_f){
return _f.substring(0,1).toUpperCase()+_f.substring(1);
});
}
return _e;
},_setBlurValue:function(){
this._setValueAttr(this.get("value"),true);
},_onBlur:function(e){
if(this.disabled){
return;
}
this._setBlurValue();
this.inherited(arguments);
if(this._selectOnClickHandle){
this.disconnect(this._selectOnClickHandle);
}
if(this.selectOnClick&&dojo.isMoz){
this.textbox.selectionStart=this.textbox.selectionEnd=undefined;
}
this._updatePlaceHolder();
},_onFocus:function(by){
if(this.disabled||this.readOnly){
return;
}
if(this.selectOnClick&&by=="mouse"){
this._selectOnClickHandle=this.connect(this.domNode,"onmouseup",function(){
this.disconnect(this._selectOnClickHandle);
var _10;
if(dojo.isIE){
var _11=dojo.doc.selection.createRange();
var _12=_11.parentElement();
_10=_12==this.textbox&&_11.text.length==0;
}else{
_10=this.textbox.selectionStart==this.textbox.selectionEnd;
}
if(_10){
dijit.selectInputText(this.textbox);
}
});
}
this._updatePlaceHolder();
this._refreshState();
this.inherited(arguments);
},reset:function(){
this.textbox.value="";
this.inherited(arguments);
}});
dijit.selectInputText=function(_13,_14,_15){
var _16=dojo.global;
var _17=dojo.doc;
_13=dojo.byId(_13);
if(isNaN(_14)){
_14=0;
}
if(isNaN(_15)){
_15=_13.value?_13.value.length:0;
}
dijit.focus(_13);
if(_17["selection"]&&dojo.body()["createTextRange"]){
if(_13.createTextRange){
var _18=_13.createTextRange();
with(_18){
collapse(true);
moveStart("character",-99999);
moveStart("character",_14);
moveEnd("character",_15-_14);
select();
}
}
}else{
if(_16["getSelection"]){
if(_13.setSelectionRange){
_13.setSelectionRange(_14,_15);
}
}
}
};
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit.Tooltip"]){
dojo._hasResource["dijit.Tooltip"]=true;
dojo.provide("dijit.Tooltip");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.declare("dijit._MasterTooltip",[dijit._Widget,dijit._Templated],{duration:dijit.defaultDuration,templateString:dojo.cache("dijit","templates/Tooltip.html","<div class=\"dijitTooltip dijitTooltipLeft\" id=\"dojoTooltip\">\n\t<div class=\"dijitTooltipContainer dijitTooltipContents\" dojoAttachPoint=\"containerNode\" waiRole='alert'></div>\n\t<div class=\"dijitTooltipConnector\"></div>\n</div>\n"),postCreate:function(){
dojo.body().appendChild(this.domNode);
this.bgIframe=new dijit.BackgroundIframe(this.domNode);
this.fadeIn=dojo.fadeIn({node:this.domNode,duration:this.duration,onEnd:dojo.hitch(this,"_onShow")});
this.fadeOut=dojo.fadeOut({node:this.domNode,duration:this.duration,onEnd:dojo.hitch(this,"_onHide")});
},show:function(_1,_2,_3,_4){
if(this.aroundNode&&this.aroundNode===_2){
return;
}
if(this.fadeOut.status()=="playing"){
this._onDeck=arguments;
return;
}
this.containerNode.innerHTML=_1;
var _5=dijit.placeOnScreenAroundElement(this.domNode,_2,dijit.getPopupAroundAlignment((_3&&_3.length)?_3:dijit.Tooltip.defaultPosition,!_4),dojo.hitch(this,"orient"));
dojo.style(this.domNode,"opacity",0);
this.fadeIn.play();
this.isShowingNow=true;
this.aroundNode=_2;
},orient:function(_6,_7,_8){
_6.className="dijitTooltip "+{"BL-TL":"dijitTooltipBelow dijitTooltipABLeft","TL-BL":"dijitTooltipAbove dijitTooltipABLeft","BR-TR":"dijitTooltipBelow dijitTooltipABRight","TR-BR":"dijitTooltipAbove dijitTooltipABRight","BR-BL":"dijitTooltipRight","BL-BR":"dijitTooltipLeft"}[_7+"-"+_8];
},_onShow:function(){
if(dojo.isIE){
this.domNode.style.filter="";
}
},hide:function(_9){
if(this._onDeck&&this._onDeck[1]==_9){
this._onDeck=null;
}else{
if(this.aroundNode===_9){
this.fadeIn.stop();
this.isShowingNow=false;
this.aroundNode=null;
this.fadeOut.play();
}else{
}
}
},_onHide:function(){
this.domNode.style.cssText="";
this.containerNode.innerHTML="";
if(this._onDeck){
this.show.apply(this,this._onDeck);
this._onDeck=null;
}
}});
dijit.showTooltip=function(_a,_b,_c,_d){
if(!dijit._masterTT){
dijit._masterTT=new dijit._MasterTooltip();
}
return dijit._masterTT.show(_a,_b,_c,_d);
};
dijit.hideTooltip=function(_e){
if(!dijit._masterTT){
dijit._masterTT=new dijit._MasterTooltip();
}
return dijit._masterTT.hide(_e);
};
dojo.declare("dijit.Tooltip",dijit._Widget,{label:"",showDelay:400,connectId:[],position:[],constructor:function(){
this._nodeConnectionsById={};
},_setConnectIdAttr:function(_f){
for(var _10 in this._nodeConnectionsById){
this.removeTarget(_10);
}
dojo.forEach(dojo.isArrayLike(_f)?_f:[_f],this.addTarget,this);
},_getConnectIdAttr:function(){
var ary=[];
for(var id in this._nodeConnectionsById){
ary.push(id);
}
return ary;
},addTarget:function(id){
var _11=dojo.byId(id);
if(!_11){
return;
}
if(_11.id in this._nodeConnectionsById){
return;
}
this._nodeConnectionsById[_11.id]=[this.connect(_11,"onmouseenter","_onTargetMouseEnter"),this.connect(_11,"onmouseleave","_onTargetMouseLeave"),this.connect(_11,"onfocus","_onTargetFocus"),this.connect(_11,"onblur","_onTargetBlur")];
},removeTarget:function(_12){
var id=_12.id||_12;
if(id in this._nodeConnectionsById){
dojo.forEach(this._nodeConnectionsById[id],this.disconnect,this);
delete this._nodeConnectionsById[id];
}
},postCreate:function(){
dojo.addClass(this.domNode,"dijitTooltipData");
},startup:function(){
this.inherited(arguments);
var ids=this.connectId;
dojo.forEach(dojo.isArrayLike(ids)?ids:[ids],this.addTarget,this);
},_onTargetMouseEnter:function(e){
this._onHover(e);
},_onTargetMouseLeave:function(e){
this._onUnHover(e);
},_onTargetFocus:function(e){
this._focus=true;
this._onHover(e);
},_onTargetBlur:function(e){
this._focus=false;
this._onUnHover(e);
},_onHover:function(e){
if(!this._showTimer){
var _13=e.target;
this._showTimer=setTimeout(dojo.hitch(this,function(){
this.open(_13);
}),this.showDelay);
}
},_onUnHover:function(e){
if(this._focus){
return;
}
if(this._showTimer){
clearTimeout(this._showTimer);
delete this._showTimer;
}
this.close();
},open:function(_14){
if(this._showTimer){
clearTimeout(this._showTimer);
delete this._showTimer;
}
dijit.showTooltip(this.label||this.domNode.innerHTML,_14,this.position,!this.isLeftToRight());
this._connectNode=_14;
this.onShow(_14,this.position);
},close:function(){
if(this._connectNode){
dijit.hideTooltip(this._connectNode);
delete this._connectNode;
this.onHide();
}
if(this._showTimer){
clearTimeout(this._showTimer);
delete this._showTimer;
}
},onShow:function(_15,_16){
},onHide:function(){
},uninitialize:function(){
this.close();
this.inherited(arguments);
}});
dijit.Tooltip.defaultPosition=["after","before"];
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo.date"]){
dojo._hasResource["dojo.date"]=true;
dojo.provide("dojo.date");
dojo.date.getDaysInMonth=function(_1){
var _2=_1.getMonth();
var _3=[31,28,31,30,31,30,31,31,30,31,30,31];
if(_2==1&&dojo.date.isLeapYear(_1)){
return 29;
}
return _3[_2];
};
dojo.date.isLeapYear=function(_4){
var _5=_4.getFullYear();
return !(_5%400)||(!(_5%4)&&!!(_5%100));
};
dojo.date.getTimezoneName=function(_6){
var _7=_6.toString();
var tz="";
var _8;
var _9=_7.indexOf("(");
if(_9>-1){
tz=_7.substring(++_9,_7.indexOf(")"));
}else{
var _a=/([A-Z\/]+) \d{4}$/;
if((_8=_7.match(_a))){
tz=_8[1];
}else{
_7=_6.toLocaleString();
_a=/ ([A-Z\/]+)$/;
if((_8=_7.match(_a))){
tz=_8[1];
}
}
}
return (tz=="AM"||tz=="PM")?"":tz;
};
dojo.date.compare=function(_b,_c,_d){
_b=new Date(+_b);
_c=new Date(+(_c||new Date()));
if(_d=="date"){
_b.setHours(0,0,0,0);
_c.setHours(0,0,0,0);
}else{
if(_d=="time"){
_b.setFullYear(0,0,0);
_c.setFullYear(0,0,0);
}
}
if(_b>_c){
return 1;
}
if(_b<_c){
return -1;
}
return 0;
};
dojo.date.add=function(_e,_f,_10){
var sum=new Date(+_e);
var _11=false;
var _12="Date";
switch(_f){
case "day":
break;
case "weekday":
var _13,_14;
var mod=_10%5;
if(!mod){
_13=(_10>0)?5:-5;
_14=(_10>0)?((_10-5)/5):((_10+5)/5);
}else{
_13=mod;
_14=parseInt(_10/5);
}
var _15=_e.getDay();
var adj=0;
if(_15==6&&_10>0){
adj=1;
}else{
if(_15==0&&_10<0){
adj=-1;
}
}
var _16=_15+_13;
if(_16==0||_16==6){
adj=(_10>0)?2:-2;
}
_10=(7*_14)+_13+adj;
break;
case "year":
_12="FullYear";
_11=true;
break;
case "week":
_10*=7;
break;
case "quarter":
_10*=3;
case "month":
_11=true;
_12="Month";
break;
default:
_12="UTC"+_f.charAt(0).toUpperCase()+_f.substring(1)+"s";
}
if(_12){
sum["set"+_12](sum["get"+_12]()+_10);
}
if(_11&&(sum.getDate()<_e.getDate())){
sum.setDate(0);
}
return sum;
};
dojo.date.difference=function(_17,_18,_19){
_18=_18||new Date();
_19=_19||"day";
var _1a=_18.getFullYear()-_17.getFullYear();
var _1b=1;
switch(_19){
case "quarter":
var m1=_17.getMonth();
var m2=_18.getMonth();
var q1=Math.floor(m1/3)+1;
var q2=Math.floor(m2/3)+1;
q2+=(_1a*4);
_1b=q2-q1;
break;
case "weekday":
var _1c=Math.round(dojo.date.difference(_17,_18,"day"));
var _1d=parseInt(dojo.date.difference(_17,_18,"week"));
var mod=_1c%7;
if(mod==0){
_1c=_1d*5;
}else{
var adj=0;
var _1e=_17.getDay();
var _1f=_18.getDay();
_1d=parseInt(_1c/7);
mod=_1c%7;
var _20=new Date(_17);
_20.setDate(_20.getDate()+(_1d*7));
var _21=_20.getDay();
if(_1c>0){
switch(true){
case _1e==6:
adj=-1;
break;
case _1e==0:
adj=0;
break;
case _1f==6:
adj=-1;
break;
case _1f==0:
adj=-2;
break;
case (_21+mod)>5:
adj=-2;
}
}else{
if(_1c<0){
switch(true){
case _1e==6:
adj=0;
break;
case _1e==0:
adj=1;
break;
case _1f==6:
adj=2;
break;
case _1f==0:
adj=1;
break;
case (_21+mod)<0:
adj=2;
}
}
}
_1c+=adj;
_1c-=(_1d*2);
}
_1b=_1c;
break;
case "year":
_1b=_1a;
break;
case "month":
_1b=(_18.getMonth()-_17.getMonth())+(_1a*12);
break;
case "week":
_1b=parseInt(dojo.date.difference(_17,_18,"day")/7);
break;
case "day":
_1b/=24;
case "hour":
_1b/=60;
case "minute":
_1b/=60;
case "second":
_1b/=1000;
case "millisecond":
_1b*=_18.getTime()-_17.getTime();
}
return Math.round(_1b);
};
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo.date.locale"]){
dojo._hasResource["dojo.date.locale"]=true;
dojo.provide("dojo.date.locale");
dojo.require("dojo.date");
dojo.require("dojo.cldr.supplemental");
dojo.require("dojo.regexp");
dojo.require("dojo.string");
dojo.require("dojo.i18n");
dojo.requireLocalization("dojo.cldr","gregorian",null,"ROOT,ar,ca,cs,da,de,el,en,en-au,en-ca,en-gb,es,fi,fr,he,hu,it,ja,ko,nb,nl,pl,pt,pt-pt,ru,sk,sl,sv,th,tr,zh,zh-tw");
(function(){
function _1(_2,_3,_4,_5){
return _5.replace(/([a-z])\1*/ig,function(_6){
var s,_7,c=_6.charAt(0),l=_6.length,_8=["abbr","wide","narrow"];
switch(c){
case "G":
s=_3[(l<4)?"eraAbbr":"eraNames"][_2.getFullYear()<0?0:1];
break;
case "y":
s=_2.getFullYear();
switch(l){
case 1:
break;
case 2:
if(!_4.fullYear){
s=String(s);
s=s.substr(s.length-2);
break;
}
default:
_7=true;
}
break;
case "Q":
case "q":
s=Math.ceil((_2.getMonth()+1)/3);
_7=true;
break;
case "M":
var m=_2.getMonth();
if(l<3){
s=m+1;
_7=true;
}else{
var _9=["months","format",_8[l-3]].join("-");
s=_3[_9][m];
}
break;
case "w":
var _a=0;
s=dojo.date.locale._getWeekOfYear(_2,_a);
_7=true;
break;
case "d":
s=_2.getDate();
_7=true;
break;
case "D":
s=dojo.date.locale._getDayOfYear(_2);
_7=true;
break;
case "E":
var d=_2.getDay();
if(l<3){
s=d+1;
_7=true;
}else{
var _b=["days","format",_8[l-3]].join("-");
s=_3[_b][d];
}
break;
case "a":
var _c=(_2.getHours()<12)?"am":"pm";
s=_3["dayPeriods-format-wide-"+_c];
break;
case "h":
case "H":
case "K":
case "k":
var h=_2.getHours();
switch(c){
case "h":
s=(h%12)||12;
break;
case "H":
s=h;
break;
case "K":
s=(h%12);
break;
case "k":
s=h||24;
break;
}
_7=true;
break;
case "m":
s=_2.getMinutes();
_7=true;
break;
case "s":
s=_2.getSeconds();
_7=true;
break;
case "S":
s=Math.round(_2.getMilliseconds()*Math.pow(10,l-3));
_7=true;
break;
case "v":
case "z":
s=dojo.date.locale._getZone(_2,true,_4);
if(s){
break;
}
l=4;
case "Z":
var _d=dojo.date.locale._getZone(_2,false,_4);
var tz=[(_d<=0?"+":"-"),dojo.string.pad(Math.floor(Math.abs(_d)/60),2),dojo.string.pad(Math.abs(_d)%60,2)];
if(l==4){
tz.splice(0,0,"GMT");
tz.splice(3,0,":");
}
s=tz.join("");
break;
default:
throw new Error("dojo.date.locale.format: invalid pattern char: "+_5);
}
if(_7){
s=dojo.string.pad(s,l);
}
return s;
});
};
dojo.date.locale._getZone=function(_e,_f,_10){
if(_f){
return dojo.date.getTimezoneName(_e);
}else{
return _e.getTimezoneOffset();
}
};
dojo.date.locale.format=function(_11,_12){
_12=_12||{};
var _13=dojo.i18n.normalizeLocale(_12.locale),_14=_12.formatLength||"short",_15=dojo.date.locale._getGregorianBundle(_13),str=[],_16=dojo.hitch(this,_1,_11,_15,_12);
if(_12.selector=="year"){
return _17(_15["dateFormatItem-yyyy"]||"yyyy",_16);
}
var _18;
if(_12.selector!="date"){
_18=_12.timePattern||_15["timeFormat-"+_14];
if(_18){
str.push(_17(_18,_16));
}
}
if(_12.selector!="time"){
_18=_12.datePattern||_15["dateFormat-"+_14];
if(_18){
str.push(_17(_18,_16));
}
}
return str.length==1?str[0]:_15["dateTimeFormat-"+_14].replace(/\{(\d+)\}/g,function(_19,key){
return str[key];
});
};
dojo.date.locale.regexp=function(_1a){
return dojo.date.locale._parseInfo(_1a).regexp;
};
dojo.date.locale._parseInfo=function(_1b){
_1b=_1b||{};
var _1c=dojo.i18n.normalizeLocale(_1b.locale),_1d=dojo.date.locale._getGregorianBundle(_1c),_1e=_1b.formatLength||"short",_1f=_1b.datePattern||_1d["dateFormat-"+_1e],_20=_1b.timePattern||_1d["timeFormat-"+_1e],_21;
if(_1b.selector=="date"){
_21=_1f;
}else{
if(_1b.selector=="time"){
_21=_20;
}else{
_21=_1d["dateTimeFormat-"+_1e].replace(/\{(\d+)\}/g,function(_22,key){
return [_20,_1f][key];
});
}
}
var _23=[],re=_17(_21,dojo.hitch(this,_24,_23,_1d,_1b));
return {regexp:re,tokens:_23,bundle:_1d};
};
dojo.date.locale.parse=function(_25,_26){
var _27=dojo.date.locale._parseInfo(_26),_28=_27.tokens,_29=_27.bundle,re=new RegExp("^"+_27.regexp+"$",_27.strict?"":"i"),_2a=re.exec(_25);
if(!_2a){
return null;
}
var _2b=["abbr","wide","narrow"],_2c=[1970,0,1,0,0,0,0],_2d="",_2e=dojo.every(_2a,function(v,i){
if(!i){
return true;
}
var _2f=_28[i-1];
var l=_2f.length;
switch(_2f.charAt(0)){
case "y":
if(l!=2&&_26.strict){
_2c[0]=v;
}else{
if(v<100){
v=Number(v);
var _30=""+new Date().getFullYear(),_31=_30.substring(0,2)*100,_32=Math.min(Number(_30.substring(2,4))+20,99),num=(v<_32)?_31+v:_31-100+v;
_2c[0]=num;
}else{
if(_26.strict){
return false;
}
_2c[0]=v;
}
}
break;
case "M":
if(l>2){
var _33=_29["months-format-"+_2b[l-3]].concat();
if(!_26.strict){
v=v.replace(".","").toLowerCase();
_33=dojo.map(_33,function(s){
return s.replace(".","").toLowerCase();
});
}
v=dojo.indexOf(_33,v);
if(v==-1){
return false;
}
}else{
v--;
}
_2c[1]=v;
break;
case "E":
case "e":
var _34=_29["days-format-"+_2b[l-3]].concat();
if(!_26.strict){
v=v.toLowerCase();
_34=dojo.map(_34,function(d){
return d.toLowerCase();
});
}
v=dojo.indexOf(_34,v);
if(v==-1){
return false;
}
break;
case "D":
_2c[1]=0;
case "d":
_2c[2]=v;
break;
case "a":
var am=_26.am||_29["dayPeriods-format-wide-am"],pm=_26.pm||_29["dayPeriods-format-wide-pm"];
if(!_26.strict){
var _35=/\./g;
v=v.replace(_35,"").toLowerCase();
am=am.replace(_35,"").toLowerCase();
pm=pm.replace(_35,"").toLowerCase();
}
if(_26.strict&&v!=am&&v!=pm){
return false;
}
_2d=(v==pm)?"p":(v==am)?"a":"";
break;
case "K":
if(v==24){
v=0;
}
case "h":
case "H":
case "k":
if(v>23){
return false;
}
_2c[3]=v;
break;
case "m":
_2c[4]=v;
break;
case "s":
_2c[5]=v;
break;
case "S":
_2c[6]=v;
}
return true;
});
var _36=+_2c[3];
if(_2d==="p"&&_36<12){
_2c[3]=_36+12;
}else{
if(_2d==="a"&&_36==12){
_2c[3]=0;
}
}
var _37=new Date(_2c[0],_2c[1],_2c[2],_2c[3],_2c[4],_2c[5],_2c[6]);
if(_26.strict){
_37.setFullYear(_2c[0]);
}
var _38=_28.join(""),_39=_38.indexOf("d")!=-1,_3a=_38.indexOf("M")!=-1;
if(!_2e||(_3a&&_37.getMonth()>_2c[1])||(_39&&_37.getDate()>_2c[2])){
return null;
}
if((_3a&&_37.getMonth()<_2c[1])||(_39&&_37.getDate()<_2c[2])){
_37=dojo.date.add(_37,"hour",1);
}
return _37;
};
function _17(_3b,_3c,_3d,_3e){
var _3f=function(x){
return x;
};
_3c=_3c||_3f;
_3d=_3d||_3f;
_3e=_3e||_3f;
var _40=_3b.match(/(''|[^'])+/g),_41=_3b.charAt(0)=="'";
dojo.forEach(_40,function(_42,i){
if(!_42){
_40[i]="";
}else{
_40[i]=(_41?_3d:_3c)(_42.replace(/''/g,"'"));
_41=!_41;
}
});
return _3e(_40.join(""));
};
function _24(_43,_44,_45,_46){
_46=dojo.regexp.escapeString(_46);
if(!_45.strict){
_46=_46.replace(" a"," ?a");
}
return _46.replace(/([a-z])\1*/ig,function(_47){
var s,c=_47.charAt(0),l=_47.length,p2="",p3="";
if(_45.strict){
if(l>1){
p2="0"+"{"+(l-1)+"}";
}
if(l>2){
p3="0"+"{"+(l-2)+"}";
}
}else{
p2="0?";
p3="0{0,2}";
}
switch(c){
case "y":
s="\\d{2,4}";
break;
case "M":
s=(l>2)?"\\S+?":p2+"[1-9]|1[0-2]";
break;
case "D":
s=p2+"[1-9]|"+p3+"[1-9][0-9]|[12][0-9][0-9]|3[0-5][0-9]|36[0-6]";
break;
case "d":
s="3[01]|[12]\\d|"+p2+"[1-9]";
break;
case "w":
s=p2+"[1-9]|[1-4][0-9]|5[0-3]";
break;
case "E":
s="\\S+";
break;
case "h":
s=p2+"[1-9]|1[0-2]";
break;
case "k":
s=p2+"\\d|1[01]";
break;
case "H":
s=p2+"\\d|1\\d|2[0-3]";
break;
case "K":
s=p2+"[1-9]|1\\d|2[0-4]";
break;
case "m":
case "s":
s="[0-5]\\d";
break;
case "S":
s="\\d{"+l+"}";
break;
case "a":
var am=_45.am||_44["dayPeriods-format-wide-am"],pm=_45.pm||_44["dayPeriods-format-wide-pm"];
if(_45.strict){
s=am+"|"+pm;
}else{
s=am+"|"+pm;
if(am!=am.toLowerCase()){
s+="|"+am.toLowerCase();
}
if(pm!=pm.toLowerCase()){
s+="|"+pm.toLowerCase();
}
if(s.indexOf(".")!=-1){
s+="|"+s.replace(/\./g,"");
}
}
s=s.replace(/\./g,"\\.");
break;
default:
s=".*";
}
if(_43){
_43.push(_47);
}
return "("+s+")";
}).replace(/[\xa0 ]/g,"[\\s\\xa0]");
};
})();
(function(){
var _48=[];
dojo.date.locale.addCustomFormats=function(_49,_4a){
_48.push({pkg:_49,name:_4a});
};
dojo.date.locale._getGregorianBundle=function(_4b){
var _4c={};
dojo.forEach(_48,function(_4d){
var _4e=dojo.i18n.getLocalization(_4d.pkg,_4d.name,_4b);
_4c=dojo.mixin(_4c,_4e);
},this);
return _4c;
};
})();
dojo.date.locale.addCustomFormats("dojo.cldr","gregorian");
dojo.date.locale.getNames=function(_4f,_50,_51,_52){
var _53,_54=dojo.date.locale._getGregorianBundle(_52),_55=[_4f,_51,_50];
if(_51=="standAlone"){
var key=_55.join("-");
_53=_54[key];
if(_53[0]==1){
_53=undefined;
}
}
_55[1]="format";
return (_53||_54[_55.join("-")]).concat();
};
dojo.date.locale.isWeekend=function(_56,_57){
var _58=dojo.cldr.supplemental.getWeekend(_57),day=(_56||new Date()).getDay();
if(_58.end<_58.start){
_58.end+=7;
if(day<_58.start){
day+=7;
}
}
return day>=_58.start&&day<=_58.end;
};
dojo.date.locale._getDayOfYear=function(_59){
return dojo.date.difference(new Date(_59.getFullYear(),0,1,_59.getHours()),_59)+1;
};
dojo.date.locale._getWeekOfYear=function(_5a,_5b){
if(arguments.length==1){
_5b=0;
}
var _5c=new Date(_5a.getFullYear(),0,1).getDay(),adj=(_5c-_5b+7)%7,_5d=Math.floor((dojo.date.locale._getDayOfYear(_5a)+adj-1)/7);
if(_5c==_5b){
_5d++;
}
return _5d;
};
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit.form.ValidationTextBox"]){
dojo._hasResource["dijit.form.ValidationTextBox"]=true;
dojo.provide("dijit.form.ValidationTextBox");
dojo.require("dojo.i18n");
dojo.require("dijit.form.TextBox");
dojo.require("dijit.Tooltip");
dojo.requireLocalization("dijit.form","validate",null,"ROOT,ar,ca,cs,da,de,el,es,fi,fr,he,hu,it,ja,ko,nb,nl,pl,pt,pt-pt,ro,ru,sk,sl,sv,th,tr,zh,zh-tw");
dojo.declare("dijit.form.ValidationTextBox",dijit.form.TextBox,{templateString:dojo.cache("dijit.form","templates/ValidationTextBox.html","<div class=\"dijit dijitReset dijitInlineTable dijitLeft\"\n\tid=\"widget_${id}\" waiRole=\"presentation\"\n\t><div class='dijitReset dijitValidationContainer'\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&Chi; \" type=\"text\" tabIndex=\"-1\" readOnly waiRole=\"presentation\"\n\t/></div\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class=\"dijitReset dijitInputInner\" dojoAttachPoint='textbox,focusNode' autocomplete=\"off\"\n\t\t\t${!nameAttrSetting} type='${type}'\n\t/></div\n></div>\n"),baseClass:"dijitTextBox dijitValidationTextBox",required:false,promptMessage:"",invalidMessage:"$_unset_$",missingMessage:"$_unset_$",constraints:{},regExp:".*",regExpGen:function(_1){
return this.regExp;
},state:"",tooltipPosition:[],_setValueAttr:function(){
this.inherited(arguments);
this.validate(this._focused);
},validator:function(_2,_3){
return (new RegExp("^(?:"+this.regExpGen(_3)+")"+(this.required?"":"?")+"$")).test(_2)&&(!this.required||!this._isEmpty(_2))&&(this._isEmpty(_2)||this.parse(_2,_3)!==undefined);
},_isValidSubset:function(){
return this.textbox.value.search(this._partialre)==0;
},isValid:function(_4){
return this.validator(this.textbox.value,this.constraints);
},_isEmpty:function(_5){
return /^\s*$/.test(_5);
},getErrorMessage:function(_6){
return (this.required&&this._isEmpty(this.textbox.value))?this.missingMessage:this.invalidMessage;
},getPromptMessage:function(_7){
return this.promptMessage;
},_maskValidSubsetError:true,validate:function(_8){
var _9="";
var _a=this.disabled||this.isValid(_8);
if(_a){
this._maskValidSubsetError=true;
}
var _b=this._isEmpty(this.textbox.value);
var _c=!_a&&!_b&&_8&&this._isValidSubset();
this.state=((_a||((!this._hasBeenBlurred||_8)&&_b)||_c)&&this._maskValidSubsetError)?"":"Error";
if(this.state=="Error"){
this._maskValidSubsetError=_8;
}
this._setStateClass();
dijit.setWaiState(this.focusNode,"invalid",_a?"false":"true");
if(_8){
if(this.state=="Error"){
_9=this.getErrorMessage(true);
}else{
_9=this.getPromptMessage(true);
}
this._maskValidSubsetError=true;
}
this.displayMessage(_9);
return _a;
},_message:"",displayMessage:function(_d){
if(this._message==_d){
return;
}
this._message=_d;
dijit.hideTooltip(this.domNode);
if(_d){
dijit.showTooltip(_d,this.domNode,this.tooltipPosition,!this.isLeftToRight());
}
},_refreshState:function(){
this.validate(this._focused);
this.inherited(arguments);
},constructor:function(){
this.constraints={};
},_setConstraintsAttr:function(_e){
if(!_e.locale&&this.lang){
_e.locale=this.lang;
}
this.constraints=_e;
this._computePartialRE();
},_computePartialRE:function(){
var p=this.regExpGen(this.constraints);
this.regExp=p;
var _f="";
if(p!=".*"){
this.regExp.replace(/\\.|\[\]|\[.*?[^\\]{1}\]|\{.*?\}|\(\?[=:!]|./g,function(re){
switch(re.charAt(0)){
case "{":
case "+":
case "?":
case "*":
case "^":
case "$":
case "|":
case "(":
_f+=re;
break;
case ")":
_f+="|$)";
break;
default:
_f+="(?:"+re+"|$)";
break;
}
});
}
try{
"".search(_f);
}
catch(e){
_f=this.regExp;
console.warn("RegExp error in "+this.declaredClass+": "+this.regExp);
}
this._partialre="^(?:"+_f+")$";
},postMixInProperties:function(){
this.inherited(arguments);
this.messages=dojo.i18n.getLocalization("dijit.form","validate",this.lang);
if(this.invalidMessage=="$_unset_$"){
this.invalidMessage=this.messages.invalidMessage;
}
if(!this.invalidMessage){
this.invalidMessage=this.promptMessage;
}
if(this.missingMessage=="$_unset_$"){
this.missingMessage=this.messages.missingMessage;
}
if(!this.missingMessage){
this.missingMessage=this.invalidMessage;
}
this._setConstraintsAttr(this.constraints);
},_setDisabledAttr:function(_10){
this.inherited(arguments);
this._refreshState();
},_setRequiredAttr:function(_11){
this.required=_11;
dijit.setWaiState(this.focusNode,"required",_11);
this._refreshState();
},reset:function(){
this._maskValidSubsetError=true;
this.inherited(arguments);
},_onBlur:function(){
this.displayMessage("");
this.inherited(arguments);
}});
dojo.declare("dijit.form.MappedTextBox",dijit.form.ValidationTextBox,{postMixInProperties:function(){
this.inherited(arguments);
this.nameAttrSetting="";
},serialize:function(val,_12){
return val.toString?val.toString():"";
},toString:function(){
var val=this.filter(this.get("value"));
return val!=null?(typeof val=="string"?val:this.serialize(val,this.constraints)):"";
},validate:function(){
this.valueNode.value=this.toString();
return this.inherited(arguments);
},buildRendering:function(){
this.inherited(arguments);
this.valueNode=dojo.place("<input type='hidden'"+(this.name?" name='"+this.name+"'":"")+">",this.textbox,"after");
},reset:function(){
this.valueNode.value="";
this.inherited(arguments);
}});
dojo.declare("dijit.form.RangeBoundTextBox",dijit.form.MappedTextBox,{rangeMessage:"",rangeCheck:function(_13,_14){
return ("min" in _14?(this.compare(_13,_14.min)>=0):true)&&("max" in _14?(this.compare(_13,_14.max)<=0):true);
},isInRange:function(_15){
return this.rangeCheck(this.get("value"),this.constraints);
},_isDefinitelyOutOfRange:function(){
var val=this.get("value");
var _16=false;
var _17=false;
if("min" in this.constraints){
var min=this.constraints.min;
min=this.compare(val,((typeof min=="number")&&min>=0&&val!=0)?0:min);
_16=(typeof min=="number")&&min<0;
}
if("max" in this.constraints){
var max=this.constraints.max;
max=this.compare(val,((typeof max!="number")||max>0)?max:0);
_17=(typeof max=="number")&&max>0;
}
return _16||_17;
},_isValidSubset:function(){
return this.inherited(arguments)&&!this._isDefinitelyOutOfRange();
},isValid:function(_18){
return this.inherited(arguments)&&((this._isEmpty(this.textbox.value)&&!this.required)||this.isInRange(_18));
},getErrorMessage:function(_19){
var v=this.get("value");
if(v!==null&&v!==""&&v!==undefined&&(typeof v!="number"||!isNaN(v))&&!this.isInRange(_19)){
return this.rangeMessage;
}
return this.inherited(arguments);
},postMixInProperties:function(){
this.inherited(arguments);
if(!this.rangeMessage){
this.messages=dojo.i18n.getLocalization("dijit.form","validate",this.lang);
this.rangeMessage=this.messages.rangeMessage;
}
},_setConstraintsAttr:function(_1a){
this.inherited(arguments);
if(this.focusNode){
if(this.constraints.min!==undefined){
dijit.setWaiState(this.focusNode,"valuemin",this.constraints.min);
}else{
dijit.removeWaiState(this.focusNode,"valuemin");
}
if(this.constraints.max!==undefined){
dijit.setWaiState(this.focusNode,"valuemax",this.constraints.max);
}else{
dijit.removeWaiState(this.focusNode,"valuemax");
}
}
},_setValueAttr:function(_1b,_1c){
dijit.setWaiState(this.focusNode,"valuenow",_1b);
this.inherited(arguments);
}});
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit.Calendar"]){
dojo._hasResource["dijit.Calendar"]=true;
dojo.provide("dijit.Calendar");
dojo.require("dojo.cldr.supplemental");
dojo.require("dojo.date");
dojo.require("dojo.date.locale");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dijit._CssStateMixin");
dojo.declare("dijit.Calendar",[dijit._Widget,dijit._Templated,dijit._CssStateMixin],{templateString:dojo.cache("dijit","templates/Calendar.html","<table cellspacing=\"0\" cellpadding=\"0\" class=\"dijitCalendarContainer\" role=\"grid\" dojoAttachEvent=\"onkeypress: _onKeyPress\">\n\t<thead>\n\t\t<tr class=\"dijitReset dijitCalendarMonthContainer\" valign=\"top\">\n\t\t\t<th class='dijitReset dijitCalendarArrow' dojoAttachPoint=\"decrementMonth\">\n\t\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitCalendarIncrementControl dijitCalendarDecrease\" waiRole=\"presentation\"/>\n\t\t\t\t<span dojoAttachPoint=\"decreaseArrowNode\" class=\"dijitA11ySideArrow\">-</span>\n\t\t\t</th>\n\t\t\t<th class='dijitReset' colspan=\"5\">\n\t\t\t\t<div class=\"dijitVisible\">\n\t\t\t\t\t<div class=\"dijitPopup dijitMenu dijitMenuPassive dijitHidden\" dojoAttachPoint=\"monthDropDown\" dojoAttachEvent=\"onmouseup: _onMonthSelect, onmouseover: _onMenuHover, onmouseout: _onMenuHover\">\n\t\t\t\t\t\t<div class=\"dijitCalendarMonthLabelTemplate dijitCalendarMonthLabel\"></div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div dojoAttachPoint=\"monthLabelSpacer\" class=\"dijitSpacer\"></div>\n\t\t\t\t<div dojoAttachPoint=\"monthLabelNode\" class=\"dijitCalendarMonthLabel dijitInline dijitVisible\" dojoAttachEvent=\"onmousedown: _onMonthToggle\"></div>\n\t\t\t</th>\n\t\t\t<th class='dijitReset dijitCalendarArrow' dojoAttachPoint=\"incrementMonth\">\n\t\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitCalendarIncrementControl dijitCalendarIncrease\" waiRole=\"presentation\"/>\n\t\t\t\t<span dojoAttachPoint=\"increaseArrowNode\" class=\"dijitA11ySideArrow\">+</span>\n\t\t\t</th>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<th class=\"dijitReset dijitCalendarDayLabelTemplate\" role=\"columnheader\"><span class=\"dijitCalendarDayLabel\"></span></th>\n\t\t</tr>\n\t</thead>\n\t<tbody dojoAttachEvent=\"onclick: _onDayClick, onmouseover: _onDayMouseOver, onmouseout: _onDayMouseOut, onmousedown: _onDayMouseDown, onmouseup: _onDayMouseUp\" class=\"dijitReset dijitCalendarBodyContainer\">\n\t\t<tr class=\"dijitReset dijitCalendarWeekTemplate\" role=\"row\">\n\t\t\t<td class=\"dijitReset dijitCalendarDateTemplate\" role=\"gridcell\"><span class=\"dijitCalendarDateLabel\"></span></td>\n\t\t</tr>\n\t</tbody>\n\t<tfoot class=\"dijitReset dijitCalendarYearContainer\">\n\t\t<tr>\n\t\t\t<td class='dijitReset' valign=\"top\" colspan=\"7\">\n\t\t\t\t<h3 class=\"dijitCalendarYearLabel\">\n\t\t\t\t\t<span dojoAttachPoint=\"previousYearLabelNode\" class=\"dijitInline dijitCalendarPreviousYear\"></span>\n\t\t\t\t\t<span dojoAttachPoint=\"currentYearLabelNode\" class=\"dijitInline dijitCalendarSelectedYear\"></span>\n\t\t\t\t\t<span dojoAttachPoint=\"nextYearLabelNode\" class=\"dijitInline dijitCalendarNextYear\"></span>\n\t\t\t\t</h3>\n\t\t\t</td>\n\t\t</tr>\n\t</tfoot>\n</table>\n"),value:new Date(),datePackage:"dojo.date",dayWidth:"narrow",tabIndex:"0",baseClass:"dijitCalendar",cssStateNodes:{"decrementMonth":"dijitCalendarArrow","incrementMonth":"dijitCalendarArrow","previousYearLabelNode":"dijitCalendarPreviousYear","nextYearLabelNode":"dijitCalendarNextYear"},attributeMap:dojo.delegate(dijit._Widget.prototype.attributeMap,{tabIndex:"domNode"}),setValue:function(_1){
dojo.deprecated("dijit.Calendar:setValue() is deprecated.  Use set('value', ...) instead.","","2.0");
this.set("value",_1);
},_getValueAttr:function(){
var _2=new this.dateClassObj(this.value);
_2.setHours(0,0,0,0);
if(_2.getDate()<this.value.getDate()){
_2=this.dateFuncObj.add(_2,"hour",1);
}
return _2;
},_setValueAttr:function(_3){
if(!this.value||this.dateFuncObj.compare(_3,this.value)){
_3=new this.dateClassObj(_3);
_3.setHours(1);
this.displayMonth=new this.dateClassObj(_3);
if(!this.isDisabledDate(_3,this.lang)){
this.value=_3;
this.onChange(this.get("value"));
}
dojo.attr(this.domNode,"aria-label",this.dateLocaleModule.format(_3,{selector:"date",formatLength:"full"}));
this._populateGrid();
}
},_setText:function(_4,_5){
while(_4.firstChild){
_4.removeChild(_4.firstChild);
}
_4.appendChild(dojo.doc.createTextNode(_5));
},_populateGrid:function(){
var _6=this.displayMonth;
_6.setDate(1);
var _7=_6.getDay(),_8=this.dateFuncObj.getDaysInMonth(_6),_9=this.dateFuncObj.getDaysInMonth(this.dateFuncObj.add(_6,"month",-1)),_a=new this.dateClassObj(),_b=dojo.cldr.supplemental.getFirstDayOfWeek(this.lang);
if(_b>_7){
_b-=7;
}
dojo.query(".dijitCalendarDateTemplate",this.domNode).forEach(function(_c,i){
i+=_b;
var _d=new this.dateClassObj(_6),_e,_f="dijitCalendar",adj=0;
if(i<_7){
_e=_9-_7+i+1;
adj=-1;
_f+="Previous";
}else{
if(i>=(_7+_8)){
_e=i-_7-_8+1;
adj=1;
_f+="Next";
}else{
_e=i-_7+1;
_f+="Current";
}
}
if(adj){
_d=this.dateFuncObj.add(_d,"month",adj);
}
_d.setDate(_e);
if(!this.dateFuncObj.compare(_d,_a,"date")){
_f="dijitCalendarCurrentDate "+_f;
}
if(this._isSelectedDate(_d,this.lang)){
_f="dijitCalendarSelectedDate "+_f;
}
if(this.isDisabledDate(_d,this.lang)){
_f="dijitCalendarDisabledDate "+_f;
}
var _10=this.getClassForDate(_d,this.lang);
if(_10){
_f=_10+" "+_f;
}
_c.className=_f+"Month dijitCalendarDateTemplate";
_c.dijitDateValue=_d.valueOf();
var _11=dojo.query(".dijitCalendarDateLabel",_c)[0],_12=_d.getDateLocalized?_d.getDateLocalized(this.lang):_d.getDate();
this._setText(_11,_12);
},this);
var _13=this.dateLocaleModule.getNames("months","wide","standAlone",this.lang,_6);
this._setText(this.monthLabelNode,_13[_6.getMonth()]);
dojo.query(".dijitCalendarMonthLabelTemplate",this.domNode).forEach(function(_14,i){
dojo.toggleClass(_14,"dijitHidden",!(i in _13));
this._setText(_14,_13[i]);
},this);
var y=_6.getFullYear()-1;
var d=new this.dateClassObj();
dojo.forEach(["previous","current","next"],function(_15){
d.setFullYear(y++);
this._setText(this[_15+"YearLabelNode"],this.dateLocaleModule.format(d,{selector:"year",locale:this.lang}));
},this);
var _16=this;
var _17=function(_18,_19,adj){
_16._connects.push(dijit.typematic.addMouseListener(_16[_18],_16,function(_1a){
if(_1a>=0){
_16._adjustDisplay(_19,adj);
}
},0.8,500));
};
_17("incrementMonth","month",1);
_17("decrementMonth","month",-1);
_17("nextYearLabelNode","year",1);
_17("previousYearLabelNode","year",-1);
},goToToday:function(){
this.set("value",new this.dateClassObj());
},constructor:function(_1b){
var _1c=(_1b.datePackage&&(_1b.datePackage!="dojo.date"))?_1b.datePackage+".Date":"Date";
this.dateClassObj=dojo.getObject(_1c,false);
this.datePackage=_1b.datePackage||this.datePackage;
this.dateFuncObj=dojo.getObject(this.datePackage,false);
this.dateLocaleModule=dojo.getObject(this.datePackage+".locale",false);
},postMixInProperties:function(){
if(isNaN(this.value)){
delete this.value;
}
this.inherited(arguments);
},postCreate:function(){
this.inherited(arguments);
dojo.setSelectable(this.domNode,false);
var _1d=dojo.hitch(this,function(_1e,n){
var _1f=dojo.query(_1e,this.domNode)[0];
for(var i=0;i<n;i++){
_1f.parentNode.appendChild(_1f.cloneNode(true));
}
});
_1d(".dijitCalendarDayLabelTemplate",6);
_1d(".dijitCalendarDateTemplate",6);
_1d(".dijitCalendarWeekTemplate",5);
var _20=this.dateLocaleModule.getNames("days",this.dayWidth,"standAlone",this.lang);
var _21=dojo.cldr.supplemental.getFirstDayOfWeek(this.lang);
dojo.query(".dijitCalendarDayLabel",this.domNode).forEach(function(_22,i){
this._setText(_22,_20[(i+_21)%7]);
},this);
var _23=new this.dateClassObj(this.value);
var _24=this.dateLocaleModule.getNames("months","wide","standAlone",this.lang,_23);
_1d(".dijitCalendarMonthLabelTemplate",_24.length-1);
dojo.query(".dijitCalendarMonthLabelTemplate",this.domNode).forEach(function(_25,i){
dojo.attr(_25,"month",i);
if(i in _24){
this._setText(_25,_24[i]);
}
dojo.place(_25.cloneNode(true),this.monthLabelSpacer);
},this);
this.value=null;
this.set("value",_23);
},_onMenuHover:function(e){
dojo.stopEvent(e);
dojo.toggleClass(e.target,"dijitMenuItemHover");
},_adjustDisplay:function(_26,_27){
this.displayMonth=this.dateFuncObj.add(this.displayMonth,_26,_27);
this._populateGrid();
},_onMonthToggle:function(evt){
dojo.stopEvent(evt);
if(evt.type=="mousedown"){
var _28=dojo.position(this.monthLabelNode);
var dim={width:_28.w+"px",top:-this.displayMonth.getMonth()*_28.h+"px"};
if((dojo.isIE&&dojo.isQuirks)||dojo.isIE<7){
dim.left=-_28.w/2+"px";
}
dojo.style(this.monthDropDown,dim);
this._popupHandler=this.connect(document,"onmouseup","_onMonthToggle");
}else{
this.disconnect(this._popupHandler);
delete this._popupHandler;
}
dojo.toggleClass(this.monthDropDown,"dijitHidden");
dojo.toggleClass(this.monthLabelNode,"dijitVisible");
},_onMonthSelect:function(evt){
this._onMonthToggle(evt);
this.displayMonth.setMonth(dojo.attr(evt.target,"month"));
this._populateGrid();
},_onDayClick:function(evt){
dojo.stopEvent(evt);
for(var _29=evt.target;_29&&!_29.dijitDateValue;_29=_29.parentNode){
}
if(_29&&!dojo.hasClass(_29,"dijitCalendarDisabledDate")){
this.set("value",_29.dijitDateValue);
this.onValueSelected(this.get("value"));
}
},_onDayMouseOver:function(evt){
var _2a=dojo.hasClass(evt.target,"dijitCalendarDateLabel")?evt.target.parentNode:evt.target;
if(_2a&&(_2a.dijitDateValue||_2a==this.previousYearLabelNode||_2a==this.nextYearLabelNode)){
dojo.addClass(_2a,"dijitCalendarHoveredDate");
this._currentNode=_2a;
}
},_onDayMouseOut:function(evt){
if(!this._currentNode){
return;
}
if(evt.relatedTarget&&evt.relatedTarget.parentNode==this._currentNode){
return;
}
dojo.removeClass(this._currentNode,"dijitCalendarHoveredDate");
if(dojo.hasClass(this._currentNode,"dijitCalendarActiveDate")){
dojo.removeClass(this._currentNode,"dijitCalendarActiveDate");
}
this._currentNode=null;
},_onDayMouseDown:function(evt){
var _2b=evt.target.parentNode;
if(_2b&&_2b.dijitDateValue){
dojo.addClass(_2b,"dijitCalendarActiveDate");
this._currentNode=_2b;
}
},_onDayMouseUp:function(evt){
var _2c=evt.target.parentNode;
if(_2c&&_2c.dijitDateValue){
dojo.removeClass(_2c,"dijitCalendarActiveDate");
}
},_onKeyPress:function(evt){
var dk=dojo.keys,_2d=-1,_2e,_2f=this.value;
switch(evt.keyCode){
case dk.RIGHT_ARROW:
_2d=1;
case dk.LEFT_ARROW:
_2e="day";
if(!this.isLeftToRight()){
_2d*=-1;
}
break;
case dk.DOWN_ARROW:
_2d=1;
case dk.UP_ARROW:
_2e="week";
break;
case dk.PAGE_DOWN:
_2d=1;
case dk.PAGE_UP:
_2e=evt.ctrlKey?"year":"month";
break;
case dk.END:
_2f=this.dateFuncObj.add(_2f,"month",1);
_2e="day";
case dk.HOME:
_2f=new Date(_2f).setDate(1);
break;
case dk.ENTER:
this.onValueSelected(this.get("value"));
break;
case dk.ESCAPE:
default:
return;
}
dojo.stopEvent(evt);
if(_2e){
_2f=this.dateFuncObj.add(_2f,_2e,_2d);
}
this.set("value",_2f);
},onValueSelected:function(_30){
},onChange:function(_31){
},_isSelectedDate:function(_32,_33){
return !this.dateFuncObj.compare(_32,this.value,"date");
},isDisabledDate:function(_34,_35){
},getClassForDate:function(_36,_37){
}});
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit.form._DateTimeTextBox"]){
dojo._hasResource["dijit.form._DateTimeTextBox"]=true;
dojo.provide("dijit.form._DateTimeTextBox");
dojo.require("dojo.date");
dojo.require("dojo.date.locale");
dojo.require("dojo.date.stamp");
dojo.require("dijit.form.ValidationTextBox");
new Date("X");
dojo.declare("dijit.form._DateTimeTextBox",dijit.form.RangeBoundTextBox,{regExpGen:dojo.date.locale.regexp,datePackage:"dojo.date",compare:dojo.date.compare,format:function(_1,_2){
if(!_1){
return "";
}
return this.dateLocaleModule.format(_1,_2);
},parse:function(_3,_4){
return this.dateLocaleModule.parse(_3,_4)||(this._isEmpty(_3)?null:undefined);
},serialize:function(_5,_6){
if(_5.toGregorian){
_5=_5.toGregorian();
}
return dojo.date.stamp.toISOString(_5,_6);
},value:new Date(""),_blankValue:null,popupClass:"",_selector:"",constructor:function(_7){
var _8=_7.datePackage?_7.datePackage+".Date":"Date";
this.dateClassObj=dojo.getObject(_8,false);
this.value=new this.dateClassObj("");
this.datePackage=_7.datePackage||this.datePackage;
this.dateLocaleModule=dojo.getObject(this.datePackage+".locale",false);
this.regExpGen=this.dateLocaleModule.regexp;
},_setConstraintsAttr:function(_9){
_9.selector=this._selector;
_9.fullYear=true;
var _a=dojo.date.stamp.fromISOString;
if(typeof _9.min=="string"){
_9.min=_a(_9.min);
}
if(typeof _9.max=="string"){
_9.max=_a(_9.max);
}
this.inherited(arguments,[_9]);
},_onFocus:function(_b){
this._open();
this.inherited(arguments);
},_setValueAttr:function(_c,_d,_e){
if(_c!==undefined){
if(!_c||_c.toString()==dijit.form._DateTimeTextBox.prototype.value.toString()){
_c=null;
}
if(_c instanceof Date&&!(this.dateClassObj instanceof Date)){
_c=new this.dateClassObj(_c);
}
}
this.inherited(arguments,[_c,_d,_e]);
if(this._picker){
if(!_c){
_c=new this.dateClassObj();
}
this._picker.set("value",_c);
}
},_open:function(){
if(this.disabled||this.readOnly||!this.popupClass){
return;
}
var _f=this;
if(!this._picker){
var _10=dojo.getObject(this.popupClass,false);
this._picker=new _10({onValueSelected:function(_11){
if(_f._tabbingAway){
delete _f._tabbingAway;
}else{
_f.focus();
}
setTimeout(dojo.hitch(_f,"_close"),1);
dijit.form._DateTimeTextBox.superclass._setValueAttr.call(_f,_11,true);
},id:this.id+"_popup",dir:_f.dir,lang:_f.lang,value:this.get("value")||new this.dateClassObj(),constraints:_f.constraints,datePackage:_f.datePackage,isDisabledDate:function(_12){
var _13=dojo.date.compare;
var _14=_f.constraints;
return _14&&((_14.min&&_13(_14.min,_12,_f._selector)>0)||(_14.max&&_13(_14.max,_12,_f._selector)<0));
}});
}
if(!this._opened){
dijit.popup.open({parent:this,popup:this._picker,orient:{"BL":"TL","TL":"BL"},around:this.domNode,onCancel:dojo.hitch(this,this._close),onClose:function(){
_f._opened=false;
}});
this._opened=true;
}
dojo.marginBox(this._picker.domNode,{w:this.domNode.offsetWidth});
},_close:function(){
if(this._opened){
dijit.popup.close(this._picker);
this._opened=false;
}
},_onBlur:function(){
this._close();
if(this._picker){
this._picker.destroy();
delete this._picker;
}
this.inherited(arguments);
},_getDisplayedValueAttr:function(){
return this.textbox.value;
},_setDisplayedValueAttr:function(_15,_16){
this._setValueAttr(this.parse(_15,this.constraints),_16,_15);
},destroy:function(){
if(this._picker){
this._picker.destroy();
delete this._picker;
}
this.inherited(arguments);
},postCreate:function(){
this.inherited(arguments);
this.connect(this.focusNode,"onkeypress",this._onKeyPress);
this.connect(this.focusNode,"onclick",this._open);
},_onKeyPress:function(e){
var p=this._picker,dk=dojo.keys;
if(p&&this._opened&&p.handleKey){
if(p.handleKey(e)===false){
return;
}
}
if(this._opened&&e.charOrCode==dk.ESCAPE&&!(e.shiftKey||e.ctrlKey||e.altKey||e.metaKey)){
this._close();
dojo.stopEvent(e);
}else{
if(!this._opened&&e.charOrCode==dk.DOWN_ARROW){
this._open();
dojo.stopEvent(e);
}else{
if(e.charOrCode===dk.TAB){
this._tabbingAway=true;
}else{
if(this._opened&&(e.keyChar||e.charOrCode===dk.BACKSPACE||e.charOrCode==dk.DELETE)){
setTimeout(dojo.hitch(this,function(){
if(this._picker&&this._opened){
dijit.placeOnScreenAroundElement(p.domNode.parentNode,this.domNode,{"BL":"TL","TL":"BL"},p.orient?dojo.hitch(p,"orient"):null);
}
}),1);
}
}
}
}
}});
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit.Dialog"]){
dojo._hasResource["dijit.Dialog"]=true;
dojo.provide("dijit.Dialog");
dojo.require("dojo.dnd.move");
dojo.require("dojo.dnd.TimedMoveable");
dojo.require("dojo.fx");
dojo.require("dojo.window");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dijit._CssStateMixin");
dojo.require("dijit.form._FormMixin");
dojo.require("dijit._DialogMixin");
dojo.require("dijit.DialogUnderlay");
dojo.require("dijit.layout.ContentPane");
dojo.requireLocalization("dijit","common",null,"ROOT,ar,ca,cs,da,de,el,es,fi,fr,he,hu,it,ja,ko,nb,nl,pl,pt,pt-pt,ro,ru,sk,sl,sv,th,tr,zh,zh-tw");
dojo.declare("dijit._DialogBase",[dijit._Templated,dijit.form._FormMixin,dijit._DialogMixin,dijit._CssStateMixin],{templateString:dojo.cache("dijit","templates/Dialog.html","<div class=\"dijitDialog\" tabindex=\"-1\" waiRole=\"dialog\" waiState=\"labelledby-${id}_title\">\n\t<div dojoAttachPoint=\"titleBar\" class=\"dijitDialogTitleBar\">\n\t<span dojoAttachPoint=\"titleNode\" class=\"dijitDialogTitle\" id=\"${id}_title\"></span>\n\t<span dojoAttachPoint=\"closeButtonNode\" class=\"dijitDialogCloseIcon\" dojoAttachEvent=\"onclick: onCancel\" title=\"${buttonCancel}\">\n\t\t<span dojoAttachPoint=\"closeText\" class=\"closeText\" title=\"${buttonCancel}\">x</span>\n\t</span>\n\t</div>\n\t\t<div dojoAttachPoint=\"containerNode\" class=\"dijitDialogPaneContent\"></div>\n</div>\n"),baseClass:"dijitDialog",cssStateNodes:{closeButtonNode:"dijitDialogCloseIcon"},attributeMap:dojo.delegate(dijit._Widget.prototype.attributeMap,{title:[{node:"titleNode",type:"innerHTML"},{node:"titleBar",type:"attribute"}],"aria-describedby":""}),open:false,duration:dijit.defaultDuration,refocus:true,autofocus:true,_firstFocusItem:null,_lastFocusItem:null,doLayout:false,draggable:true,"aria-describedby":"",postMixInProperties:function(){
var _1=dojo.i18n.getLocalization("dijit","common");
dojo.mixin(this,_1);
this.inherited(arguments);
},postCreate:function(){
dojo.style(this.domNode,{display:"none",position:"absolute"});
dojo.body().appendChild(this.domNode);
this.inherited(arguments);
this.connect(this,"onExecute","hide");
this.connect(this,"onCancel","hide");
this._modalconnects=[];
},onLoad:function(){
this._position();
if(this.autofocus){
this._getFocusItems(this.domNode);
dijit.focus(this._firstFocusItem);
}
this.inherited(arguments);
},_endDrag:function(e){
if(e&&e.node&&e.node===this.domNode){
this._relativePosition=dojo.position(e.node);
}
},_setup:function(){
var _2=this.domNode;
if(this.titleBar&&this.draggable){
this._moveable=(dojo.isIE==6)?new dojo.dnd.TimedMoveable(_2,{handle:this.titleBar}):new dojo.dnd.Moveable(_2,{handle:this.titleBar,timeout:0});
dojo.subscribe("/dnd/move/stop",this,"_endDrag");
}else{
dojo.addClass(_2,"dijitDialogFixed");
}
this.underlayAttrs={dialogId:this.id,"class":dojo.map(this["class"].split(/\s/),function(s){
return s+"_underlay";
}).join(" ")};
this._fadeIn=dojo.fadeIn({node:_2,duration:this.duration,beforeBegin:dojo.hitch(this,function(){
var _3=dijit._underlay;
if(!_3){
_3=dijit._underlay=new dijit.DialogUnderlay(this.underlayAttrs);
}else{
_3.set(this.underlayAttrs);
}
var ds=dijit._dialogStack,_4=948+ds.length*2;
if(ds.length==1){
_3.show();
}
dojo.style(dijit._underlay.domNode,"zIndex",_4);
dojo.style(this.domNode,"zIndex",_4+1);
}),onEnd:dojo.hitch(this,function(){
if(this.autofocus){
this._getFocusItems(this.domNode);
dijit.focus(this._firstFocusItem);
}
})});
this._fadeOut=dojo.fadeOut({node:_2,duration:this.duration,onEnd:dojo.hitch(this,function(){
_2.style.display="none";
var ds=dijit._dialogStack;
if(ds.length==0){
dijit._underlay.hide();
}else{
dojo.style(dijit._underlay.domNode,"zIndex",948+ds.length*2);
dijit._underlay.set(ds[ds.length-1].underlayAttrs);
}
if(this.refocus){
var _5=this._savedFocus;
if(ds.length>0){
var pd=ds[ds.length-1];
if(!dojo.isDescendant(_5.node,pd.domNode)){
pd._getFocusItems(pd.domNode);
_5=pd._firstFocusItem;
}
}
dijit.focus(_5);
}
})});
},uninitialize:function(){
var _6=false;
if(this._fadeIn&&this._fadeIn.status()=="playing"){
_6=true;
this._fadeIn.stop();
}
if(this._fadeOut&&this._fadeOut.status()=="playing"){
_6=true;
this._fadeOut.stop();
}
if((this.open||_6)&&!dijit._underlay._destroyed){
dijit._underlay.hide();
}
if(this._moveable){
this._moveable.destroy();
}
this.inherited(arguments);
},_size:function(){
this._checkIfSingleChild();
if(this._singleChild){
if(this._singleChildOriginalStyle){
this._singleChild.domNode.style.cssText=this._singleChildOriginalStyle;
}
delete this._singleChildOriginalStyle;
}else{
dojo.style(this.containerNode,{width:"auto",height:"auto"});
}
var mb=dojo.marginBox(this.domNode);
var _7=dojo.window.getBox();
if(mb.w>=_7.w||mb.h>=_7.h){
var w=Math.min(mb.w,Math.floor(_7.w*0.75)),h=Math.min(mb.h,Math.floor(_7.h*0.75));
if(this._singleChild&&this._singleChild.resize){
this._singleChildOriginalStyle=this._singleChild.domNode.style.cssText;
this._singleChild.resize({w:w,h:h});
}else{
dojo.style(this.containerNode,{width:w+"px",height:h+"px",overflow:"auto",position:"relative"});
}
}else{
if(this._singleChild&&this._singleChild.resize){
this._singleChild.resize();
}
}
},_position:function(){
if(!dojo.hasClass(dojo.body(),"dojoMove")){
var _8=this.domNode,_9=dojo.window.getBox(),p=this._relativePosition,bb=p?null:dojo._getBorderBox(_8),l=Math.floor(_9.l+(p?p.x:(_9.w-bb.w)/2)),t=Math.floor(_9.t+(p?p.y:(_9.h-bb.h)/2));
dojo.style(_8,{left:l+"px",top:t+"px"});
}
},_onKey:function(_a){
var ds=dijit._dialogStack;
if(ds[ds.length-1]!=this){
return;
}
if(_a.charOrCode){
var dk=dojo.keys;
var _b=_a.target;
if(_a.charOrCode===dk.TAB){
this._getFocusItems(this.domNode);
}
var _c=(this._firstFocusItem==this._lastFocusItem);
if(_b==this._firstFocusItem&&_a.shiftKey&&_a.charOrCode===dk.TAB){
if(!_c){
dijit.focus(this._lastFocusItem);
}
dojo.stopEvent(_a);
}else{
if(_b==this._lastFocusItem&&_a.charOrCode===dk.TAB&&!_a.shiftKey){
if(!_c){
dijit.focus(this._firstFocusItem);
}
dojo.stopEvent(_a);
}else{
while(_b){
if(_b==this.domNode||dojo.hasClass(_b,"dijitPopup")){
if(_a.charOrCode==dk.ESCAPE){
this.onCancel();
}else{
return;
}
}
_b=_b.parentNode;
}
if(_a.charOrCode!==dk.TAB){
dojo.stopEvent(_a);
}else{
if(!dojo.isOpera){
try{
this._firstFocusItem.focus();
}
catch(e){
}
}
}
}
}
}
},show:function(){
if(this.open){
return;
}
if(!this._alreadyInitialized){
this._setup();
this._alreadyInitialized=true;
}
if(this._fadeOut.status()=="playing"){
this._fadeOut.stop();
}
this._modalconnects.push(dojo.connect(window,"onscroll",this,"layout"));
this._modalconnects.push(dojo.connect(window,"onresize",this,function(){
var _d=dojo.window.getBox();
if(!this._oldViewport||_d.h!=this._oldViewport.h||_d.w!=this._oldViewport.w){
this.layout();
this._oldViewport=_d;
}
}));
this._modalconnects.push(dojo.connect(dojo.doc.documentElement,"onkeypress",this,"_onKey"));
dojo.style(this.domNode,{opacity:0,display:""});
this.open=true;
this._onShow();
this._size();
this._position();
dijit._dialogStack.push(this);
this._fadeIn.play();
this._savedFocus=dijit.getFocus(this);
},hide:function(){
var ds=dijit._dialogStack;
if(!this._alreadyInitialized||this!=ds[ds.length-1]){
return;
}
if(this._fadeIn.status()=="playing"){
this._fadeIn.stop();
}
ds.pop();
this._fadeOut.play();
if(this._scrollConnected){
this._scrollConnected=false;
}
dojo.forEach(this._modalconnects,dojo.disconnect);
this._modalconnects=[];
if(this._relativePosition){
delete this._relativePosition;
}
this.open=false;
this.onHide();
},layout:function(){
if(this.domNode.style.display!="none"){
if(dijit._underlay){
dijit._underlay.layout();
}
this._position();
}
},destroy:function(){
dojo.forEach(this._modalconnects,dojo.disconnect);
if(this.refocus&&this.open){
setTimeout(dojo.hitch(dijit,"focus",this._savedFocus),25);
}
this.inherited(arguments);
}});
dojo.declare("dijit.Dialog",[dijit.layout.ContentPane,dijit._DialogBase],{});
dijit._dialogStack=[];
dojo.require("dijit.TooltipDialog");
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit.form.Form"]){
dojo._hasResource["dijit.form.Form"]=true;
dojo.provide("dijit.form.Form");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dijit.form._FormMixin");
dojo.declare("dijit.form.Form",[dijit._Widget,dijit._Templated,dijit.form._FormMixin],{name:"",action:"",method:"",encType:"","accept-charset":"",accept:"",target:"",templateString:"<form dojoAttachPoint='containerNode' dojoAttachEvent='onreset:_onReset,onsubmit:_onSubmit' ${!nameAttrSetting}></form>",attributeMap:dojo.delegate(dijit._Widget.prototype.attributeMap,{action:"",method:"",encType:"","accept-charset":"",accept:"",target:""}),postMixInProperties:function(){
this.nameAttrSetting=this.name?("name='"+this.name+"'"):"";
this.inherited(arguments);
},execute:function(_1){
},onExecute:function(){
},_setEncTypeAttr:function(_2){
this.encType=_2;
dojo.attr(this.domNode,"encType",_2);
if(dojo.isIE){
this.domNode.encoding=_2;
}
},postCreate:function(){
if(dojo.isIE&&this.srcNodeRef&&this.srcNodeRef.attributes){
var _3=this.srcNodeRef.attributes.getNamedItem("encType");
if(_3&&!_3.specified&&(typeof _3.value=="string")){
this.set("encType",_3.value);
}
}
this.inherited(arguments);
},reset:function(e){
var _4={returnValue:true,preventDefault:function(){
this.returnValue=false;
},stopPropagation:function(){
},currentTarget:e?e.target:this.domNode,target:e?e.target:this.domNode};
if(!(this.onReset(_4)===false)&&_4.returnValue){
this.inherited(arguments,[]);
}
},onReset:function(e){
return true;
},_onReset:function(e){
this.reset(e);
dojo.stopEvent(e);
return false;
},_onSubmit:function(e){
var fp=dijit.form.Form.prototype;
if(this.execute!=fp.execute||this.onExecute!=fp.onExecute){
dojo.deprecated("dijit.form.Form:execute()/onExecute() are deprecated. Use onSubmit() instead.","","2.0");
this.onExecute();
this.execute(this.getValues());
}
if(this.onSubmit(e)===false){
dojo.stopEvent(e);
}
},onSubmit:function(e){
return this.isValid();
},submit:function(){
if(!(this.onSubmit()===false)){
this.containerNode.submit();
}
}});
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit.layout.TabContainer"]){
dojo._hasResource["dijit.layout.TabContainer"]=true;
dojo.provide("dijit.layout.TabContainer");
dojo.require("dijit.layout._TabContainerBase");
dojo.require("dijit.layout.TabController");
dojo.require("dijit.layout.ScrollingTabController");
dojo.declare("dijit.layout.TabContainer",dijit.layout._TabContainerBase,{useMenu:true,useSlider:true,controllerWidget:"",_makeController:function(_1){
var _2=this.baseClass+"-tabs"+(this.doLayout?"":" dijitTabNoLayout"),_3=dojo.getObject(this.controllerWidget);
return new _3({id:this.id+"_tablist",dir:this.dir,lang:this.lang,tabPosition:this.tabPosition,doLayout:this.doLayout,containerId:this.id,"class":_2,nested:this.nested,useMenu:this.useMenu,useSlider:this.useSlider,tabStripClass:this.tabStrip?this.baseClass+(this.tabStrip?"":"No")+"Strip":null},_1);
},postMixInProperties:function(){
this.inherited(arguments);
if(!this.controllerWidget){
this.controllerWidget=(this.tabPosition=="top"||this.tabPosition=="bottom")&&!this.nested?"dijit.layout.ScrollingTabController":"dijit.layout.TabController";
}
}});
}



/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit.form.DateTextBox"]){
dojo._hasResource["dijit.form.DateTextBox"]=true;
dojo.provide("dijit.form.DateTextBox");
dojo.require("dijit.Calendar");
dojo.require("dijit.form._DateTimeTextBox");
dojo.declare("dijit.form.DateTextBox",dijit.form._DateTimeTextBox,{baseClass:"dijitTextBox dijitDateTextBox",popupClass:"dijit.Calendar",_selector:"date",value:new Date("")});
}



