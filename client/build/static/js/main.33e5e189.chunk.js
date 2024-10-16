(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{15:function(e,t,a){e.exports=a(27)},21:function(e,t,a){},26:function(e,t,a){},27:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),c=a(14),l=a.n(c),o=(a(21),a(5)),i=a(3),s=a(28);var m=()=>n.a.createElement("div",{className:"banner-container"},n.a.createElement("div",{className:"banner-icons"},n.a.createElement("img",{src:"/food.png",alt:"Food",className:"banner-icon food-icon"}),n.a.createElement("img",{src:"/pickles.png",alt:"Pickles",className:"banner-icon pickles-icon"}),n.a.createElement("img",{src:"/cooking.png",alt:"Cooking",className:"banner-icon cooking-icon"}),n.a.createElement("img",{src:"/bottle.png",alt:"Bottle",className:"banner-icon bottle-icon"})),n.a.createElement("div",{className:"banner"},n.a.createElement(o.b,{to:"/",className:"banner-title"},n.a.createElement("h1",null,"\u05d7\u05de\u05d5\u05e6\u05d9\u05dd \u05e2\u05dd \u05d7\u05de\u05d5\u05e6\u05d9\u05dd")),n.a.createElement("div",{className:"banner-separator"}),n.a.createElement("p",null,"\u05d4\u05de\u05ea\u05db\u05d5\u05e0\u05d9\u05dd \u05d4\u05db\u05d9 \u05d8\u05e2\u05d9\u05de\u05d9\u05dd \u05dc\u05d7\u05de\u05d5\u05e6\u05d9\u05dd \u05d1\u05d9\u05ea\u05d9\u05d9\u05dd")));var u=e=>{let{categories:t,selectedCategory:a,onCategoryChange:r,isAdmin:c}=e;return n.a.createElement("div",{className:"category-filter"},n.a.createElement("button",{onClick:()=>r(null),className:null===a?"active":""},"All"),t.map(e=>n.a.createElement("div",{key:e._id,className:"category-button-group"},n.a.createElement("button",{onClick:()=>r(e._id),className:a===e._id?"active":""},e.name),c&&a===e._id&&n.a.createElement("button",{onClick:()=>(async e=>{if(window.confirm("\u05d4\u05d0\u05dd \u05d0\u05ea\u05d4 \u05d1\u05d8\u05d5\u05d7 \u05e9\u05d1\u05e8\u05e6\u05d5\u05e0\u05da \u05dc\u05de\u05d7\u05d5\u05e7 \u05e7\u05d8\u05d2\u05d5\u05e8\u05d9\u05d4 \u05d6\u05d5?"))try{await s.a.delete("/api/categories/"+e,{headers:{"x-auth-token":localStorage.getItem("token")}}),alert("\u05d4\u05e7\u05d8\u05d2\u05d5\u05e8\u05d9\u05d4 \u05e0\u05de\u05d7\u05e7\u05d4 \u05d1\u05d4\u05e6\u05dc\u05d7\u05d4!")}catch(t){console.error("Error deleting category:",t),alert("\u05e9\u05d2\u05d9\u05d0\u05d4 \u05d1\u05de\u05d7\u05d9\u05e7\u05ea \u05d4\u05e7\u05d8\u05d2\u05d5\u05e8\u05d9\u05d4")}})(e._id),className:"delete-category-btn"},"Delete"))))};const d="http://localhost:8081/api",g=s.a.create({baseURL:d});console.log("API Base URL:",d),g.interceptors.request.use(e=>(console.log("Starting Request",e),e)),g.interceptors.request.use(e=>{const t=localStorage.getItem("token");return t?(e.headers.Authorization="Bearer "+t,console.log("Authorization header set:",e.headers.Authorization)):console.log("No token found in localStorage"),e},e=>Promise.reject(e)),g.interceptors.response.use(e=>e,e=>(console.error("API Error:",e),e.response?(console.error("Response data:",e.response.data),console.error("Response status:",e.response.status),console.error("Response headers:",e.response.headers)):e.request?console.error("No response received:",e.request):console.error("Error setting up request:",e.message),Promise.reject(e)));var p=g;var E=e=>{let{selectedCategory:t}=e;const[a,c]=Object(r.useState)([]);Object(r.useEffect)(()=>{l()},[t]);const l=async()=>{try{console.log("Fetching recipes from:",d+"/recipes");const e=await p.get("/recipes");console.log("Recipes fetched:",e.data),c(e.data)}catch(e){console.error("Error fetching recipes:",e)}},i=null===t?a:a.filter(e=>e.category&&e.category._id===t);return n.a.createElement("div",{className:"recipe-list"},n.a.createElement("div",{className:"recipe-grid"},i.map(e=>n.a.createElement(o.b,{to:"/recipe/"+e._id,key:e._id,className:"recipe-card"},e.image&&n.a.createElement("img",{src:"http://localhost:8081"+e.image,alt:e.title,onError:e=>{e.target.onerror=null,e.target.src="https://via.placeholder.com/150?text=No+Image"}}),n.a.createElement("div",{className:"content"},n.a.createElement("h2",null,e.title),n.a.createElement("p",{className:"cooking-time"},e.cookingTime," \u05d3\u05e7\u05d5\u05ea"))))))};var h=e=>{let{setIsAuthenticated:t,handleLogin:a}=e;const[c,l]=Object(r.useState)(""),[o,s]=Object(r.useState)(""),m=Object(i.p)();return n.a.createElement("form",{onSubmit:async e=>{e.preventDefault();try{const e=await p.post("/auth/login",{username:c,password:o});a(e.data.token),m("/")}catch(t){console.error("Login failed",t),alert("Login failed. Please check your credentials and try again.")}},className:"login-form"},n.a.createElement("h2",null,"\u05d4\u05ea\u05d7\u05d1\u05e8\u05d5\u05ea"),n.a.createElement("input",{type:"text",placeholder:"Username",value:c,onChange:e=>l(e.target.value),required:!0}),n.a.createElement("input",{type:"password",placeholder:"Password",value:o,onChange:e=>s(e.target.value),required:!0}),n.a.createElement("button",{type:"submit"},"\u05d4\u05ea\u05d7\u05d1\u05e8"))};var b=()=>{const[e,t]=Object(r.useState)(""),[a,c]=Object(r.useState)(""),[l,o]=Object(r.useState)(""),[s,m]=Object(r.useState)(""),[u,d]=Object(r.useState)(""),[g,E]=Object(r.useState)(""),[h,b]=Object(r.useState)(""),[v,y]=Object(r.useState)(null),[f,N]=Object(r.useState)([]),S=Object(i.p)();Object(r.useEffect)(()=>{k()},[]);const k=async()=>{try{const e=await p.get("/categories");N(e.data)}catch(e){console.error("Error fetching categories:",e)}};return n.a.createElement("form",{onSubmit:async t=>{t.preventDefault();const r=new FormData;r.append("title",e),r.append("description",a),r.append("ingredients",JSON.stringify(l.split("\n"))),r.append("instructions",JSON.stringify(s.split("\n"))),r.append("cookingTime",u),r.append("servings",g),r.append("category",h),v&&r.append("image",v);try{const e=await p.post("/recipes",r,{headers:{"Content-Type":"multipart/form-data"}});alert("Recipe added successfully!"),S("/recipe/"+e.data._id)}catch(n){console.error(n),alert("Error adding recipe")}},className:"add-recipe-form"},n.a.createElement("h2",null,"\u05d4\u05d5\u05e1\u05e3 \u05de\u05ea\u05db\u05d5\u05df \u05d7\u05d3\u05e9"),n.a.createElement("input",{type:"text",placeholder:"\u05db\u05d5\u05ea\u05e8\u05ea",value:e,onChange:e=>t(e.target.value),required:!0}),n.a.createElement("textarea",{placeholder:"\u05ea\u05d9\u05d0\u05d5\u05e8",value:a,onChange:e=>c(e.target.value),required:!0}),n.a.createElement("textarea",{placeholder:"\u05de\u05e6\u05e8\u05db\u05d9\u05dd (\u05d0\u05d7\u05d3 \u05d1\u05db\u05dc \u05e9\u05d5\u05e8\u05d4)",value:l,onChange:e=>o(e.target.value),required:!0}),n.a.createElement("textarea",{placeholder:"\u05d4\u05d5\u05e8\u05d0\u05d5\u05ea \u05d4\u05db\u05e0\u05d4 (\u05d0\u05d7\u05ea \u05d1\u05db\u05dc \u05e9\u05d5\u05e8\u05d4)",value:s,onChange:e=>m(e.target.value),required:!0}),n.a.createElement("input",{type:"number",placeholder:"\u05d6\u05de\u05df \u05d1\u05d9\u05e9\u05d5\u05dc (\u05d1\u05d3\u05e7\u05d5\u05ea)",value:u,onChange:e=>d(e.target.value),required:!0}),n.a.createElement("input",{type:"number",placeholder:"\u05db\u05de\u05d5\u05ea \u05d4\u05d2\u05e9\u05d5\u05ea \u05dc\u05de\u05e0\u05d4",value:g,onChange:e=>E(e.target.value),required:!0}),n.a.createElement("select",{value:h,onChange:e=>b(e.target.value),required:!0},n.a.createElement("option",{value:""},"\u05d1\u05d7\u05e8 \u05e7\u05d8\u05d2\u05d5\u05e8\u05d9\u05d4"),f.map(e=>n.a.createElement("option",{key:e._id,value:e._id},e.name))),n.a.createElement("input",{type:"file",onChange:e=>y(e.target.files[0]),accept:"image/*",required:!0}),n.a.createElement("button",{type:"submit"},"\u05d4\u05d5\u05e1\u05e3 \u05de\u05ea\u05db\u05d5\u05df"))};var v=()=>{const[e,t]=Object(r.useState)(""),a=Object(i.p)();return n.a.createElement("form",{onSubmit:async t=>{t.preventDefault();try{await s.a.post("/api/categories",{name:e},{headers:{"x-auth-token":localStorage.getItem("token")}}),alert("Category added successfully!"),a("/")}catch(r){console.error(r),alert("Error adding category")}},className:"add-category-form"},n.a.createElement("h2",null,"\u05d4\u05d5\u05e1\u05e3 \u05e7\u05d8\u05d2\u05d5\u05e8\u05d9\u05d4 \u05d7\u05d3\u05e9\u05d4"),n.a.createElement("input",{type:"text",value:e,onChange:e=>t(e.target.value),placeholder:"\u05e9\u05dd \u05d4\u05e7\u05d8\u05d2\u05d5\u05e8\u05d9\u05d4",required:!0}),n.a.createElement("button",{type:"submit"},"\u05d4\u05d5\u05e1\u05e3 \u05e7\u05d8\u05d2\u05d5\u05e8\u05d9\u05d4"))};var y=e=>{let{isAdmin:t}=e;const[a,c]=Object(r.useState)(null),{id:l}=Object(i.r)();return Object(r.useEffect)(()=>{(async()=>{try{const e=await p.get("/recipes/"+l);c(e.data)}catch(e){console.error("Error fetching recipe:",e)}})()},[l]),a?n.a.createElement("div",{className:"recipe-details"},n.a.createElement("div",{className:"recipe-info"},n.a.createElement("h1",null,a.title),n.a.createElement("p",null,"\u05d6\u05de\u05df \u05d4\u05db\u05e0\u05d4: ",a.cookingTime," \u05d3\u05e7\u05d5\u05ea"),n.a.createElement("p",null,"\u05de\u05e0\u05d5\u05ea: ",a.servings),n.a.createElement("h3",null,"\u05de\u05e6\u05e8\u05db\u05d9\u05dd:"),n.a.createElement("ul",null,a.ingredients.map((e,t)=>n.a.createElement("li",{key:t},e))),n.a.createElement("h3",null,"\u05d4\u05d5\u05e8\u05d0\u05d5\u05ea \u05d4\u05db\u05e0\u05d4:"),n.a.createElement("ol",null,a.instructions.map((e,t)=>n.a.createElement("li",{key:t},e))),t&&n.a.createElement("div",null,n.a.createElement(o.b,{to:"/edit-recipe/"+a._id},n.a.createElement("button",null,"\u05e2\u05e8\u05d5\u05da \u05de\u05ea\u05db\u05d5\u05df")))),n.a.createElement("div",{className:"recipe-image"},n.a.createElement("img",{src:a.image,alt:a.title,onError:e=>{e.target.onerror=null,e.target.src="https://via.placeholder.com/150?text=No+Image"}}))):n.a.createElement("div",null,"Loading...")};var f=()=>{const{id:e}=Object(i.r)(),t=Object(i.p)(),[a,c]=Object(r.useState)(null),[l,o]=Object(r.useState)([]),[s,m]=Object(r.useState)({title:"",description:"",ingredients:"",instructions:"",cookingTime:"",servings:"",category:"",image:null});Object(r.useEffect)(()=>{p.get("/recipes/"+e).then(e=>{c(e.data),m({title:e.data.title,description:e.data.description,ingredients:JSON.stringify(e.data.ingredients),instructions:JSON.stringify(e.data.instructions),cookingTime:e.data.cookingTime,servings:e.data.servings,category:e.data.category,image:e.data.image})}).catch(e=>{console.error("Error fetching recipe:",e),alert("Failed to fetch recipe data.")}),p.get("/categories").then(e=>o(e.data)).catch(e=>{console.error("Error fetching categories:",e),alert("Failed to fetch categories.")})},[e]);const u=e=>{const{name:t,value:a,files:r}=e.target;m("image"===t?{...s,image:r[0]}:{...s,[t]:a})};return a?n.a.createElement("form",{onSubmit:async a=>{a.preventDefault();try{const a={...s,ingredients:JSON.parse(s.ingredients),instructions:JSON.parse(s.instructions)},r=await p.put("/recipes/"+e,a);alert("Recipe updated successfully!"),t("/recipe/"+r.data._id)}catch(r){console.error("Error updating recipe:",r),alert("Failed to update recipe.")}},className:"edit-recipe-form"},n.a.createElement("h2",null,"Edit Recipe"),n.a.createElement("input",{type:"text",name:"title",placeholder:"Title",value:s.title,onChange:u,required:!0}),n.a.createElement("textarea",{name:"description",placeholder:"Description",value:s.description,onChange:u,required:!0}),n.a.createElement("textarea",{name:"ingredients",placeholder:"Ingredients (JSON format)",value:s.ingredients,onChange:u,required:!0}),n.a.createElement("textarea",{name:"instructions",placeholder:"Instructions (JSON format)",value:s.instructions,onChange:u,required:!0}),n.a.createElement("input",{type:"number",name:"cookingTime",placeholder:"Cooking Time (minutes)",value:s.cookingTime,onChange:u,required:!0}),n.a.createElement("input",{type:"number",name:"servings",placeholder:"Servings",value:s.servings,onChange:u,required:!0}),n.a.createElement("select",{name:"category",value:s.category,onChange:u,required:!0},n.a.createElement("option",{value:""},"Select Category"),l.map(e=>n.a.createElement("option",{key:e._id,value:e.name},e.name))),n.a.createElement("input",{type:"file",name:"image",accept:"image/*",onChange:u}),n.a.createElement("button",{type:"submit"},"Update Recipe")):n.a.createElement("div",null,"Loading...")};a(26);var N=e=>{let{isAuthenticated:t,onLogout:a}=e;return n.a.createElement("div",{className:"floating-buttons"},t?n.a.createElement(n.a.Fragment,null,n.a.createElement("button",{onClick:a,className:"floating-button logout-button"},"\u05d4\u05ea\u05e0\u05ea\u05e7\u05d5\u05ea"),n.a.createElement(o.b,{to:"/add-recipe",className:"floating-button add-recipe-button"},"\u05d4\u05d5\u05e1\u05e3 \u05de\u05ea\u05db\u05d5\u05df"),n.a.createElement(o.b,{to:"/add-category",className:"floating-button add-category-button"},"\u05d4\u05d5\u05e1\u05e3 \u05e7\u05d8\u05d2\u05d5\u05e8\u05d9\u05d4")):n.a.createElement(o.b,{to:"/login",className:"floating-button login-button"},"\u05d4\u05ea\u05d7\u05d1\u05e8\u05d5\u05ea"))};var S=function(){const[e,t]=Object(r.useState)(!1),[a,c]=Object(r.useState)(!1),[l,d]=Object(r.useState)([]),[g,S]=Object(r.useState)(null);Object(r.useEffect)(()=>{k(),p.get("/categories").then(e=>d(e.data)).catch(e=>console.error("Error fetching categories:",e))},[]);const k=()=>{localStorage.getItem("token")?p.get("/auth/me").then(e=>{t(!0),c(e.data.isAdmin)}).catch(e=>{console.error(e),t(!1),c(!1),localStorage.removeItem("token")}):(t(!1),c(!1))};return Object(r.useEffect)(()=>{const e=localStorage.getItem("token");e&&s.a.get("/api/users/me",{headers:{"x-auth-token":e}}).then(e=>{c(e.data.isAdmin)}).catch(e=>{console.error("Error checking admin status:",e)})},[]),n.a.createElement(o.a,null,n.a.createElement("div",{className:"App"},n.a.createElement("div",{className:"fixed-header"},n.a.createElement(m,null),n.a.createElement("div",{className:"banner-category-separator"}),n.a.createElement(u,{categories:l,selectedCategory:g,onCategoryChange:e=>{S(e)},isAdmin:a})),n.a.createElement("div",{className:"main-content"},n.a.createElement(i.d,null,n.a.createElement(i.b,{path:"/",element:n.a.createElement(E,{categories:l,selectedCategory:g})}),n.a.createElement(i.b,{path:"/login",element:e?n.a.createElement(i.a,{to:"/"}):n.a.createElement(h,{handleLogin:e=>{localStorage.setItem("token",e),k()}})}),n.a.createElement(i.b,{path:"/add-recipe",element:e&&a?n.a.createElement(b,null):n.a.createElement(i.a,{to:"/login"})}),n.a.createElement(i.b,{path:"/add-category",element:e&&a?n.a.createElement(v,null):n.a.createElement(i.a,{to:"/login"})}),n.a.createElement(i.b,{path:"/recipe/:id",element:n.a.createElement(y,{isAdmin:a})}),n.a.createElement(i.b,{path:"/edit-recipe/:id",element:e&&a?n.a.createElement(f,null):n.a.createElement(i.a,{to:"/login"})}))),n.a.createElement(N,{isAuthenticated:e,onLogout:()=>{t(!1),c(!1),localStorage.removeItem("token"),console.log("User logged out")}})))};var k=e=>{e&&e instanceof Function&&a.e(3).then(a.bind(null,29)).then(t=>{let{getCLS:a,getFID:r,getFCP:n,getLCP:c,getTTFB:l}=t;a(e),r(e),n(e),c(e),l(e)})};l.a.createRoot(document.getElementById("root")).render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(S,null))),k()}},[[15,1,2]]]);
//# sourceMappingURL=main.33e5e189.chunk.js.map