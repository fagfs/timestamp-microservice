const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/api/:date?", (req, res) => {
  try {
    let date;
    const input = req.params.date;
    
    if (!input) {
      date = new Date();
      return res.json({
        unix: date.getTime(),
        utc: date.toUTCString()
      });
    }
    
    if (/^\d+$/.test(input)) {
      date = new Date(parseInt(input));
    } else {
      date = new Date(input);
    }
    
    if (isNaN(date.getTime())) {
      return res.json({ error: "Invalid Date" });
    }
    
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
    
  } catch (error) {
    res.json({ error: "Invalid Date" });
  }
});

app.listen(port, () => {
  console.log(`服务运行在端口 ${port}`);
});
