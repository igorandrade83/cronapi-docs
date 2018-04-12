var app=function(){return angular.module("MyApp",["ionic","ui.router","ngResource","ngSanitize","custom.controllers","custom.services","datasourcejs","pascalprecht.translate","tmh.dynamicLocale","ui-notification","ngFileUpload"]).constant("LOCALES",{locales:{pt_br:"Portugues (Brasil)",en_us:"English"},preferredLocale:"pt_br"}).run(["$ionicPlatform",function(e){e.ready(function(){setTimeout(function(){navigator.splashscreen&&navigator.splashscreen.hide()},100),window.cordova&&window.cordova.plugins&&window.cordova.plugins.Keyboard&&(cordova.plugins.Keyboard.hideKeyboardAccessoryBar(!0),cordova.plugins.Keyboard.disableScroll(!0)),window.StatusBar&&StatusBar.styleDefault()})}]).config(["$httpProvider",function(e){var o=["$q","$rootScope",function(e,o){return{request:function(e){var o=JSON.parse(sessionStorage.getItem("_u"));return o&&o.token&&(e.headers["X-AUTH-TOKEN"]=o.token,window.uToken=o.token),e}}}];e.interceptors.push(o)}]).config(["$stateProvider","$urlRouterProvider","$ionicConfigProvider",function(e,o,n){n.navBar.alignTitle("center")}]).config(["$stateProvider","$urlRouterProvider","NotificationProvider",function(e,o,n){n.setOptions({delay:5e3,startTop:20,startRight:10,verticalSpacing:20,horizontalSpacing:20,positionX:"right",positionY:"top"}),e.state("login",{url:"",controller:"LoginController",templateUrl:"views/login.view.html"}).state("main",{url:"/",controller:"LoginController",templateUrl:"views/login.view.html"}).state("app",{url:"/app",controller:"HomeController",templateUrl:"views/logged/menu.view.html"}).state("app.home",{url:"/home",views:{menuContent:{controller:"HomeController",templateUrl:"views/logged/home.view.html"}}}).state("app.pages",{url:"/{name:.*}",views:{menuContent:{controller:"PageController",templateUrl:function(e){return"views/"+e.name+".view.html"}}}}).state("404",{url:"/error/404",controller:"PageController",templateUrl:function(e){return"views/error/404.view.html"}}).state("403",{url:"/error/403",controller:"PageController",templateUrl:function(e){return"views/error/403.view.html"}}),o.otherwise("/error/404")}]).config(["$translateProvider","tmhDynamicLocaleProvider",function(e,o){e.useMissingTranslationHandlerLog(),e.useStaticFilesLoader({prefix:"i18n/locale_",suffix:".json"}),e.registerAvailableLanguageKeys(["pt_br","en_us"],{"en*":"en_us","pt*":"pt_br","*":"pt_br"});var n=(window.navigator.userLanguage||window.navigator.language||"pt_br").replace("-","_");e.use(n.toLowerCase()),e.useSanitizeValueStrategy("escaped"),o.localeLocationPattern("plugins/angular-i18n/angular-locale_{{locale}}.js")}]).directive("crnValue",["$parse",function(e){return{restrict:"A",require:"^ngModel",link:function(o,n,r,t){var i;i=r.value?r.value:e(r.crnValue)(o),n.attr("data-evaluated",JSON.stringify(i)),n.bind("click",function(e){o.$apply(function(){t.$setViewValue(i)}.bind(n))})}}}]).decorator("$xhrFactory",["$delegate","$injector",function(e,o){return function(n,r){var t=e(n,r),i=o.get("$http"),a=i.pendingRequests[i.pendingRequests.length-1];return angular.isFunction(a.onProgress)&&t.upload.addEventListener("progress",a.onProgress),t}}]).controller("PageController",["$scope","$stateParams","Notification","$location","$http","$rootScope","$translate","$ionicModal",function(e,o,n,r,t,i,a,l){app.registerEventsCronapi(e,a,l),i.http=t,e.Notification=n,e.params=o,e.$http=t;var s=r.search();for(var c in s)s.hasOwnProperty(c)&&(e.params[c]=s[c]);e.registerComponentScripts=function(){$(".carousel-indicators li").on("click",function(){var e="#"+$(this).parent().parent().parent().attr("id"),o=$(e+" .carousel-indicators li").index(this);$(e+" #carousel-example-generic").carousel(o)})},e.registerComponentScripts()}]).run(["$rootScope","$state",function(e,o){e.$on("$stateChangeError",function(){if(arguments.length>=6){var e=arguments[5];404!==e.status&&403!==e.status||o.go(e.status.toString())}else o.go("404")}),e.$on("$stateChangeSuccess",function(){setTimeout(function(){$($(".icon.ion-plus-round").parent()).off("click"),$($(".icon.ion-plus-round").parent()).on("click",function(){$("[required]").removeClass("input-validation-error"),$("input:invalid").removeClass("input-validation-error")}),$($(".icon.ion-checkmark").parent()).off("click"),$($(".icon.ion-checkmark").parent()).on("click",function(){$("[required].ng-invalid-required, [required].ng-invalid, [required].ng-empty").addClass("input-validation-error"),$("input:invalid").addClass("input-validation-error")}),$("input").off("keydown"),$("input").on("keydown",function(){$(this).removeClass("input-validation-error")})},300)})}])}(window);app.userEvents={},app.config={},app.config.datasourceApiVersion=2,app.config.defaultRoute="/app",app.bindScope=function(e,o){var n={};for(var r in o)"string"==typeof o[r]?n[r]=o[r]:"function"==typeof o[r]?n[r]=o[r].bind(e):n[r]=app.bindScope(e,o[r]);return n},app.registerEventsCronapi=function(e,o,n){for(var r in app.userEvents)e[r]=app.userEvents[r].bind(e);e.vars={};try{cronapi&&(e.cronapi=app.bindScope(e,cronapi),e.cronapi.$scope=e,e.cronapi.$scope.$ionicModal=n,e.safeApply=safeApply,o&&(e.cronapi.$translate=o))}catch(e){console.info("Not loaded cronapi functions"),console.info(e)}try{blockly&&(e.blockly=app.bindScope(e,blockly))}catch(e){console.info("Not loaded blockly functions"),console.info(e)}},window.safeApply=function(e){var o=this.$root.$$phase;"$apply"==o||"$digest"==o?e&&"function"==typeof e&&e():this.$apply(e)};