var express = require("express"),
	app = express(),
	fs = require("fs"),
    data = fs.readFileSync("history.json"),
	history = JSON.parse(data);
	



app.get("/:height/:res",function(req,res)
		{
	var x = Number(req.params.height);
	var y = Number(req.params.res);if(y>=1){res.send("restitution coefficient cant be greater than 1");}
	var time = (2*x/9.8)**0.5.toFixed(4);
	var n=1;var arr=[]; arr.push({height:x,time:0}); arr.push({height:0,time:time}); 
	while(x!=0)
		{
			x = x * (y**(2*n));
					var t = 2*(y**n)*((2*x/9.8)**0.5).toFixed(4);
			arr.push({height:x,time:(time+t/2)});
			arr.push({height:0,time:(time+t)});	
					time+=t;
		
			if(x<0.01)x=0;
			n++;
		}
	history[req.params.height]=y;
	
	var obj = {bounces:n-1,coordinates:arr};
	var data = JSON.stringify(history);
	fs.writeFile("history.json",data,function(err){
		console.log("All SET");
	});
	res.json(obj);
});
app.get("/history",function(req,res)
	   {
	res.send(history);
})


app.listen(3000);