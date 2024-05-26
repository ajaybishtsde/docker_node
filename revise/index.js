const app=require('express')()

app.get('/',(req,res)=>{
    res.send("this is from dockerdsd file")
    console.log("this is for dockdsdeer")
})
app.listen('3000',()=>{
    console.log("listening at 3000")
})