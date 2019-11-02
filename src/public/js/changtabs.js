function changTabChat() {
  $(".chat-text").unbind("click").on("click", function() {
    let targetId = $(this).data("uid");
    let username = $(this).text();

    $(".chat").attr("id", targetId);
    $(".chat-with").text(`Chat with ${username}`);
    $("#message-to-send").attr("data-send-text", targetId);
    $("#send-message").attr("data-send-text", targetId);
    $(".container-message").attr("data-chat", targetId)
    $(".container-message").find("li").remove();
    
  });
};




$(document).ready(function() {
  changTabChat();
});