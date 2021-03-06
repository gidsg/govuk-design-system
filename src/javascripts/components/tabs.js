import $ from 'jquery'

var Tabs = {

  // Reset tabs and containers
  resetTabs: function (id) {
    // Check if we have an id
    if (!id) {
      console.error('id is undefined')
      return
    }

    var $example = $(id).parent()

    // Reset state
    $example.find('.js-tabs__item').removeClass('app-tabs__item--current')
    $example.find('.js-tabs__heading').removeClass('app-tabs__heading--current')
    $example.find('.js-tabs__item a').removeAttr('aria-selected')
    $example.find('.js-tabs__container').hide().attr('aria-hidden', 'true')
  },

  // Activate current tab
  activateCurrentTab: function (id) {
    // Check if we have an id
    if (!id) {
      console.error('id is undefined')
      return
    }

    // Reset tabs
    Tabs.resetTabs(id)

    // Set current active tab for both tabs and accordion links
    $('[href="' + id + '"]').attr('aria-selected', 'true')
    var $parents = $('[href="' + id + '"]').parent()
    $.each($parents, function (key, obj) {
      if ($(obj).hasClass('app-tabs__item')) {
        $(obj).addClass('app-tabs__item--current')
      } else if ($(obj).hasClass('app-tabs__heading')) {
        $(obj).addClass('app-tabs__heading--current')
      }
    })

    // Set current container
    $(id).show().removeAttr('aria-hidden')
  },

  // Tabs mode
  clickTabItem: function (e) {
    e.preventDefault()

    // Get tab container ID
    var id = $(this).attr('href')

    // Activate current tab
    Tabs.activateCurrentTab(id)
  },

  // Close current container on click
  clickCloseContainer: function (e) {
    e.preventDefault()

    // Get tab container ID and save example object
    var id = $(this).parent().attr('id')

    // Reset tabs
    Tabs.resetTabs('#' + id)
  },

  init: function (selector) {
    // If more than one container
    var $examples = $(selector)
    $.each($examples, function (key, obj) {
      if ($(obj).find('.js-tabs__container').length > 1) {
        // Hide all containers
        $(obj).find('.js-tabs__container').hide()

        // Add close button to each container
        $(obj).find('.js-tabs__container').append('<button class="app-tabs__close js-tabs__close">Close</button>')
        $(obj).find('.js-tabs__container').addClass('app-tabs__container--with-close-button')
      }
    })

    // Bind tab item click
    $('.js-tabs__item a').click(Tabs.clickTabItem)

    // Bind accordion item click
    $('.js-tabs__heading a').click(Tabs.clickTabItem)

    // Bind close container link
    $('.js-tabs__close').click(Tabs.clickCloseContainer)

    // Show open containers
    $('.js-tabs__heading--open a').click()
  }
}

export default Tabs
