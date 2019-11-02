function chatText(event) {
  if (event.type === "click" || event.which === 13) {
    let messageVal = $("#message-to-send").val();
    let targetId = $("#message-to-send").data("send-text");
    if (!messageVal.length) return false;
    $("#message-to-send").val("");

    let data = {
      targetId,
      messageVal,
    }

    $.post("/chat-text", data)
      .then(data => {
        let messageOfMe = 
        `
          <li class="clearfix" data-mess-id="${data._id}">
            <div class="message-data align-right me">
              <span class="message-data-time">10:10 AM, Today</span>
              <span class="message-data-name">${data.sender.name}</span>
              <i class="fa fa-circle me"></i></div>
            <div class="message other-message float-right">
              ${data.text}
            </div>
          </li>
        `
  
        $(`.container-message[data-chat="${targetId}"]`).append(messageOfMe);

        socket.emit("chat-text", data);
      })
      .catch(err => {
        console.log(err)
      })
 
  }
};

$(document).ready(function() {
  $("#message-to-send").unbind("keyup").on("keyup", chatText);
  $("#send-message").unbind("click").on("click", chatText);

  socket.on("response-chat-text", data => {
    console.log(data);
    // let receiverId = data.receiverId;  


    let messageOfYou = 
    `
    <li class="clearfix" data-mess-id="${data._id}">
      <div class="message-data you">
        <span class="message-data-name">
          <i class="fa fa-circle online"></i> ${data.sender.name}
        </span><span class="message-data-time">10:12 AM, Today</span></div>
      <div class="message my-message">
        ${data.text}
      </div>
    </li>
    `;

    $(`.container-message[data-chat="${data.senderId}"]`).append(messageOfYou);

  })
});