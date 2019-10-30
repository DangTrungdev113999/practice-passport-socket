function addFriend() {
  $(".add-friend").bind("click", function() {
    let targetId = $(this).data("uid");
    let targetUsername = $(`a[data-uid="${targetId}"]`).text();

    $(`div[data-uid="to_${targetId}"]`).remove();
    let friend = 
    `
      <div class="col-md-3">
          <div class="user text-center">
            <img class="rounded-circle" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg" alt="avatar" />
            <a class="btn" href="">
              <span class="badge badge-success">${targetUsername}</span>
            </a>
          </div>
      </div>
    `;

    let friendChat = 
    `
    <li class="clearfix"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" alt="avatar" />
      <div class="about">
        <a class="name" data-toggle="tab" href="" data-target="#item2">
          ${targetUsername}
        </a>
        <div class="status"><i class="fa fa-circle online"></i> online</div>
      </div>
    </li>
    `;

    let areaChat = `

    `;

    $(".friend-list").prepend(friend);
    $("ul.list").prepend(friendChat);


    $.post("/contact/add-frirend", {uid: targetId})
    .then(res => {
      if(res) {
        alertify.notify("add friends successfully", "success", 6);
      }
    })
    .catch(err => {
      console.log(err)
    });

  })

}

$(document).ready(function() {
  addFriend();
});