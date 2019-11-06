<template>
  <div class="Search">
      <input type="text" placeholder="搜索您想找的">
      <div>
        <div class="LeftDiv">
            <span @click="TabSpan(item)" v-for="(item,index) in List" :key="index" :class="{spans:item.bool}">{{item.tit}}</span>
        </div>
        <div class="RightDiv">
            <dl v-for="(item,index) in Right" :key="index" @click="Details(item.name)">
                <dt><img :src="item.img" alt=""></dt>
                <dd>
                    <span>{{item.name}}</span>
                    <a>{{item.datatype}}</a>
                </dd>
            </dl>
        </div>
      </div>
      
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            List: [],
            Right: []
        }
    },
    created(){
        axios.get('./list.json').then(({data})=>{
            this.List = data.type
            this.Right = data.type[0].datainfo
        })
    },
    methods: {
        TabSpan(data){
            var newList = this.List
            for(var i=0,len=newList.length;i<len;i++){
                newList[i].bool = false
                if (newList[i].tit === data.tit) {
                    newList[i].bool = true
                    this.Right = newList[i].datainfo
                }
            }
            this.List = newList
        },
        Details(item){
            this.$router.push('/details/'+item)
        }
    }
}
</script>

<style>
.Search{
    height: 100%;
    background: #f6f6f6;
    display: flex;
    overflow: auto;
    flex-direction: column;
}
.Search input{
    margin: 8px;
    padding: 4px;
    border-radius: 4px;
    border: 1px solid #7c7c7c;
    outline: none;
}
.Search::-webkit-scrollbar{
    width: 0;
}
.Search>div{
    display: flex;
    overflow: auto;
}
.Search>div::-webkit-scrollbar{
    width: 0;
}
.LeftDiv{
    width: 25%;
    display: flex;
    flex-direction: column;
    background: #ffffff;
    overflow: auto;
}
.LeftDiv::-webkit-scrollbar{
    width: 0;
}
.LeftDiv span{
    border-left: 3px solid transparent;
    text-align: center;
    padding: 15px 0;
    border-bottom: 1px solid #e8e8e8;
    box-sizing: border-box;
}
.LeftDiv .spans{
    background: #f6f6f6;
    border-left-color: #52b7fd;
}
.RightDiv{
    flex: 1;
    overflow: auto;
}
.RightDiv::-webkit-scrollbar{
    width: 0;
}
.RightDiv dl{
    display: flex;
    padding: 10px;
    border-bottom: 1px solid #e8e8e8;
    box-sizing: border-box;
}
.RightDiv dl dt{
    width: 16%;
}
.RightDiv dl dt img{
    width: 100%;
    display: block;
}
.RightDiv dl dd{
    flex: 1;
    display: flex;
    padding-left: 10px;
    align-items: center;
}
.RightDiv dl dd span{
    flex: 1;
}
.RightDiv dl dd a{
    font-size: 14px;
    color: #787878;
}

</style>