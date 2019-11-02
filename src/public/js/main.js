const socket = io();

function showSignupModal() {
  var $form_modal = $('.user-modal'),
    $form_login = $form_modal.find('#login'),
    $form_signup = $form_modal.find('#signup'),
    $form_forgot_password = $form_modal.find('#reset-password'),
    $form_modal_tab = $('.switcher'),
    $tab_login = $form_modal_tab.children('li').eq(0).children('a'),
    $tab_signup = $form_modal_tab.children('li').eq(1).children('a'),
    $main_nav = $('.main-nav');
  $main_nav.children('ul').removeClass('is-visible');
  $form_modal.addClass('is-visible'); 
  $form_login.removeClass('is-selected');
  $form_signup.addClass('is-selected');
  $form_forgot_password.removeClass('is-selected');
  $tab_login.removeClass('selected');
  $tab_signup.addClass('selected');
}

function showsigninModal() {
  var $form_modal = $('.user-modal'),
    $form_login = $form_modal.find('#login'),
    $form_signup = $form_modal.find('#signup'),
    $form_forgot_password = $form_modal.find('#reset-password'),
    $form_modal_tab = $('.switcher'),
    $tab_login = $form_modal_tab.children('li').eq(0).children('a'),
    $tab_signup = $form_modal_tab.children('li').eq(1).children('a'),
    $main_nav = $('.main-nav');
  $main_nav.children('ul').removeClass('is-visible');
  $form_modal.addClass('is-visible'); 
  $form_login.addClass('is-selected');
  $form_signup.removeClass('is-selected');
  $form_forgot_password.removeClass('is-selected');
  $tab_login.addClass('selected');
  $tab_signup.removeClass('selected');
}

$(document).ready(function() {

})