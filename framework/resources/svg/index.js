/*
* 获取 脚本
* */
/*
* var list = document.getElementsByTagNameNS("http://www.w3.org/2000/svg",'svg');var _arr = [];for(var i in list){if(i==0)continue;if(!list[i].getAttribute || !list[i].children[0].getAttribute('d'))continue; var _item = {viewBox:list[i].getAttribute('viewBox'),path:list[i].children[0].getAttribute('d')};if(_item.path)_arr.push(_item);}console.log(JSON.stringify(_arr));
* */