const express=require("express")
const fs=require("fs")
const app=express();
const users=require("./MOCK_DATA.json")

// MIddleware -plugin
app.use(express.urlencoded({extended: false}))
app.get("/api/data",(req,res)=>{
    return res.json(users)
})

app.get("/data",(req,res)=>{
    const html=`
    <ul>
        ${users.map((users)=> `<li>${users.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html)
})
app.get("/api/users",(req,res)=>{
    return res.json(users);
})
app.route("/api/data/:id")
    .get((req,res)=>{
        const id=Number(req.params.id);
        const user=users.find((user)=> user.id===id);
        return res.send(user)
    })
    .patch((req,res)=>{
        return res.json({status: "pending"})
    })
    .delete((req,res)=>{
        const body=req.body;
        users.shift({...body,id:req.id})
        fs.unlink("./MOCK_DATA.json",(err)=>{
            return res.json({status: "success",id: users.length})
        })
    })
app.post("/api/user",(req,res)=>{
    const body=req.body;
    // console.log("body",body);
    users.push({...body,id:users.length+1});
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
        return res.json({status: "success",id:users.length})
    })
})

app.listen(3000,()=>{console.log(`app is running`)})