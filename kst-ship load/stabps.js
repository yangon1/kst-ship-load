// OPEN .DAT FILE
var dat_in = function () {
    //Check the support for the File API support 
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        // WHEN FILE IN
        var getInFile = document.getElementById('file_in');
     	getInFile.addEventListener('change', function (e) { 
            //Get the file object 
            var inFileObj = getInFile.files[0];
            //Initialize the FileReader object to read the file 
            var inFileReader = new FileReader(); 
            inFileReader.readAsText(inFileObj); 

            // LOGIC
            inFileReader.onload = function (e) { 
                // console.log(inFileReader);
                var inStrSplit = inFileReader.result.split(/n| /);
                console.log(inStrSplit);
                for ( var i in inStrSplit ) {
                    // console.log(i);
                    var in_tmp = document.getElementById(i);
                    in_tmp.innerText = inStrSplit[i];
                }
            } 
        }, false);
    } 
    else { 
        alert("Files are not supported"); 
    } 
}

// OPEN STABPS.OUT
var stabps_out = function () {
    // WHEN FILE OUT
    var getOutFile = document.getElementById('file_out');
    getOutFile.addEventListener('change', function (e) { 
        //Get the file object 
        var outFileObj = getOutFile.files[0];
        //Initialize the FileReader object to read the file 
        var outFileReader = new FileReader(); 
        outFileReader.readAsText(outFileObj); 

        // LOGIC
        outFileReader.onload = function (e) { 
            // 연속된 공백을 하나의 공백으로 치환(trim추가), 개행 제거, 엔터 제거
            var outStrRep = outFileReader.result.replace(/(^ *)|( *$)/g, "").replace(/ +/g, " ").replace(/\n/g,"").replace(/\r/g,"");
            // console.log(outStrRep);          

            // 공백을 기준으로 배열에 넣기
            var outStrSplit = outStrRep.split(/n| /);
            console.log(outStrSplit);
        
            // TOTAL WEIGHT 찾기
            var sum = new Array(); 
            var cnt=0, chk=0;
            var CONDITION_NUM = 5;  // CONDITION 갯수
            for ( var i=0; i<outStrSplit.length; i++ ) {
                if ( outStrSplit[i] == "SWI" ) {
                    sum[cnt+10] = outStrSplit[i+2];        // S.W.I
                }
                if ( outStrSplit[i] == "(m2):" ) {
                    sum[cnt] = outStrSplit[i+1];            // A
                    sum[cnt+5] = outStrSplit[i+12];         // H
                }
                if ( outStrSplit[i] == "Y" ) {
                    sum[cnt+15] = outStrSplit[i+9];        // 현단몰입각
                    sum[cnt+20] = outStrSplit[i+16];        // 한계경사각
                    sum[cnt+25] = outStrSplit[i+20];        // 복원정

                    cnt += 1;
                }

                if ( cnt == CONDITION_NUM) break;
            }
            
            // SUMMARY 서식대로 string 만들기
            var result_str = "";
            for ( var j in sum ) {
                result_str += sum[j] + " ";
                if ( j % 5 == 4) result_str += "\n"; 
            }
            // console.log(result_str);
            
            // 결과 print
            var out_tmp = document.getElementById('filecontents');
            out_tmp.innerText = result_str;
        } 
    }, false);
}

window.onload = function () { 
    dat_in();
    stabps_out();
}