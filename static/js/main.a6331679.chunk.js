(this["webpackJsonpmpg-quizz-app"]=this["webpackJsonpmpg-quizz-app"]||[]).push([[0],{60:function(e,t,a){},61:function(e,t,a){},66:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(9),s=a.n(i),c=(a(60),a(29)),l=a(44),d=(a(61),[{questionText:"S\xe9lectionnez la ligue:",questionKey:"country",answerOptions:[{displayText:"Premier League \ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc65\udb40\udc6e\udb40\udc67\udb40\udc7f",answerValue:"England"},{displayText:"Ligue 1 \ud83c\uddeb\ud83c\uddf7",answerValue:"France"},{displayText:"Serie A \ud83c\uddee\ud83c\uddf9",answerValue:"Italy"},{displayText:"La Liga \ud83c\uddea\ud83c\uddf8",answerValue:"Spain"}]},{questionKey:"criteria",answerOptions:[{displayText:"Goals",answerValue:"goals"},{displayText:"Assists",answerValue:"assists"},{displayText:"Defensive performance",answerValue:"def_score"},{displayText:"Expected goals",answerValue:"xG"},{displayText:"Expected output (xG+xA)",answerValue:"expected_output"},{displayText:"MPG average rating",answerValue:"average"}]}]),u=a(93),j=a(98),o=a(99),b=a(100),p=a(97),h=a(4);function x(){return Object(h.jsx)("div",{className:"footer",children:Object(h.jsx)("p",{children:"Belkacem Berchiche, 2021"})})}var f=a(43),O=a.p+"static/media/f-icon.168ebcbc.png",g=function(){return Object(h.jsx)(f.a,{bg:"light",variant:"light",children:Object(h.jsxs)(f.a.Brand,{href:"#home",children:[Object(h.jsx)("img",{alt:"",src:O,width:"40",height:"40",className:"inline border-b-4"})," ","MPG team builder"]})})};var m=function(){var e=d,t={G:"\ud83e\udd4a",D:"\u2694\ufe0f",M:"\ud83e\udde0",A:"\u26bd"},a=Object(n.useState)({league:"England",init_budget:300,att_pref:"average",mid_pref:"average",def_pref:"average",att_weight:.3,mid_weight:.3,def_weight:.3,gk_weight:.1}),r=Object(l.a)(a,2),i=r[0],s=r[1],f=Object(n.useState)([]),O=Object(l.a)(f,2),m=O[0],v=O[1],w=function(e){var t={};t[e.target.name]=e.target.value,s(Object(c.a)(Object(c.a)({},i),t))};return Object(h.jsxs)("div",{children:[Object(h.jsx)(g,{}),Object(h.jsxs)("div",{className:"p-10 items-center justify-center flex flex-row",children:[Object(h.jsxs)(u.a,{children:[Object(h.jsxs)("div",{children:[Object(h.jsx)("p",{children:"League"}),Object(h.jsx)(j.a,{labelId:"league-select-label",id:"league-selected-id",value:i.league,onChange:w,name:"league",children:e.filter((function(e){return"country"===e.questionKey}))[0].answerOptions.map((function(e){return Object(h.jsx)(o.a,{value:e.answerValue,children:e.displayText},e.answerValue)}))})]}),Object(h.jsx)("br",{}),Object(h.jsxs)("div",{children:[Object(h.jsx)("p",{children:"Initial budget"}),Object(h.jsx)(b.a,{defaultValue:300,"aria-labelledby":"budget-slider",valueLabelDisplay:"auto",step:10,marks:!0,min:100,max:500,onChangeCommitted:function(){var e={};e.init_budget=arguments.length<=1?void 0:arguments[1],s(Object(c.a)(Object(c.a)({},i),e))},name:"init_budget"})]}),Object(h.jsxs)("div",{children:[Object(h.jsx)("p",{children:"Attack preferences"}),Object(h.jsx)(j.a,{labelId:"att-pref-label",id:"att-prefs-id",value:i.att_pref,onChange:w,name:"att_pref",children:e.filter((function(e){return"criteria"===e.questionKey}))[0].answerOptions.map((function(e){return Object(h.jsx)(o.a,{value:e.answerValue,children:e.displayText},e.answerValue)}))})]}),Object(h.jsx)("br",{}),Object(h.jsxs)("div",{children:[Object(h.jsx)("p",{children:"Midfield preferences"}),Object(h.jsx)(j.a,{labelId:"mid-pref-label",id:"mid-prefs-id",name:"mid_pref",value:i.mid_pref,onChange:w,children:e.filter((function(e){return"criteria"===e.questionKey}))[0].answerOptions.map((function(e){return Object(h.jsx)(o.a,{value:e.answerValue,children:e.displayText},e.answerValue)}))})]}),Object(h.jsx)("br",{}),Object(h.jsxs)("div",{children:[Object(h.jsx)("h1",{children:"Defence preferences"}),Object(h.jsx)(j.a,{labelId:"def-pref-label",id:"def-prefs-id",name:"def_pref",value:i.def_pref,onChange:w,children:e.filter((function(e){return"criteria"===e.questionKey}))[0].answerOptions.map((function(e){return Object(h.jsx)(o.a,{value:e.answerValue,children:e.displayText},e.answerValue)}))})]}),Object(h.jsx)("br",{}),Object(h.jsx)(p.a,{variant:"contained",color:"primary",type:"submit",onClick:function(){var e=new Headers;e.append("Content-Type","application/json");var t=JSON.stringify(Object(c.a)({},i));fetch("https://nrkf97hvad.execute-api.us-east-2.amazonaws.com/preproduction/opt",{method:"POST",headers:e,body:t,redirect:"follow"}).then((function(e){return e.json()})).then((function(e){v(e),console.log(e)})).catch((function(e){return console.log("error",e)}))},children:"Build team \ud83d\ude80"})]}),Object(h.jsx)("div",{className:"mx-8",children:m.length>0&&Object(h.jsxs)("table",{className:"table-auto border-solid border-2 rounded",children:[Object(h.jsxs)("tr",{children:[Object(h.jsx)("th",{children:"Player"}),Object(h.jsx)("th",{children:"Price"}),Object(h.jsx)("th",{children:"Bid"}),Object(h.jsx)("th",{children:"MPG average rating"})]}),m.length>0&&m.map((function(e){return Object(h.jsxs)("tr",{className:"bg-green-50 border-2",children:[Object(h.jsxs)("td",{children:[" ",t[e.mpg_position]+" | "+e.player_name," "]}),Object(h.jsxs)("td",{className:"text-center",children:[" ",e.price," "]}),Object(h.jsxs)("td",{className:"text-center",children:[" ",Object(h.jsx)("strong",{children:e.bid})," "]}),Object(h.jsxs)("td",{className:"text-center",children:[" ",e.average," "]})]},e.player_name)}))]})})]}),Object(h.jsx)("div",{children:Object(h.jsx)(x,{})})]})},v=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,101)).then((function(t){var a=t.getCLS,n=t.getFID,r=t.getFCP,i=t.getLCP,s=t.getTTFB;a(e),n(e),r(e),i(e),s(e)}))};s.a.render(Object(h.jsx)(r.a.StrictMode,{children:Object(h.jsx)(m,{})}),document.getElementById("root")),v()}},[[66,1,2]]]);
//# sourceMappingURL=main.a6331679.chunk.js.map