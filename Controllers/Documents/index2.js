module.exports = ({
  Name,
  src,
  LastName,
  Title,
  city,

  date,
  StartTime,
  Location,
}) => {
  return `
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<style>

$primary: #4872b0;
$grey: #E0E0E0;
    html {
        margin-top:0.2in !important;
        margin-left:0.2in !important;
    }

    body {
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-size: 13px;
        line-height:1.4em;
        font-weight:bold;
    }

.ticket{
  display: flex;
  font-family:Roboto;
  margin: 16px;
  border: 1px solid $grey;
  position:relative;
  
  &:before{
    content:'';
    width:32px;
    height:32px;
    background-color:#fff;
    border: 1px solid $grey;
    border-top-color:transparent;
    border-left-color:transparent;
    position:absolute;
    transform:rotate(-45deg);
    left:-18px;
    top:50%;
    margin-top:-16px;
    border-radius:50%;
  }
  
  &:after{
    content:'';
    width:32px;
    height:32px;
    background-color:#fff;
    border: 1px solid $grey;
    border-top-color:transparent;
    border-left-color:transparent;
    position:absolute;
    transform:rotate(135deg);
    right:-18px;
    top:50%;
    margin-top:-16px;
    border-radius:50%;
  }
  
  &--start{
    position:relative;
    &:before{
      content:'';
      width:32px;
      height:32px;
      background-color:#fff;
      border: 1px solid $grey;
      border-top-color:transparent;
      border-left-color:transparent;
      border-right-color:transparent;
      position:absolute;
      transform:rotate(-45deg);
      left:-18px;
      top:-2px;
      margin-top:-16px;
      border-radius:50%;
    }
    
    &:after{
      content:'';
      width:32px;
      height:32px;
      background-color:#fff;
      border: 1px solid $grey;
      border-top-color:transparent;
      border-left-color:transparent;
      border-bottom-color:transparent;
      position:absolute;
      transform:rotate(-45deg);
      left:-18px;
      top:100%;
      margin-top:-16px;
      border-radius:50%;
    }
    & > img{
      display:block;
      padding: 24px;
      height: 270px;
    }
    border-right: 1px dashed $grey;
  }
  
  &--center{
    padding: 24px;
    flex: 1;
    &--row{
      display: flex;
      &:not(:last-child){
        padding-bottom:48px;
      }
      
      &:first-child{
        span{
          color:$primary;
          text-transform:uppercase;
          line-height:24px;
          font-size:13px;
          font-weight:500;
        }
        
        strong{
          font-size:20px;
          font-weight:400;
          text-transform:uppercase;
        }
      }
    }
    
    &--col{
      display: flex;
      flex:1;
      width: 50%;
      box-sizing:border-box;
      flex-direction: column;
      &:not(:last-child){
        padding-right: 16px;
      }
    }
  }
  
  &--end{
    padding: 24px;
    background-color:$primary;
    display:flex;
    flex-direction:column;
    position:relative;
    &:before{
      content:'';
      width:32px;
      height:32px;
      background-color:#fff;
      border: 1px solid $grey;
      border-top-color:transparent;
      border-right-color:transparent;
      border-bottom-color:transparent;
      position:absolute;
      transform:rotate(-45deg);
      right:-18px;
      top:-2px;
      margin-top:-16px;
      border-radius:50%;
    }
    
    &:after{
      content:'';
      width:32px;
      height:32px;
      background-color:#fff;
      border: 1px solid $grey;
      border-right-color:transparent;
      border-left-color:transparent;
      border-bottom-color:transparent;
      position:absolute;
      transform:rotate(-45deg);
      right:-18px;
      top:100%;
      margin-top:-16px;
      border-radius:50%;
    }
  
    & > div{
      &:first-child{
      flex:1;
        & >img{
          width: 128px;
          padding: 4px;
          background-color: #fff;
        }
      }
      
      &:last-child{
        > img{
          display:block;
          margin: 0 auto;
          filter: brightness(0) invert(1);
          opacity:0.64;
        }
      }
    }
  }
  
  &--info{
    &--title{
      text-transform:uppercase;
      color: #757575;
      font-size:13px;
      line-height:24px;
      font-weight:600;
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
    }
    
    &--subtitle{
      font-size: 16px;
      line-height:24px;
      font-weight:500;
      color:$primary;
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
    }
    
    &--content{
      font-size:13px;
      line-height:24px; 
      font-weight: 500;
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
    }
  }
}
                                
</style>
</head>

<body>
<div class="ticket">
  <div class="ticket--start">
    <img src="https://i.ibb.co/W3cK42J/image-1.png"/>
  </div>
  <div class="ticket--center">
    <div class="ticket--center--row">
      <div class="ticket--center--col">
        <span>Your ticket for</span>
        <strong>The event name</strong>
      </div>
    </div>
    <div class="ticket--center--row">
      <div class="ticket--center--col">
        <span class="ticket--info--title">Date and time</span>
        <span class="ticket--info--subtitle">Thursday, May 14 2020</span>
        <span class="ticket--info--content">7:00 am to 9:00 pm (GMT+1)</span>
      </div>
      <div class="ticket--center--col">
        <span class="ticket--info--title">Location</span>
        <span class="ticket--info--subtitle">Location name</span>
        <span class="ticket--info--content">Location complete address, Town, COUNTRY</span>
      </div>
    </div>
    <div class="ticket--center--row">
      <div class="ticket--center--col">
        <span class="ticket--info--title">Ticket type</span>
        <span class="ticket--info--content">Event category</span>
      </div>
      <div class="ticket--center--col">
        <span class="ticket--info--title">Order info</span>
        <span  class="ticket--info--content">Order #0123456789. Ordered By Jhon DOE</span>
      </div>
    </div>
  </div>
  <div class="ticket--end">
    <div><img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Qrcode_wikipedia_fr_v2clean.png"></div>
    <div><img src="https://qidoon.com/assets/img/logo.svg"/></div>
    
    
  </div>
</div>                    
</body>
</html>

  `;
};
