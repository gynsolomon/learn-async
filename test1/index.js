/**
 * Created by solomon on 14/12/9.
 */
var async = require('async');
var fs = require('fs');

async.filter([1,2], function(input,cb){ cb(input===2) }, function(results){
    // results now equals an array of the existing files
    console.log(results);
});


var tasks = [
    function(cb){
        setTimeout(function(){
            var err = null; //var err = new Error('error');
            var result = 'result_1';
            cb(err,result);
        },200);
    },
    function(cb){
        setTimeout(function(){
            var err = null; //var err = new Error('error');
            var result = 'result_2';
            cb(err,result);
        },300);
    }
];

// 最常用
async.series(tasks,function(err,results){
    console.log(results); // 如果tasks中的所有function的cb里的err都为null的话，500ms 之后输出 ['result_1', 'result_2']
    // tasks中任何一个function的cb的err不为null, 则所有其他process立刻停止，这个主callback也返回err
});

async.parallel(tasks,function(err,results){
   console.log(results);
});




// collections
var inputArray = ['input','input','input'];
var transformed = function(input){return  'transformed' + ':-)' + input};
var limit = 3;

// each -- 不关心输出结果，只在乎过程，foreach循环处理一堆输入时
async.each(inputArray,function(input,cb){cb(err)},function(err){});
async.eachSeries(inputArray,function(input,cb){cb(err)},function(err){});
async.eachLimit(inputArray,limit,function(input,cb){cb(err)},function(err){});

// map -- 关心输出结果，且重在转换结果，foreach循环处理一堆输入时
async.map(inputArray,function(input,cb){cb(err,transformed(input))},function(err,results){});
async.mapSeries(inputArray,function(input,cb){cb(err,transformed(input))},function(err,results){});
async.mapLimit(inputArray,limit,function(input,cb){cb(err,transformed(input))},function(err,results){});






