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

// OPEN LOADCD.OUT
var loadcd_out = function () {
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
            // 공백 여러개를 하나로 만들고, 앞뒤 공백 제거
            var outStrRep = outFileReader.result.replace(/(^ *)|( *$)/g, "").replace(/ +/g, " ");
            // console.log(outStrRep);

            // 공백을 기준으로 배열에 넣기
            var outStrSplit = outStrRep.split(/n| /);
            // console.log(outStrSplit);

            // TOTAL WEIGHT 찾기
            var sum = new Array(); 
            var cnt=0, chk=0;

            var CONDITION_NUM = 7;  // CONDITION 갯수

            for ( var i=0; i<outStrSplit.length; i++ ) {
                // console.log(i + " : " + outStrSplit[i] + " && " + (i+1) + " : " + outStrSplit[i+1]);
                if ( outStrSplit[i] == "TOTAL" && outStrSplit[i+1] == "WEIGHT") {
                    sum[cnt] = outStrSplit[i+2];            // DISPLACEMENT
                    sum[cnt+CONDITION_NUM*2] = outStrSplit[i+3];          // L.C.G
                                    
                    chk = 1;  // 맨앞의 "DRAFT EQUIVALENT를 검색에서 제외하기 위해 사용"                       
                }
                if ( outStrSplit[i] == "DRAFT" && outStrSplit[i+1] == "EQUIVALENT") {
                    if ( chk == 1) {
                        sum[cnt+CONDITION_NUM*1] = outStrSplit[i+2];     // DRAFT
                        sum[cnt+CONDITION_NUM*8] = outStrSplit[i+24];    // dF
                        sum[cnt+CONDITION_NUM*9] = outStrSplit[i+33];    // dA
                        sum[cnt+CONDITION_NUM*10] = outStrSplit[i+43];    // dM
                        sum[cnt+CONDITION_NUM*7] = outStrSplit[i+13];    // TRIM
                        sum[cnt+CONDITION_NUM*3] = outStrSplit[i+53];    // L.C.B
                        sum[cnt+CONDITION_NUM*4] = outStrSplit[i+59];    // L.C.F
                        sum[cnt+CONDITION_NUM*5] = outStrSplit[i+56];    // M.T.C
                        sum[cnt+CONDITION_NUM*6] = outStrSplit[i+62];    // T.P.C
                        sum[cnt+CONDITION_NUM*11] = outStrSplit[i+7];     // KMT
                        sum[cnt+CONDITION_NUM*12] = outStrSplit[i+20];    // KG
                        sum[cnt+CONDITION_NUM*14] = outStrSplit[i+29];    // GM
                        sum[cnt+CONDITION_NUM*13] = outStrSplit[i+39];    // GGo
                        sum[cnt+CONDITION_NUM*15] = outStrSplit[i+49];    // GoM

                        cnt += 1;
                    }
                }
                if ( cnt == CONDITION_NUM) break;
            }

            // SUMMARY 서식대로 string 만들기
            var result_str = "";
            for ( var j in sum ) {
                result_str += sum[j] + " ";
                if ( j % CONDITION_NUM == CONDITION_NUM-1 ) result_str += "\n"; 
            }

            // 결과 print
            var out_tmp = document.getElementById('filecontents');
            out_tmp.innerText = result_str;

        } 
    }, false);
}

window.onload = function () { 
    dat_in();
    loadcd_out();
}