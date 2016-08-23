(function () {

  // use jquery and vue.js

  var $loader        = $('.loader-front');
  var $reader        = $('.leader_list');
  var $more_team     = $('.more-team');
  var $more_person   = $('.more-person');
  var $reader_team   = $('.loader-small.team');
  var $reader_person = $('.loader-small.person');


  new Vue({
    el: 'body',
    data: {
      next_page: '',
      more: false,
      rows: [],
      team_data: false,
      user_data: false,
      next_page_person: '',
      rows_person: [],
      more_person: false,
      now: 'team',
      team: 'active',
      person: '',
      person_scroll: 0,
      team_scroll: 0,
      award: window.awards || {},
      init: false,
      speed: 600
    },

    ready: function () {
      this.load(`${app_path}/rank/team`, this.now);
    },

    methods: {
      load: function (path, type, callback) {
        var _this = this;
        $.get(path, function (response) {
          if (type === 'team') {
            _this.next_page = response.next_page_url;
            _this.rows      = _this.rows.concat(response.data);
            if (_this.next_page) {
              _this.more = true;
            } else {
              _this.more = false;
            }
          } else {
            _this.next_page_person = response.next_page_url;
            _this.rows_person      = _this.rows_person.concat(response.data);
            if (_this.next_page_person) {
              _this.more_person = true;
            } else {
              _this.more_person = false;
            }
          }

          if (!_this.init) {
            _this.init = true;
            $loader.fadeOut(_this.speed, function () {
              $reader.animate({opacity: 1}, _this.speed)
            });

            if (_this.rows.length === 0) {
              _this.team_data = true;
            }

            if (_this.rows_person.length === 0) {
              _this.user_data = true;
            }

          }

          if (callback) {
            callback();
          }
        });
      },

      morePage: function () {
        var _this = this;
        var more, loader, page;
        if (_this.now === 'team') {
          more   = $more_team.hide();
          page   = _this.next_page;
          loader = $reader_team.show();
        } else {
          more   = $more_person.hide();
          page   = _this.next_page_person;
          loader = $reader_person.show();
        }

        setTimeout(function () {
          _this.load(page, _this.now, function () {
            more.show();
            loader.hide();
          });
        }, _this.speed);

      },
      onLink: function (link) {
        location.href = `${app_path}/rank/${link}`;
      },
      onNextPage: function (index) {
        if (this.base === 'team') {
          location.href = `${app_path}/team/${this.rows[index].slug}`;
        }
      }
    }
  });

})()
