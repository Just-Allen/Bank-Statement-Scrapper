let pdf2table = require('pdf2table');
let http = require('http');
let fs = require('fs');
let formidable = require('formidable');

http.createServer(function (req, res){
    let form = new formidable.IncomingForm();
    form.parse(req, function(error, fields, file){
        let filepath = file.fileupload.filepath;
        let newpath = __dirname+"/";
        newpath += file.fileupload.originalFilename;
        fs.rename(filepath, newpath, function(){
            // //Work here!!!!!!!!!
            // var href = "Result.html";
            res.write("Success");

            res.end();
            async function start(){
                fs.readFile('./sample.pdf', function (err, buffer) {
 
                    Array.prototype.remove = function() {
                        let what, a = arguments, L = a.length, ax;
                        while (L && this.length) {
                            what = a[--L];
                            while ((ax = this.indexOf(what)) !== -1) {
                                this.splice(ax, 1);
                            }
                        }
                        return this;
                    };
                
                    if (err) return console.log(err);
                    pdf2table.parse(buffer, function (err, rows) {
                        if(err) return console.log(err);
                        let Balances = [];
                        let Date = [];
                        let Description = [];
                        let Amount = [];
                        let count = 0;
                        let sum = 0;
                        
                        //loading arrays accordingly
                        for(let i = 30; i<53; i++)
                        {
                            let Data = rows[i];
                            
                            if(Data.length === 4)
                            {
                                let A = rows[i][0];
                                let B = rows[i][1];
                                let C = rows[i][2];
                                let E = rows[i][3];
                
                                Balances[count] = E;
                                Date[count] = A;
                                Description[count] = B;
                                Amount[count]= C;
                            }
                
                            if(Data.length === 5)
                            {
                                let remove = rows[i][2];
                                let D = rows[i].remove(remove);
                
                                let A = rows[i][0];
                                let B = rows[i][1];
                                let C = rows[i][2];
                                let E = rows[i][3];
                
                                Balances[count] = E;
                                Date[count] = A;
                                Description[count] = B;
                                Amount[count]= C;
                            }
                
                            if(Data.length === 6)
                            {
                                let A = rows[i][0];
                                let B = rows[i][1];
                                let C = rows[i][2];
                                let D = rows[i][3];
                                let E = rows[i][4];
                                let F = rows[i][5];
                
                                Balances[count] = E;
                                Date[count] = A;
                                Description[count] = B;
                                Amount[count]= D;
                            }
                
                            count = count + 1;
                        }
                        
                        
                        // fs.appendFile("Result.html", "<html lang=en><head><meta charset='UTF-8'><meta http-equiv='X-UA-Compatible' content='IE=edge'><meta name='viewport' content='width=device-width, initial-scale=1.0'><title>Document</title><style>.Table{display: flex;}.Date {width: 3%;}.Des{width: 10%;}.Amo{width: 10%}.Bal{width: 10%}.colDate{ width: 10%}.colDes {width: 29%;} .colAmo {width: 30%;}.colBal{width: 10%;}</style></head><body><h1>Bank Statement</h1><div class='Table'><div class='colDate'>Date</div><div class='colDes'>Description</div><div class='colAmo'>Amount</div><div class='colBal'>Balance</div></div>", function(){});
                        
                        for(let c = 0; c < Balances.length; c++)
                        {
                            fs.appendFile("Result.html", '<table><td class="Date">'+Date[c]+'</td><td class="Des">'+Description[c]+'</td><td class="Amo">'+Amount[c]+'</td><td class="Bal">'+Balances[c]+'</td></table><br>\n', function(){});
                            // console.log(Date[c] + Description[c] + Amount[c] + Balances[c]);
                        }
                        
                        for (let y = 0; y < Amount.length; y++) {
                            sum += Amount[y];
                        }
                    });
                });
            }
            start()
        });
    });
}).listen(80);